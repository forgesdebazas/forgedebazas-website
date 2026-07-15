"use client";

import { brands } from "@/data/brands";
import Image from "next/image";
import Link from "next/link";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { toBrandSlug } from "@/lib/slug";

type PartnerLogosProps = {
  className?: string;
  isPrincipaleBrands?: boolean;
};

export function PartnerLogos({
  className = "",
  isPrincipaleBrands,
}: PartnerLogosProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <ScrollAnimation className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="relative">
          {/* Infinite slider container */}

          <div className="flex animate-scroll-infinite gap-8 md:gap-12 items-center">
            {isPrincipaleBrands
              ? brands.slice(2).map((brand, index) => (
                  <Link
                    key={`${brand.name}-${index}`}
                    href={`/marque/${toBrandSlug(brand.name)}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={300}
                      height={200}
                      className="object-contain w-[200px] md:w-[200px] lg:w-[250px]"
                    />
                  </Link>
                ))
              : brands.map((brand, index) => (
                  <Link
                    key={`${brand.name}-${index}`}
                    href={`/marque/${toBrandSlug(brand.name)}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={300}
                      height={200}
                      className="object-contain w-[200px] md:w-[200px] lg:w-[250px]"
                    />
                  </Link>
                ))}
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

export default PartnerLogos;
