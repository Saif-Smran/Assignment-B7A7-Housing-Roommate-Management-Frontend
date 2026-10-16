"use client";

import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const answers = [
  {
    test: /budget|rent|price/i,
    text: "Use the price filters to set a minimum or maximum monthly rent, then sort by price.",
  },
  {
    test: /apply|application/i,
    text: "Open a listing, choose an available room, and submit the application from the booking panel.",
  },
  {
    test: /view|tour/i,
    text: "You can request a viewing from the room details page before applying.",
  },
];

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text: "Hi! I can help you find a room or understand the booking process.",
    },
  ]);

  const send = () => {
    const question = input.trim();
    if (!question) return;
    const answer =
      answers.find((item) => item.test.test(question))?.text ??
      "Try asking about rent, applications, or viewings. I can guide you through those UrbanMatch tasks.";
    setMessages((current) => [
      ...current,
      { from: "user", text: question },
      { from: "assistant", text: answer },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(90vw,360px)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-indigo-600 px-4 py-3 text-white">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" /> Housing Assistant
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto p-3 text-xs">
            {messages.map((message, index) => (
              <p
                key={`${message.from}-${index}`}
                className={
                  message.from === "user"
                    ? "ml-8 rounded-xl bg-indigo-500/10 p-2"
                    : "mr-8 rounded-xl bg-muted p-2"
                }
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="flex gap-2 border-t border-border p-3">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") send();
              }}
              placeholder="Ask about rooms..."
              aria-label="Ask housing assistant"
            />
            <Button
              type="button"
              size="icon"
              onClick={send}
              aria-label="Send question"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <Button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
        aria-label="Open housing assistant"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
