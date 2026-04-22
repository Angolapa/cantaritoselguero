"use client";

import Image from "next/image";

import { useTranslation } from "@/domain/stores";

const BACKGROUND = "#FFAF32";

export function OgDirectorioHero() {
  const { translate } = useTranslation();

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="flex items-center justify-center px-4 pt-10 pb-12 lg:pt-20 lg:pb-24">
        <Image
          src="/images/Direct/directorio-cantaristico-mobile.svg"
          alt={translate("directorio.heroImageAlt")}
          width={252}
          height={201}
          priority
          className="w-[252px] h-auto lg:hidden"
        />
        <Image
          src="/images/Direct/directorio-cantaristico-desktop.svg"
          alt={translate("directorio.heroImageAlt")}
          width={643}
          height={433}
          priority
          className="hidden lg:block w-[643px] max-w-full h-auto"
        />
      </div>
    </section>
  );
}
