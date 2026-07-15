"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const SCROLL_PREFIX = "forges.navigation.scroll.v1:";
const RESTORE_FLAG = "forges.navigation.restore-next";
const PREVIOUS_URL = "forges.navigation.previous-url";
const PREVIOUS_TARGET = "forges.navigation.previous-target";

function currentUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function saveScroll(url = currentUrl()) {
  try {
    sessionStorage.setItem(
      `${SCROLL_PREFIX}${url}`,
      JSON.stringify({ x: window.scrollX, y: window.scrollY })
    );
  } catch {
    // Navigation must keep working when storage is unavailable.
  }
}

export default function NavigationRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeUrl = useRef("");

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    window.history.scrollRestoration = "manual";

    const onScroll = () => saveScroll(activeUrl.current || currentUrl());
    const onPageHide = () => saveScroll(activeUrl.current || currentUrl());
    const onPopState = () => {
      saveScroll(activeUrl.current || currentUrl());
      sessionStorage.setItem(RESTORE_FLAG, "1");
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || event.defaultPrevented) return;
      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin) return;
      // A breadcrumb or "Retour" link often points to the clean parent route.
      // If that parent is the page we actually came from, use history so its
      // query string and saved scroll position are preserved.
      const previous = sessionStorage.getItem(PREVIOUS_URL);
      const previousTarget = sessionStorage.getItem(PREVIOUS_TARGET);
      if (previous && previousTarget === currentUrl()) {
        const previousUrl = new URL(previous, window.location.origin);
        if (target.pathname === previousUrl.pathname) {
          event.preventDefault();
          window.history.back();
          return;
        }
      }
      saveScroll(activeUrl.current || currentUrl());
      sessionStorage.setItem(PREVIOUS_URL, activeUrl.current || currentUrl());
      sessionStorage.setItem(PREVIOUS_TARGET, `${target.pathname}${target.search}${target.hash}`);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useEffect(() => {
    const url = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}${window.location.hash}`;
    activeUrl.current = url;

    let shouldRestore = false;
    try {
      shouldRestore = sessionStorage.getItem(RESTORE_FLAG) === "1";
      sessionStorage.removeItem(RESTORE_FLAG);
    } catch {}
    if (!shouldRestore) return;

    let position: { x: number; y: number } | null = null;
    try {
      const raw = sessionStorage.getItem(`${SCROLL_PREFIX}${url}`);
      if (raw) position = JSON.parse(raw);
    } catch {}
    if (!position) return;

    // Lists and images can grow after hydration. Retry until the requested
    // position is reachable, without creating a visible animated jump.
    let attempts = 0;
    const restore = () => {
      window.scrollTo({ left: position!.x, top: position!.y, behavior: "auto" });
      attempts += 1;
      if (attempts < 12 && Math.abs(window.scrollY - position!.y) > 2) {
        window.setTimeout(restore, attempts < 4 ? 50 : 150);
      }
    };
    requestAnimationFrame(restore);
  }, [pathname, searchParams]);

  return null;
}

export function getPreviousInternalUrl() {
  try {
    return sessionStorage.getItem(PREVIOUS_TARGET) === currentUrl()
      ? sessionStorage.getItem(PREVIOUS_URL)
      : null;
  } catch {
    return null;
  }
}
