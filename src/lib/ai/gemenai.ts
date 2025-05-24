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
Translate the values of the following key-value pairs from English to Bengali (Bangla), following these rules:

1. Only translate the **values**; keep the **keys unchanged**.
2. **Exclude** any key-value pair where the value is **null**.
3. If a value contains **HTML**, preserve the exact HTML structure and translate **only the text content inside the tags**.
4. If a value contains **code**, leave it **unchanged**.
5. Return the result as **valid JSON**.

Input:
${formattedInput}

Example output format:
{
  "title": "বাংলা অনুবাদ",
  "excerpt": "এটি একটি সংক্ষিপ্তসার"
  "content": "<p>এটি একটি <strong>HTML</strong> উদাহরণ।</p>",
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
