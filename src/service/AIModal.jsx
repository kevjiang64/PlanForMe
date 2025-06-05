// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

export async function chatSession(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: "application/json",
  };
  const model = "gemini-1.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  // const response = await ai.models.generateContentStream({
  //   model,
  //   config,
  //   contents,
  // });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config,
    contents,
  });

  return response.text;
}
