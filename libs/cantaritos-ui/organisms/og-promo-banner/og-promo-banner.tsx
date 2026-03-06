"use client";

import Image from "next/image";
import Link from "next/link";

import { TriangleAlert } from "lucide-react";

import { OgPromoBannerProps } from "./og-promo-banner.types";

export function OgPromoBanner({
  bgColor,
  title,
  subtitle,
  description,
  highlightText,
  warningText,
  buttonLabel,
  buttonHref,
  imageSrc,
  imageAlt,
  titleColor = "text-gray-900",
  subtitleColor = "text-gray-900",
  descriptionColor = "text-gray-800",
  highlightColor = "text-brand-yellow",
  buttonVariant = "dark",
}: OgPromoBannerProps) {
  const buttonClasses =
    buttonVariant === "dark"
      ? "bg-[#1E293B] text-white hover:bg-[#334155]"
      : "bg-white text-gray-900 hover:bg-gray-100";

  return (
    <div
      className={`${bgColor} rounded-3xl overflow-hidden w-full max-w-[1023px] mx-auto`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-stretch relative min-h-[300px] md:min-h-[400px] lg:min-h-[480px]">
        {/* Left content */}
        <div className="flex flex-col justify-center gap-4 p-8 md:p-12 lg:p-16 flex-1 z-10">
          <h2
            className={`font-heading text-3xl md:text-4xl lg:text-5xl leading-tight ${titleColor}`}
          >
            {title}
          </h2>
          <p
            className={`font-heading text-2xl md:text-3xl lg:text-4xl leading-tight ${subtitleColor}`}
          >
            {subtitle}
          </p>
          <p className={`font-body text-sm md:text-base ${descriptionColor}`}>
            {description}
          </p>

          {warningText && (
            <div className="flex items-start gap-2">
              <TriangleAlert className="h-6 w-6 shrink-0 text-brand-yellow mt-0.5" />
              <p
                className={`font-body text-sm md:text-base font-bold ${highlightColor}`}
              >
                {warningText}
              </p>
            </div>
          )}

          {highlightText && !warningText && (
            <p
              className={`font-body text-sm md:text-base font-bold ${highlightColor}`}
            >
              {highlightText}
            </p>
          )}

        </div>

        {/* Right: illustration + button */}
        <div className="relative w-full md:w-[45%] lg:w-[40%] flex flex-col items-center justify-center gap-6 p-6 md:p-8">
          <div className="relative w-[250px] h-[250px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
            />
          </div>
          <Link
            href={buttonHref}
            className={`inline-block font-body font-bold text-sm md:text-base px-8 py-3 rounded-full transition-colors ${buttonClasses}`}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
