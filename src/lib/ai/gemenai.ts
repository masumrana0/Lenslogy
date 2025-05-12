import { GlobalErrorHandler } from "@/app/(backend)/_core/error-handler/global-error-handler/global-error-handler";
import { GoogleGenerativeAI } from "@google/generative-ai";

type TranslationInput = Record<string, string>;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Replace with the valid model from the list of available models
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash-preview-04-17",
});

export async function translateContent(data: TranslationInput) {
  try {
    const entries = Object.entries(data);
    const formattedInput = entries
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const prompt = `
Translate the following key-value pairs from English to Bengali (Bangla).
- Only translate the values.
- If a value is null, exclude that key-value pair from the output.
- Keep the keys unchanged.
- Return the result as valid JSON. 

${formattedInput}

Example format:
{
  "title": "বাংলা অনুবাদ",
  "excerpt": "এটি একটি সংক্ষিপ্তসার"
}
`.trim();

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No text response from Gemini.");

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Failed to extract JSON from Gemini response.");
    }

    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString) as TranslationInput;
  } catch (error) {
    GlobalErrorHandler(error);
  }
}
