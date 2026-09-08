"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";
interface Message { id: number; role: Role; text: string; }

const suggestedQuestions = [
  "Does my CV match this job?",
  "Is this employer registered in the UK?",
  "What will my salary be after tax?",
  "Can I afford to live in London on £65k?",
  "Which of my applications needs follow-up?",
  "Compare my two offers",
];

const mockReplies: Record<string, string> = {
  default: "I can help with that. Could you share a bit more detail — for example, the job description, company name, or salary figure you have in mind?",
  "Does my CV match this job?": "To check your CV against a job, I'll need the job description. You can paste it here or head to the **CV Scanner** where I can run a full ATS analysis.\n\nWould you like to paste the job description now?",
  "What will my salary be after tax?": "Sure — what salary are you working with, and which country are you in? I'll calculate your estimated take-home pay and show you the full breakdown.",
  "Can I afford to live in London on £65k?": "Based on a single person in London: your estimated take-home would be ~£3,870/mo. Central living costs in London average ~£2,585/mo, leaving ~£1,285 disposable. That's about a 19% savings rate — which is workable but tight. Do you want me to break down the costs in detail?",
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text };
    const reply = mockReplies[text] ?? mockReplies.default;
    const assistantMsg: Message = { id: nextId.current++, role: "assistant", text: reply };
    setMessages((m) => [...m, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border px-8 py-5">
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <Icon icon="material-symbols:auto-awesome" className="size-5 text-primary" aria-hidden />
          </span>
          <div>
            <h1 className="text-base font-semibold">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Ask career questions across all tools. Actions require your confirmation.</p>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-3xl space-y-6">

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Icon icon="material-symbols:auto-awesome" className="size-8 text-primary" aria-hidden />
                </span>
                <p className="text-lg font-semibold">What would you like to know?</p>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
                  I can help with CVs, employers, salaries, city costs, applications, and more.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-left hover:bg-accent hover:border-primary/30 transition-colors"
                  >
                    <Icon icon="material-symbols:chat-bubble-outline" className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <span className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {msg.role === "user" ? "You" : <Icon icon="material-symbols:auto-awesome" className="size-4" />}
              </span>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-card border border-border rounded-tl-sm text-foreground"
              )}>
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Mock confirmation card */}
          {messages.some(m => m.text.includes("follow-up")) && (
            <div className="rounded-xl border border-primary/30 bg-accent p-4 space-y-3">
              <p className="text-sm font-semibold">Move &ldquo;UX Researcher at HealthStart&rdquo; from Applied → Interview?</p>
              <div className="flex gap-2">
                <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Confirm</button>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">Cancel</button>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">Edit details</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-border px-8 py-4">
        <div className="mx-auto max-w-3xl flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            rows={1}
            placeholder="Ask about your CV, salary, employers, applications…"
            className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[48px] max-h-40 overflow-y-auto"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Icon icon="material-symbols:send-outline" className="size-5" aria-hidden />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground mx-auto max-w-3xl">
          AI responses are not professional advice. Always verify important decisions independently.
        </p>
      </div>
    </div>
  );
}
