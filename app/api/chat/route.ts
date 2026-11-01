import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 60;

// Sovereign Nexorian / Jarvis local inference (OpenAI-compatible)
const nexorian = createOpenAI({
  baseURL: process.env.NEXORIAN_INFERENCE_URL || "http://localhost:11434/v1",
  apiKey: process.env.NEXORIAN_API_KEY || "nexorian-local",
});

export async function POST(req: Request) {
  const { messages, system } = await req.json();

  const result = streamText({
    model: nexorian(process.env.NEXORIAN_MODEL || "jarvis"),
    system: system || "You are a high-integrity AI content creator from Nexorian. Prioritize accuracy, value, efficiency, and sovereignty. No external dependencies.",
    messages,
  });

  return result.toDataStreamResponse();
}