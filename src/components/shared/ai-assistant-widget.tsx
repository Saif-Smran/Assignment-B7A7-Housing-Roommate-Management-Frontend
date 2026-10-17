"use client";

import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hello! Looking for a room or roommate in Dhaka? Ask me anything about UrbanMatch.",
};

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`bold-${part}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`italic-${part}`}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function AssistantMessage({ content }: { content: string }) {
  const normalizedContent = content.replace(/(\s)(\d+\.\s+\*\*)/g, "\n\n$2");
  const blocks = normalizedContent.split(/\n{2,}/);

  return (
    <div className="space-y-2 leading-relaxed">
      {blocks.map((block) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (lines.length === 0) return null;

        return (
          <div key={block}>
            {lines.map((line) => {
              const heading = line.match(/^#{1,3}\s+(.+)$/);
              const bullet = line.match(/^[-*]\s+(.+)$/);
              const numbered = line.match(/^\d+\.\s+(.+)$/);

              if (heading) {
                return (
                  <p
                    key={`heading-${line}`}
                    className="font-semibold text-foreground"
                  >
                    {renderInlineMarkdown(heading[1])}
                  </p>
                );
              }

              if (bullet || numbered) {
                return (
                  <div key={`list-${line}`} className="flex gap-2 pl-1">
                    <span className="text-indigo-600">
                      {numbered ? line.match(/^\d+/)?.[0] : "•"}
                    </span>
                    <span>
                      {renderInlineMarkdown((bullet ?? numbered)?.[1] ?? line)}
                    </span>
                  </div>
                );
              }

              return (
                <p key={`paragraph-${line}`}>{renderInlineMarkdown(line)}</p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const send = async () => {
    const content = input.trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "The assistant could not respond.");
      }

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Assistant request failed:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't respond right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {open && (
        <div className="mb-3 flex h-[min(32rem,calc(100vh-7rem))] w-[min(90vw,360px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-indigo-600 px-4 py-3 text-white">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" /> UrbanMatch Assistant
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded p-1 hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className="flex-1 space-y-2 overflow-y-auto p-3 text-sm"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-8 rounded-xl bg-indigo-500/10 p-2 text-right"
                    : "mr-8 rounded-xl bg-muted p-2"
                }
              >
                {message.role === "assistant" ? (
                  <AssistantMessage content={message.content} />
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            ))}
            {loading && (
              <p className="mr-8 rounded-xl bg-muted p-2 text-muted-foreground italic">
                Thinking...
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
            className="flex gap-2 border-t border-border p-3"
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about rooms..."
              aria-label="Ask UrbanMatch Assistant"
              disabled={loading}
              maxLength={4000}
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              aria-label="Send question"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
        aria-label={open ? "Close housing assistant" : "Open housing assistant"}
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
