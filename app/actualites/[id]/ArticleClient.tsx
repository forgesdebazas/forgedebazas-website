"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizeArticleField, type NewsArticle } from "@/data/newsData";
import CtaSection from "@/components/ui/CtaSection";
import PortableArticleContent from "@/components/sanity/PortableArticleContent";

interface ArticleClientProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
}

export default function ArticleClient({
  article,
  relatedArticles,
}: ArticleClientProps) {
  const { t, language } = useLanguage();
  const [shareUrl, setShareUrl] = useState("");
  const authorName = article.author || "Forges de Bazas";

  const title = localizeArticleField(article, "title", language) ?? "";
  const excerpt = localizeArticleField(article, "excerpt", language) ?? "";
  const content = localizeArticleField(article, "content", language);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShareUrl(window.location.href);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-white min-h-screen mt-14"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* Hero */}
      <section className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] bg-gray-950 overflow-hidden">
        <Image
          src={article.image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-10 sm:pb-14 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-4xl">

            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.news.backToNews}
            </Link>

            {/* <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {article.category}
            </span> */}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-red-500" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-500" />
                <span>{article.readTime} {t.news.readTimeLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <ScrollAnimation className="container mx-auto px-6 md:px-10 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 xl:gap-16">

            {/* Main */}
            <article>
              {/* Excerpt — lead paragraph */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 pb-8 border-b border-gray-100 italic">
                {excerpt}
              </p>

              {/* Article body */}
              {content ? (
                <PortableArticleContent content={content} />
              ) : null}

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-red-600" />
                  {t.news.shareArticle}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1877f2] text-white rounded-lg text-sm font-medium hover:bg-[#166fe5] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0a66c2] text-white rounded-lg text-sm font-medium hover:bg-[#004182] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-6 space-y-6">

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200">
                      {t.news.relatedArticles}
                    </h3>
                    <div className="space-y-5">
                      {relatedArticles.map((related) => {
                        const relatedTitle =
                          localizeArticleField(related, "title", language) ?? "";
                        return (
                        <Link
                          key={related.id}
                          href={`/actualites/${related.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={related.image}
                              alt={relatedTitle}
                              fill
                              sizes="80px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1 leading-snug">
                              {relatedTitle}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{related.date}</span>
                            </div>
                          </div>
                        </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="rounded-2xl bg-red-600 text-white p-6">
                  <h3 className="text-lg font-bold mb-2">
                    {t.news.interestedInSolution}
                  </h3>
                  <p className="text-sm text-white/80 mb-5 leading-relaxed">
                    {t.news.expertAdvice}
                  </p>
                  <div className="space-y-2.5">
                    <Link href="/devis" className="block">
                      <Button className="bg-white text-red-600 hover:bg-red-50 w-full font-semibold text-sm">
                        {t.common.requestQuote}
                      </Button>
                    </Link>
                    <Link href="/contact" className="block">
                      <Button className="bg-transparent border border-white/50 text-white hover:bg-white/10 w-full font-semibold text-sm">
                        {t.common.contactUs}
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </ScrollAnimation>
      </section>

      <CtaSection
        title={t.news.stayInformed}
        description={t.news.stayInformedDesc}
        primaryAction={{ href: "/actualites", label: t.news.viewAllNews }}
      />
    </div>
  );
}
