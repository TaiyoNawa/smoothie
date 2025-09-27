// Recommendations.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./recommendations.css";

import { Button } from "@/components/ui/button";

import { MenuItem } from "@/assets/sampleMenuItems";
import { cn } from "@/lib/utils";

import { MenuCard } from "./MenuCard";
import { MenuCard2 } from "./MenuCard2";
import { MoonCard } from "./MoonCard";
import { FadeIn } from "../effect/FadeIn";

import type { Swiper as SwiperType } from "swiper";

interface RecommendationsProps {
  items: MenuItem[];
  className?: string;
}

export const Recommendations = ({ items, className }: RecommendationsProps) => {
  const sortedItems = [...items].sort((a, b) => Number(a.id) - Number(b.id));

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [showButtons, setShowButtons] = useState(true);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowButtons(window.innerWidth >= 320);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSwiperInit = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <FadeIn>
      <div className={cn("w-full relative", className)}>
        <Swiper
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 24 },
          }}
          navigation={{
            prevEl: "#custom-prev",
            nextEl: "#custom-next",
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "swiper-pagination-bullet bland-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active bland-bullet-active",
          }}
          className="pb-16"
        >
          {sortedItems.map((item) => (
            <SwiperSlide key={item.id}>
              {(() => {
                const cardType = item.type || 1;
                switch (cardType) {
                  case 2:
                    return (
                      <MenuCard2
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        description={item.description}
                        url={item.url}
                      />
                    );
                  case 3:
                    return (
                      <MoonCard
                        name={item.name}
                        price={item.price}
                        url={item.url}
                      />
                    );
                  default:
                    return (
                      <MenuCard
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        url={item.url}
                      />
                    );
                }
              })()}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiperページネーション */}
        <div className="custom-pagination flex justify-center space-x-2 mt-12" />

        {/* 下部左右ナビゲーションボタン（320px未満では非表示） */}
        {showButtons &&
          sortedItems.length >
            (typeof window !== "undefined" && window.innerWidth >= 768
              ? 3
              : 2) && (
            <>
              <Button
                variant="bland"
                size="sm"
                onClick={() => swiperInstance?.slidePrev()}
                disabled={isBeginning}
                className={cn(
                  "absolute bottom-0 left-0 mb-2 ml-2 md:mb-3 md:ml-3 text-xs md:text-sm transition-opacity",
                  isBeginning && "opacity-40 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" />
                前へ
              </Button>
              <Button
                variant="bland"
                size="sm"
                onClick={() => swiperInstance?.slideNext()}
                disabled={isEnd}
                className={cn(
                  "absolute bottom-0 right-0 mb-2 mr-2 md:mb-3 md:mr-3 text-xs md:text-sm transition-opacity",
                  isEnd && "opacity-40 cursor-not-allowed"
                )}
              >
                次へ
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-0.5 md:ml-1" />
              </Button>
            </>
          )}
      </div>
    </FadeIn>
  );
};
