"use client";

import { useEffect, useRef, useState } from "react";

// Fade animation hook
const useFadeInOnScroll = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Fade animation component
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: FadeInProps) => {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

interface MeteorShowerProps {
  /** 流星の数 */
  count?: number;
  /** 流星の高さ */
  height?: "sm" | "md" | "lg";
  /** アニメーション速度（秒） */
  speed?: number;
  /** 流星間のスペース */
  spacing?: "sm" | "md" | "lg";
  /** カスタムクラス名 */
  className?: string;
  /** 表示開始の遅延 */
  fadeDelay?: number;
}

export const MeteorShower = ({
  count = 5,
  height = "md",
  speed = 2,
  spacing = "md",
  className = "",
  fadeDelay = 1.0,
}: MeteorShowerProps) => {
  const heightClasses = {
    sm: "h-12",
    md: "h-16",
    lg: "h-20",
  };

  const centerHeightClasses = {
    sm: "h-14",
    md: "h-20",
    lg: "h-24",
  };

  const spacingClasses = {
    sm: "space-x-2",
    md: "space-x-4",
    lg: "space-x-6",
  };

  const meteors = Array.from({ length: count }, (_, index) => {
    const isCenter = index === Math.floor(count / 2);
    const delay1 = (index * 0.4) % speed;
    const delay2 = (index * 0.4 + 1) % speed;

    return {
      id: index,
      isCenter,
      delay1,
      delay2,
      fadeDelay: fadeDelay + index * 0.1,
    };
  });

  return (
    <>
      <div
        className={`flex justify-center items-center ${spacingClasses[spacing]} ${className}`}
      >
        {meteors.map((meteor) => (
          <FadeIn key={meteor.id} delay={meteor.fadeDelay}>
            <div
              className={`relative w-px ${
                meteor.isCenter
                  ? centerHeightClasses[height]
                  : heightClasses[height]
              } bg-gradient-to-b from-transparent ${
                meteor.isCenter ? "via-bland/40" : "via-bland/30"
              } to-transparent overflow-hidden`}
            >
              {/* メイン流星 */}
              <div className="absolute inset-0 w-full">
                <div
                  className={`w-px ${
                    meteor.isCenter ? "h-8" : "h-6"
                  } bg-gradient-to-b from-bland ${
                    meteor.isCenter ? "via-bland/90" : "via-bland/80"
                  } to-transparent`}
                  style={{
                    animation: `meteor ${speed}s ease-in-out infinite ${meteor.delay1}s`,
                  }}
                />
              </div>

              {/* サブ流星 */}
              <div className="absolute inset-0 w-full">
                <div
                  className={`w-px ${
                    meteor.isCenter ? "h-5" : "h-4"
                  } bg-gradient-to-b ${
                    meteor.isCenter
                      ? "from-bland/70 via-bland/50"
                      : "from-bland/60 via-bland/40"
                  } to-transparent`}
                  style={{
                    animation: `meteor ${speed}s ease-in-out infinite ${meteor.delay2}s`,
                  }}
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* 流星アニメーション用のstyle */}
      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(300%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
