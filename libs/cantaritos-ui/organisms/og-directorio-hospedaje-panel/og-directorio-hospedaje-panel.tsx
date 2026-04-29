"use client";

import Image from "next/image";

import { useTranslation } from "@/domain/stores";

const TITLE_COLOR = "#14222F";
const HIGHLIGHT_COLOR = "#FFAF32";

export function OgDirectorioHospedajePanel() {
  const { translate } = useTranslation();

  return (
    <div className="w-full max-w-[940px] mx-auto px-4 pt-6 pb-10 lg:px-6 lg:pt-10 lg:pb-16">
      <div className="flex items-end lg:items-start gap-3 lg:gap-28">
        <h2
          className="font-heading uppercase leading-none text-[24px] lg:text-[48px] shrink-0 lg:mt-6"
          style={{ color: TITLE_COLOR }}
        >
          {translate("directorio.hospedaje.titleLine1")}
          <br />
          {translate("directorio.hospedaje.titleLine2")}
        </h2>

        <Image
          src="/images/Direct/hospedaje-hotel-mobile.svg"
          alt={translate("directorio.hospedaje.iconAlt")}
          width={99}
          height={72}
          className="w-[99px] h-auto shrink-0 lg:hidden"
        />
        <Image
          src="/images/Direct/hospedaje-hotel-desktop.svg"
          alt={translate("directorio.hospedaje.iconAlt")}
          width={193}
          height={137}
          className="hidden lg:block w-[193px] h-auto shrink-0 lg:-mt-6"
        />
      </div>

      <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-6 lg:mt-10">
        <span className="lg:hidden">
          {translate("directorio.hospedaje.p1MobileLine1")}
          <br />
          {translate("directorio.hospedaje.p1MobileLine2")}
          <br />
          {translate("directorio.hospedaje.p1MobileLine3")}
        </span>
        <span className="hidden lg:inline">
          {translate("directorio.hospedaje.p1DesktopLine1")}
          <br />
          {translate("directorio.hospedaje.p1DesktopLine2")}
        </span>
      </p>

      <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-4 lg:mt-8">
        <span className="lg:hidden">
          {translate("directorio.hospedaje.p2MobileLine1")}
          <br />
          {translate("directorio.hospedaje.p2MobileLine2")}
        </span>
        <span className="hidden lg:inline">
          {translate("directorio.hospedaje.p2Desktop")}
        </span>
      </p>

      <div className="relative mt-8 lg:mt-12 w-[344px] lg:w-[556px] max-w-full">
        <Image
          src="/images/Direct/hospedaje-visit-banner-mobile.svg"
          alt={translate("directorio.hospedaje.visitBannerAlt")}
          width={344}
          height={151}
          className="w-full h-auto lg:hidden"
        />
        <Image
          src="/images/Direct/hospedaje-visit-banner-desktop.svg"
          alt={translate("directorio.hospedaje.visitBannerAlt")}
          width={556}
          height={274}
          className="hidden lg:block w-full h-auto"
        />
        <div className="absolute flex items-center top-[35%] left-[33%] right-[5%] bottom-[27%] lg:top-[35%] lg:left-[40%] lg:right-[1%] lg:bottom-[30%]">
          <p className="font-body font-medium leading-none text-white text-[12px] lg:text-[24px]">
            <span className="lg:hidden">
              {translate("directorio.hospedaje.visitMobileLine1")}
              <br />
              {translate("directorio.hospedaje.visitMobileLine2")}
            </span>
            <span className="hidden lg:inline">
              {translate("directorio.hospedaje.visitDesktopLine1")}
              <br />
              {translate("directorio.hospedaje.visitDesktopLine2")}
              <br />
              {translate("directorio.hospedaje.visitDesktopLine3")}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-10 lg:mt-16">
        <div className="flex items-center gap-2 lg:gap-4">
          <Image
            src="/images/Direct/tours-warning-mobile.svg"
            alt={translate("directorio.hospedaje.warningIconAlt")}
            width={41}
            height={35}
            className="w-[41px] h-auto shrink-0 lg:hidden"
          />
          <Image
            src="/images/Direct/tours-warning-desktop.svg"
            alt={translate("directorio.hospedaje.warningIconAlt")}
            width={72}
            height={62}
            className="hidden lg:block w-[72px] h-auto shrink-0"
          />
          <h3
            className="font-heading uppercase leading-none text-[24px] lg:text-[48px]"
            style={{ color: TITLE_COLOR }}
          >
            {translate("directorio.hospedaje.warningTitle")}
          </h3>
        </div>

        <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-4 lg:mt-8">
          <span className="lg:hidden">
            {translate("directorio.hospedaje.warningP1MobileLine1")}
            <br />
            {translate("directorio.hospedaje.warningP1MobileLine2")}
          </span>
          <span className="hidden lg:inline">
            {translate("directorio.hospedaje.warningP1DesktopLine1")}
            <br />
            {translate("directorio.hospedaje.warningP1DesktopLine2")}
          </span>
        </p>

        <p className="font-body font-medium text-[12px] lg:text-[24px] leading-none text-white mt-4 lg:mt-8">
          <span className="lg:hidden">
            {translate("directorio.hospedaje.warningP2MobileLine1")}
            <br />
            {translate("directorio.hospedaje.warningP2MobileLine2")}
            <br />
            {translate("directorio.hospedaje.warningP2MobileLine3")}
          </span>
          <span className="hidden lg:inline">
            {translate("directorio.hospedaje.warningP2DesktopLine1")}
            <br />
            {translate("directorio.hospedaje.warningP2DesktopLine2")}
          </span>
        </p>
      </div>

      <div className="relative mt-10 lg:mt-16 mx-auto w-[278px] lg:w-[651px] max-w-full">
        <Image
          src="/images/Direct/hospedaje-advice-banner-mobile.svg"
          alt={translate("directorio.hospedaje.adviceBannerAlt")}
          width={278}
          height={174}
          className="w-full h-auto lg:hidden"
        />
        <Image
          src="/images/Direct/hospedaje-advice-banner-desktop.svg"
          alt={translate("directorio.hospedaje.adviceBannerAlt")}
          width={651}
          height={308}
          className="hidden lg:block w-full h-auto"
        />
        <div className="absolute flex items-center top-[3%] left-[8%] right-[28%] bottom-[69%] lg:left-[3%] lg:right-[22%] lg:bottom-[67%]">
          <p className="font-body font-medium leading-none text-white text-[12px] lg:text-[24px]">
            <span className="lg:hidden">
              {translate("directorio.hospedaje.adviceMobileLine1")}
              <br />
              {translate("directorio.hospedaje.adviceMobileLine2")}
              <br />
              <span style={{ color: HIGHLIGHT_COLOR }}>
                {translate("directorio.hospedaje.adviceHospedaje")}
              </span>
              {translate("directorio.hospedaje.adviceMobileLine3After")}
            </span>
            <span className="hidden lg:inline">
              {translate("directorio.hospedaje.adviceDesktopLine1")}
              <br />
              {translate("directorio.hospedaje.adviceDesktopLine2Before")}
              <span style={{ color: HIGHLIGHT_COLOR }}>
                {translate("directorio.hospedaje.adviceHospedaje")}
              </span>
              {translate("directorio.hospedaje.adviceDesktopLine2After")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
