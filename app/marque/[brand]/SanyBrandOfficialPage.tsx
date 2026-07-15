"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandHeroSection from "./BrandHeroSection";
import SanyCategoryGrid, { type CategoryCardData } from "./SanyCategoryGrid";
import { Suspense } from "react";

interface Props {
  brand: Brand;
  categoryCards: CategoryCardData[];
  totalProducts: number;
}

export default function SanyBrandOfficialPage({ brand, categoryCards, totalProducts }: Props) {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        .sany-page * { box-sizing: border-box; }

        /* ── Footer CTA ── */
        .sany-footer-cta {
          background: #0a0a0a;
          padding: 3rem 2rem;
          text-align: center;
          font-family: var(--font-geist-sans), sans-serif;
        }

        .sany-footer-cta__link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.3s;
          padding: 10px 0;
        }

        .sany-footer-cta__link:hover { color: white; }

        .sany-footer-cta__link svg {
          transition: transform 0.3s;
        }

        .sany-footer-cta__link:hover svg {
          transform: translateX(-4px);
        }
      `}</style>

      <main className="sany-page">
        {/* ── Hero ── */}
        <BrandHeroSection
          brand={brand}
          productCount={totalProducts}
          categoryCount={categoryCards.length}
        />

        {/* ── Searchable categories grid ── */}
        <Suspense fallback={null}>
          <SanyCategoryGrid
            categories={categoryCards}
            brandSlug={brand.name.toLowerCase()}
            totalProducts={totalProducts}
          />
        </Suspense>

        {/* ── Footer CTA ── */}
        <footer className="sany-footer-cta">
          <Link href="/produits" className="sany-footer-cta__link">
            <ArrowLeft size={16} />
            {t.sany.backToProducts}
          </Link>
        </footer>
      </main>
    </>
  );
}
