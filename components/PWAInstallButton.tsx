"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAInstallButtonProps {
  variant?: "header" | "mobile";
}

export default function PWAInstallButton({
  variant = "header",
}: PWAInstallButtonProps) {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const onInstalled = () => {
      setShowButton(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  const longLabel =
    language === "fr"
      ? "Installer l’app"
      : language === "es"
        ? "Instalar la app"
        : "Install app";
  const fullLabel =
    language === "fr"
      ? "Installer l’application"
      : language === "es"
        ? "Instalar la aplicación"
        : "Install the application";

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={handleInstall}
        className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-6 py-3 font-medium text-sm hover:bg-black transition-colors"
      >
        <Download className="w-4 h-4" />
        {fullLabel}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      title={fullLabel}
      className="hidden md:inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 hover:border-[#dc2626] hover:text-[#dc2626] px-3 py-2 font-medium text-xs md:text-sm transition-colors duration-200"
      aria-label={fullLabel}
    >
      <Download className="w-4 h-4" />
      <span className="hidden xl:inline">{longLabel}</span>
    </button>
  );
}
