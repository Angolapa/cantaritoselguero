"use client";

import { MlSectionBannerProps } from "./ml-section-banner.types";

const BANNER_SRC: Record<NonNullable<MlSectionBannerProps["color"]>, string> = {
  teal: "/images/product/section-banner-teal.svg",
  orange: "/images/product/section-banner-orange.svg",
};

export function MlSectionBanner({ title, color = "teal" }: MlSectionBannerProps) {
  return (
    <div className="relative inline-block">
      <img src={BANNER_SRC[color]} alt="" className="block" />
      <span
        className="absolute inset-x-0 top-0 flex items-center justify-center px-8 text-center"
        style={{
          height: "77.2%",
          color: "#FFF",
          fontFamily: "var(--font-barriecito), cursive",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "150%",
          letterSpacing: "-0.44px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}
