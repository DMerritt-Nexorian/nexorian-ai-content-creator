import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, system, model = "openai" } = await req.json();

  const selected = model === "anthropic" 
    ? anthropic("claude-sonnet-4-5") 
    : openai("gpt-4o");

  const result = streamText({
    model: selected,
    system: system || "You are a high-integrity AI content creator from Nexorian. Prioritize accuracy, value, and efficiency.",
    messages,
  });

  return result.toDataStreamResponse();
}