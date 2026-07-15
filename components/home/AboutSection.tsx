"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-8 my-24 md:py-12 lg:py-16">
      {/* Background */}
      {/* <div
        className="absolute inset-0 p-2 bg-center opacity-10 z-0 bg-no-repeat"
        style={{ backgroundImage: "url('/images/empreint.png')" }}
      /> */}

      {/* Content */}
      <ScrollAnimation className="relative z-10 w-full max-w-[1400px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-20">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 uppercase">
              <span className="text-[#dc2626] leading-tight font-normal">
                À propos
              </span>
              <br />
              <span className="text-black">DE FORGES</span>
            </h2>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-[#dc2626]" />
              <div className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent via-[#dc2626] to-[#dc2626]" />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-gray-700 text-center space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed">
          <h3 className="font-bold text-base sm:text-lg md:text-xl">{t.aboutPage.subtitle}</h3>
          <p className="font-bold">{t.aboutPage.intro}</p>
          <p className="text-sm sm:text-base md:text-lg  leading-tight font-medium text-gray-600 whitespace-pre-line">
            {t.aboutPage.description}
          </p>
        </div>
      </ScrollAnimation>
    </section>
  );
}

export default AboutSection;
