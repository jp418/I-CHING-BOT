import React, { useState } from 'react';
import { HEXAGRAMS } from '../constants';
import { HexagramData } from '../types';

interface LibraryViewProps {
  onClose: () => void;
  onSelect?: (hexagram: HexagramData) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  
  const hexagramList = Object.values(HEXAGRAMS).sort((a, b) => a.number - b.number);
  
  const filtered = hexagramList.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.english.toLowerCase().includes(search.toLowerCase()) ||
    h.number.toString() === search
  );

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-2xl font-serif text-amber-100 italic">The Forest of Changes</h1>
        </div>
        
        <div className="relative max-w-xs w-full hidden md:block">
          <input 
            type="text" 
            placeholder="Search hexagrams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 px-10 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Search */}
          <div className="relative w-full mb-8 md:hidden">
            <input 
              type="text" 
              placeholder="Search hexagrams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 px-12 text-base focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(hex => (
              <div 
                key={hex.number}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-500/70 mb-1 block">Hexagram {hex.number}</span>
                    <h2 className="text-xl font-serif text-amber-100 group-hover:text-amber-500 transition-colors">
                      {hex.name} — {hex.english}
                    </h2>
                  </div>
                  <div className="text-3xl text-slate-700 font-serif translate-y-[-4px]">
                    {hex.character}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-1">The Judgment</h3>
                    <p className="text-sm text-slate-400 italic leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      {hex.judgment}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-1">The Image</h3>
                    <p className="text-sm text-slate-400 italic leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                      {hex.imagery}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 text-slate-800 font-serif">Empty Oracle</div>
              <p className="text-slate-500">No hexagrams match your search.</p>
              <button 
                onClick={() => setSearch('')}
                className="mt-4 text-amber-500 hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LibraryView;
