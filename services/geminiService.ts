
import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates a poetic and inspiring New Year message for a specific name.
 */
export const generateNewYearMessage = async (name: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a beautiful, inspiring, and unique New Year message for a person named "${name}". 
      It should be poetic, warm, and specifically mention they will reach the "top position" in their endeavors. 
      Limit the response to exactly two sentences. Do not use hashtags or emojis.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
      }
    });

    const text = response.text;
    return text?.trim() || "May the upcoming year bring you immense success and happiness as you climb to new heights.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Wishing you a spectacular year ahead filled with growth and achievement in every single thing you do.";
  }
};
