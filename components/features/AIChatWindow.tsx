"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, Loader2, User, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LinkSuggestion {
  label: string;
  href: string;
  description?: string;
}

interface Message {
  role: "user" | "bot";
  content: string;
  links?: LinkSuggestion[];
}

interface AIChatWindowProps {
  onClose: () => void;
}

export default function AIChatWindow({ onClose }: AIChatWindowProps) {
  const INITIAL_LINKS: LinkSuggestion[] = [
    {
      label: "Catalogue produits",
      href: "/produits",
      description: "TOYOTA, SANY, FABO, TEKSAN, SINOBOOM…",
    },
    {
      label: "Nos 8 solutions sectorielles",
      href: "/solutions",
      description: "Manutention, levage, BTP, mines, énergie…",
    },
    {
      label: "Demander un devis",
      href: "/devis",
      description: "Offre personnalisée sous 24h.",
    },
  ];
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Bonjour ! Je suis l'assistant expert de Forges de Bazas. Je connais toute notre gamme : chariots élévateurs TOYOTA, engins SANY, groupes électrogènes TEKSAN, concasseurs FABO, nacelles SINOBOOM et bien plus. Comment puis-je vous aider ?",
      links: INITIAL_LINKS,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

function FormattedMessage({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) {
  if (isUser) {
    return <div className="whitespace-pre-line">{content}</div>;
  }

  const paragraphs = content.split(/\n\n+/);

  const formatInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-gray-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-2">
      {paragraphs.map((p, pIdx) => {
        const lines = p.split(/\n/);
        const isList =
          lines.length > 1 && lines.every((l) => /^\s*[-*•]\s+/.test(l));
        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1 my-1 pl-1">
              {lines.map((l, lIdx) => (
                <li key={lIdx} className="flex items-start gap-1.5 text-xs sm:text-sm">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{formatInline(l.replace(/^\s*[-*•]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pIdx} className="leading-relaxed">
            {lines.map((l, lIdx) => (
              <span key={lIdx}>
                {formatInline(l)}
                {lIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

const SUGGESTED_QUESTIONS = [
  { id: "toyota", text: "Chariots TOYOTA" },
  { id: "sany-exc", text: "Excavatrices SANY" },
  { id: "grues", text: "Grues & Levage" },
  { id: "genset", text: "Groupes TEKSAN" },
  { id: "nacelle", text: "Nacelles SINOBOOM" },
  { id: "mines", text: "Foreuses SUNWARD" },
  { id: "concasseur", text: "Concasseurs FABO" },
  { id: "location", text: "Location PROXAM" },
  { id: "sav", text: "SAV & Maintenance" },
  { id: "agences", text: "Agences & Contact" },
];


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    // Trigger send in the next tick
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 0);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setShowSuggestions(false);
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const contextMessages = messages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      }));

      contextMessages.push({ role: "user", content: userMessage });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: contextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de la récupération de la réponse");
      }

      const replyLinks = Array.isArray(data.links) ? data.links : undefined;
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply, links: replyLinks },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Désolé, j'ai du mal à me connecter pour le moment. Veuillez réessayer plus tard.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="w-full sm:w-[420px] h-[calc(100dvh-120px)] sm:h-[650px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-none bg-white flex flex-col overflow-hidden relative rounded-3xl"
      role="dialog"
      aria-label="Chat with AI Support"
    >
      {/* Header - Logo on the left without background */}
      <CardHeader className="p-6 border-b border-gray-50 bg-white flex flex-row items-center justify-start shrink-0 relative">
        <div className="relative w-40 h-20 flex items-center justify-start">
          <Image
            src="/images/Logo_black.png"
            alt="Forges Logo"
            width={240}
            height={120}
            className="object-contain object-left"
            quality={70}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-10 w-10 rounded-2xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X className="w-6 h-6" />
        </Button>
      </CardHeader>

      {/* Messages Area */}
      <CardContent
        className="flex-1 p-4 overflow-y-auto space-y-6 bg-gray-50/30 chat-scroll scroll-smooth custom-scrollbar"
        aria-live="polite"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 10,
              x: msg.role === "user" ? 10 : -10,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "flex w-full gap-3",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm",
                msg.role === "bot"
                  ? "bg-secondary text-primary"
                  : "bg-primary/10 text-primary"
              )}
            >
              {msg.role === "bot" ? (
                <Bot className="w-5 h-5" aria-hidden="true" />
              ) : (
                <User className="w-5 h-5" aria-hidden="true" />
              )}
            </div>
            <div className="flex max-w-[85%] flex-col gap-2">
              <div
                className={cn(
                  "rounded-2xl px-5 py-3 text-sm relative group transition-all duration-200 shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                )}
              >
                <FormattedMessage
                  content={msg.content}
                  isUser={msg.role === "user"}
                />
              </div>

              {msg.role === "bot" && msg.links && msg.links.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Liens utiles
                  </p>
                  <div className="mt-2 flex flex-col gap-2">
                    {msg.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-xl border border-gray-100 bg-white px-3 py-2 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
                        aria-label={link.label}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-primary">
                            {link.label}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                        </div>
                        {link.description && (
                          <span className="mt-1 block text-xs text-gray-500">
                            {link.description}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full gap-3 justify-start"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div
              className="bg-white rounded-2xl rounded-tl-none px-5 py-3 border border-gray-100 flex items-center gap-1.5 shadow-sm"
              aria-label="AI is typing"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                className="w-2 h-2 bg-primary rounded-full"
              ></motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                className="w-2 h-2 bg-primary rounded-full"
              ></motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                className="w-2 h-2 bg-primary rounded-full"
              ></motion.span>
            </div>
          </motion.div>
        )}
        <div ref={scrollRef} />
      </CardContent>

      {/* Suggested Questions */}
      <AnimatePresence>
        {showSuggestions && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-5 pb-4 flex flex-wrap gap-2 shrink-0"
          >
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSuggestionClick(q.text)}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-primary hover:text-white transition-all border border-gray-200 shadow-sm active:scale-95"
                aria-label={`Suggestion: ${q.text}`}
              >
                {q.text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <CardFooter className="p-5 border-t border-gray-100 bg-white shrink-0">
        <form
          id="chat-form"
          onSubmit={handleSend}
          className="flex w-full gap-3 items-center"
        >
          <Input
            ref={inputRef}
            placeholder="Posez votre question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-12 bg-gray-50 border-gray-100 focus-visible:ring-primary/20 rounded-2xl transition-all duration-200 px-5 text-sm"
            disabled={isLoading}
            aria-label="Message input"
          />
          <Button
            type="submit"
            size="icon"
            className={cn(
              "h-12 w-12 shrink-0 rounded-2xl transition-all duration-300 shadow-md",
              input.trim()
                ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            )}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
