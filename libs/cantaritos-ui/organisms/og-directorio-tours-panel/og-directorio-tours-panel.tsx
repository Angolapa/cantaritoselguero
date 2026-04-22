"use client";

import Image from "next/image";

import { useTranslation } from "@/domain/stores";

const TITLE_COLOR = "#14222F";
const HIGHLIGHT_COLOR = "#FFAF32";

export function OgDirectorioToursPanel() {
  const { translate } = useTranslation();

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 pt-6 pb-10 lg:px-8 lg:pt-10 lg:pb-16">
      <div className="flex items-end lg:items-start gap-3 lg:gap-6">
        <h2
          className="font-heading uppercase leading-none text-[24px] lg:text-[48px] shrink-0"
          style={{ color: TITLE_COLOR }}
        >
          <span className="lg:hidden block w-[242px] whitespace-nowrap">
            {translate("directorio.tours.titleMobileLine1")}
            <br />
            {translate("directorio.tours.titleMobileLine2")}
          </span>
          <span className="hidden lg:block">
            {translate("directorio.tours.titleDesktopLine1")}
            <br />
            {translate("directorio.tours.titleDesktopLine2")}
          </span>
        </h2>

        <Image
          src="/images/Direct/tours-checklist-mobile.svg"
          alt={translate("directorio.tours.iconAlt")}
          width={87}
          height={64}
          className="w-[87px] h-auto shrink-0 lg:hidden"
        />
        <Image
          src="/images/Direct/tours-checklist-desktop.svg"
          alt={translate("directorio.tours.iconAlt")}
          width={154}
          height={114}
          className="hidden lg:block w-[154px] h-auto shrink-0"
        />
      </div>

      <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-6 lg:mt-10">
        <span className="lg:hidden">
          {translate("directorio.tours.p1MobileLine1")}
          <br />
          {translate("directorio.tours.p1MobileLine2")}
          <br />
          {translate("directorio.tours.p1MobileLine3")}
        </span>
        <span className="hidden lg:inline">
          {translate("directorio.tours.p1DesktopLine1")}
          <br />
          {translate("directorio.tours.p1DesktopLine2")}
        </span>
      </p>

      <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-4 lg:mt-8">
        <span className="lg:hidden">
          {translate("directorio.tours.p2MobileLine1")}
          <br />
          {translate("directorio.tours.p2MobileLine2")}
        </span>
        <span className="hidden lg:inline">
          {translate("directorio.tours.p2DesktopLine1")}
          <br />
          {translate("directorio.tours.p2DesktopLine2")}
        </span>
      </p>

      <div className="relative mt-8 lg:mt-12 mx-auto w-[335px] lg:w-[610px] max-w-full">
        <Image
          src="/images/Direct/tours-disfruta-banner-mobile.svg"
          alt={translate("directorio.tours.enjoyBannerAlt")}
          width={335}
          height={152}
          className="w-full h-auto lg:hidden"
        />
        <Image
          src="/images/Direct/tours-disfruta-banner-desktop.svg"
          alt={translate("directorio.tours.enjoyBannerAlt")}
          width={610}
          height={268}
          className="hidden lg:block w-full h-auto"
        />
        <div
          className="absolute flex items-center justify-center"
          style={{ top: "25%", left: "16%", right: "18%", bottom: "39%" }}
        >
          <p className="font-body font-medium leading-none text-white text-center text-[12px] lg:text-[24px]">
            {translate("directorio.tours.enjoyLine1")}
            <br />
            {translate("directorio.tours.enjoyLine2")}
          </p>
        </div>
      </div>

      <div className="mt-10 lg:mt-16">
        <div className="flex items-center gap-2 lg:gap-4">
          <Image
            src="/images/Direct/tours-warning-mobile.svg"
            alt={translate("directorio.tours.warningIconAlt")}
            width={41}
            height={35}
            className="w-[41px] h-auto shrink-0 lg:hidden"
          />
          <Image
            src="/images/Direct/tours-warning-desktop.svg"
            alt={translate("directorio.tours.warningIconAlt")}
            width={72}
            height={62}
            className="hidden lg:block w-[72px] h-auto shrink-0"
          />
          <h3
            className="font-heading uppercase leading-none text-[24px] lg:text-[48px]"
            style={{ color: TITLE_COLOR }}
          >
            {translate("directorio.tours.warningTitle")}
          </h3>
        </div>

        <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-4 lg:mt-8">
          <span className="lg:hidden">
            {translate("directorio.tours.warningP1MobileLine1")}
            <br />
            {translate("directorio.tours.warningP1MobileLine2")}
          </span>
          <span className="hidden lg:inline">
            {translate("directorio.tours.warningP1DesktopLine1")}
            <br />
            {translate("directorio.tours.warningP1DesktopLine2")}
          </span>
        </p>

        <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-4 lg:mt-8">
          <span className="lg:hidden">
            {translate("directorio.tours.warningP2MobileLine1")}
            <br />
            {translate("directorio.tours.warningP2MobileLine2")}
            <br />
            {translate("directorio.tours.warningP2MobileLine3")}
          </span>
          <span className="hidden lg:inline">
            {translate("directorio.tours.warningP2DesktopLine1")}
            <br />
            {translate("directorio.tours.warningP2DesktopLine2")}
          </span>
        </p>
      </div>

      <div className="relative mt-10 lg:mt-16 mx-auto w-[278px] lg:w-[651px] max-w-full">
        <Image
          src="/images/Direct/tours-advice-banner-mobile.svg"
          alt={translate("directorio.tours.adviceBannerAlt")}
          width={278}
          height={174}
          className="w-full h-auto lg:hidden"
        />
        <Image
          src="/images/Direct/tours-advice-banner-desktop.svg"
          alt={translate("directorio.tours.adviceBannerAlt")}
          width={651}
          height={308}
          className="hidden lg:block w-full h-auto"
        />
        <div className="absolute flex items-center top-[3%] left-[8%] right-[28%] bottom-[69%] lg:left-[3%] lg:right-[22%] lg:bottom-[67%]">
          <p className="font-body font-medium leading-none text-white text-[12px] lg:text-[24px]">
            <span className="lg:hidden">
              {translate("directorio.tours.adviceMobileLine1")}
              <br />
              {translate("directorio.tours.adviceMobileLine2Before")}
              <span style={{ color: HIGHLIGHT_COLOR }}>
                {translate("directorio.tours.adviceAgency")}
              </span>
              <br />
              {translate("directorio.tours.adviceMobileLine3")}
            </span>
            <span className="hidden lg:inline">
              {translate("directorio.tours.adviceDesktopLine1")}
              <br />
              {translate("directorio.tours.adviceDesktopLine2Before")}
              <span style={{ color: HIGHLIGHT_COLOR }}>
                {translate("directorio.tours.adviceAgency")}
              </span>
              {translate("directorio.tours.adviceDesktopLine2After")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
