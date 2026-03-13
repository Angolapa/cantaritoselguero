"use client";

import Image from "next/image";
import Link from "next/link";

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
      className={`${bgColor} rounded-3xl overflow-hidden w-full max-w-[1023px] min-h-[300px] mx-auto`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-stretch h-full">
        {/* Title — first on mobile */}
        <div className="order-1 md:hidden flex flex-col items-center text-center gap-2 pt-8 px-8">
          <h2
            className={`font-heading text-3xl leading-tight ${titleColor}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`font-heading text-2xl leading-tight ${subtitleColor}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Left content — full on desktop */}
        <div className="order-3 md:order-1 flex flex-col items-center md:items-start text-center md:text-left gap-4 px-8 pb-8 md:pl-24 md:pt-12 md:pb-12 flex-1 z-10">
          {/* Title hidden on mobile, shown on desktop */}
          <h2
            className={`hidden md:block font-heading md:text-4xl lg:text-[56px] leading-none ${titleColor}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`hidden md:block font-heading md:text-3xl lg:text-[48px] leading-none ${subtitleColor}`}>
              {subtitle}
            </p>
          )}
          <p className={`font-body text-xs md:text-2xl font-medium leading-none ${warningText ? "md:my-auto" : "md:mt-auto"} ${descriptionColor}`}>
            {description}
          </p>

          {warningText && (
            <div className="flex items-start gap-2 md:gap-4 md:-ml-[50px]">
              <Image src="/images/alert.png" alt="Alerta" width={41} height={35} className="shrink-0 mt-0.5 md:w-[51px] md:h-[44px]" />
              <p
                className={`font-body text-xs md:text-2xl font-bold leading-none ${highlightColor}`}
              >
                {warningText}
              </p>
            </div>
          )}

          {highlightText && !warningText && (
            <p
              className={`font-body text-sm md:text-2xl font-bold leading-none ${highlightColor}`}
            >
              {highlightText}
            </p>
          )}

        </div>

        {/* Illustration */}
        <div className="order-2 md:order-2 relative w-full md:w-[45%] flex flex-col items-center justify-center p-6 md:pr-16 md:py-8">
          <div className="relative w-[250px] h-[198px] md:w-[350px] md:h-[277px] lg:w-[413px] lg:h-[341px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
            />
          </div>
          {/* Button inside image container on desktop */}
          <Link
            href={buttonHref}
            className={`hidden md:inline-flex items-center justify-center h-[56px] px-6 py-4 gap-2 font-body font-bold text-2xl leading-6 rounded-full transition-colors mt-6 ${buttonClasses}`}
          >
            {buttonLabel}
          </Link>
        </div>

        {/* Button — last on mobile */}
        <Link
          href={buttonHref}
          className={`order-4 md:hidden inline-flex items-center justify-center w-[180px] h-[40px] font-body font-bold text-sm rounded-full transition-colors mb-8 ${buttonClasses}`}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
