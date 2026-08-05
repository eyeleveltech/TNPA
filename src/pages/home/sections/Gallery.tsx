import React, { useState, useCallback, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../../../assets/AUCTION GALLERY/E1.webp";
import img2 from "../../../assets/AUCTION GALLERY/E2.webp";
import img3 from "../../../assets/AUCTION GALLERY/E3.webp";
import img4 from "../../../assets/AUCTION GALLERY/E4.webp";
import img5 from "../../../assets/AUCTION GALLERY/E5.webp";
import img6 from "../../../assets/AUCTION GALLERY/E6.webp";
import img7 from "../../../assets/AUCTION GALLERY/A7.webp";
import img8 from "../../../assets/AUCTION GALLERY/A8.webp";
import img9 from "../../../assets/AUCTION GALLERY/A9.webp";
import img10 from "../../../assets/AUCTION GALLERY/A10.webp";
import img11 from "../../../assets/AUCTION GALLERY/A11.webp";
import img12 from "../../../assets/AUCTION GALLERY/A12.webp";
import img13 from "../../../assets/AUCTION GALLERY/A13.webp";
import img14 from "../../../assets/AUCTION GALLERY/T14.webp";
import img15 from "../../../assets/AUCTION GALLERY/T15.webp";
import img16 from "../../../assets/AUCTION GALLERY/T16.webp";
import img17 from "../../../assets/AUCTION GALLERY/T17.webp";
import img18 from "../../../assets/AUCTION GALLERY/T18.webp";
import img19 from "../../../assets/AUCTION GALLERY/T19.webp";
import img20 from "../../../assets/AUCTION GALLERY/T20.webp";
import img21 from "../../../assets/AUCTION GALLERY/T21.webp";
import img22 from "../../../assets/AUCTION GALLERY/T22.webp";
import img23 from "../../../assets/AUCTION GALLERY/T23.webp";
import img24 from "../../../assets/AUCTION GALLERY/T24.webp";
import img25 from "../../../assets/AUCTION GALLERY/T25.webp";

export function Gallery() {
  const [active, setActive] = useState(0);

  // Array of actual auction photos
  const auctionPhotos = [
    { id: 1, src: img1, alt: "Auction Moment 1" },
    { id: 2, src: img2, alt: "Auction Moment 2" },
    { id: 3, src: img3, alt: "Auction Moment 3" },
    { id: 4, src: img4, alt: "Auction Moment 4" },
    { id: 5, src: img5, alt: "Auction Moment 5" },
    { id: 6, src: img6, alt: "Auction Moment 6" },
    { id: 7, src: img7, alt: "Auction Moment 7" },
    { id: 8, src: img8, alt: "Auction Moment 8" },
    { id: 9, src: img9, alt: "Auction Moment 9" },
    { id: 10, src: img10, alt: "Auction Moment 10" },
    { id: 11, src: img11, alt: "Auction Moment 11" },
    { id: 12, src: img12, alt: "Auction Moment 12" },
    { id: 13, src: img13, alt: "Auction Moment 13" },
    { id: 14, src: img14, alt: "Auction Moment 14" },
    { id: 15, src: img15, alt: "Auction Moment 15" },
    { id: 16, src: img16, alt: "Auction Moment 16" },
    { id: 17, src: img17, alt: "Auction Moment 17" },
    { id: 18, src: img18, alt: "Auction Moment 18" },
    { id: 19, src: img19, alt: "Auction Moment 19" },
    { id: 20, src: img20, alt: "Auction Moment 20" },
    { id: 21, src: img21, alt: "Auction Moment 21" },
    { id: 22, src: img22, alt: "Auction Moment 22" },
    { id: 23, src: img23, alt: "Auction Moment 23" },
    { id: 24, src: img24, alt: "Auction Moment 24" },
    { id: 25, src: img25, alt: "Auction Moment 25" },
  ];

  const go = useCallback((dir: number) => {
    setActive((i) => (i + dir + auctionPhotos.length) % auctionPhotos.length);
  }, [auctionPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Drag/Swipe Handlers (Touch & Mouse)
  // Drag/Swipe Handlers (Touch & Mouse) - using Refs to avoid re-renders
  const dragStart = React.useRef<number | null>(null);
  const dragEnd = React.useRef<number | null>(null);
  const isDragging = React.useRef(false);
  const minSwipeDistance = 30;

  const onDragStart = (clientX: number) => {
    isDragging.current = true;
    dragStart.current = clientX;
    dragEnd.current = null;
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    dragEnd.current = clientX;
  };

  const onDragEnd = () => {
    isDragging.current = false;
    if (dragStart.current === null || dragEnd.current === null) return;
    
    const distance = dragStart.current - dragEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) go(1);
    if (isRightSwipe) go(-1);
    
    dragStart.current = null;
    dragEnd.current = null;
  };

  return (
    <section id="gallery" className="relative bg-ink py-20 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        
        {/* Section Header */}
        <Reveal delay={100}>
          <div className="mb-12 text-center md:mb-16">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold/50 sm:w-16" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Event Gallery
              </span>
              <span className="h-px w-8 bg-gold/50 sm:w-16" />
            </div>
            <h2 className="display-title-extended mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95]">
              <span className="block text-foreground">Auction</span>
              <span className="block text-gold-gradient">Highlights</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-foreground/80 font-sans">
              Exclusive moments from the Grand Player Auction.
            </p>
          </div>
        </Reveal>

        {/* Interactive 3D Manual Carousel */}
        <Reveal delay={200}>
          <div className="relative mt-12 flex flex-col items-center justify-center">
            
            <div 
              className="relative h-100 w-full max-w-200 sm:h-140 lg:h-160 flex items-center justify-center touch-pan-y select-none"
              onTouchStart={(e) => onDragStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => onDragMove(e.targetTouches[0].clientX)}
              onTouchEnd={onDragEnd}
              onMouseDown={(e) => onDragStart(e.clientX)}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              {/* Left Arrow (Absolute positioning on the side) */}
              <button 
                onClick={() => go(-1)}
                className="absolute left-0 z-50 flex h-10 w-10 sm:h-14 sm:w-14 -translate-x-6 sm:-translate-x-20 md:-translate-x-28 items-center justify-center rounded-full border border-white/20 bg-ink/80 backdrop-blur-md text-white/80 shadow-xl transition-all hover:bg-gold hover:text-ink hover:border-gold hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>

              {/* Photos */}
              {auctionPhotos.map((photo, i) => {
                const isActive = i === active;
                // Calculate position relative to active index
                const diff = (i - active + auctionPhotos.length) % auctionPhotos.length;
                const isNext = diff === 1;
                const isPrev = diff === auctionPhotos.length - 1;
                
                let transform = "translateX(0) scale(0.6)";
                let zIndex = 0;
                let opacity = 0;
                let pointerEvents: "auto" | "none" = "none";
                
                if (isActive) {
                  transform = "translateX(0) scale(1)";
                  zIndex = 30;
                  opacity = 1;
                  pointerEvents = "auto";
                } else if (isNext) {
                  transform = "translateX(40%) scale(0.85)";
                  zIndex = 20;
                  opacity = 0.5;
                  pointerEvents = "auto";
                } else if (isPrev) {
                  transform = "translateX(-40%) scale(0.85)";
                  zIndex = 20;
                  opacity = 0.5;
                  pointerEvents = "auto";
                }

                return (
                  <div 
                    key={photo.id}
                    className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      filter: isActive ? "none" : "blur(4px) brightness(0.6)",
                      pointerEvents
                    }}
                    onClick={() => {
                      if (isNext) go(1);
                      if (isPrev) go(-1);
                    }}
                  >
                    <div className="h-full w-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group cursor-pointer relative">
                      <img 
                        src={photo.src} 
                        alt={photo.alt} 
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none pointer-events-none" 
                        loading="lazy"
                        draggable={false}
                      />
                      
                      {/* No text overlay */}
                    </div>
                  </div>
                );
              })}

              {/* Right Arrow (Absolute positioning on the side) */}
              <button 
                onClick={() => go(1)}
                className="absolute right-0 z-50 flex h-10 w-10 sm:h-14 sm:w-14 translate-x-6 sm:translate-x-20 md:translate-x-28 items-center justify-center rounded-full border border-white/20 bg-ink/80 backdrop-blur-md text-white/80 shadow-xl transition-all hover:bg-gold hover:text-ink hover:border-gold hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </div>

            {/* Pagination Dots Removed */}

          </div>
        </Reveal>

      </div>
    </section>
  );
}
