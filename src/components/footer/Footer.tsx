"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

// フッターメニューの型定義
interface FooterMenuItem {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  items: FooterMenuItem[];
}

// フッターのメニューデータ
const footerSections: FooterSection[] = [
  {
    title: "Company",
    items: [
      { label: "会社案内", href: "#company-info" },
      { label: "会社概要", href: "#company-overview" },
      { label: "沿革", href: "#history" },
      { label: "Our Mission, Promises and Values", href: "#mission" },
    ],
  },
  {
    title: "Recruiting",
    items: [
      { label: "採用TOP", href: "#recruiting-top" },
      { label: "スターバックスを知る", href: "#about-starbucks" },
      { label: "福利厚生／ベネフィット", href: "#benefits" },
      { label: "パートナーストーリー", href: "#partner-story" },
      { label: "アルバイト採用", href: "#part-time" },
      { label: "新卒採用", href: "#new-graduate" },
      { label: "SC中途採用", href: "#mid-career-sc" },
      { label: "店舗中途採用", href: "#mid-career-store" },
    ],
  },
  {
    title: "Social Impact",
    items: [
      { label: "Social Impact", href: "#social-impact" },
      { label: "People & Community", href: "#people-community" },
      { label: "Planet", href: "#planet" },
    ],
  },
];

// フッターリンク
const footerLinks: FooterMenuItem[] = [
  { label: "よくあるご質問・お問い合わせ", href: "#faq" },
  { label: "使用条件", href: "#terms" },
  { label: "ポリシー・約款・規約一覧", href: "#policies" },
  { label: "サイトマップ", href: "#sitemap" },
];

// ソーシャルメディアアイコン
const socialMediaIcons = [
  { name: "Instagram", icon: "/instagram.svg", href: "#instagram" },
  { name: "X (Twitter)", icon: "/x.svg", href: "#twitter" },
];

// アコーディオンセクションコンポーネント（shadcn/ui使用）
const AccordionSection: FC<{ sections: FooterSection[] }> = ({ sections }) => (
  <Accordion type="multiple" className="w-full">
    {sections.map((section, index) => (
      <AccordionItem
        key={index}
        value={`section-${index}`}
        className="border-gray-800"
      >
        <AccordionTrigger className="text-white font-medium text-lg hover:no-underline py-4">
          {section.title}
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export const Footer: FC = () => {
  return (
    <footer className="bg-black text-white">
      {/* デスクトップレイアウト */}
      <div className="hidden md:block">
        <div className="w-full max-w-[87%] sm:max-w-[366px] md:max-w-[692px] lg:max-w-[980px] mx-auto py-12">
          <div className="grid grid-cols-3 gap-12 mb-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-medium text-lg mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* フッターリンクとソーシャルメディア */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex space-x-6 text-sm">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex space-x-4">
              {socialMediaIcons.map((social, index) => (
                <Link key={index} href={social.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 hover:bg-dark-hover"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* コピーライト */}
          <div className="mt-6 pt-4">
            <p className="text-gray-400 text-sm">
              © 2025 〇〇 Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* モバイルレイアウト */}
      <div className="block md:hidden">
        <div className="w-full max-w-[87%] mx-auto py-8">
          {/* アコーディオンセクション */}
          <div className="mb-8">
            <AccordionSection sections={footerSections} />
          </div>

          {/* フッターリンク */}
          <div className="space-y-4 mb-8">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ソーシャルメディア */}
          <div className="flex space-x-4 mb-6">
            {socialMediaIcons.map((social, index) => (
              <Link key={index} href={social.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 hover:bg-dark-hover"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Button>
              </Link>
            ))}
          </div>

          {/* コピーライト */}
          <div className="pt-4 ">
            <p className="text-gray-400 text-sm">
              © 2025 〇〇 Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
