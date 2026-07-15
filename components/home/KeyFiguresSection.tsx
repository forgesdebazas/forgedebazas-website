"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const FOUNDING_DATE = new Date(1950, 0, 1);

function getYearsSinceFounding(): number {
  const now = new Date();
  let years = now.getFullYear() - FOUNDING_DATE.getFullYear();
  const monthDiff = now.getMonth() - FOUNDING_DATE.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < FOUNDING_DATE.getDate())) {
    years--;
  }
  return years;
}

export function KeyFiguresSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const figures = [
    { value: 559, label: t.keyFigures.turnover, suffix: "", small: false },
    { value: getYearsSinceFounding(), label: t.keyFigures.experience, suffix: "", small: false },
    { value: 205, label: t.keyFigures.employees, suffix: "", small: false },
    { value: 3500, label: t.keyFigures.storage, suffix: "m²", small: true },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    figures.forEach((figure, index) => {
      let currentStep = 0;
      const increment = figure.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          if (currentStep === steps) {
            newCounts[index] = figure.value;
            clearInterval(timer);
          } else {
            newCounts[index] = Math.floor(increment * currentStep);
          }
          return newCounts;
        });
      }, stepDuration);
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative mt-24 md:mt-32 lg:mt-40 py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/clés/key.jpg"
          alt="Key figures background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
      </div>

      {/* Centered Title */}
      <div className="relative z-10 w-full text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h2
          className="font-bold text-white tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {t.keyFigures.title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-4 sm:mt-6"></div>
      </div>

      {/* Key Figures and Map - Side by Side */}
      <ScrollAnimation className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <div className="">
          {/* Key Figures - Left Side */}
          <div className="w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {figures.map((item, index) => (
                <div
                  key={item.label}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col items-center justify-center"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-3xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative text-center w-full">
                    <div
                      className="font-black mb-2 sm:mb-3 bg-gradient-to-br from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-none"
                      style={{
                        fontSize: item.small
                          ? "clamp(1.8rem, 4vw, 3.5rem)"
                          : "clamp(2.8rem, 6vw, 5.5rem)",
                      }}
                    >
                      {counts[index]}
                      <span
                        style={{
                          fontSize: item.small
                            ? "clamp(1rem, 2vw, 1.6rem)"
                            : "clamp(1.4rem, 3vw, 2.5rem)",
                        }}
                      >
                        {item.suffix}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300 uppercase tracking-widest font-semibold leading-relaxed">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map - Right Side */}
          {/* <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
              <div className="relative">
                <Image
                  src="/images/Carte.png"
                  alt="Map showing locations"
                  width={1600}
                  height={900}
                  className="w-full h-auto rounded-lg"
                />

                <div className="absolute top-[8%] left-[67%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex flex-row items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="mt-1 bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold whitespace-nowrap shadow-lg">
                      Tanger
                    </div>
                  </div>
                </div>

                <div className="absolute top-[20%] left-[62%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex flex-row items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="mt-1 bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold whitespace-nowrap shadow-lg">
                      Casablanca
                    </div>
                  </div>
                </div>

                <div className="absolute top-[40%] left-[52%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex flex-row items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="mt-1 bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold whitespace-nowrap shadow-lg">
                      Agadir
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </ScrollAnimation>
    </section>
  );
}

export default KeyFiguresSection;
