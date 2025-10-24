import { GoogleGenAI } from "@google/genai";
import { SingleSearchResult, GroundingChunk } from '../types';

export async function fetchKeywordRank(keyword: string, domain: string, device: 'desktop' | 'mobile', country: string, city: string | undefined, apiKey: string): Promise<SingleSearchResult> {
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please add a key in the API key manager.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const locationString = city ? `in the city of **${city}, ${country}**` : `in **${country}**`;
  
  const prompt = `
    Act as a professional SEO analyst.
    Your task is to determine the search engine ranking of a specific website for a given keyword with specific search parameters.
    
    Keyword: "${keyword}"
    Website (Domain): ${domain}
    Device: ${device}
    Country: ${country}
    ${city ? `City: ${city}` : ''}
    
    Using the Google Search tool, find the current ranking position of the website "${domain}" for the exact search query "${keyword}". The search must be performed as if it were from a **${device}** device located ${locationString}.
    
    Provide a concise answer. First, state the rank as a number (e.g., "Rank: 1", "Rank: 15"). Then, provide the specific URL from "${domain}" that is ranking.
    
    If the website is not found within the top 50 search results, clearly state that it is "Not found in top 50 results."
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const rankingText = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingChunk[] = groundingChunks.map((chunk: any) => ({
        web: chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : undefined
    })).filter((chunk: GroundingChunk) => chunk.web);

    return { rankingText, sources };
  } catch (error) {
    console.error(`Error fetching rank for keyword "${keyword}" with the provided key:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to get ranking from Gemini API for "${keyword}": ${error.message}`);
    }
    throw new Error(`An unknown error occurred while fetching rank for "${keyword}".`);
  }
}