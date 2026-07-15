"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaAction = {
  label: string;
  href: string;
};

interface CtaSectionProps {
  title: string;
  description?: string;
  badge?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  className?: string;
  children?: ReactNode;
}

const baseButtonClasses =
  "px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-bold uppercase w-full sm:w-auto shadow-xl transition-all";

const primaryButtonClasses =
  "bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-red-500/25 hover:shadow-red-500/40";

const secondaryButtonClasses =
  "bg-white/10 text-white border border-white/30 hover:bg-white hover:text-gray-900";

export default function CtaSection({
  title,
  description,
  badge,
  primaryAction,
  secondaryAction,
  className,
  children,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-20 md:py-24",
        className
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute -top-24 right-0 h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 bg-[#dc2626]/30 blur-3xl"></div>
        <div className="absolute -bottom-24 left-0 h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 bg-white/20 blur-3xl"></div>
      </div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl text-center relative z-10">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-5">
            <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white">
              {badge}
            </span>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight text-balance">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
              children ? "mb-6" : "mb-9"
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mb-8">{children}</div>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryAction.href} className="w-full sm:w-auto">
            <Button className={cn(baseButtonClasses, primaryButtonClasses)}>
              {primaryAction.label}
            </Button>
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href} className="w-full sm:w-auto">
              <Button className={cn(baseButtonClasses, secondaryButtonClasses)}>
                {secondaryAction.label}
              </Button>
            </Link>
          )}
        </div>
      </ScrollAnimation>
    </section>
  );
}
