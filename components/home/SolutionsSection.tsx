"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Construction,
  Layers,
  Warehouse,
} from "lucide-react";
import HeadSections from "../HeadSections";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  const { t } = useLanguage();
  const [currentSolution, setCurrentSolution] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const solutions = [
    {
      id: "manutention",
      title: t.solutions.manutention.title,
      description: t.solutions.manutention.description,
      image:
        "https://res.cloudinary.com/doflwt77p/image/upload/v1772558432/manutention_ihkkzn.jpg",
      icon: "/images/1.svg",
    },
    {
      id: "rayonnage",
      title: t.solutions.rayonnage.title,
      description: t.solutions.rayonnage.description,
      image:
        "https://res.cloudinary.com/doflwt77p/image/upload/v1772558428/rayonage_wf9dar.jpg",
      icon: "/images/2.svg",
    },
    {
      id: "solutions-automatisees",
      title: t.solutions.automated.title,
      description: t.solutions.automated.description,
      image:
        "https://tmhe-media.azureedge.net/published/44168_2500x700_toyota%20mh.jpg",
      icon: "/images/2.svg",
    },
    {
      id: "levage",
      title: t.solutions.levage.title,
      description: t.solutions.levage.description,
      image:
        "https://res.cloudinary.com/doflwt77p/image/upload/v1776770308/253cdf25a2b9228c1503755d70550c69_oupnqh.webp",
      icon: "/images/3.svg",
    },
    {
      id: "terrassement",
      title: t.solutions.terrassement.title,
      description: t.solutions.terrassement.description,
      image:
        "https://sanyglobal-img.sany.com.cn/product/goods/20200817/SY950H_1920_108-190929?x-oss-process=image/format,webp",
      icon: "/images/4.svg",
    },
    {
      id: "mines",
      title: t.solutionDetails.mines.title,
      description: t.solutionDetails.mines.subtitle,
      image:
        "https://res.cloudinary.com/doflwt77p/image/upload/q_auto/f_auto/v1775225678/1741160864383_smlp5b.jpg",
      icon: "/images/5.svg",
    },
    {
      id: "portuaire",
      title: "Portuaire",
      description: "Équipements spécialisés pour les opérations portuaires",
      image:
        "https://res.cloudinary.com/doflwt77p/image/upload/v1772756322/pnou-001_jmjo80.jpg",
      icon: "https://res.cloudinary.com/doflwt77p/image/upload/q_auto/f_auto/v1775230431/ICON_yrd234.png",
    },
    {
      id: "transport",
      title: t.solutionDetails.transport.title,
      description: t.solutionDetails.transport.subtitle,
      image:
        "https://res.cloudinary.com/doflwt77p/image/upload/v1768325136/Dump-Truck-Truck-SANY-Group-01-13-2026_06_24_PM_fow0o6.png",
      icon: "/images/6.svg",
    },
    {
      id: "energie",
      title: t.solutionDetails.energie.title,
      description: t.solutionDetails.energie.subtitle,
      image: "https://res.cloudinary.com/doflwt77p/image/upload/v1768324809/Generated_Image_January_13_2026_-_6_16PM_iqwyal.png",
      icon: "/images/7.svg",
    },
  ];

  const AUTO_SLIDE_DELAY = 6000;
  const SWIPE_THRESHOLD = 50;

  const getMaxIndex = useCallback(
    () => Math.max(0, solutions.length - slidesPerView),
    [slidesPerView]
  );

  const nextSolution = useCallback(() => {
    setCurrentSolution((prev) => {
      const maxIndex = getMaxIndex();
      return prev >= maxIndex ? 0 : prev + 1;
    });
  }, [getMaxIndex]);

  const prevSolution = useCallback(() => {
    setCurrentSolution((prev) => {
      const maxIndex = getMaxIndex();
      return prev <= 0 ? maxIndex : prev - 1;
    });
  }, [getMaxIndex]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1280) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    setCurrentSolution((prev) =>
      Math.min(prev, Math.max(0, solutions.length - slidesPerView))
    );
  }, [slidesPerView]);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      nextSolution();
    }, AUTO_SLIDE_DELAY);
    return () => window.clearInterval(interval);
  }, [isPaused, nextSolution]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSolution();
      } else if (event.key === "ArrowLeft") {
        prevSolution();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSolution, prevSolution]);

  return (
    <section
      className="relative overflow-hidden w-full"
    // style={{ backgroundImage: "url('/images/texture.jpg')" }}
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 30, 50 50 T100 50' stroke='%2399a' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M0 70 Q25 50, 50 70 T100 70' stroke='%2399a' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M0 30 Q25 10, 50 30 T100 30' stroke='%2399a' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase text-black hover:text-[#dc2626]">
              <span className="leading-tight font-normal">
                {t.solutions.title.split(" ")[0]}
              </span>{" "}
              <br />
              <span>
                {t.solutions.title.split(" ").slice(1).join(" ").toUpperCase()}
              </span>
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-[#dc2626]"></div>
              <div className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse"></div>
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent via-[#dc2626] to-[#dc2626]"></div>
            </div>
          </div>
          <p className="text-gray-700 max-w-4xl mx-auto text-sm md:text-base px-4">
            {t.products.pageDescription}
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        <button
          onClick={prevSolution}
          className="hidden md:block absolute -left-6 sm:-left-10 lg:-left-16 xl:-left-20 top-1/2 -translate-y-1/2 z-20 text-[#dc2626] hover:text-[#b91c1c] transition-all cursor-pointer"
          aria-label="Previous solutions"
        >
          <ChevronLeft
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
            strokeWidth={1.5}
          />
        </button>

        <div
          className="overflow-hidden py-6 rounded-sm bg-white/10 backdrop-blur"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchMove={(event) => {
            if (touchStartX.current === null) return;
            const currentX = event.touches[0].clientX;
            const delta = currentX - touchStartX.current;
            if (delta > SWIPE_THRESHOLD) {
              prevSolution();
              touchStartX.current = null;
            } else if (delta < -SWIPE_THRESHOLD) {
              nextSolution();
              touchStartX.current = null;
            }
          }}
          onTouchEnd={() => {
            touchStartX.current = null;
          }}
        >
          <div
            className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] -mx-3 will-change-transform"
            style={{
              transform: `translateX(-${(100 / slidesPerView) * currentSolution
                }%)`,
            }}
          >
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;

              return (
                <div
                  key={index}
                  className="flex-shrink-0 px-3 flex flex-col"
                  style={{
                    flex: `0 0 ${100 / slidesPerView}%`,
                  }}
                >
                  <div className="flex flex-col h-full group bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-sm">
                    {/* IMAGE */}
                    <div className="relative w-full h-52 md:h-56 overflow-hidden rounded-t-sm flex-shrink-0">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 flex flex-col items-center text-center flex-1">
                      {/* ICON */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 flex items-center justify-center -mt-12 shadow-xl z-20 flex-shrink-0">
                        <Image
                          src={solution.icon as unknown as string}
                          alt={solution.title}
                          width={60}
                          height={60}
                          className="object-contain"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(5765%) hue-rotate(357deg) brightness(93%) contrast(89%)",
                          }}
                        />
                      </div>

                      {/* TITLE */}
                      <h3 className="text-base md:text-lg font-bold text-black mt-4 mb-2">
                        {solution.title}
                      </h3>

                      {/* DESCRIPTION — clamped so all cards align */}
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3 flex-1">
                        {solution.description}
                      </p>

                      {/* LINK */}
                      <Link
                        href={`/solutions/${solution.id}`}
                        className="see-more-link hidden md:inline-flex mt-4"
                        aria-label={`${t.solutions.seeMore} ${solution.title}`}
                      >
                        <span>{t.solutions.seeMore}</span>
                        <span className="sr-only"> - {solution.title}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={nextSolution}
          className="hidden md:block absolute -right-6 sm:-right-10 lg:-right-16 xl:-right-20 top-1/2 -translate-y-1/2 z-20 text-[#dc2626] hover:text-[#b91c1c] transition-all cursor-pointer"
          aria-label="Next solutions"
        >
          <ChevronRight
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
            strokeWidth={1.5}
          />
        </button>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {Array.from({ length: getMaxIndex() + 1 }).map((_, dotIndex) => {
              const isActive = dotIndex === currentSolution;
              return (
                <button
                  key={dotIndex}
                  onClick={() => setCurrentSolution(dotIndex)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${isActive
                    ? "bg-[#dc2626] w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
                    }`}
                  aria-label={`Afficher les solutions ${dotIndex + 1}`}
                />
              );
            })}
          </div>
          <Link
            href="/solutions"
            className="see-more-link hidden md:inline-flex"
          >
            {t.nav.solutions}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
