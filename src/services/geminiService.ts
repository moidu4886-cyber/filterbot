import { GoogleGenAI, Type } from "@google/genai";
import { FilterState, Movie } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const movieDiscoverySchema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          year: { type: Type.NUMBER },
          rating: { type: Type.NUMBER },
          criticScores: {
            type: Type.OBJECT,
            properties: {
              rottenTomatoes: { type: Type.NUMBER },
              imdb: { type: Type.NUMBER }
            }
          },
          genres: { type: Type.ARRAY, items: { type: Type.STRING } },
          director: { type: Type.STRING },
          actors: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
          poster: { type: Type.STRING, description: "Use a placeholder URL if unknown" },
          mood: { type: Type.ARRAY, items: { type: Type.STRING } },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["id", "title", "year", "rating", "genres", "description", "director", "actors", "criticScores"]
      }
    },
    message: { type: Type.STRING, description: "A friendly response explaining the recommendations" },
    filterUpdates: {
      type: Type.OBJECT,
      properties: {
        genres: { type: Type.ARRAY, items: { type: Type.STRING } },
        minRating: { type: Type.NUMBER },
        minRottenTomatoes: { type: Type.NUMBER },
        minImdb: { type: Type.NUMBER },
        startYear: { type: Type.NUMBER },
        endYear: { type: Type.NUMBER },
        moods: { type: Type.ARRAY, items: { type: Type.STRING } },
        director: { type: Type.STRING },
        actors: { type: Type.ARRAY, items: { type: Type.STRING } },
        keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    }
  },
  required: ["recommendations", "message"]
};

export async function processMovieQuery(
  query: string, 
  currentFilters: FilterState
): Promise<{ 
  recommendations: Movie[], 
  message: string, 
  filterUpdates?: Partial<FilterState> 
}> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for movies with this query: "${query}". 
      Current active filters are: ${JSON.stringify(currentFilters)}.
      Based on their intent, suggest 4-6 real movies. 
      Also update the filters if the user specified something specific (e.g. "movies directed by Nolan" -> director: "Christopher Nolan").
      Advanced criteria include: Actors, Directors, Year Ranges (e.g. "early 2000s"), Scores (e.g. "highly rated on IMDb"), Moods (e.g. "dark thriller"), and Keywords (e.g. "cyberpunk").`,
      config: {
        systemInstruction: "You are the CineMatch AI Autofilter Bot. Your goal is to help users find movies. You return structured JSON with movie recommendations, a friendly message, and any logical filter updates based on the user's natural language. You support deep filtering: actors, directors, score thresholds, and keywords.",
        responseMimeType: "application/json",
        responseSchema: movieDiscoverySchema
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("AI Error:", error);
    return {
      recommendations: [],
      message: "I'm having trouble connecting to my creative brain right now. Please try again!",
      filterUpdates: {}
    };
  }
}
