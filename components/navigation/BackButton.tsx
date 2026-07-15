"use client";

import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { getPreviousInternalUrl } from "./NavigationRestoration";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fallbackHref: string;
  children: ReactNode;
};

export default function BackButton({ fallbackHref, children, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;
        if (getPreviousInternalUrl()) router.back();
        else router.push(fallbackHref);
      }}
    >
      {children}
    </button>
  );
}
