"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { OgFooter, OgNavbar } from "@/libs/cantaritos-ui";
import type { Locale } from "@/domain/stores/locale-store";
import { useTranslation } from "@/domain/stores/locale-store";
import { API_BASE_URL } from "@/shared/constants/api";

interface MoodGalleryItem {
  id: string;
  title: string | null;
  imageUrl: string | null;
  imageMobileUrl: string | null;
  altEs: string;
  altEn: string;
  section: string;
  order: number;
  isActive: boolean;
}

function useMoodGallery() {
  const [images, setImages] = useState<MoodGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/mood-gallery?section=mood-carousel&active=true`)
      .then((res) => res.json())
      .then((data: MoodGalleryItem[]) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setImages(shuffled);
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  return { images, loading };
}

function getAlt(item: MoodGalleryItem, locale: Locale) {
  return locale === "en" ? item.altEn : item.altEs;
}

export default function NosotrosPage() {
  const { translate, locale } = useTranslation();
  const { images, loading } = useMoodGallery();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<MoodGalleryItem | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 210;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#EDDCB6] flex flex-col overflow-x-hidden">
      <OgNavbar />

      <main className="flex-1">
        {/* Origen cantarístico */}
        {/* Red top line - desktop only */}
        <div className="hidden lg:block w-full h-[6px] bg-primary" />

        <section className="px-6 pt-8 flex flex-col items-start lg:flex-row lg:items-start lg:justify-between lg:px-16 xl:px-24 lg:pt-16 lg:gap-8">
          {/* Text column */}
          <div className="flex flex-col items-start lg:max-w-[50%] lg:pt-8">
            <h1 className="font-heading text-2xl lg:text-[56px] leading-none text-primary uppercase mb-2 lg:mb-6">
              {translate("about.heroTitle1")}
              <br />
              {translate("about.heroTitle2")}
            </h1>
            <div className="relative inline-flex items-center justify-center mb-3 lg:mb-6">
              <Image
                src="/images/yellow-ribbon.png"
                alt=""
                width={200}
                height={50}
                className="w-[180px] h-auto lg:hidden"
              />
              <Image
                src="/images/yellow-ribbon-desktop.png"
                alt=""
                width={400}
                height={80}
                className="hidden lg:block w-[320px] h-auto"
              />
              <p className="absolute font-heading text-2xl lg:text-[48px] leading-none text-[#14222F]">
                {translate("about.since")}
              </p>
            </div>
            {/* Mobile description */}
            <p className="font-body text-xs font-bold leading-tight text-[#14222F] mb-4 lg:hidden">
              {translate("about.sinceDescLine1")}
              <br />
              {translate("about.sinceDescLine2")}
              <br />
              {translate("about.sinceDescLine3")}
            </p>
            {/* Desktop description */}
            <p className="hidden lg:block font-body text-[32px] font-bold leading-[100%] text-[#14222F]">
              {translate("about.sinceDescDesktopLine1")}
              <br />
              {translate("about.sinceDescDesktopLine2")}
              <br />
              {translate("about.sinceDescDesktopLine3")}
            </p>
          </div>
          {/* Mobile image */}
          <Image
            src="/images/Origen-del-guero.png"
            alt={translate("about.heroImageAlt")}
            width={243}
            height={288}
            className="w-[243px] h-auto mx-auto lg:hidden"
          />

          {/* Desktop image */}
          <div className="hidden lg:flex lg:justify-end lg:items-end lg:max-w-[50%]">
            <Image
              src="/images/Origen-del-güero-desktop.png"
              alt={translate("about.heroImageAlt")}
              width={473}
              height={561}
              className="w-[473px] h-[561px] object-contain"
            />
          </div>
        </section>

        {/* Cantaritos El Güero #1 */}
        <section className="px-6 pt-6 flex flex-col items-start lg:flex-row lg:items-start lg:justify-between lg:px-16 xl:px-24 lg:pt-16 lg:gap-12">
          {/* Desktop image - left side */}
          <div className="hidden lg:block lg:max-w-[50%]">
            <Image
              src="/images/Group 80.png"
              alt={translate("about.gueroImageAlt")}
              width={371}
              height={418}
              className="w-[371px] h-[418px] object-contain"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col items-start lg:max-w-[50%]">
            <h2 className="font-heading text-2xl lg:text-[48px] leading-none text-primary uppercase mb-4 lg:mb-6">
              Cantaritos
              <br />
              El Güero #1
            </h2>

            {/* Mobile text */}
            <div className="lg:hidden">
              <div className="relative inline-flex flex-col mb-2">
                <p className="font-body text-xs font-bold leading-none text-[#14222F]">
                  {translate("about.gueroIntro")}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Group 10.svg"
                  alt=""
                  className="absolute -right-6 top-2 w-[20px] h-auto"
                />
                <p className="font-body text-base font-bold leading-none text-[#14222F] mt-4">
                  {translate("about.gueroQuote")}
                </p>
              </div>
              <p className="font-body text-xs font-medium leading-none text-[#14222F] mb-6">
                {translate("about.gueroDescLine1")}
                <br />
                {translate("about.gueroDescLine2")}
                <br />
                {translate("about.gueroDescLine3")}
              </p>
            </div>

            {/* Desktop text */}
            <div className="hidden lg:block">
              <p className="font-body text-[24px] font-medium leading-[100%] text-[#14222F] mb-4">
                {translate("about.gueroIntro")}
              </p>
              <div className="relative inline-block mb-4">
                <p className="font-body text-[32px] font-bold leading-[100%] text-[#14222F]">
                  {translate("about.gueroQuote")}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Group 10.svg"
                  alt=""
                  className="absolute -right-24 -top-4 -translate-y-1/2"
                  style={{ width: "109.115px", height: "73.77px" }}
                />
              </div>
              <p className="font-body text-[24px] font-medium leading-[100%] text-[#14222F]">
                {translate("about.gueroDescDesktopLine1")}
                <br />
                {translate("about.gueroDescDesktopLine2")}
              </p>
            </div>
          </div>

          {/* Mobile image */}
          <Image
            src="/images/celebration-agave.png"
            alt="Celebración con agave"
            width={300}
            height={350}
            className="w-[260px] h-auto self-center mb-8 lg:hidden"
          />
          <p className="font-body text-base font-bold leading-tight text-[#14222F] text-center self-center mb-6 lg:hidden">
            {translate("about.gueroClosing")}
          </p>
        </section>

        {/* Desktop guero closing */}
        <p className="hidden lg:block font-body text-[32px] font-bold leading-[100%] text-[#14222F] text-center py-12">
          {translate("about.gueroClosingDesktopLine1")}
          <br />
          {translate("about.gueroClosingDesktopLine2")}
        </p>

        {/* Y esa referencia, en ritual */}
        {/* Mobile version */}
        <section className="flex flex-col items-center lg:hidden">
          {/* Cinta roja con título */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <Image
              src="/images/red-ribbon.png"
              alt=""
              width={335}
              height={83}
              className="w-[335px] h-auto"
            />
            <p className="absolute font-heading text-2xl leading-none text-[#FFAF32] text-center -mt-5">
              {translate("about.ritualTitle")}
            </p>
          </div>

          {/* Cantarito Gigante */}
          <Image
            src="/images/cantarito-gigante.png"
            alt="Cantarito Gigante"
            width={322}
            height={391}
            className="w-[322px] h-auto mb-6 -mt-4"
          />

          {/* Textos descriptivos */}
          <div className="px-6 flex flex-col items-center w-full text-center">
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-4">
              {translate("about.ritualDesc1Line1")}
              <br />
              {translate("about.ritualDesc1Line2")}
              <br />
              {translate("about.ritualDesc1Line3")}
            </p>
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-4">
              {translate("about.ritualDesc2Line1")}
              <br />
              {translate("about.ritualDesc2Line2")}
            </p>
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-4">
              {translate("about.ritualDesc3")}
            </p>
            <p className="font-body text-xs font-medium leading-tight text-[#14222F] mb-6">
              {translate("about.ritualDesc4Line1")}
              <br />
              {translate("about.ritualDesc4Line2")}
            </p>
          </div>
        </section>

        {/* Desktop version */}
        <section className="hidden lg:flex flex-col items-center relative px-16 xl:px-24 pt-8">
          {/* Cinta roja con título */}
          <div className="relative inline-flex items-center justify-center mb-6 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/red-ribbon.svg"
              alt=""
              style={{ width: "708px", height: "161.501px" }}
            />
            <p className="absolute font-heading text-[48px] leading-[100%] text-[#FFAF32] text-center -mt-12">
              {translate("about.ritualTitle")}
            </p>
          </div>

          {/* Cantarito + textos posicionados */}
          <div className="relative w-full max-w-[800px] flex justify-center">
            {/* Cantarito Gigante */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cantarito-gigante.svg"
              alt="Cantarito Gigante"
              className="w-auto h-auto max-w-[600px] -mt-6"
            />

            {/* Texto 1 - arriba izquierda */}
            <p
              className="absolute font-body text-[24px] font-medium leading-[100%] text-[#14222F]"
              style={{ width: "348px", top: "-4%", left: "-5%" }}
            >
              {translate("about.ritualDesc1DesktopLine1")}
              <br />
              {translate("about.ritualDesc1DesktopLine2")}
              <br />
              {translate("about.ritualDesc1DesktopLine3")}
              <br />
              {translate("about.ritualDesc1DesktopLine4")}
            </p>

            {/* Texto 2 - derecha medio */}
            <p
              className="absolute font-body text-[24px] font-medium leading-[100%] text-[#14222F]"
              style={{ width: "296px", top: "25%", right: "-10%" }}
            >
              {translate("about.ritualDesc2DesktopLine1")}
              <br />
              {translate("about.ritualDesc2DesktopLine2")}
              <br />
              {translate("about.ritualDesc2DesktopLine3")}
              <br />
              {translate("about.ritualDesc2DesktopLine4")}
            </p>

            {/* Texto 3 - abajo izquierda */}
            <p
              className="absolute font-body text-[24px] font-medium leading-[100%] text-[#14222F]"
              style={{ width: "251px", bottom: "35%", left: "-5%" }}
            >
              {translate("about.ritualDesc3DesktopLine1")}
              <br />
              {translate("about.ritualDesc3DesktopLine2")}
            </p>

            {/* Texto 4 - abajo derecha */}
            <p
              className="absolute font-body text-[24px] font-medium leading-[100%] text-[#14222F]"
              style={{ width: "297px", bottom: "25%", right: "-14%" }}
            >
              {translate("about.ritualDesc4DesktopLine1")}
              <br />
              {translate("about.ritualDesc4DesktopLine2")}
              <br />
              {translate("about.ritualDesc4DesktopLine3")}
            </p>
          </div>
        </section>

        {/* La fórmula - Mobile */}
        <section className="px-6 py-6 text-center lg:hidden">
          <h2 className="font-heading text-2xl leading-none text-primary mb-6">
            {translate("about.formulaTitle")}
          </h2>

          {/* 4 pilares - grid 2x2 */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/cantarito-tradition.png"
                  alt={translate("about.pillarTradition")}
                  width={135}
                  height={167}
                  className="w-[135px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarTradition")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/dancing-women.png"
                  alt={translate("about.pillarAmbience")}
                  width={99}
                  height={149}
                  className="w-[99px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarAmbience")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/charisma-vendor.png"
                  alt={translate("about.pillarCharisma")}
                  width={100}
                  height={155}
                  className="w-[100px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarCharisma")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[167px] flex items-end justify-center mb-2">
                <Image
                  src="/images/tuba-musician.png"
                  alt={translate("about.pillarLiveMusic")}
                  width={127}
                  height={168}
                  className="w-[127px] h-auto"
                />
              </div>
              <p className="font-body text-base font-bold text-[#14222F]">
                {translate("about.pillarLiveMusic")}
              </p>
            </div>
          </div>
        </section>

        {/* La fórmula - Desktop */}
        <section className="hidden lg:block px-16 xl:px-24 py-12 text-center">
          <h2 className="font-heading text-[48px] leading-[100%] text-primary mb-12 mx-auto" style={{ width: "810px" }}>
            {translate("about.formulaTitleDesktopLine1")}
            <br />
            {translate("about.formulaTitleDesktopLine2")}
          </h2>

          {/* 4 pilares - grid 4 columnas */}
          <div className="grid grid-cols-4 gap-x-12 max-w-[1100px] mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-[220px] flex items-end justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cantarito-tradition.svg"
                  alt={translate("about.pillarTradition")}
                  className="w-[180px] h-auto"
                />
              </div>
              <p className="font-body text-[24px] font-bold text-[#14222F]">
                {translate("about.pillarTradition")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[220px] flex items-end justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dancing-women.svg"
                  alt={translate("about.pillarAmbience")}
                  className="w-[150px] h-auto"
                />
              </div>
              <p className="font-body text-[24px] font-bold text-[#14222F]">
                {translate("about.pillarAmbience")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[220px] flex items-end justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/charisma-vendor.svg"
                  alt={translate("about.pillarCharisma")}
                  className="w-[150px] h-auto"
                />
              </div>
              <p className="font-body text-[24px] font-bold text-[#14222F]">
                {translate("about.pillarCharisma")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[220px] flex items-end justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/tuba-musician.svg"
                  alt={translate("about.pillarLiveMusic")}
                  className="w-[170px] h-auto"
                />
              </div>
              <p className="font-body text-[24px] font-bold text-[#14222F]">
                {translate("about.pillarLiveMusic")}
              </p>
            </div>
          </div>
        </section>

        {/* Amatitán - Mobile */}
        <section className="flex flex-col items-center px-6 lg:hidden">
          <Image
            src="/images/amatitan-sign.png"
            alt="Señal de Amatitán"
            width={280}
            height={160}
            className="w-[240px] h-auto mb-8"
          />

          <p className="font-body text-xs font-medium leading-tight text-[#14222F] text-center mb-4">
            {translate("about.amatitanDesc1Line1")}
            <br />
            {translate("about.amatitanDesc1Line2")}
          </p>
          <p className="font-body text-xs font-medium leading-tight text-[#14222F] text-center mb-4">
            {translate("about.amatitanDesc2Line1")}
            <br />
            {translate("about.amatitanDesc2Line2")}
            <br />
            {translate("about.amatitanDesc2Line3")}
          </p>
          <p className="font-body text-base font-bold leading-tight text-primary text-center mb-6">
            {translate("about.amatitanClosingLine1")}
            <br />
            {translate("about.amatitanClosingLine2")}
          </p>

          {/* Banner verde */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <Image
              src="/images/green-banner.png"
              alt=""
              width={311}
              height={146}
              className="w-[311px] h-auto"
            />
            <p className="absolute font-body text-xs font-bold leading-none text-white text-center w-[233px] -mt-14">
              {translate("about.bannerLine1")} {translate("about.bannerLine2")} {translate("about.bannerLine3")}
            </p>
          </div>
        </section>

        {/* Amatitán - Desktop */}
        <section className="hidden lg:block px-16 xl:px-24 py-12">
          {/* Texto izquierda + imagen derecha */}
          <div className="flex items-start justify-between gap-12">
            <div className="flex flex-col items-start max-w-[50%]">
              <p className="font-body text-[24px] font-medium leading-[100%] text-[#14222F] mb-6">
                {translate("about.amatitanDesc1DesktopPre")}
                <strong className="font-bold">{translate("about.amatitanDesc1DesktopBoldLine1")}</strong>
              </p>
              <p className="font-body text-[24px] font-medium leading-[100%] text-[#14222F] mb-6">
                {translate("about.amatitanDesc2DesktopLine1")}
                <br />
                {translate("about.amatitanDesc2DesktopLine2")}
                <br />
                {translate("about.amatitanDesc2DesktopLine3")}
              </p>
              <p className="font-body text-[32px] font-bold leading-[100%] text-primary">
                {translate("about.amatitanClosingDesktopLine1")}
                <br />
                {translate("about.amatitanClosingDesktopLine2")}
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/amatitan-sign.svg"
              alt="Señal de Amatitán"
              style={{ width: "448px", height: "358.43px", marginTop: "-40px", marginLeft: "-0px" }}
            />
          </div>

          {/* Banner verde */}
          <div className="relative inline-flex items-center justify-center mt-10 w-full">
            <div className="relative flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/green-banner.svg"
                alt=""
                style={{ width: "640.51px", height: "281.34px" }}
              />
              <p className="absolute font-body text-[24px] font-bold leading-[100%] text-white text-center -mt-20">
                {translate("about.bannerLine1")}
                <br />
                {translate("about.bannerLine2")}
                <br />
                {translate("about.bannerLine3")}
              </p>
            </div>
          </div>
        </section>

        {/* Propósito */}
        <section
          className="bg-no-repeat bg-top bg-cover bg-[url('/images/Fondo_cerro-m.svg')] md:bg-[url('/images/Fondo_cerro.png')] max-w-[1440px] mx-auto aspect-[1440/872]"
        >
          <div className="flex flex-col items-center text-center mx-auto max-w-[355px] md:max-w-[1100px] px-4 pt-46 md:pt-80 pb-10">
            {/* Corazón + Propósito */}
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/heart.png"
                alt=""
                width={30}
                height={26}
                className="w-[30px] h-auto"
              />
              <h2 className="font-heading text-2xl md:text-[48px] leading-none md:leading-[100%] text-[#14222F] uppercase">
                {translate("about.purposeTitle")}
              </h2>
            </div>

            <p className="font-body text-xs font-medium leading-tight text-white mb-8 max-w-xs md:hidden">
              {translate("about.purposeDesc")}
            </p>
            <p className="hidden md:block font-body text-[24px] font-medium leading-[100%] text-white mb-14">
              {translate("about.purposeDescDesktopLine1")}
              <br />
              {translate("about.purposeDescDesktopLine2")}
              <br />
              {translate("about.purposeDescDesktopLine3")}
              <br />
              {translate("about.purposeDescDesktopLine4")}
            </p>

            {/* Mano saludando - solo mobile */}
            <Image
              src="/images/hand-wave.svg"
              alt=""
              width={50}
              height={40}
              className="w-[50px] h-auto mb-6 md:hidden"
            />

            {/* Alma de la fiesta con iconos a los lados en desktop */}
            <div className="hidden md:flex items-center gap-4">
              <Image
                src="/images/hand-wave.svg"
                alt=""
                width={155}
                height={125}
                className="w-[155px] h-auto flex-shrink-0"
              />

              <div className="text-center">
                <p className="font-body text-[32px] font-bold leading-[100%] text-white">
                  {translate("about.soulLine1")}
                  <br />
                  {translate("about.soulLine2")}
                </p>
                <p className="font-body text-[32px] font-bold leading-[100%] text-white mt-4">
                  {translate("about.soulGrowth")}
                </p>
              </div>

              <Image
                src="/images/boots.svg"
                alt=""
                width={162}
                height={160}
                className="w-[162px] h-auto flex-shrink-0"
              />
            </div>

            {/* Texto soul - solo mobile */}
            <p className="font-body text-base font-bold leading-tight text-white mb-4 md:hidden">
              {translate("about.soulLine1")}
              <br />
              {translate("about.soulLine2")}
            </p>

            <p className="font-body text-base font-bold leading-tight text-white mb-6 md:hidden">
              {translate("about.soulGrowth")}
            </p>

            {/* Bota vaquera - solo mobile */}
            <Image
              src="/images/boots.svg"
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-auto md:hidden"
            />
          </div>
        </section>

        {/* Mood cantarístico */}
        <section className="flex flex-col items-center gap-[33px] px-5 pt-10 pb-[60px] bg-primary">
          <h2 className="font-heading text-2xl md:text-[48px] leading-none md:leading-[100%] text-[#EDDCB6] text-center">
            {translate("about.moodTitle")}
          </h2>

          {/* Mobile: carrusel horizontal */}
          <div
            className="flex gap-3 overflow-x-auto w-full px-2 md:hidden scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
              <p className="text-white font-body">...</p>
            ) : (
              images.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="flex items-center justify-center w-[130px] h-[185px] p-[6px] shrink-0"
                >
                  {item.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageMobileUrl || item.imageUrl}
                      alt={getAlt(item, locale)}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Desktop: carrusel con flechas */}
          <div className="hidden md:flex items-center justify-center gap-6 w-full max-w-[1200px] mx-auto">
            <button onClick={() => scroll("left")} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/arrow-carousel-right.svg"
                alt="Previous"
                className="w-[40px] h-auto hover:scale-110 transition-transform"
              />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {loading ? (
                <p className="text-white font-body">...</p>
              ) : (
                images.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="flex items-center justify-center w-[190px] h-[273px] p-[10px] shrink-0 cursor-pointer"
                  >
                    {item.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={getAlt(item, locale)}
                        className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform"
                      />
                    )}
                  </button>
                ))
              )}
            </div>

            <button onClick={() => scroll("right")} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/arrow-carousel-left.svg"
                alt="Next"
                className="w-[40px] h-auto hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </section>

        {/* Modal de imagen */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.imageUrl || ""}
                alt={getAlt(selectedImage, locale)}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        )}
      </main>

      <OgFooter />
    </div>
  );
}
