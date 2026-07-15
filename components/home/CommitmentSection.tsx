"use client";

import { useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { VideoPlayer, VideoPlayerRef } from "@/components/ui/VideoPlayer";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export function CommitmentSection() {
  const { t } = useLanguage();
  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    videoPlayerRef.current?.togglePlay();
    setIsPlaying(!isPlaying);
  };

  // Split title into two parts for styling
  const titleParts = t.commitment.title.split(" ");
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(" ");

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <ScrollAnimation className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase">
              <span className="text-[#dc2626] leading-tight font-normal">
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
          <p className="text-gray-700 max-w-4xl mx-auto text-sm md:text-base px-4">
            {t.commitment.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl text-center sm:text-start md:text-4xl font-bold text-gray-900 mb-6">
              {t.commitment.projectTitle}
            </h3>
            <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed text-center sm:text-start">
              {t.commitment.projectDescription}
            </p>
            <ol className="space-y-3 mb-8 text-center sm:text-start">
              {t.commitment.features.map((item) => (
                <li
                  key={item}
                  className="text-gray-700 flex items-center text-base md:text-lg font-bold"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            {/* <div className="flex items-center gap-2">
              <div onClick={togglePlay} className="border border-gray-400 rounded-full p-3 flex cursor-pointer">
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-[#dc2626]" fill="currentColor" />
                ) : (
                  <Play className="w-10 h-10 text-[#dc2626]" fill="currentColor" />
                )}
              </div>
              <span>Watch Video</span>
            </div> */}
          </div>
          {/* <iframe title="vimeo-player" src="https://player.vimeo.com/video/1170824767?h=20d87fe1dc" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe> */}
          <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/1170824767?h=20d87fe1dc"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="الفيلم الوثائقي بناء الأمل"
            />
          </div>
          {/* <div className="aspect-video bg-white">
            <VideoPlayer
              ref={videoPlayerRef}
              src="https://store1.gofile.io/download/web/a8b70c73-1107-454f-88ec-c0c2950ddf61/%D8%A7%D9%84%D9%81%D9%8A%D9%84%D9%85%20%D8%A7%D9%84%D9%88%D8%AB%D8%A7%D9%8A%D9%94%D9%82%D9%8A%20%D8%A8%D9%86%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D9%94%D9%85%D9%84%20.mp4"
              poster="https://www.challenge.ma/wp-content/uploads/2024/10/1702200434507.jpg"
              className="w-full h-full"
            />
          </div> */}
        </div>
      </ScrollAnimation>
    </section>
  );
}

export default CommitmentSection;
