import { CastLine, HexagramData, LineType } from '../types';
import { HEXAGRAMS } from '../constants';

export const tossCoins = (): CastLine => {
  // 3 coins. Each has a value of 2 (Tails/Yin) or 3 (Heads/Yang).
  // Probabilities:
  // 3 Heads (3+3+3=9) -> Old Yang (1/8)
  // 3 Tails (2+2+2=6) -> Old Yin (1/8)
  // 1 Head 2 Tails (3+2+2=7) -> Young Yang (3/8)
  // 2 Heads 1 Tail (3+3+2=8) -> Young Yin (3/8)
  
  const coin1 = Math.random() < 0.5 ? 2 : 3;
  const coin2 = Math.random() < 0.5 ? 2 : 3;
  const coin3 = Math.random() < 0.5 ? 2 : 3;
  
  const sum = coin1 + coin2 + coin3;
  
  return {
    value: sum,
    type: sum as LineType,
  };
};

export const getHexagramFromLines = (lines: CastLine[]): { original: HexagramData, transformed?: HexagramData } => {
  // Construct binary string from bottom (lines[0]) to top (lines[5])
  
  // Original: 6(Old Yin) -> 0, 7(Young Yang) -> 1, 8(Young Yin) -> 0, 9(Old Yang) -> 1
  // Basically Yang is odd, Yin is even
  const originalBinary = lines.map(l => (l.value % 2 === 1 ? '1' : '0')).join('');
  
  const original = HEXAGRAMS[originalBinary];
  
  // Transformed: Old lines flip. Young lines stay.
  // 6 (Old Yin 0) -> becomes 1
  // 9 (Old Yang 1) -> becomes 0
  const hasMovingLines = lines.some(l => l.value === 6 || l.value === 9);
  
  let transformed: HexagramData | undefined = undefined;
  
  if (hasMovingLines) {
    const transformedBinary = lines.map(l => {
      if (l.value === 6) return '1'; // Old Yin (0) becomes Yang (1)
      if (l.value === 9) return '0'; // Old Yang (1) becomes Yin (0)
      return (l.value % 2 === 1 ? '1' : '0'); // Statics stay same
    }).join('');
    
    transformed = HEXAGRAMS[transformedBinary];
  }
  
  return { original, transformed };
};

export const getChangingLinesIndices = (lines: CastLine[]): number[] => {
    return lines
        .map((l, idx) => (l.value === 6 || l.value === 9 ? idx + 1 : 0))
        .filter(idx => idx !== 0);
};