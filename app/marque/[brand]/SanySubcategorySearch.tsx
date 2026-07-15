"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface SubcategoryCardData {
  subCategorySlug: string;
  subCategoryName: string;
  totalProducts: number;
  previewImage: string | null;
  isRemoteImage: boolean;
  previewSpecs: { name: string; valueWithUnit: string }[];
}

interface Props {
  subcategories: SubcategoryCardData[];
  brandSlug: string;
  categorySlug: string;
}

export default function SanySubcategorySearch({ subcategories, brandSlug, categorySlug }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const { t } = useLanguage();
  const s = t.sany;

  const filtered = useMemo(
    () =>
      query.trim()
        ? subcategories.filter((sub) =>
            sub.subCategoryName.toLowerCase().includes(query.toLowerCase())
          )
        : subcategories,
    [subcategories, query]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query);
    else params.delete("q");
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [pathname, query, router]);

  return (
    <>
      {/* ── Search bar ── */}
      <div className="scp-searchbar">
        <div className="scp-searchbar__field">
          <Search size={16} className="scp-searchbar__icon" />
          <input
            type="text"
            className="scp-searchbar__input"
            placeholder={s.searchSeriesPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={s.searchSeriesAriaLabel}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="scp-searchbar__clear"
              aria-label={s.clearAriaLabel}
            >
              <X size={14} />
            </button>
          )}
        </div>
        {query && (
          <p className="scp-searchbar__meta">
            {filtered.length} {filtered.length !== 1 ? s.seriesFoundPlural : s.seriesFound}
          </p>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="scp-grid">
          {filtered.map((sub) => (
            <Link
              key={sub.subCategorySlug}
              href={`/marque/${brandSlug}/${categorySlug}/${sub.subCategorySlug}`}
              className="scp-card"
            >
              {/* Image */}
              <div className="scp-card__img">
                {sub.previewImage ? (
                  <Image
                    src={sub.previewImage}
                    alt={sub.subCategoryName}
                    fill
                    sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                    className="object-contain"
                    style={{ padding: "0.75rem" }}
                    unoptimized={sub.isRemoteImage}
                  />
                ) : (
                  <div className="scp-card__no-img">{s.noImage}</div>
                )}
                <span className="scp-card__count">{sub.totalProducts} {s.models}</span>
              </div>

              {/* Body */}
              <div className="scp-card__body">
                <h3 className="scp-card__name">{sub.subCategoryName}</h3>

                {sub.previewSpecs.length > 0 ? (
                  <div className="scp-card__specs">
                    {sub.previewSpecs.map((spec) => (
                      <div key={spec.name} className="scp-card__spec">
                        <span className="scp-card__spec-name">{spec.name}</span>
                        <span className="scp-card__spec-val">{spec.valueWithUnit}</span>
                      </div>
                    ))}
                    {sub.totalProducts > 1 && (
                      <span className="scp-card__spec-note">{s.variesByModel}</span>
                    )}
                  </div>
                ) : (
                  <div className="scp-card__specs" />
                )}

                <div className="scp-card__footer">
                  <span className="scp-card__models">
                    {sub.totalProducts} {sub.totalProducts > 1 ? s.models : s.model}
                  </span>
                  <span className="scp-card__btn">
                    {s.see}
                    <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="scp-empty-state">
          <p className="scp-empty-state__text">
            {s.noSeriesFor} &ldquo;{query}&rdquo;
          </p>
          <button onClick={() => setQuery("")} className="scp-empty-state__btn">
            {s.reset}
          </button>
        </div>
      )}
    </>
  );
}
