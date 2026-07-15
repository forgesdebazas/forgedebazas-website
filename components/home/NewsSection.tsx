"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/data/translations";
import { Calendar, ArrowRight } from "lucide-react";

export interface NewsSectionArticle {
  id: string;
  title: string;
  titleEn?: string;
  titleEs?: string;
  excerpt: string;
  excerptEn?: string;
  excerptEs?: string;
  /** ISO date string from Sanity (e.g. "2024-11-05") or any pre-formatted label. */
  date: string;
  image: string;
}

function pickLocalized(
  article: NewsSectionArticle,
  field: "title" | "excerpt",
  language: Language,
): string {
  if (language === "en") {
    const v = article[`${field}En` as const];
    if (v && v.trim() !== "") return v;
  } else if (language === "es") {
    const v = article[`${field}Es` as const];
    if (v && v.trim() !== "") return v;
  }
  return article[field];
}

interface NewsSectionProps {
  articles: NewsSectionArticle[];
}

const MONTHS_BY_LANG: Record<Language, string[]> = {
  fr: [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  es: [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ],
};

function formatArticleDate(value: string, language: Language): string {
  // ISO date "YYYY-MM-DD" → localized "5 novembre 2024" / "November 5, 2024" / "5 de noviembre de 2024".
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!iso) return value;
  const [, y, m, d] = iso;
  const day = parseInt(d, 10);
  const month = MONTHS_BY_LANG[language][parseInt(m, 10) - 1];
  if (language === "en") return `${month} ${day}, ${y}`;
  if (language === "es") return `${day} de ${month} de ${y}`;
  return `${day} ${month} ${y}`;
}

export function NewsSection({ articles }: NewsSectionProps) {
  const { t, language } = useLanguage();
  const news = articles.slice(0, 3);

  // Split title into two parts for styling
  const titleParts = t.news.title.split(" ");
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(" ");

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0 animate-pulse"
        // style={{
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        //   backgroundSize: "60px 60px",
        // }}
        ></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <ScrollAnimation className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase">
              <span className="text-[#dc2626] leading-tight font-normal bg-clip-text">
                {firstWord}
              </span>
              <br />
              <span className="text-black">{restOfTitle.toUpperCase()}</span>
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-[#dc2626]"></div>
              <div className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse"></div>
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent via-[#dc2626] to-[#dc2626]"></div>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg px-4 leading-relaxed">
            {t.news.description}
          </p>
        </div>

        {news.length === 0 ? (
          <p className="text-center text-gray-400">{t.news.noArticlesFound}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {news.map((item, index) => {
              const title = pickLocalized(item, "title", language);
              const excerpt = pickLocalized(item, "excerpt", language);
              return (
              <ScrollAnimation
                key={item.id}
                delay={index * 0.1}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                  {/* Image Container with Gradient Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#dc2626]" />
                        <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                          {formatArticleDate(item.date, language)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#dc2626] transition-colors duration-300">
                      {title}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={`/actualites/${item.id}`}
                      className="inline-flex items-center gap-2 text-[#dc2626] font-semibold text-sm uppercase tracking-wider group/btn hover:gap-3 transition-all duration-300"
                    >
                      <span>{t.news.viewMore}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-1 bg-gradient-to-r from-[#dc2626] via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </ScrollAnimation>
              );
            })}
          </div>
        )}

        {/* View All News Button */}
        <div className="text-center mt-16">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#dc2626] to-red-700 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-[#dc2626] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-sm"
          >
            <span>{t.news.viewAllNews}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </ScrollAnimation>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}

export default NewsSection;
