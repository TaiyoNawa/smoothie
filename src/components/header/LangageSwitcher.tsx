import Link from "next/link";

import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  locale: "ja" | "en";
  href: string;
}

export const LangageSwitcher = ({ locale, href }: LanguageSwitcherProps) => {
  // 現在のパスから言語部分を除去してベースパスを取得

  return (
    <div className="flex items-center space-x-2">
      {/* 日本語ボタン */}
      {locale === "ja" ? (
        <Button
          variant="bland"
          size="sm"
          className="text-xs cursor-not-allowed pointer-events-none"
        >
          JA
        </Button>
      ) : (
        <Link href={`${href}`}>
          <Button
            variant="blandLine"
            size="sm"
            className="text-xs hover:bland-hover"
          >
            JA
          </Button>
        </Link>
      )}

      {/* 英語ボタン */}
      {locale === "en" ? (
        <Button
          variant="bland"
          size="sm"
          className="text-xs cursor-not-allowed pointer-events-none"
        >
          EN
        </Button>
      ) : (
        <Link href={`/en${href}`}>
          <Button
            variant="blandLine"
            size="sm"
            className="text-xs hover:bg-dark-hover"
          >
            EN
          </Button>
        </Link>
      )}
    </div>
  );
};
