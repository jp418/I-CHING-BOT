import React, { useState, useEffect, useRef } from 'react';
import { CastLine, ReadingResult } from './types';
import { tossCoins, getHexagramFromLines } from './utils/ichingLogic';
import HexagramDisplay from './components/HexagramDisplay';
import CoinAnimation from './components/CoinAnimation';
import HistorySidebar from './components/HistorySidebar';
import LibraryView from './components/LibraryView';
import { getInterpretation } from './services/geminiService';
import { GoogleGenAI } from "@google/genai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Ensure AI client is init
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const App: React.FC = () => {
  // State
  const [question, setQuestion] = useState('');
  const [lines, setLines] = useState<CastLine[]>([]);
  const [isCasting, setIsCasting] = useState(false); // Coin spinning state
  const [stage, setStage] = useState<'input' | 'casting' | 'result'>('input');
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [journalNote, setJournalNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Views
  const [history, setHistory] = useState<ReadingResult[]>(() => {
    const saved = localStorage.getItem('iching_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  // Methods
  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`iching-reading-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF Export Error:', error);
    } finally {
      setIsExporting(false);
    }
  };
  const handleManualStart = () => {
    if (!question.trim()) {
      alert("Please meditate on a question first.");
      return;
    }
    setStage('casting');
    setLines([]);
    setReadingResult(null);
    setJournalNote('');
  };

  const handleInstantReading = () => {
    if (!question.trim()) {
      alert("Please meditate on a question first.");
      return;
    }
    
    // Generate 6 lines immediately
    const newLines = Array.from({ length: 6 }, () => tossCoins());
    finishReading(newLines);
  };

  const handleToss = () => {
    if (isCasting || lines.length >= 6) return;
    
    setIsCasting(true);
    // Logic happens in CoinAnimation callback
  };

  const onTossComplete = () => {
    setIsCasting(false);
    const newLine = tossCoins();
    const newLines = [...lines, newLine];
    setLines(newLines);

    if (newLines.length === 6) {
      finishReading(newLines);
    }
  };

  const finishReading = async (completedLines: CastLine[]) => {
    const { original, transformed } = getHexagramFromLines(completedLines);
    
    const result: ReadingResult = {
      lines: completedLines,
      originalHexagram: original,
      transformedHexagram: transformed,
      timestamp: Date.now(),
      question,
      notes: '',
    };

    setReadingResult(result);
    setJournalNote('');
    setStage('result');
    setIsLoadingAI(true);

    // Fetch AI Interpretation
    const interpretation = await getInterpretation(question, completedLines, original, transformed);
    
    const finalResult = { ...result, aiInterpretation: interpretation };
    setReadingResult(finalResult);
    setIsLoadingAI(false);
    
    // Save to history
    const updatedHistory = [finalResult, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('iching_history', JSON.stringify(updatedHistory));
  };

  const loadFromHistory = (reading: ReadingResult) => {
    setQuestion(reading.question);
    setLines(reading.lines);
    setReadingResult(reading);
    setJournalNote(reading.notes || '');
    setStage('result');
    setShowHistory(false);
  };

  const reset = () => {
    setQuestion('');
    setLines([]);
    setStage('input');
    setReadingResult(null);
    setJournalNote('');
  };

  const saveJournalNote = () => {
    if (!readingResult) return;
    setIsSavingNote(true);

    const updatedReading = { ...readingResult, notes: journalNote };
    setReadingResult(updatedReading);

    // Update in history array
    const updatedHistory = history.map(item => 
      item.timestamp === readingResult.timestamp ? updatedReading : item
    );
    setHistory(updatedHistory);
    localStorage.setItem('iching_history', JSON.stringify(updatedHistory));

    setTimeout(() => setIsSavingNote(false), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-amber-900 selection:text-white flex flex-col">
      
      {/* Header */}
      <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 bg-amber-900 flex items-center justify-center font-serif font-bold text-amber-500">
            I
          </div>
          <h1 className="text-2xl font-serif text-amber-100 tracking-wide">I-CHING BOT</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowLibrary(true)}
            className="px-4 py-2 text-sm text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
            Library
          </button>
          <button 
            onClick={() => setShowHistory(true)}
            className="px-4 py-2 text-sm text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            History
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
        
        {/* Stage 1: Input Question */}
        {stage === 'input' && (
          <div className="w-full max-w-lg animate-fade-in-up">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif text-amber-50 mb-4">Consult the Oracle</h2>
              <p className="text-slate-400">Focus on a specific question or situation. Clear your mind.</p>
            </div>
            
            <div className="bg-slate-800 p-1 rounded-lg shadow-lg border border-slate-700 focus-within:border-amber-500 transition-colors">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is the wisdom for my current career path?..."
                className="w-full bg-slate-900 p-4 rounded text-lg outline-none min-h-[120px] text-slate-200 placeholder-slate-600 resize-none"
              />
            </div>
            
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleInstantReading}
                className="py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-50 font-serif font-bold text-lg rounded shadow-[0_0_20px_rgba(180,83,9,0.3)] transition-all transform hover:scale-[1.01]"
              >
                Spontaneous Casting
              </button>
              
              <button
                onClick={handleManualStart}
                className="py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 text-slate-300 font-serif font-bold text-lg rounded transition-all transform hover:scale-[1.01]"
              >
                Traditional Casting
              </button>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">
              "Spontaneous Casting" generates all lines at once. "Traditional Casting" proceeds step-by-step.
            </p>
          </div>
        )}

        {/* Stage 2: Casting Lines */}
        {stage === 'casting' && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <h2 className="text-2xl font-serif text-slate-300 mb-2">Casting Line {lines.length + 1} of 6</h2>
            <p className="text-slate-500 text-sm mb-8 italic">"{question}"</p>

            <div className="flex gap-12 items-end mb-12">
               {/* Current Hexagram Building */}
               <HexagramDisplay lines={lines} highlightMoving={true} />
            </div>

            <div className="h-32 flex items-center justify-center mb-8">
               <CoinAnimation isTossing={isCasting} onTossComplete={onTossComplete} />
            </div>

            <button
              onClick={handleToss}
              disabled={isCasting}
              className={`px-12 py-4 rounded-full font-serif text-xl transition-all shadow-lg ${isCasting 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/50 hover:shadow-amber-600/50 hover:-translate-y-1'}`}
            >
              {isCasting ? 'Casting...' : 'Toss Coins'}
            </button>
            <p className="mt-6 text-slate-600 text-sm">Click to toss the three coins.</p>
          </div>
        )}

        {/* Stage 3: Result & Interpretation */}
        {stage === 'result' && readingResult && (
          <div className="w-full animate-fade-in pb-20">
            <div className="flex justify-between items-center mb-6">
              <button onClick={reset} className="text-sm text-amber-500 hover:text-amber-300 flex items-center gap-1">
                ← New Reading
              </button>
              
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded flex items-center gap-2 border border-slate-700 transition-colors disabled:opacity-50"
              >
                {isExporting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Download PDF Report
                  </>
                )}
              </button>
            </div>
            
            <div ref={reportRef} className="p-4 md:p-8 bg-slate-900 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left Column: Hexagrams */}
              <div className="md:col-span-1 space-y-8">
                {/* Primary Hexagram */}
                <div className="bg-slate-800/50 p-6 rounded border border-slate-700">
                   <h3 className="text-center font-serif text-amber-500 text-lg mb-4">Primary Hexagram</h3>
                   <div className="flex justify-center mb-4">
                     <HexagramDisplay lines={readingResult.lines} highlightMoving={true} />
                   </div>
                   <div className="text-center">
                     <div className="text-4xl font-serif mb-1">{readingResult.originalHexagram.character}</div>
                     <div className="text-xl font-bold text-slate-200">{readingResult.originalHexagram.number}. {readingResult.originalHexagram.name}</div>
                     <div className="text-amber-200/80">{readingResult.originalHexagram.english}</div>
                   </div>
                </div>

                {/* Transformed Hexagram (if any) */}
                {readingResult.transformedHexagram && (
                  <div className="bg-slate-800/50 p-6 rounded border border-slate-700 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
                     <h3 className="text-center font-serif text-purple-400 text-lg mb-4">Target Hexagram</h3>
                     <div className="flex justify-center mb-4">
                        <HexagramDisplay lines={readingResult.lines.map(l => ({ ...l, isMoving: false, value: l.value === 6 ? 7 : l.value === 9 ? 8 : l.value }))} highlightMoving={false} />
                     </div>
                     <div className="text-center">
                        <div className="text-4xl font-serif mb-1">{readingResult.transformedHexagram.character}</div>
                        <div className="text-xl font-bold text-slate-200">{readingResult.transformedHexagram.number}. {readingResult.transformedHexagram.name}</div>
                        <div className="text-purple-300/80">{readingResult.transformedHexagram.english}</div>
                     </div>
                  </div>
                )}
              </div>

              {/* Right Column: Interpretation */}
              <div className="md:col-span-2 space-y-8">
                
                {/* Interpretation Card */}
                <div className="bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700">
                  <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-2">The Inquiry</h2>
                  <p className="text-xl font-serif text-white italic mb-8 border-l-4 border-amber-600 pl-4 py-2 bg-slate-900/50">
                    "{readingResult.question}"
                  </p>

                  <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-4">The Book of Changes Foundation</h2>
                  <div className="space-y-6 mb-10 pb-10 border-b border-slate-700">
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-amber-600 font-bold mb-3">Primary: {readingResult.originalHexagram.english}</h3>
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-sm font-serif text-amber-500/80 mb-1">The Judgment</h4>
                          <p className="text-slate-300 italic leading-relaxed pl-4 border-l-2 border-amber-900/50">
                            {readingResult.originalHexagram.judgment}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-amber-500/80 mb-1">The Image</h4>
                          <p className="text-slate-300 italic leading-relaxed pl-4 border-l-2 border-amber-900/50">
                            {readingResult.originalHexagram.imagery}
                          </p>
                        </div>
                      </div>
                    </div>

                    {readingResult.transformedHexagram && (
                      <div>
                        <h3 className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-3">Target: {readingResult.transformedHexagram.english}</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-serif text-purple-400/80 mb-1">The Judgment</h4>
                            <p className="text-slate-300 italic leading-relaxed pl-4 border-l-2 border-purple-900/50">
                              {readingResult.transformedHexagram.judgment}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-serif text-purple-400/80 mb-1">The Image</h4>
                            <p className="text-slate-300 italic leading-relaxed pl-4 border-l-2 border-purple-900/50">
                              {readingResult.transformedHexagram.imagery}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-4">Deep Interpretation</h2>
                  
                  {isLoadingAI ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-700 rounded w-full"></div>
                      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                      <div className="mt-8 h-4 bg-slate-700 rounded w-1/2"></div>
                      <p className="text-amber-500/80 text-sm mt-4">Consulting the digital sage...</p>
                    </div>
                  ) : (
                    <div 
                      className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        // Basic markdown parsing for bold/headers/lines/bullets
                        __html: (readingResult.aiInterpretation || '')
                          .replace(/### (.*)/g, '<h4 class="text-lg font-serif text-amber-500/90 mt-4 mb-2">$1</h4>')
                          .replace(/## (.*)/g, '<h3 class="text-xl font-serif text-amber-500 mt-6 mb-2">$1</h3>')
                          .replace(/# (.*)/g, '<h2 class="text-2xl font-serif text-amber-500 mt-8 mb-4">$1</h2>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-100">$1</strong>')
                          .replace(/\n\n/g, '<p class="mb-4"></p>')
                          .replace(/\n\* (.*)/g, '<li class="ml-4 list-disc">$1</li>')
                          .replace(/\n/g, '<br />')
                      }} 
                    />
                  )}
                </div>

                {/* Journal Card */}
                <div className="bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700">
                   <div className="flex justify-between items-center mb-4">
                     <h2 className="text-sm uppercase tracking-widest text-slate-500">Journal & Reflections</h2>
                     {isSavingNote && <span className="text-green-400 text-xs font-bold animate-pulse">Saved</span>}
                   </div>
                   
                   <p className="text-slate-400 text-sm mb-4">Record your thoughts, feelings, and how this reading applies to your life.</p>
                   
                   <textarea
                     className="w-full bg-slate-900/50 p-4 rounded text-slate-300 border border-slate-700 focus:border-amber-500 outline-none min-h-[150px] resize-y placeholder-slate-600"
                     placeholder="Write your reflections here..."
                     value={journalNote}
                     onChange={(e) => setJournalNote(e.target.value)}
                   />
                   
                   <div className="mt-4 flex justify-end">
                     <button 
                       onClick={saveJournalNote}
                       className="px-6 py-2 bg-slate-700 hover:bg-amber-600 text-white rounded transition-colors text-sm font-semibold"
                     >
                       Save Note
                     </button>
                   </div>
                </div>

              </div>
            </div>
          </div>
          </div>
        )}
      </main>

      <HistorySidebar 
        history={history} 
        onSelect={loadFromHistory} 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
      />

      {showLibrary && (
        <LibraryView onClose={() => setShowLibrary(false)} />
      )}
      
      {/* Footer */}
      <footer className="p-4 text-center text-slate-600 text-xs border-t border-slate-800">
        <p>I-CHING BOT • The Forest of Changes • Built with Antique Wisdom</p>
      </footer>
    </div>
  );
};

export default App;