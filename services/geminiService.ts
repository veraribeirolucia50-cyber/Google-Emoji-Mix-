import { GoogleGenAI } from "@google/genai";

// Ensure API key is available
if (!process.env.API_KEY) {
  console.error("API_KEY environment variable is missing.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an emoji mashup based on the input text using Gemini.
 * Uses the gemini-2.5-flash-image model.
 */
export const generateEmojiMix = async (prompt: string): Promise<string | null> => {
  try {
    const fullPrompt = `Create a single, high-quality vector art style emoji based on the concept: "${prompt}". 
    The style must be identical to standard flat emojis: bold outlines, vibrant colors, isolated on a white background. 
    Do not add realistic shading. Make it cute and expressive. Just one single object/character.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            return `data:${mimeType};base64,${base64Data}`;
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating emoji:", error);
    throw error;
  }
};
