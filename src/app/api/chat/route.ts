import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const systemInstruction =
  "You are UrbanMatch AI, a helpful assistant for a housing and roommate management platform in Bangladesh. Help users find listings, understand platform features, and answer questions concisely.";
const maxPromptLength = 4000;
const defaultModel = "gemini-3.8-flash";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Chat error: GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Chat service is not configured." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as {
      messages?: Array<{ role?: string; content?: unknown }>;
    };
    const messages = body.messages;
    const latestMessage = messages?.at(-1);

    if (
      !Array.isArray(messages) ||
      !latestMessage ||
      latestMessage.role !== "user" ||
      typeof latestMessage.content !== "string" ||
      latestMessage.content.trim().length === 0 ||
      latestMessage.content.length > maxPromptLength
    ) {
      return NextResponse.json(
        { error: "Please provide a valid message." },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL?.trim() || defaultModel,
      contents: latestMessage.content.trim(),
      config: { systemInstruction },
    });

    const reply = response.text?.trim();
    if (!reply) {
      throw new Error("Gemini returned an empty response.");
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 },
    );
  }
}
