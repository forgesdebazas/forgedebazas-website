// components/home/HeroSection.tsx (Version mise à jour avec traductions)
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { title } from "process";

export function HeroSection() {
  const { t } = useLanguage(); // Utiliser le hook pour les traductions
  const [currentHero, setCurrentHero] = useState(0);

  // Les slides utilisent maintenant les traductions
  const heroSlides = [
    {
      title: t.hero.title1,
      subtitle: t.hero.subtitle1,
      description: t.hero.description1,
      image: "/images/home/home1.jpg",
    },
    {
      title: t.hero.title1,
      subtitle: t.hero.subtitle1,
      description: t.hero.description1,
      image:
        "https://cdn.toyota-forklifts.eu/globalassets/02-new-products/mosaik-block-premium-trucks/ic_small_700x255px.jpg",
    },
    {
      title: t.hero.title2,
      subtitle: t.hero.subtitle2,
      description: t.hero.description2,
      image:
        "https://sanyglobal-img.sany.com.cn/prod/20250716/2_135949.jpg?x-oss-process=image/format,webp",
    },
    {
      title: t.hero.title2,
      subtitle: t.hero.subtitle2,
      description: t.hero.description2,
      image:
        "https://toyotamaterialhandling-international.com/storage/BF87D14F9CFFE1A6EE6F49D8538AFAB2C79C34780EF2F96E467CE16869B1D206/ae7a03c62f51428e8e7fe0681026bf59/png/media/b9fdc105bbd74ee795cb274b0831f16e/Stacking_outside_8FD70.png",
    },
    {
      title: t.hero.title3,
      subtitle: t.hero.subtitle3,
      description: t.hero.description3,
      image:
        "https://sanyglobal-img.sany.com.cn/market/16546488055754711.jpg?x-oss-process=image/resize,m_lfit,w_1920/quality,q_100",
    },
    {
      title: t.hero.title3,
      subtitle: t.hero.subtitle3,
      description: t.hero.description3,
      image:
        "https://www.servcoforklift.com/dw/image/v2/BFBH_PRD/on/demandware.static/-/Sites-ServcoForklift-Library/default/dw9f0b9530/images/toyota_industrial_equipment/toyota-core-electric-forklift-models-warehouse.jpg?sw=1300&sfrm=jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const nextHero = () => {
  //   setCurrentHero((prev) => (prev + 1) % heroSlides.length);
  // };

  // const prevHero = () => {
  //   setCurrentHero(
  //     (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
  //   );
  // };

  return (
    <section
      className="relative min-h-[400px] h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Hero banner"
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/55 to-black/45 z-10"></div>
      <h1 className="sr-only">
        FORGES - Équipements Industriels et BTP au Maroc
      </h1>
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHero ? "opacity-100" : "opacity-0"
            }`}
          aria-hidden={index !== currentHero}
          role="tabpanel"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-linear-to-b from-yellow-900/25 via-transparent to-black/30"></div>
        </div>
      ))}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 h-full flex flex-col justify-end pb-6 md:pb-10 text-white items-center text-center sm:items-start sm:text-left">
        <div className="relative min-h-[160px] sm:min-h-[260px] mb-4 sm:mb-6">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-in-out ${index === currentHero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 absolute inset-0 translate-y-4"
                }`}
            >
              <h2
                className="font-black mb-3 sm:mb-4 leading-[1.1] tracking-tight drop-shadow-2xl"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              >
                {slide.title}
                <br />
                {slide.subtitle}
              </h2>
              <p
                className="max-w-3xl mb-0 leading-relaxed text-white font-medium drop-shadow-lg mx-auto sm:mx-0"
                style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)" }}
              >
                {slide.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-10 w-full sm:w-auto justify-center sm:justify-start">
          <Link href="/contact" className="w-full xs:w-auto">
            <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-7 sm:px-10 py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-none font-bold uppercase tracking-widest shadow-2xl hover:shadow-3xl transition-all hover:scale-105 w-full">
              {t.hero.contactUs}
            </Button>
          </Link>
          <Link href="/solutions" className="w-full xs:w-auto">
            <Button className="text-black hover:bg-[#b91c1c] bg-white hover:text-white px-7 sm:px-10 py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-none font-bold uppercase tracking-widest shadow-2xl hover:shadow-3xl transition-all hover:scale-105 w-full">
              {t.hero.ourSolutions}
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex gap-3" role="tablist">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentHero
                    ? "bg-[#dc2626] w-10 shadow-lg"
                    : "bg-white/60 w-3 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === currentHero}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
