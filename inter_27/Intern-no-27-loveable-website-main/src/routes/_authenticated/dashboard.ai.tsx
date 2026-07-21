import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Bot, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/dashboard/ai")({
  component: AIPage,
});

const suggestions = [
  "Write a description for my new linen tote",
  "Forecast inventory needs for next month",
  "Draft a Black Friday marketing email",
  "Suggest a bundle for slow-moving products",
];

type Msg = { role: "assistant" | "user"; content: string };
const initialMessages: Msg[] = [
  { role: "assistant", content: "Hi Amelia — I'm your Vendly AI assistant. I've reviewed this week's sales. Want me to draft a restock plan or optimize a listing?" },
];

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      { role: "assistant", content: "Working on it — I'll draft that for you now. (Demo mode: connect Lovable AI to make this live.)" },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-gradient-brand grid place-items-center text-primary-foreground shadow-glow">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendly AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Your commerce co-founder — writing, forecasting, replying.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface shadow-card">
        <div className="p-5 space-y-4 min-h-[380px] max-h-[520px] overflow-y-auto">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={"flex gap-3 " + (m.role === "user" ? "flex-row-reverse" : "")}
            >
              <div className={"h-8 w-8 rounded-full grid place-items-center shrink-0 " + (m.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary")}>
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={"max-w-[75%] rounded-2xl px-4 py-2.5 text-sm " + (m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs rounded-full border border-border bg-muted hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-colors px-3 py-1.5">
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your store…" className="flex-1 h-11 rounded-full bg-muted border-transparent" />
            <Button type="submit" size="icon" className="h-11 w-11 rounded-full bg-gradient-brand text-primary-foreground">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
