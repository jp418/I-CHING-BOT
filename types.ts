export enum LineType {
  YoungYin = 8,  // - - (Static)
  YoungYang = 7, // --- (Static)
  OldYin = 6,    // -x- (Changing to Yang)
  OldYang = 9,   // -o- (Changing to Yin)
}

export interface HexagramData {
  number: number;
  name: string;
  character: string;
  pinyin: string;
  english: string;
  description: string;
  imagery: string;
  judgment: string;
}

export interface CastLine {
  value: number; // 6, 7, 8, or 9
  type: LineType;
}

export interface ReadingResult {
  lines: CastLine[];
  originalHexagram: HexagramData;
  transformedHexagram?: HexagramData; // If there are changing lines
  timestamp: number;
  question: string;
  aiInterpretation?: string;
  notes?: string;
}

export type CoinSide = 2 | 3; // 2 = Tails (Yin), 3 = Heads (Yang)