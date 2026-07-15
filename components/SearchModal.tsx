"use client";

import { ArrowRight, Clock, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, brands as productBrands } from "@/data/productsData";
import { solutions } from "@/data/solutionsData";
import { newsArticles, type ArticleContent } from "@/data/newsData";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedText, type LocalizedText } from "@/lib/types";
import { toBrandSlug } from "@/lib/slug";
import { isRoutableModelName } from "@/lib/modelRoutes";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResultType = "product" | "model" | "solution" | "news" | "brand" | "page";

interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  category?: string;
  image?: string;
}

interface SearchIndexItem extends SearchResult {
  searchText: string;
  titleText: string;
  descriptionText: string;
  keywordText: string;
  tokens: string[];
  priority: number;
}

const RECENT_SEARCHES_KEY = "forges.search.recent.v1";
const MAX_RECENT_SEARCHES = 8;
const MAX_RESULTS = 20;
const LANGUAGE_KEYS = ["fr", "en", "es"] as const;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "the",
  "of",
  "to",
  "for",
  "with",
  "on",
  "in",
  "at",
  "by",
  "from",
  "or",
  "de",
  "du",
  "des",
  "la",
  "le",
  "les",
  "un",
  "une",
  "et",
  "ou",
  "au",
  "aux",
  "en",
  "dans",
  "par",
  "sur",
  "sous",
  "el",
  "los",
  "las",
  "una",
  "y",
  "o",
  "del",
  "por",
  "para",
  "con",
  "sin",
  "sobre",
]);

function portableTextToSearchText(content: ArticleContent | undefined) {
  if (!content) return "";
  if (typeof content === "string") return stripHtml(content);

  return content
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children
          .map((child) => {
            if (typeof child !== "object" || child === null) return "";
            const text = (child as Record<string, unknown>).text;
            return typeof text === "string" ? text : "";
          })
          .join(" ");
      }

      if (block._type === "image") {
        const alt = block.alt;
        const caption = block.caption;
        return [alt, caption]
          .filter((value): value is string => typeof value === "string")
          .join(" ");
      }

      return "";
    })
    .join(" ");
}

const SYNONYM_MAP: Record<string, string[]> = {
  sav: ["service apres vente", "after sales", "maintenance"],
  btp: ["construction", "batiment", "travaux publics"],
  tp: ["travaux publics", "chantier"],
  location: ["rental", "louer", "leasing"],
  louer: ["location", "rental"],
  devis: ["quote", "pricing", "tarif"],
  energie: ["electrogene", "genset", "power"],
  electrogene: ["groupe", "generator"],
  chariot: ["forklift"],
  grue: ["crane", "levage"],
};

const PAGE_KEYWORDS: Record<string, string[]> = {
  "/produits": ["catalogue", "catalog", "equipements", "machines"],
  "/solutions": ["solutions", "secteurs", "metier", "industrie"],
  "/location": ["location", "rental", "proxim", "loueur", "leasing"],
  "/sav": ["sav", "service", "maintenance", "reparation", "after sales"],
  "/actualites": ["news", "actualites", "evenements"],
  "/apropos": ["entreprise", "histoire", "valeurs"],
  "/contact": ["contact", "email", "telephone"],
  "/devis": ["devis", "quote", "pricing", "tarif"],
  "/nos-marques": ["marques", "brands", "partenaires", "partners"],
  "/cookies": ["cookies", "consentement"],
  "/mentions-legales": ["legal", "mentions", "conditions"],
  "/politique-confidentialite": ["privacy", "confidentialite", "donnees"],
};

const TYPE_BADGE_CLASSES: Record<SearchResultType, string> = {
  product: "bg-blue-100 text-blue-700",
  model: "bg-indigo-100 text-indigo-700",
  solution: "bg-green-100 text-green-700",
  news: "bg-amber-100 text-amber-700",
  brand: "bg-purple-100 text-purple-700",
  page: "bg-gray-100 text-gray-700",
};

function normalizeText(value: string): string {
  if (!value) return "";
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stripHtml(value: string): string {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value: string): string[] {
  const normalized = normalizeText(value);
  if (!normalized) return [];
  return normalized
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function expandTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  tokens.forEach((token) => {
    const synonyms = SYNONYM_MAP[token];
    if (!synonyms) return;
    synonyms.forEach((phrase) => {
      tokenize(phrase).forEach((expandedToken) => expanded.add(expandedToken));
    });
  });
  return Array.from(expanded);
}

function readRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === "string" && item.trim());
  } catch {
    return [];
  }
}

function writeRecentSearches(next: string[]) {
  if (typeof window === "undefined") return;
  try {
    if (next.length === 0) {
      window.localStorage.removeItem(RECENT_SEARCHES_KEY);
      return;
    }
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors
  }
}

function collectLocalizedText(text: LocalizedText | string): string {
  return LANGUAGE_KEYS.map((lang) => getLocalizedText(text, lang)).join(" ");
}

function buildSearchItem({
  type,
  title,
  description,
  url,
  category,
  image,
  keywords = [],
  priority,
}: {
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  category?: string;
  image?: string;
  keywords?: string[];
  priority: number;
}): SearchIndexItem | null {
  const titleText = normalizeText(title);
  const descriptionText = normalizeText(description);
  const keywordText = normalizeText(keywords.filter(Boolean).join(" "));
  const searchText = [titleText, descriptionText, keywordText]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!searchText) return null;

  const tokens = Array.from(new Set(searchText.split(" ").filter(Boolean)));

  return {
    type,
    title,
    description,
    url,
    category,
    image,
    searchText,
    titleText,
    descriptionText,
    keywordText,
    tokens,
    priority,
  };
}

function matchesToken(item: SearchIndexItem, token: string): boolean {
  if (!token) return false;
  if (item.searchText.includes(token)) return true;
  return item.tokens.some((word) => word.startsWith(token));
}

function scoreItem(
  item: SearchIndexItem,
  query: string,
  requiredTokens: string[],
  scoringTokens: string[]
): number {
  if (!query) return 0;

  const matchesRequired =
    requiredTokens.length > 0
      ? requiredTokens.every((token) => matchesToken(item, token))
      : item.searchText.includes(query);

  if (!matchesRequired) return 0;

  let score = 0;

  if (item.titleText === query) score += 120;
  if (item.titleText.startsWith(query)) score += 80;
  if (item.titleText.includes(query)) score += 50;
  if (item.keywordText.includes(query)) score += 30;
  if (item.descriptionText.includes(query)) score += 20;
  if (item.searchText.includes(query)) score += 10;

  const tokensToScore = scoringTokens.length ? scoringTokens : requiredTokens;
  tokensToScore.forEach((token) => {
    if (item.titleText.includes(token)) score += 15;
    else if (item.keywordText.includes(token)) score += 10;
    else if (item.descriptionText.includes(token)) score += 6;
    else if (item.searchText.includes(token)) score += 3;

    if (item.tokens.some((word) => word.startsWith(token))) score += 2;
  });

  if (requiredTokens.length > 1) score += 8;

  score += item.priority;

  return score;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t, language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(
    () => readRecentSearches()
  );

  const uiText = useMemo(() => {
    if (language === "en") {
      return {
        recent: "Recent searches",
        clear: "Clear",
        quickLinks: "Quick links",
        startTyping: "Start typing to search...",
        searchHint: "Products, solutions, news, brands, and pages",
        tryAnother: "Try different keywords",
      };
    }
    if (language === "es") {
      return {
        recent: "Búsquedas recientes",
        clear: "Limpiar",
        quickLinks: "Accesos rápidos",
        startTyping: "Empieza a escribir para buscar...",
        searchHint: "Productos, soluciones, noticias, marcas y páginas",
        tryAnother: "Prueba con otras palabras",
      };
    }
    return {
      recent: "Dernières recherches",
      clear: "Effacer",
      quickLinks: "Accès rapide",
      startTyping: "Commencez à taper pour rechercher...",
      searchHint: "Produits, solutions, actualités, marques et pages",
      tryAnother: "Essayez avec d'autres mots-clés",
    };
  }, [language]);

  const typeLabels = useMemo<Record<SearchResultType, string>>(() => {
    if (language === "en") {
      return {
        product: "Product",
        model: "Model",
        solution: "Solution",
        news: "News",
        brand: "Brand",
        page: "Page",
      };
    }
    if (language === "es") {
      return {
        product: "Producto",
        model: "Modelo",
        solution: "Solución",
        news: "Noticias",
        brand: "Marca",
        page: "Página",
      };
    }
    return {
      product: "Produit",
      model: "Modèle",
      solution: "Solution",
      news: "Actualité",
      brand: "Marque",
      page: "Page",
    };
  }, [language]);

  const pages = useMemo<SearchResult[]>(
    () => [
      {
        type: "page",
        title: t.nav.home,
        description: t.common.search,
        url: "/",
      },
      {
        type: "page",
        title: t.nav.products,
        description: "Catalogue complet de nos équipements industriels et BTP",
        url: "/produits",
      },
      {
        type: "page",
        title: t.nav.brands,
        description: t.brandsPage.description,
        url: "/nos-marques",
      },
      {
        type: "page",
        title: t.nav.solutions,
        description: "Solutions par métier et par secteur d'activité",
        url: "/solutions",
      },
      {
        type: "page",
        title: "PROXAM",
        description: t.footer.shortLongRental,
        url: "/location",
      },
      {
        type: "page",
        title: t.nav.services,
        description: "Maintenance, réparation et services après-vente",
        url: "/sav",
      },
      {
        type: "page",
        title: t.nav.news,
        description: "Nos dernières nouvelles et événements",
        url: "/actualites",
      },
      {
        type: "page",
        title: t.nav.about,
        description: "Notre histoire, nos valeurs et notre expertise",
        url: "/apropos",
      },
      {
        type: "page",
        title: t.nav.contact,
        description: "Contactez-nous pour plus d'informations",
        url: "/contact",
      },
      {
        type: "page",
        title: t.nav.requestQuote,
        description: "Obtenez un devis personnalisé pour vos besoins",
        url: "/devis",
      },
      {
        type: "page",
        title: "Cookies",
        description: "Gestion des cookies et préférences de navigation",
        url: "/cookies",
      },
      {
        type: "page",
        title: "Mentions légales",
        description: "Informations légales et conditions d'utilisation",
        url: "/mentions-legales",
      },
      {
        type: "page",
        title: "Politique de confidentialité",
        description: "Protection des données et confidentialité",
        url: "/politique-confidentialite",
      },
    ],
    [t]
  );

  const quickLinks = useMemo(
    () =>
      pages.filter((page) =>
        [
          "/",
          "/produits",
          "/nos-marques",
          "/solutions",
          "/actualites",
          "/contact",
          "/devis",
        ].includes(page.url)
      ),
    [pages]
  );

  const searchIndex = useMemo(() => {
    const items: SearchIndexItem[] = [];
    const pushItem = (item: SearchIndexItem | null) => {
      if (item) items.push(item);
    };

    pages.forEach((page) => {
      pushItem(
        buildSearchItem({
          type: "page",
          title: page.title,
          description: page.description,
          url: page.url,
          category: page.category,
          image: page.image,
          keywords: [page.title, page.description, ...(PAGE_KEYWORDS[page.url] || [])],
          priority: 2,
        })
      );
    });

    products.forEach((product) => {
      const displayTitle = getLocalizedText(product.shortTitle, language);
      const displayDescription = getLocalizedText(product.description, language);
      const titleAll = collectLocalizedText(product.title);
      const shortTitleAll = collectLocalizedText(product.shortTitle);
      const descriptionAll = collectLocalizedText(product.description);
      const specsAll = [
        collectLocalizedText(product.specs.portee),
        collectLocalizedText(product.specs.pression),
        collectLocalizedText(product.specs.sortie),
      ].join(" ");
      const modelText = (product.models || []).join(" ");

      pushItem(
        buildSearchItem({
          type: "product",
          title: displayTitle,
          description: displayDescription,
          url: `/produits/${product.id}`,
          category: product.brand,
          image: product.image,
          keywords: [
            titleAll,
            shortTitleAll,
            descriptionAll,
            specsAll,
            product.brand,
            product.category,
            modelText,
          ],
          priority: 8,
        })
      );

      (product.models || []).forEach((model) => {
        if (!isRoutableModelName(model)) return;
        pushItem(
          buildSearchItem({
            type: "model",
            title: model,
            description: `${displayTitle} • ${product.brand}`,
            url: `/produits/modele/${toBrandSlug(product.brand)}/${encodeURIComponent(
              model
            )}`,
            category: product.brand,
            image: product.image,
            keywords: [
              model,
              titleAll,
              descriptionAll,
              product.brand,
              product.category,
            ],
            priority: 6,
          })
        );
      });
    });

    solutions.forEach((solution) => {
      const sTitle = getLocalizedText(solution.title, language);
      const sDescription = getLocalizedText(solution.description, language);
      const sSubtitle = getLocalizedText(solution.subtitle, language);
      const sFeatures = solution.features
        .map((f) => getLocalizedText(f, language))
        .join(" ");
      pushItem(
        buildSearchItem({
          type: "solution",
          title: sTitle,
          description: sDescription,
          url: `/solutions/${solution.id}`,
          image: solution.image,
          keywords: [sSubtitle, sDescription, sFeatures],
          priority: 7,
        })
      );
    });

    newsArticles.forEach((article) => {
      const contentText = portableTextToSearchText(article.content);
      pushItem(
        buildSearchItem({
          type: "news",
          title: article.title,
          description: article.excerpt,
          url: `/actualites/${article.id}`,
          category: article.category,
          image: article.image,
          keywords: [
            article.category,
            article.author || "",
            article.date,
            article.readTime,
            article.excerpt,
            contentText,
          ],
          priority: 5,
        })
      );
    });

    productBrands.forEach((brand) => {
      const description = brand.description
        ? getLocalizedText(brand.description, language)
        : brand.name;
      pushItem(
        buildSearchItem({
          type: "brand",
          title: brand.name,
          description,
          url: `/marque/${toBrandSlug(brand.name)}`,
          image: brand.logo,
          keywords: [
            brand.name,
            brand.id,
            brand.description ? collectLocalizedText(brand.description) : "",
          ],
          priority: 4,
        })
      );
    });

    return items;
  }, [language, pages]);

  const results = useMemo(() => {
    const rawQuery = searchQuery.trim();
    if (!rawQuery) return [];
    const normalizedQuery = normalizeText(rawQuery);
    if (!normalizedQuery) return [];

    const requiredTokens = tokenize(rawQuery);
    const scoringTokens = expandTokens(requiredTokens);

    const scored = searchIndex
      .map((item) => ({
        ...item,
        score: scoreItem(item, normalizedQuery, requiredTokens, scoringTokens),
      }))
      .filter((item) => item.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score || a.title.localeCompare(b.title, language)
      );

    const deduped: SearchResult[] = [];
    const seen = new Set<string>();

    for (const item of scored) {
      if (seen.has(item.url)) continue;
      seen.add(item.url);
      const {
        score,
        searchText,
        titleText,
        descriptionText,
        keywordText,
        tokens,
        priority,
        ...result
      } = item;
      deduped.push(result);
      if (deduped.length >= MAX_RESULTS) break;
    }

    return deduped;
  }, [language, searchIndex, searchQuery]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const recordRecentSearch = (query: string) => {
    const trimmed = query.trim();
    const normalized = normalizeText(trimmed);
    if (!normalized) return;
    setRecentSearches((prev) => {
      const next = [
        trimmed,
        ...prev.filter((item) => normalizeText(item) !== normalized),
      ].slice(0, MAX_RECENT_SEARCHES);
      writeRecentSearches(next);
      return next;
    });
  };

  const handleResultClick = () => {
    recordRecentSearch(searchQuery);
    onClose();
    setSearchQuery("");
  };

  const handleRecentClick = (value: string) => {
    setSearchQuery(value);
    recordRecentSearch(value);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    writeRecentSearches([]);
  };

  if (!isOpen) return null;

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mt-20 mx-4 bg-white rounded-lg shadow-2xl animate-in slide-in-from-top-4 duration-300 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-200 p-4">
          <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.common.search + "..."}
            className="flex-1 outline-none text-lg bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                recordRecentSearch(searchQuery);
              }
            }}
          />
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Fermer la recherche"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1">
          {!hasQuery ? (
            <div className="p-6 space-y-6">
              {recentSearches.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {uiText.recent}
                    </div>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-[#dc2626] flex items-center gap-1 transition-colors"
                      aria-label={uiText.clear}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {uiText.clear}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleRecentClick(item)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">{uiText.startTyping}</p>
                  <p className="text-xs text-gray-400 mt-2">{uiText.searchHint}</p>
                </div>
              )}

              {quickLinks.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {uiText.quickLinks}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        onClick={onClose}
                        className="rounded-lg border border-gray-100 p-3 text-left hover:border-[#dc2626] hover:bg-gray-50 transition-colors"
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {link.title}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {link.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500">{t.common.noResults}</p>
              <p className="text-xs text-gray-400 mt-2">{uiText.tryAnother}</p>
            </div>
          ) : (
            <div className="p-2">
              {results.map((result) => (
                <Link
                  key={result.url}
                  href={result.url}
                  onClick={handleResultClick}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    {/* Image */}
                    {result.image && (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_BADGE_CLASSES[result.type]
                            }`}
                        >
                          {typeLabels[result.type]}
                        </span>
                        {result.category && (
                          <span className="text-xs text-gray-500">
                            {result.category}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#dc2626] transition-colors truncate">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {result.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              {results.length} résultat{results.length > 1 ? "s" : ""} trouvé
              {results.length > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
