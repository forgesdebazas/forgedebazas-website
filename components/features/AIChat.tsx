"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AIChatWindow = dynamic(() => import("./AIChatWindow"), {
  loading: () => (
    <div className="w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-120px)] sm:h-[600px] bg-white rounded-xl shadow-2xl flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  ),
  ssr: false,
});

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 left-4 sm:absolute sm:bottom-0 sm:right-full sm:left-auto sm:mr-4 sm:mb-0 sm:w-auto z-50"
          >
            <AIChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat with AI support"}
          className={cn(
            "rounded-full h-14 w-14 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-500 z-50 relative overflow-hidden group border-2",
            isOpen
              ? "bg-white text-primary border-primary/10"
              : "bg-white text-primary border-white"
          )}
        >
          <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center justify-center"
              >
                <MessageSquare className="w-8 h-8 fill-primary/10" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}
