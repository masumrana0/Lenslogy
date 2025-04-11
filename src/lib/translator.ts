export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const response = await fetch("http://localhost:8000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      to: targetLang,
    }),
  });

  const data = await response.json();
  return data.translatedText;
}
