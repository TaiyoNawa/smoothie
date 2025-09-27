"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Recommendations } from "@/components/card/Recommendation";
import { Hero } from "@/components/hero/Hero";
import { SectionTitle } from "@/components/title/SectionTitle";

import { sampleMenuItems } from "@/assets/sampleMenuItems";

export default function Home() {
  return (
    <SectionWrapper>
      <Hero />
      <SectionTitle>おすすめ</SectionTitle>
      <Recommendations items={sampleMenuItems} />
      <SectionTitle>BlandNameとは？</SectionTitle>
    </SectionWrapper>
  );
}
