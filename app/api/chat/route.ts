import { NextRequest, NextResponse } from "next/server";
import {
  retrieveSiteContext,
  buildSiteAwareSystemPrompt,
  buildContextualLinks,
  generateKnowledgeFallback,
} from "@/lib/chat/siteKnowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const findLatestUserMessage = (messages: ChatMessage[]): string =>
  [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

const sanitizeModelOutput = (text: string): string => {
  return text
    // Remove markdown links [Label](url) and replace with just Label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove raw http(s) URLs if model outputs any (since links are rendered below)
    .replace(/https?:\/\/[^\s)]+/g, "")
    // Clean up excessive whitespace
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const typedMessages = Array.isArray(messages)
      ? (messages as ChatMessage[])
      : [];

    const lastUserMessage = findLatestUserMessage(typedMessages);
    const origin = req.headers.get("origin");

    // 1. Retrieve site context dynamically from website dataset
    const siteContext = retrieveSiteContext(lastUserMessage);

    // 2. Build system prompt grounded in full site knowledge
    const systemPrompt = buildSiteAwareSystemPrompt(siteContext);

    // 3. Build dynamic contextual link suggestions for the user
    const linkSuggestions = buildContextualLinks(
      lastUserMessage,
      siteContext,
      origin
    );

    // 4. API Key setup
    const apiKey =
      process.env.GROQ_API_KEY ||
      process.env.NEXT_PUBLIC_GROQ_API_KEY ||
      "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";

    // Verified working Groq models in order of capability
    const candidateModels = [
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "qwen/qwen3.8-27b",
    ];

    let aiReply: string | null = null;

    if (apiKey) {
      // Keep last 8 messages for conversation history
      const recentConversation = typedMessages.slice(-8);

      for (const modelName of candidateModels) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);

          const res = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey.trim()}`,
              },
              body: JSON.stringify({
                model: modelName,
                messages: [
                  {
                    role: "system",
                    content: systemPrompt,
                  },
                  ...recentConversation,
                ],
                temperature: 0.3,
                stream: false,
                max_tokens: 350,
              }),
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const text = data.choices?.[0]?.message?.content?.trim();
            if (text) {
              aiReply = sanitizeModelOutput(text);
              break;
            }
          } else {
            const errText = await res.text();
            console.warn(
              `[CHATBOT_GROQ] Modèle ${modelName} indisponible (${res.status}):`,
              errText
            );
          }
        } catch (callErr) {
          console.warn(
            `[CHATBOT_GROQ] Erreur réseau avec le modèle ${modelName}:`,
            callErr
          );
        }
      }
    }

    // 5. If Groq responded, return the generated response with site links
    if (aiReply) {
      return NextResponse.json({
        reply: aiReply,
        links: linkSuggestions,
      });
    }

    // 6. Seamless site-grounded fallback if external AI is temporarily offline
    const fallbackReply = generateKnowledgeFallback(
      lastUserMessage,
      siteContext
    );
    return NextResponse.json({
      reply: fallbackReply,
      links: linkSuggestions,
    });
  } catch (error: unknown) {
    console.error("API Route Error:", error);
    return NextResponse.json({
      reply:
        "Forges de Bazas est à votre entière disposition pour vous accompagner dans le choix de vos équipements industriels, BTP, levage et manutention. Vous pouvez nous contacter directement par téléphone ou via notre formulaire de devis en ligne.",
      links: [
        {
          label: "Demander un devis en ligne",
          href: "https://www.forgesdebazas.com/devis",
          description: "Recevez une proposition personnalisée sous 24h.",
        },
        {
          label: "Nos agences & contact",
          href: "https://www.forgesdebazas.com/contact",
          description: "Casablanca, Agadir et Tanger.",
        },
      ],
    });
  }
}
