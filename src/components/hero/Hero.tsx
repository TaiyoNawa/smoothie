"use client";

import Image from "next/image";

import { FadeIn } from "@/components/effect/FadeIn";
import { MeteorShower } from "@/components/effect/MeteorShower";
import { Button } from "@/components/ui/button";

interface HeroProps {
  mainText?: string;
  subText?: string;
  ctaText?: string;
  ctaUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

export const Hero = ({
  mainText = "ひととときの夜を彩る",
  subText = "◯◯◯◯でリッチなスムージー",
  ctaText = "メニューを見る",
  ctaUrl = "/menu",
  image = {
    src: "/hero-smoothie.png",
    alt: "リッチなスムージー",
  },
  className = "",
}: HeroProps) => {
  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-16 lg:py-20">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl mb-8 lg:mb-0 lg:pr-8">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                <span className="block text-bland font-black tracking-tight">
                  {mainText}
                </span>
                <span className="block text-white font-light mt-2 tracking-wide">
                  {subText}
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg">
                特別な夜に相応しい、深みのある味わいと上質な体験をお届けします
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Button
                asChild
                variant="bland"
                size="lg"
                className="text-base sm:text-lg font-bold px-8 py-4 rounded-lg shadow-2xl hover:shadow-bland/20 transition-all duration-300 hover:scale-105"
              >
                <a href={ctaUrl}>{ctaText}</a>
              </Button>
            </FadeIn>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <FadeIn delay={0.4} className="relative">
              <div className="relative w-96 h-96 sm:w-[420px] sm:h-[420px] lg:w-[400px] lg:h-[400px]">
                {/* メイン画像 */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                    sizes="(max-width: 640px) 384px, (max-width: 1024px) 420px, 400px"
                  />

                  {/* 画像上のグラデーションオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* 装飾的なエフェクト */}
                <div className="absolute -inset-4 bg-gradient-to-r from-bland/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* スクロールインジケーター - 流星アニメーション */}
      <MeteorShower
        count={5}
        height="md"
        speed={2}
        spacing="lg"
        fadeDelay={0.2}
        className="mt-2 mb-4"
      />
    </section>
  );
};

export default Hero;
