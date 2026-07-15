"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Play, Pause, SkipBack, Volume2, Settings } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export interface VideoPlayerRef {
  togglePlay: () => void;
}

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src, poster, className = "" }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  useImperativeHandle(ref, () => ({
    togglePlay,
  }));

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * duration;
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`relative bg-black rounded-sm overflow-hidden ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isPlaying) {
          setShowControls(true);
        } else {
          setTimeout(() => setShowControls(false), 2000);
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Center Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div onClick={togglePlay} className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center 
          cursor-pointer pointer-events-auto border-2 border-gray-500 hover:bg-gray-400 transition-colors">
            <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[#2a2a2a] transition-opacity duration-300 ${
          showControls || isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-gray-300 transition-colors p-1"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5" fill="currentColor" />
            )}
          </button>

          {/* Previous/Rewind Button */}
          <button
            onClick={() => skip(-10)}
            className="text-white hover:text-gray-300 transition-colors p-1 flex items-center"
            aria-label="Rewind 10 seconds"
          >
            <div className="relative w-8 h-5 flex items-center">
              <div className="absolute left-0 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-white"></div>
              <div className="absolute left-2.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-white"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-white"></div>
            </div>
          </button>

          {/* Next/Fast Forward Button */}
          <button
            onClick={() => skip(10)}
            className="text-white hover:text-gray-300 transition-colors p-1 flex items-center"
            aria-label="Fast forward 10 seconds"
          >
            <div className="relative w-8 h-5 flex items-center">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-white"></div>
              <div className="absolute right-2.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white"></div>
              <div className="absolute right-0 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white"></div>
            </div>
          </button>

          {/* Progress Bar */}
          <div
            className="flex-1 h-1 bg-gray-500 rounded-full cursor-pointer relative mx-2"
            onClick={handleProgressClick}
          >
            <div
              className="absolute left-0 top-0 h-full bg-red-600 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-red-600 rounded-full border border-red-700"></div>
            </div>
          </div>

          {/* Volume Button */}
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            aria-label="Volume"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Settings Button */}
          <button
            className="text-white hover:text-gray-300 transition-colors p-1"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
  }
);

