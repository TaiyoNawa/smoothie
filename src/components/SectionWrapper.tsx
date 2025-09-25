import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

// レスポンシブパディングの定数定義
export const SECTION_WRAPPER_PADDING = {
  base: "py-8", // 32px (8 * 4px)
  md: "md:py-10", // 40px (10 * 4px)
  lg: "lg:py-13", // 52px (13 * 4px)
};

// 最大幅の定数定義（再利用性向上のため）
export const SECTION_WRAPPER_MAX_WIDTH = {
  base: "w-[87%]", // モバイル: 87%
  sm: "sm:max-w-[366px]", // スモール: 366px
  md: "md:max-w-[692px]", // ミディアム: 692px
  lg: "lg:max-w-[980px]", // ラージ: 980px
};

interface SectionWrapperProps {
  children: ReactNode;
  /** セクションのHTML id */
  id?: string;
  /** 背景色のクラス名 */
  backgroundColor?: string;
  /** カスタムパディングトップ */
  paddingTop?: string;
  /** カスタムパディングボトム */
  paddingBottom?: string;
  /** 追加のクラス名 */
  className?: string;
  /** コンテナの最大幅をカスタマイズ */
  maxWidth?: string;
  /** as prop for semantic HTML */
  as?: "section" | "div" | "main" | "article" | "aside";
}

export const SectionWrapper: FC<SectionWrapperProps> = ({
  children,
  id,
  backgroundColor,
  paddingTop,
  paddingBottom,
  className,
  maxWidth,
  as: Component = "section",
}) => {
  // デフォルトのパディングクラスを生成
  const defaultPaddingClasses = `${SECTION_WRAPPER_PADDING.base} ${SECTION_WRAPPER_PADDING.md} ${SECTION_WRAPPER_PADDING.lg}`;

  // カスタムパディングがある場合の処理
  const paddingClasses =
    paddingTop || paddingBottom
      ? cn(
          paddingTop && `pt-[${paddingTop}]`,
          paddingBottom && `pb-[${paddingBottom}]`,
          // レスポンシブ対応のためのデフォルトクラスも追加
          !paddingTop && "pt-8 md:pt-10 lg:pt-13",
          !paddingBottom && "pb-8 md:pb-10 lg:pb-13"
        )
      : defaultPaddingClasses;

  // 最大幅のクラスを生成
  const maxWidthClasses =
    maxWidth ||
    `w-full ${SECTION_WRAPPER_MAX_WIDTH.base} ${SECTION_WRAPPER_MAX_WIDTH.sm} ${SECTION_WRAPPER_MAX_WIDTH.md} ${SECTION_WRAPPER_MAX_WIDTH.lg}`;

  return (
    <Component
      id={id}
      className={cn(paddingClasses, backgroundColor, className)}
    >
      <div className={cn(maxWidthClasses, "mx-auto")}>{children}</div>
    </Component>
  );
};
