import { cn } from "@/lib/utils";

interface HeadSectionsProps {
  title: string;
  presentation?: string;
  description?: string;
}

const HeadSections = ({
  title,
  presentation,
  description,
}: HeadSectionsProps) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 relative z-10">
      <div className="text-center mb-6 md:mb-10">
        <div className="inline-flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 uppercase">
            <span
              className={cn(
                "text-[#dc2626] leading-tight font-normal",
                title === "Nos solutions" && "text-black"
              )}
            >
              {title === "Nos solutions"
                ? "Nos"
                : title === "À propos DE FORGES"
                ? "À propos de"
                : title === "Notre Engagement"
                ? "Notre"
                : title === "Nos Actualités"
                ? "Nos"
                : title}
            </span>{" "}
            {title === "Nos solutions" ? (
              <br />
            ) : title === "À propos DE FORGES" ? (
              <br />
            ) : title === "Notre Engagement" ? (
              <br />
            ) : title === "Nos Actualités" ? (
              <br />
            ) : (
              ""
            )}
            <span className="text-black">
              {title === "Nos solutions"
                ? "SOLUTIONS"
                : title === "À propos DE FORGES"
                ? "FORGES"
                : title === "PROXAM"
                ? ""
                : title === "Notre Engagement"
                ? "ENGAGEMENT"
                : title === "Nos Actualités"
                ? "ACTUALITÉS"
                : title}
            </span>
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 md:w-16 h-0.5 bg-[#dc2626]"></div>
            <div className="w-2 h-2 rounded-full bg-[#dc2626]"></div>
            <div className="w-12 md:w-16 h-0.5 bg-[#dc2626]"></div>
          </div>

          {presentation && (
            <div className="text-center mb-1">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase">
                {presentation}
              </h3>
            </div>
          )}
        </div>
        <p className="text-gray-700 max-w-4xl mx-auto text-sm md:text-base px-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeadSections;
