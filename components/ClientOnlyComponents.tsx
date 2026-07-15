"use client";

import dynamic from "next/dynamic";

const FloatingActionButtons = dynamic(() => import("./FloatingActionButtons"), {
  ssr: false,
  loading: () => null,
});
const ScrollToTop = dynamic(() => import("./ScrollToTop"), {
  ssr: false,
  loading: () => null,
});
const CookieBanner = dynamic(() => import("./CookieBanner"), {
  ssr: false,
  loading: () => null,
});

export default function ClientOnlyComponents() {
  return (
    <>
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col-reverse items-end gap-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col-reverse items-end gap-4">
          <ScrollToTop />
          <FloatingActionButtons />
        </div>
      </div>
      <CookieBanner />
    </>
  );
}
