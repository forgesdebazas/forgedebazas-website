"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Photo {
  src: string;
  width: number;
  height: number;
}

const projectImages: Photo[] = [
  { src: "/images/proxam/1.jpg", width: 1200, height: 800 },
  {
    src: "https://res.cloudinary.com/doflwt77p/image/upload/v1772372422/1770293890932.0823_nnlqow.jpg",
    width: 1200,
    height: 800,
  },
  {
    src: "https://toyotaforklift.scene7.com/is/image/toyotamh/Core%20Electric%20Forklift_Application_156%20(2)-1",
    width: 800,
    height: 600,
  },
  { src: "/images/proxam/3.jpg", width: 1200, height: 800 },
  {
    src: "https://www.sofima.fr/wp-content/uploads/2018/10/chariot_electrique_toyota_traigo.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://sanyglobal-img.sany.com.cn/prod/20250714/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250708191334_172814.jpg?x-oss-process=style/goods_gallary6_2",
    width: 1200,
    height: 800,
  },
  {
    src: "https://res.cloudinary.com/doflwt77p/image/upload/v1772372485/Design_sans_titre_4_cwhitc.png",
    width: 1200,
    height: 800,
  },
  {
    src: "https://tmhe-media.azureedge.net/published/23993_768x400_toyota%20mh.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://tmhe-media.azureedge.net/published/658_768x400_toyota%20mh.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "https://res.cloudinary.com/doflwt77p/image/upload/v1772372538/E-Truck_Fleet_2_zhpgpw.png",
    width: 1200,
    height: 800,
  },
  {
    src: "https://sanyglobal-img.sany.com.cn/product/goods/20200902/_MG_6803-123326.jpg?x-oss-process=style/goods_gallary6_2",
    width: 1200,
    height: 800,
  },
  { src: "/images/proxam/9.jpg", width: 1200, height: 800 },
  { src: "/images/proxam/10.jpg", width: 1200, height: 800 },
  {
    src: "https://sanyglobal-img.sany.com.cn/static/img/services/maintenance3.png",
    width: 800,
    height: 600,
  },
  {
    src: "https://sanyglobal-img.sany.com.cn/product/goods/20200831/SY956H_3-201035.jpg?x-oss-process=style/goods_gallary6_2",
    width: 1200,
    height: 800,
  },
];

interface GalleryImageProps {
  photo: Photo;
  index: number;
  onClick: () => void;
}

const GalleryImage = ({ photo, index, onClick }: GalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="gallery-item glow-border group cursor-pointer relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-secondary animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, hsl(var(--muted) / 0.5), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
      )}

      <img
        src={photo.src}
        alt={`Project image ${index + 1}`}
        className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-105" : "scale-100"}`}
        style={{
          aspectRatio: `${photo.width} / ${photo.height}`,
        }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : -180,
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <Eye className="w-6 h-6 text-primary-foreground" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Custom Lightbox Component
interface CustomLightboxProps {
  images: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const CustomLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: CustomLightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
        case "+":
        case "=":
          setZoom((prev) => Math.min(prev + 0.5, 4));
          break;
        case "-":
          setZoom((prev) => Math.max(prev - 0.5, 1));
          break;
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom === 1) {
      setTouchStart(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || zoom > 1) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
    }
    setTouchStart(null);
  };

  // Scroll to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.25, 4));
    } else {
      setZoom((prev) => {
        const newZoom = Math.max(prev - 0.25, 1);
        if (newZoom === 1) setPosition({ x: 0, y: 0 });
        return newZoom;
      });
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Zoom controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <span className="text-white text-sm font-medium min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 4}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
          )}

          {currentIndex < images.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl max-w-[90vw] overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${idx === currentIndex
                  ? "ring-2 ring-primary scale-110"
                  : "opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={img.src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[85vw] max-h-[70vh] overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            style={{
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <img
              src={images[currentIndex].src}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain select-none"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom
                  }px)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ProjectsGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-9xl mx-auto px-4">
        {/* Header */}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectImages.map((photo, index) => (
            <GalleryImage
              key={photo.src}
              photo={photo}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>

        {/* Custom Lightbox */}
        <CustomLightbox
          images={projectImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />
      </div>
    </section>
  );
}
