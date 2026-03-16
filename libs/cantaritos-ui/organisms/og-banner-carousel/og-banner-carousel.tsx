"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Banner } from "@/domain/types";

import { OgBannerCarouselProps } from "./og-banner-carousel.types";

type BannerWithImage = Omit<Banner, "imageUrl"> & { imageUrl: string };

function BannerSlide({ banner }: { banner: BannerWithImage }) {
  const image = (
    <>
      {/* Desktop image */}
      <Image
        src={banner.imageUrl}
        alt={banner.altText}
        width={1440}
        height={400}
        className={`w-full h-auto block ${banner.imageMobileUrl ? "hidden md:block" : ""}`}
        priority
      />
      {/* Mobile image (if available) */}
      {banner.imageMobileUrl && (
        <Image
          src={banner.imageMobileUrl}
          alt={banner.altText}
          width={640}
          height={400}
          className="w-full h-auto block md:hidden"
          priority
        />
      )}
    </>
  );

  if (banner.linkUrl) {
    return (
      <Link href={banner.linkUrl} className="block">
        {image}
      </Link>
    );
  }

  return image;
}

export function OgBannerCarousel({ banners: rawBanners, isLoading = false }: OgBannerCarouselProps) {
  const banners = rawBanners.filter(
    (banner): banner is BannerWithImage => !!banner.imageUrl,
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  if (isLoading) {
    return (
      <div className="w-full aspect-[1440/400] bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  if (banners.length === 0) return null;

  if (banners.length === 1) {
    return (
      <div style={{ backgroundColor: banners[0].backgroundColor ?? undefined }}>
        <BannerSlide banner={banners[0]} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-0 flex-[0_0_100%]"
              style={{ backgroundColor: banner.backgroundColor ?? undefined }}
            >
              <BannerSlide banner={banner} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={`size-[6px] md:size-2.5 rounded-full transition-colors ${
              index === selectedIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Ir al banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
