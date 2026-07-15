"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizeArticleField, type NewsArticle } from "@/data/newsData";

export type { NewsArticle };

export default function ActualitesClient({ articles }: { articles: NewsArticle[] }) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Partenariats",
    "Entreprise",
    "Innovation",
    "Projets",
    "Formation",
    "Services",
  ];

  const filteredNews =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const labelForCategory = (cat: string) =>
    cat === "all" ? t.news.allFilter : t.news.categoryLabels[cat] ?? cat;

  const articleCountLabel =
    filteredNews.length === 1 ? t.news.articleSingular : t.news.articlePlural;

  return (
    <div
      className="bg-white min-h-screen mt-14"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight text-balance">
              {t.news.pageTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.news.pageDescription}
            </p>
          </div>
        </div>
      </section>
      {/* Filter Section */}
      <section className="bg-white shadow-sm sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${selectedCategory === category
                    ? "bg-[#dc2626] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {labelForCategory(category)}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            {filteredNews.length} {articleCountLabel}
          </p>
        </div>
      </section>
      {/* Featured Article */}
      {filteredNews.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={filteredNews[0].image}
                    alt={localizeArticleField(filteredNews[0], "title", language) ?? ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#dc2626] text-white px-4 py-2 rounded-full">
                    <span className="font-bold text-sm">{t.news.featured}</span>
                  </div>
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold">
                      {t.news.categoryLabels[filteredNews[0].category] ?? filteredNews[0].category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {filteredNews[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {filteredNews[0].readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {localizeArticleField(filteredNews[0], "title", language)}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {localizeArticleField(filteredNews[0], "excerpt", language)}
                  </p>
                  <Link href={`/actualites/${filteredNews[0].id}`}>
                    <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white w-fit group">
                      {t.news.readArticle}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* News Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          {filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">{t.news.noArticlesFound}</p>
              <p className="text-gray-500 mt-2">{t.news.tryAnotherCategory}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.slice(1).map((article) => {
                const title = localizeArticleField(article, "title", language);
                const excerpt = localizeArticleField(article, "excerpt", language);
                return (
                  <div
                    key={article.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={title ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-gray-800">
                          {t.news.categoryLabels[article.category] ?? article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#dc2626] transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {excerpt}
                      </p>
                      <Link href={`/actualites/${article.id}`} className="block">
                        <Button
                          variant="outline"
                          className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white group"
                        >
                          {t.news.readMore}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
