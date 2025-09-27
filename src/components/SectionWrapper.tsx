import { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

// レスポンシブパディングの定数定義（現代的なタイトスペーシング）
export const SECTION_WRAPPER_PADDING = {
  base: "py-6", // 24px - モバイルでタイト
  md: "md:py-8", // 32px - タブレットで適度
  lg: "lg:py-10", // 40px - デスクトップで余裕
};

// 最大幅の定数定義（モダンなワイドレイアウト）
export const SECTION_WRAPPER_MAX_WIDTH = {
  base: "w-[92%]", // モバイル: 92% - より広く
  sm: "sm:w-[90%]", // スモール: 90%
  md: "md:max-w-4xl", // ミディアム: 896px (56rem)
  lg: "lg:max-w-6xl", // ラージ: 1152px (72rem)
  xl: "xl:max-w-7xl", // エクストララージ: 1280px (80rem)
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
          !paddingTop && "pt-6 md:pt-8 lg:pt-10",
          !paddingBottom && "pb-6 md:pb-8 lg:pb-10"
        )
      : defaultPaddingClasses;

  // 最大幅のクラスを生成
  const maxWidthClasses =
    maxWidth ||
    `w-full ${SECTION_WRAPPER_MAX_WIDTH.base} ${SECTION_WRAPPER_MAX_WIDTH.sm} ${SECTION_WRAPPER_MAX_WIDTH.md} ${SECTION_WRAPPER_MAX_WIDTH.lg} ${SECTION_WRAPPER_MAX_WIDTH.xl}`;

  return (
    <Component
      id={id}
      className={cn(paddingClasses, backgroundColor, className)}
    >
      <div className={cn(maxWidthClasses, "mx-auto")}>{children}</div>
    </Component>
  );
};
