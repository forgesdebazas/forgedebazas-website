import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import HeaderInfo from "../components/HeaderInfo";
import Footer from "../components/Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import ClientOnlyComponents from "../components/ClientOnlyComponents";
import NextTopLoader from "nextjs-toploader";
import JsonLd from "@/components/JsonLd";
import { Suspense } from "react";
import NavigationRestoration from "@/components/navigation/NavigationRestoration";
import {
  getBaseMetadata,
  getOrganizationJsonLd,
  getWebsiteJsonLd,
} from "@/lib/seo";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

export const metadata = getBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <JsonLd data={getOrganizationJsonLd()} id="organization-jsonld" />
        <JsonLd data={getWebsiteJsonLd()} id="website-jsonld" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        <NextTopLoader
          color="#dc2626"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #dc2626,0 0 5px #dc2626"
        />
        <LanguageProvider>
          <Suspense fallback={null}>
            <NavigationRestoration />
          </Suspense>
          <HeaderInfo />
          <main id="main-content">{children}</main>
          <Footer />
          <ClientOnlyComponents />
        </LanguageProvider>
      </body>
    </html>
  );
}
