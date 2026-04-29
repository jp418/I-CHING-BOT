import { GoogleGenAI } from "@google/genai";
import { CastLine, HexagramData } from '../types';
import { getChangingLinesIndices } from '../utils/ichingLogic';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getInterpretation = async (
  question: string,
  lines: CastLine[],
  original: HexagramData,
  transformed?: HexagramData
): Promise<string> => {
  
  const changingLines = getChangingLinesIndices(lines);
  
  let prompt = `You are an I Ching master scholar and sage. The user has asked the following question: "${question}".\n\n`;
  
  prompt += `The cast resulted in Hexagram ${original.number}: ${original.name} (${original.english}).\n`;
  prompt += `Character: ${original.character}\n`;
  prompt += `Primary Judgment: ${original.judgment}\n`;
  prompt += `Primary Image: ${original.imagery}\n\n`;
  
  if (changingLines.length > 0) {
    prompt += `There are changing lines at positions: ${changingLines.join(', ')}.\n`;
    if (transformed) {
        prompt += `The hexagram transforms into Hexagram ${transformed.number}: ${transformed.name} (${transformed.english}).\n`;
        prompt += `Relating Hexagram Judgment: ${transformed.judgment}\n`;
    }
  } else {
    prompt += `There are no changing lines.\n`;
  }
  
  prompt += `\nProvide the most comprehensive interpretation possible, adhering strictly to the traditional and classical language of the I Ching (Wilhelm/Baynes style). Do not summarize; provide the full richness of the oracle. Use archaic, formal, and poetic English.\n\n`;
  
  prompt += `Structure the response in markdown with these sections:\n`;
  prompt += `1. **The Primary Hexagram: ${original.english} (${original.name})**\n`;
  prompt += `   - **The Judgment**: Exact traditional text and deep classical analysis.\n`;
  prompt += `   - **The Image**: Exact traditional text and the superior man's lesson.\n`;
  
  if (changingLines.length > 0) {
    prompt += `2. **The Changing Lines**:\n`;
    prompt += `   For EVERY changing line, provide:\n`;
    prompt += `   - The exact Line position (e.g., "Nine at the beginning", "Six in the second place").\n`;
    prompt += `   - The exact traditional text of that line.\n`;
    prompt += `   - The specific oracle associated with it.\n`;
    prompt += `   - A profound explanation of its significance for the user.\n`;
    prompt += `3. **The Target Hexagram: ${transformed?.english} (${transformed?.name})**\n`;
    prompt += `   - Explain the transformation process.\n`;
    prompt += `   - **The Judgment**: Exact traditional text of the resulting hexagram.\n`;
    prompt += `   - **The Image**: Exact traditional text of the resulting image.\n`;
    prompt += `   - The ultimate outcome of following the lines' advice.\n`;
  } else {
    prompt += `2. **The Static Oracle**: A detailed analysis of why no lines are changing, implying a state of pure archetype. Provide the full traditional context for an unchanging hexagram.\n`;
  }
  
  prompt += `4. **Sage's Final Admonition**: A formal, sacred closing statement.\n\n`;
  prompt += `Tone: Sacred, mysterious, and absolute.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "The oracle is silent at this moment. Please reflect on your question and try again.";
  } catch (error: any) {
    console.error("Error fetching interpretation:", error);

    // Extract error details safely to check for 429/Quota issues
    const errorMessage = error?.message || '';
    const errorStatus = error?.status;
    const errorBody = error?.error ? JSON.stringify(error.error) : '';
    const fullErrorString = `${errorMessage} ${errorBody} ${errorStatus}`;

    // Check for Quota Exceeded (429) or Resource Exhausted
    if (fullErrorString.includes('429') || 
        fullErrorString.toLowerCase().includes('quota') || 
        fullErrorString.includes('RESOURCE_EXHAUSTED')) {
        
        return `## The Oracle is Resting (Limit Reached)
        
The cosmic energy (API quota) for this session has been exhausted. The spirits are taking a break.

**Traditional Reading for Hexagram ${original.number} (${original.english}):**

*   **Name**: ${original.name} (${original.character})
*   **Attributes**: ${original.description}

${transformed ? `
**Transforms into Hexagram ${transformed.number} (${transformed.english}):**
*   **Attributes**: ${transformed.description}
` : ''}

**Guidance**: Meditate on the attributes above. The specific AI interpretation will be available again when the quota resets.`;
    }

    return "The connection to the ethereal realm is disrupted. Please check your network and try again.";
  }
};