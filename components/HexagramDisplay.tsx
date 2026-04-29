import React from 'react';
import { CastLine, LineType } from '../types';

interface HexagramDisplayProps {
  lines: CastLine[];
  active?: boolean; // If true, lines are animated in
  highlightMoving?: boolean;
}

const LineBar: React.FC<{ type: LineType; index: number; highlightMoving?: boolean }> = ({ type, index, highlightMoving }) => {
  const isYang = type === LineType.YoungYang || type === LineType.OldYang;
  const isMoving = type === LineType.OldYin || type === LineType.OldYang;

  // Determine colors
  const baseColor = "bg-amber-100";
  const movingColor = highlightMoving && isMoving ? "bg-red-400" : baseColor;

  return (
    <div className="w-full max-w-[200px] h-4 sm:h-6 my-1 sm:my-2 flex justify-between items-center relative transition-all duration-500 ease-out transform translate-y-0 opacity-100">
      
      {/* Yang Line: Solid bar */}
      {isYang && (
        <div className={`w-full h-full ${movingColor} shadow-[0_0_10px_rgba(255,255,255,0.2)] rounded-sm`}></div>
      )}

      {/* Yin Line: Split bar */}
      {!isYang && (
        <>
          <div className={`w-[45%] h-full ${movingColor} shadow-[0_0_10px_rgba(255,255,255,0.2)] rounded-sm`}></div>
          <div className={`w-[45%] h-full ${movingColor} shadow-[0_0_10px_rgba(255,255,255,0.2)] rounded-sm`}></div>
        </>
      )}

      {/* Changing Marker (Circle or X) */}
      {isMoving && highlightMoving && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-900 font-bold text-xs sm:text-sm pointer-events-none">
          {type === LineType.OldYang ? 'O' : 'X'}
        </div>
      )}
    </div>
  );
};

const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ lines, highlightMoving = true }) => {
  // We display lines from Top (index 5) to Bottom (index 0) visually, 
  // but standard casting order is bottom-up. 
  // Standard display: Line 6 is at the top.
  
  const reversedLines = [...lines].reverse(); // Copy and reverse for visual stacking (6 on top)

  return (
    <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700 shadow-xl backdrop-blur-sm min-w-[250px]">
      {reversedLines.map((line, idx) => {
        // reversedLines[0] is actually line 6 (index 5 of original)
        // reversedLines[5] is actually line 1 (index 0 of original)
        const originalIndex = lines.length - 1 - idx;
        return (
          <LineBar 
            key={`line-${originalIndex}`} 
            type={line.type} 
            index={originalIndex} 
            highlightMoving={highlightMoving} 
          />
        );
      })}
      {lines.length === 0 && (
         <div className="h-48 flex items-center justify-center text-slate-500 italic">
           No lines cast yet
         </div>
      )}
    </div>
  );
};

export default HexagramDisplay;