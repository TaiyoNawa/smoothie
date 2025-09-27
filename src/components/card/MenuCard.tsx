import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface MenuCardProps {
  name: string;
  image: string;
  price?: number;
  url?: string;
  className?: string;
}

export const MenuCard = ({
  name,
  image,
  price,
  url,
  className,
}: MenuCardProps) => {
  const href = url ? `/menu/${url}` : "#";

  return (
    <Link href={href} className="block pt-2">
      <div
        className={cn(
          "relative cursor-pointer rounded-2xl overflow-hidden transition-transform duration-300 ease-out",
          "hover:-translate-y-2 will-change-transform",
          "bg-gradient-to-b from-transparent to-black/60 group",
          "aspect-[3/4] w-full md:aspect-[4/5]",
          className
        )}
      >
        {/* 背景画像 */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* グラデーション オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* メニュー名と価格 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-bland font-bold text-md md:text-xl leading-tight mb-1">
            {name}
          </h3>
          {price && (
            <p className="text-bland/90 font-medium text-sm md:text-base">
              ¥{price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
