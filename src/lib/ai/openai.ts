import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

type ContentToTranslate = {
  title?: string;
  excerpt?: string;
  content?: string;
};

export async function translateContent({
  title,
  excerpt,
  content,
}: ContentToTranslate) {
  try {
    const promptParts = [];

    if (title) promptParts.push(`Title: ${title}`);
    if (excerpt) promptParts.push(`Excerpt: ${excerpt}`);
    if (content) promptParts.push(`Content: ${content}`);

    const prompt = `
Translate the following English content to Bengali (Bangla). 
Keep the formatting intact and ensure the translation is natural and fluent.

${promptParts.join("\n\n")}

Return the result in the following JSON format:

{
  "bnTitle": "translated title",
  "bnExcerpt": "translated excerpt",
  "bnContent": "translated content"
}
    `.trim();

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
      maxTokens: 4000,
    });

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Failed to extract JSON from AI response.");
    }

    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const result = JSON.parse(jsonString);

    return {
      bnTitle: result.bnTitle || "",
      bnExcerpt: result.bnExcerpt || "",
      bnContent: result.bnContent || "",
    };
  } catch (error) {
    console.error("Error translating content:", error);
    return {
      bnTitle: "",
      bnExcerpt: "",
      bnContent: "",
    };
  }
}
