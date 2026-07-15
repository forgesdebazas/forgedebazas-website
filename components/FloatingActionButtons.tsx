"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Mail,
  Check,
  MessageSquare,
  Plus,
  X,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";

const AIChatWindow = dynamic(() => import("./features/AIChatWindow"), {
  ssr: false,
  loading: () => null,
});

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function FloatingActionButtons() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const onInstalled = () => {
      setCanInstall(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isChatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsChatOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        chatRef.current &&
        !chatRef.current.contains(target) &&
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setIsChatOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [isChatOpen]);

  const labels =
    language === "fr"
      ? {
          chat: "Assistant IA",
          closeChat: "Fermer l'assistant",
          whatsapp: "WhatsApp",
          email: "Copier l'e-mail",
          copied: "E-mail copié !",
          install: "Installer l'app",
          openMenu: "Ouvrir le menu de contact",
          closeMenu: "Fermer le menu de contact",
          waMessage:
            "Bonjour, je souhaite obtenir plus d'informations sur vos produits et services.",
        }
      : language === "es"
        ? {
            chat: "Asistente IA",
            closeChat: "Cerrar el asistente",
            whatsapp: "WhatsApp",
            email: "Copiar correo",
            copied: "¡Correo copiado!",
            install: "Instalar la app",
            openMenu: "Abrir el menú de contacto",
            closeMenu: "Cerrar el menú de contacto",
            waMessage:
              "Hola, me gustaría obtener más información sobre sus productos y servicios.",
          }
        : {
            chat: "Chat Assistant",
            closeChat: "Close assistant",
            whatsapp: "WhatsApp",
            email: "Copy email",
            copied: "Email copied!",
            install: "Install app",
            openMenu: "Open contact menu",
            closeMenu: "Close contact menu",
            waMessage:
              "Hello, I would like more information about your products and services.",
          };

  const handleWhatsAppClick = () => {
    const phoneNumber = "212522669850";
    const message = encodeURIComponent(labels.waMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setIsMenuOpen(false);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@forgesdebazas.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openChat = () => {
    setIsChatOpen(true);
    setIsMenuOpen(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setCanInstall(false);
    setIsMenuOpen(false);
  };

  const actions = [
    ...(canInstall
      ? [
          {
            key: "install",
            label: labels.install,
            icon: <Download className="w-5 h-5" />,
            pillClass: "bg-gray-900 text-white",
            iconWrapClass: "bg-white/20",
            onClick: handleInstall,
          },
        ]
      : []),
    {
      key: "chat",
      label: labels.chat,
      icon: <MessageSquare className="w-5 h-5" />,
      pillClass: "bg-white text-[#dc2626] border border-gray-200",
      iconWrapClass: "bg-[#dc2626]/10",
      onClick: openChat,
    },
    {
      key: "whatsapp",
      label: labels.whatsapp,
      icon: <MessageCircle className="w-5 h-5" />,
      pillClass: "bg-[#25D366] text-white",
      iconWrapClass: "bg-white/20",
      onClick: handleWhatsAppClick,
    },
    {
      key: "email",
      label: copied ? labels.copied : labels.email,
      icon: copied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />,
      pillClass: "bg-[#dc2626] text-white",
      iconWrapClass: "bg-white/20",
      onClick: handleCopyEmail,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-auto z-50"
          >
            <AIChatWindow onClose={() => setIsChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-end gap-2.5"
            >
              {actions.map((a, i) => (
                <motion.button
                  key={a.key}
                  type="button"
                  onClick={a.onClick}
                  aria-label={a.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.15, delay: i * 0.03 }}
                  className={`group flex items-center gap-3 pl-4 pr-2 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow ${a.pillClass}`}
                >
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {a.label}
                  </span>
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${a.iconWrapClass}`}
                  >
                    {a.icon}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => {
            if (isChatOpen) {
              setIsChatOpen(false);
              return;
            }
            setIsMenuOpen(!isMenuOpen);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-[#dc2626] hover:bg-[#b91c1c] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-colors flex items-center justify-center"
          aria-label={
            isChatOpen
              ? labels.closeChat
              : isMenuOpen
                ? labels.closeMenu
                : labels.openMenu
          }
          aria-expanded={isMenuOpen || isChatOpen}
        >
          {!isMenuOpen && !isChatOpen && (
            <span className="absolute inset-0 rounded-full bg-[#dc2626]/40 animate-ping" />
          )}
          <AnimatePresence mode="wait">
            {isMenuOpen || isChatOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <Plus className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
