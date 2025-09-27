//TODO:description付きのカードだが、レスポンシブ対応が甘いので、要修正。
//現状は、MenuCardを使うことを推奨。
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface MenuCard2Props {
  name: string;
  image: string;
  price: number;
  description?: string;
  url?: string;
  className?: string;
}

export const MenuCard2 = ({
  name,
  image,
  price,
  description,
  url,
  className,
}: MenuCard2Props) => {
  const href = url ? `/menu/${url}` : "#";

  return (
    <Link href={href} className="block pt-2">
      <div
        className={cn(
          "relative cursor-pointer rounded-2xl overflow-hidden transition-transform duration-300 ease-out",
          "hover:-translate-y-2 will-change-transform",
          "bg-black group aspect-[3/4] w-full md:aspect-[4/5]",
          className
        )}
      >
        {/* 背景画像 - カード全体に配置 */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* グラデーション オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* テキスト部分 - 黒背景に統一 */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 bg-black">
          <h3 className="text-bland font-bold text-md md:text-xl leading-tight mb-1">
            {name}
          </h3>

          {description && (
            <p className="text-white text-xs md:text-sm line-clamp-2 mb-2 opacity-90">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-bland font-bold text-base md:text-xl">
              ¥{price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
