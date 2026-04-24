"use client";

import Image from "next/image";

import { useTranslation } from "@/domain/stores";

const BACKGROUND = "#FFAF32";
const TITLE_COLOR = "#E9DCB7";

export function OgDirectorioHero() {
  const { translate } = useTranslation();

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="flex items-center justify-center px-4 pt-10 pb-12 lg:pt-20 lg:pb-24">
        <div className="relative w-[298px] h-auto lg:hidden">
          <Image
            src="/images/Direct/mobile.svg"
            alt=""
            width={298}
            height={201}
            priority
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center -translate-y-3">
            <h1
              className="font-heading text-center"
              style={{
                color: TITLE_COLOR,
                fontSize: "36px",
                lineHeight: "100%",
                letterSpacing: "-1.8px",
              }}
            >
              {translate("directorio.heroTitleLine1")}
              <br />
              {translate("directorio.heroTitleLine2")}
            </h1>
          </div>
        </div>

        <div className="relative w-[643px] max-w-full h-auto hidden lg:block">
          <Image
            src="/images/Direct/desktop.svg"
            alt=""
            width={643}
            height={434}
            priority
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center -translate-y-6">
            <h1
              className="font-heading text-center"
              style={{
                color: TITLE_COLOR,
                fontSize: "66px",
                lineHeight: "100%",
              }}
            >
              {translate("directorio.heroTitleLine1")}
              <br />
              {translate("directorio.heroTitleLine2")}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
