
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (query: string): Promise<{ id: string, reason: string }[]> => {
  const productContext = PRODUCTS.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User is asking: "${query}". Based on the following shop products: ${JSON.stringify(productContext)}, recommend up to 3 relevant products.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            reason: { type: Type.STRING, description: "A short, elegant reason why this fits the user's query." }
          },
          required: ["id", "reason"]
        }
      },
      systemInstruction: "You are a luxury hotel concierge. Be helpful, concise, and elegant in your recommendations. Focus on matching user needs like hunger, thirst, comfort, or gifts."
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};
