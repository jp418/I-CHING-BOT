import React, { useEffect, useState } from 'react';

interface CoinAnimationProps {
  onTossComplete: () => void;
  isTossing: boolean;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({ onTossComplete, isTossing }) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isTossing) {
      setShowResult(false);
      // Simulate animation duration
      timer = setTimeout(() => {
        setShowResult(true);
        // Small delay to show result before callback
        setTimeout(onTossComplete, 500); 
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isTossing, onTossComplete]);

  if (!isTossing && !showResult) return null;

  return (
    <div className="flex justify-center gap-8 my-8 perspective-500">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`relative w-16 h-16 rounded-full border-4 border-amber-500 bg-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center text-amber-900 font-bold text-xl ${isTossing ? 'animate-[spin_0.5s_ease-in-out_infinite]' : ''}`}>
           <span className="opacity-80">
             {/* Simple visual representation */}
             {isTossing ? '?' : ((Math.random() > 0.5) ? 'Yin' : 'Yang')}
           </span>
        </div>
      ))}
      <style>{`
        .perspective-500 { perspective: 500px; }
      `}</style>
    </div>
  );
};

export default CoinAnimation;