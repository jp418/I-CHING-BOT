import React from 'react';
import { ReadingResult } from '../types';

interface HistorySidebarProps {
  history: ReadingResult[];
  onSelect: (reading: ReadingResult) => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-700 transform transition-transform duration-300 z-50 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-serif text-amber-500">History</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        
        <div className="p-4 space-y-4">
          {history.length === 0 ? (
            <p className="text-slate-500 text-center mt-10">No past readings recorded.</p>
          ) : (
            history.map((reading, idx) => (
              <div 
                key={idx} 
                onClick={() => { onSelect(reading); onClose(); }}
                className="p-3 bg-slate-800 rounded border border-slate-700 hover:border-amber-500 cursor-pointer transition-colors group"
              >
                <p className="text-xs text-slate-400 mb-1">
                  {new Date(reading.timestamp).toLocaleDateString()} • {new Date(reading.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <h3 className="font-serif text-amber-100 group-hover:text-amber-400 font-bold mb-1">
                  {reading.originalHexagram.number}. {reading.originalHexagram.english}
                </h3>
                <p className="text-sm text-slate-300 truncate italic">"{reading.question}"</p>
                {reading.transformedHexagram && (
                   <p className="text-xs text-slate-500 mt-1">
                     → {reading.transformedHexagram.number}. {reading.transformedHexagram.english}
                   </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;