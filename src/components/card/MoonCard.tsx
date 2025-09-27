import Link from "next/link";

import { cn } from "@/lib/utils";

interface MoonCardProps {
  name: string;
  price?: number;
  url?: string;
  className?: string;
}

export const MoonCard = ({ name, price, url, className }: MoonCardProps) => {
  const href = url ? `/menu/${url}` : "#";

  return (
    <Link href={href} className="block pt-2">
      <div
        className={cn(
          "relative cursor-pointer rounded-2xl overflow-hidden transition-transform duration-300 ease-out",
          "hover:-translate-y-2 will-change-transform",
          "bg-gradient-to-br from-gray-800 via-gray-900 to-black group",
          "aspect-[3/4] w-full md:aspect-[4/5] flex flex-col items-center justify-center",
          className
        )}
      >
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bland/10 to-transparent transform rotate-45"></div>
        </div>

        {/* ムーンロゴ（メイン装飾） */}
        <div className="relative z-10 opacity-60 group-hover:opacity-90 transition-all duration-300">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-bland/60 group-hover:border-bland flex items-center justify-center transition-all duration-300">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-bland/40 group-hover:bg-bland/60 rounded-full relative overflow-hidden transition-all duration-300">
              {/* 左三日月 → ホバーで右三日月 */}
              <div className="absolute inset-0 bg-black/70 rounded-full transform -translate-x-3 group-hover:translate-x-3 transition-transform duration-300"></div>
            </div>
          </div>
        </div>

        {/* メニュー名と価格 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-bland font-bold text-md md:text-xl leading-tight mb-1 group-hover:text-bland transition-colors duration-300">
            {name}
          </h3>
          {price && (
            <p className="text-bland/90 group-hover:text-bland/90 font-medium text-sm md:text-base transition-colors duration-300">
              ¥{price.toLocaleString()}
            </p>
          )}
        </div>

        {/* "Coming Soon" バッジ - 320px未満では非表示 */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 hidden min-[320px]:block">
          <div className="px-1.5 py-0.5 md:px-2 md:py-0.5 bg-bland/20 group-hover:bg-bland/30 rounded-full transition-colors duration-300">
            <span className="text-bland text-[10px] md:text-xs font-medium">
              Coming Soon
            </span>
          </div>
        </div>

        {/* ホバー時のリング効果 */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-bland/20 transition-colors duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};
