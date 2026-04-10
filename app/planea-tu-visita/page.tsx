"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface MapZone {
  id: string;
  name: string;
  src: string;
  /** Native size in px, taken from Figma */
  width: number;
  height: number;
  /** Label lines rendered on top of the SVG. Empty/undefined → no label. */
  labelLines?: string[];
  /** Label text color: "light" = white on dark shapes, "dark" = #14222F on beige */
  labelColor?: "light" | "dark";
  /** Vertical offset (px) applied to the label, positive = move down */
  labelOffsetY?: number;
  /** Horizontal offset (px) applied to the label, positive = move right */
  labelOffsetX?: number;
  /** Photo to show on hover and inside the modal. Empty until uploaded. */
  photoUrl?: string;
}

const MAP_ZONES: Record<string, MapZone> = {
  spotFoto: {
    id: "spot-foto",
    name: "Spot pa' la foto",
    src: "/images/Mapa/SpotpalaFoto.svg",
    width: 468,
    height: 79,
    labelLines: ["Spot pa' la foto"],
    labelColor: "dark",
    photoUrl: "/images/Mapa/Fotos/Spot pa la foto.jpg",
  },
  coffe: {
    id: "coffe",
    name: "Cantarito Gigante",
    src: "/images/Mapa/coffe.svg",
    width: 60.499,
    height: 50.732,
    photoUrl: "/images/Mapa/Fotos/Cantarito Gigante.jpg",
  },
  banos: {
    id: "banos",
    name: "Baños",
    src: "/images/Mapa/Banos.svg",
    width: 69,
    height: 59,
    labelLines: ["Baños"],
    labelColor: "dark",
  },
  tiendita: {
    id: "tiendita",
    name: "Tiendita del Güero",
    src: "/images/Mapa/TienditadelGuero.svg",
    width: 101,
    height: 44,
    labelLines: ["Tiendita", "del Güero"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/Tiendita del Güero.jpg",
  },
  barra3: {
    id: "barra-3",
    name: "Barra 3",
    src: "/images/Mapa/Barra3.svg",
    width: 104,
    height: 105.579,
    labelLines: ["Barra 3"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/barra3.jpg",
  },
  zona2Palapas: {
    id: "zona-2-palapas",
    name: "Zona 2 de Palapas",
    src: "/images/Mapa/Zona2dePalapas.svg",
    width: 320,
    height: 228,
    labelLines: ["Zona 2", "de Palapas"],
    labelColor: "dark",
    labelOffsetY: 40,
    photoUrl: "/images/Mapa/Fotos/Zona 2 de palapas.jpg",
  },
  cantaresEstrella: {
    id: "cantares-estrella",
    name: "Cantares de Estrella",
    src: "/images/Mapa/CantaresdeEstrella.svg",
    width: 99.025,
    height: 63.741,
    labelLines: ["Cantares", "de Estrella"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/Cantares de Estrella.jpg",
  },
  cantaritoSpot: {
    id: "cantarito-spot",
    name: "Cantarito Spot de foto",
    src: "/images/Mapa/CantaritoSpotdefoto.svg",
    width: 128,
    height: 65,
    labelLines: ["Cantarito", "Spot de foto"],
    labelColor: "light",
  },
  zona1Cajas: {
    id: "zona-1-cajas",
    name: "Zona 1 de Cajas",
    src: "/images/Mapa/Zona1deCajas.svg",
    width: 130.297,
    height: 66.303,
    labelLines: ["Zona 1", "de Cajas"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/Zona de cajas.JPG",
  },
  botanas: {
    id: "botanas",
    name: "Botanas y Bebidas",
    src: "/images/Mapa/BotanasyBebidas.svg",
    width: 123.585,
    height: 61.256,
    labelLines: ["Botanas y", "Bebidas"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/entrega botanas.jpg",
  },
  barra1: {
    id: "barra-1",
    name: "Barra 1",
    src: "/images/Mapa/Barra1.svg",
    width: 131.936,
    height: 102.807,
    labelLines: ["Barra 1"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/barra 1.jpg",
  },
  estacionamiento: {
    id: "estacionamiento",
    name: "Estacionamiento",
    src: "/images/Mapa/Estacionamiento.svg",
    width: 189,
    height: 685,
    labelLines: ["Estacionamiento"],
    labelColor: "dark",
    photoUrl: "/images/Mapa/Fotos/estacionamiento.jpg",
  },
  segundaEntrada: {
    id: "segunda-entrada",
    name: "Segunda Entrada",
    src: "/images/Mapa/SegundaEntrada.svg",
    width: 121,
    height: 64,
    labelLines: ["Segunda", "Entrada"],
    labelColor: "dark",
  },
  zona2Cajas: {
    id: "zona-2-cajas",
    name: "Zona 2 de Cajas",
    src: "/images/Mapa/Zona2deCajas.svg",
    width: 118.452,
    height: 66.303,
    labelLines: ["Zona 2", "de Cajas"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/Zona 2 de Cajas.jpg",
  },
  zona1Palapas: {
    id: "zona-1-palapas",
    name: "Zona 1 de Palapas",
    src: "/images/Mapa/Zona1dePalapas.svg",
    width: 207,
    height: 272,
    labelLines: ["Zona 1", "de Palapas"],
    labelColor: "dark",
    photoUrl: "/images/Mapa/Fotos/Zona 1 de Palapas.jpg",
  },
  patio: {
    id: "patio",
    name: "Patio",
    src: "/images/Mapa/Patio.svg",
    width: 71,
    height: 68,
    labelLines: ["Patio"],
    labelColor: "dark",
    photoUrl: "/images/Mapa/Fotos/Patio.jpg",
  },
  restaurante: {
    id: "restaurante",
    name: "Restaurante",
    src: "/images/Mapa/Restaurante.svg",
    width: 113.609,
    height: 131,
    labelLines: ["Restaurante"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/Restaurante.jpg",
  },
  barra2: {
    id: "barra-2",
    name: "Barra 2",
    src: "/images/Mapa/Barra2.svg",
    width: 105.787,
    height: 130.371,
    labelLines: ["Barra 2"],
    labelColor: "light",
    photoUrl: "/images/Mapa/Fotos/barra 2.jpg",
  },
  entradaPrincipal: {
    id: "entrada-principal",
    name: "Entrada Principal",
    src: "/images/Mapa/EntradaPrincipal.svg",
    width: 195,
    height: 49,
    labelLines: ["Entrada Principal"],
    labelColor: "dark",
    photoUrl: "/images/Mapa/Fotos/Entrada Principal.jpg",
  },
  entrada: {
    id: "entrada",
    name: "Entrada Estacionamiento",
    src: "/images/Mapa/Entrada.svg",
    width: 153,
    height: 52,
  },
  carretera: {
    id: "carretera",
    name: "Carretera Internacional",
    src: "/images/Mapa/Carretera.svg",
    width: 750,
    height: 71.43,
    labelLines: [
      "Carretera internacional, Carr. Guadalajara - Tepic km 49 #4970, La Meza, 45380 Amatitán, Jal.",
    ],
    labelColor: "dark",
  },
};

// Base canvas dimensions (matches the Figma frame). The grid container scales
// proportionally and every tile is rendered at width/height in CSS px so it
// scales together with the canvas via the wrapper's transform.
const MAP_CANVAS_WIDTH = 800;

const MAP_GRID_AREAS = `
  "estacionamiento spotFoto         spotFoto         spotFoto         spotFoto"
  "estacionamiento zona2Palapas     zona2Palapas     coffe            banos"
  "estacionamiento zona2Palapas     zona2Palapas     .                tiendita"
  "estacionamiento zona2Palapas     zona2Palapas     .                barra3"
  "estacionamiento cantaresEstrella cantaritoSpot    .                zona2Cajas"
  "estacionamiento zona1Cajas       zona1Palapas     zona1Palapas     restaurante"
  "estacionamiento botanas          zona1Palapas     zona1Palapas     restaurante"
  "estacionamiento barra1           zona1Palapas     zona1Palapas     barra2"
  ".               entrada          entradaPrincipal entradaPrincipal ."
  "carretera       carretera        carretera        carretera        carretera"
  "guadalajara     guadalajara      .                tequila          tequila"
`;

import useEmblaCarousel from "embla-carousel-react";

import { OgFooter, OgNavbar } from "@/libs/cantaritos-ui";
import { useBanners } from "@/domain/hooks/banners";
import { useLocaleStore, useTranslation } from "@/domain/stores";

export default function PlaneaTuVisitaPage() {
  const { translate } = useTranslation();
  const locale = useLocaleStore((state) => state.locale);
  const tipsBannerSection =
    locale === "es" ? "plan-visit-carousel" : "plan-visit-carousel-en";
  const { data: tipsBanners = [], isLoading: isLoadingTipsBanners } =
    useBanners({ section: tipsBannerSection, active: true });

  const [selectedZone, setSelectedZone] = useState<MapZone | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const renderZoneTile = (
    zone: MapZone,
    gridAreaName: string,
    extraStyle?: React.CSSProperties,
  ) => {
    const isHovered = hoveredZoneId === zone.id;
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={zone.name}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedZone(zone);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setSelectedZone(zone);
          }
        }}
        onMouseEnter={() => setHoveredZoneId(zone.id)}
        onMouseLeave={() => setHoveredZoneId(null)}
        className="relative cursor-pointer transition-transform duration-150 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-[#FD710C] flex items-center justify-center"
        style={{ gridArea: gridAreaName, ...extraStyle }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={zone.src}
          alt={zone.name}
          width={zone.width}
          height={zone.height}
          className="block pointer-events-none select-none"
          style={{ width: `${zone.width}px`, height: `${zone.height}px` }}
        />
        {zone.labelLines && zone.labelLines.length > 0 ? (
          <span
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-center"
            style={{
              fontFamily: 'var(--font-roboto-condensed), "Roboto Condensed", Roboto, sans-serif',
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "100%",
              color: zone.labelColor === "dark" ? "#14222F" : "#FFFFFF",
              padding: "4px",
              transform: `translate(${zone.labelOffsetX ?? 0}px, ${zone.labelOffsetY ?? 0}px)`,
            }}
          >
            <span>
              {zone.labelLines.map((line, idx) => (
                <span
                  key={idx}
                  className="block"
                  style={{ marginTop: idx > 0 ? "2px" : 0 }}
                >
                  {line}
                </span>
              ))}
            </span>
          </span>
        ) : null}
        {isHovered && zone.photoUrl ? (
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-30 block w-[180px] rounded-lg overflow-hidden shadow-lg ring-2 ring-[#FD710C] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zone.photoUrl}
              alt={zone.name}
              className="block w-full h-auto"
            />
            <span className="block px-2 py-1 text-[11px] font-body font-bold text-[#14222F] text-center">
              {zone.name}
            </span>
          </span>
        ) : null}
      </div>
    );
  };

  const [tipsEmblaRef, tipsEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrevTips = useCallback(() => {
    tipsEmblaApi?.scrollPrev();
  }, [tipsEmblaApi]);

  const scrollNextTips = useCallback(() => {
    tipsEmblaApi?.scrollNext();
  }, [tipsEmblaApi]);

  useEffect(() => {
    if (!tipsEmblaApi) return;
    tipsEmblaApi.reInit();
  }, [tipsEmblaApi, tipsBanners.length]);

  return (
    <div className="min-h-screen bg-[#EDDCB6] flex flex-col overflow-x-hidden">
      <OgNavbar />

      <main className="flex-1">
        {/* Section 1: Planea tu visita */}
        <section className="relative w-full bg-white overflow-hidden">
          {/* Teal curved background — inline SVG stretched to fill the section */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1440 1351"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M1234.57 1263.95C1321.54 1247.52 1407.51 1254.56 1440 1269.59L1440 0.00012207L-2.99988 -4.08075e-06L-2.99999 1263.95C36.3197 1277.88 136.452 1306.22 293.397 1306.22C483.849 1306.22 618.987 1235.17 803.72 1236.1C885.515 1236.51 859.82 1314.16 915.682 1338.62C1021.19 1384.81 1135.26 1282.72 1234.57 1263.95Z"
              fill="#00A19E"
            />
          </svg>
          <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-8 md:pt-12 xl:pt-16 pb-56 md:pb-72 xl:pb-96">
            {/* Title */}
            <div className="flex items-center justify-center gap-3 mb-6 md:mb-10 xl:mb-16">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[86px] leading-[100%] text-[#14222F] uppercase text-center">
                {translate("planVisit.title")}
              </h1>
            </div>

            {/* Dotted arrow curve from title down to first speech bubble */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dotted-arrow-curve.svg"
              alt=""
              aria-hidden
              className="absolute right-[8%] md:right-[10%] lg:right-[12%] xl:right-[13%] top-[8%] md:top-[4%] xl:top-[5%] w-[80px] md:w-[140px] lg:w-[190px] xl:w-[258px] h-auto pointer-events-none"
            />

            {/* Speech bubble row 1: cantarito with orange speech */}
            <div className="relative flex justify-center mt-20 md:mt-16 lg:mt-20 xl:mt-28 mb-6 md:mb-10 xl:mb-12">
              <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[568px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cantarito-speech-orange.svg"
                  alt=""
                  className="w-full h-auto"
                />
                <p className="absolute top-[16%] right-[5%] w-[42%] font-body text-[10px] sm:text-xs md:text-base lg:text-xl xl:text-2xl font-bold leading-[100%] text-[#14222F] text-left">
                  {translate("planVisit.speech1Line1")}
                  <br />
                  {translate("planVisit.speech1Line2")}
                </p>
              </div>
            </div>

            {/* Speech bubble row 2: cantarito with green speech */}
            <div className="relative flex justify-center mb-6 md:mb-10 xl:mb-12">
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[600px] xl:max-w-[655px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cantarito-speech-green.svg"
                  alt=""
                  className="w-full h-auto"
                />
                <p className="absolute top-[48%] left-[14%] w-[52%] font-body text-[10px] sm:text-xs md:text-base lg:text-xl xl:text-2xl font-bold leading-[100%] text-[#14222F] text-left">
                  {translate("planVisit.speech2Line1")}
                  <br />
                  {translate("planVisit.speech2Line2")}
                </p>
              </div>
            </div>

            {/* OJO eyes warning */}
            <div className="flex items-center justify-start md:justify-center lg:justify-start gap-3 mb-8 md:mb-12 xl:mb-16 -mt-20 md:-mt-12 lg:-mt-32 xl:-mt-32 -ml-3 md:ml-0 lg:pl-[10%] xl:pl-[18%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ojo-eyes-trail.svg"
                alt=""
                className="w-[140px] md:w-[200px] lg:w-[260px] xl:w-[360px] h-auto"
              />
              <span className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-[56px] leading-[100%] text-[#14222F] mt-16 md:mt-16 lg:mt-24 xl:mt-40 self-start">
                {translate("planVisit.ojoLabel")}
              </span>
            </div>

            {/* Three info icons */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-12 max-w-[900px] mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="h-[60px] md:h-[90px] lg:h-[110px] xl:h-[120px] flex items-end justify-center mb-4 md:mb-6 xl:mb-8">
                  <Image
                    src="/images/calendar-icon.svg"
                    alt=""
                    width={109}
                    height={104}
                    className="w-[50px] md:w-[80px] lg:w-[95px] xl:w-[109px] h-auto"
                  />
                </div>
                <p className="font-body text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl font-bold leading-[100%] text-white text-center">
                  {translate("planVisit.infoHoursLine1")}
                  <br />
                  {translate("planVisit.infoHoursLine2")}
                  <br />
                  {translate("planVisit.infoHoursLine3")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-[60px] md:h-[90px] lg:h-[110px] xl:h-[120px] flex items-end justify-center mb-4 md:mb-6 xl:mb-8">
                  <Image
                    src="/images/trumpet-icon.svg"
                    alt=""
                    width={210}
                    height={129}
                    className="w-[70px] md:w-[110px] lg:w-[140px] xl:w-[160px] h-auto"
                  />
                </div>
                <p className="font-body text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl font-bold leading-[100%] text-white text-center">
                  {translate("planVisit.infoMusicLine1")}
                  <br />
                  {translate("planVisit.infoMusicLine2")}
                  <br />
                  {translate("planVisit.infoMusicLine3")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-[60px] md:h-[90px] lg:h-[110px] xl:h-[120px] flex items-end justify-center mb-4 md:mb-6 xl:mb-8">
                  <Image
                    src="/images/warning-triangle.svg"
                    alt=""
                    width={104}
                    height={90}
                    className="w-[45px] md:w-[70px] lg:w-[88px] xl:w-[100px] h-auto"
                  />
                </div>
                <p className="font-body text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl font-bold leading-[100%] text-white text-center">
                  {translate("planVisit.infoNoFranchiseLine1")}
                  <br />
                  {translate("planVisit.infoNoFranchiseLine2")}
                  <br />
                  {translate("planVisit.infoNoFranchiseLine3")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tips esenciales header */}
        <section className="bg-white pt-8 md:pt-12 xl:pt-16 pb-10 md:pb-16 xl:pb-20 -mt-px">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-6 md:gap-10 xl:gap-16 text-center md:text-left">
              {/* Title */}
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl xl:text-[56px] leading-[100%] text-[#14222F] uppercase">
                {translate("planVisit.tipsTitleLine1")}
                <br />
                {translate("planVisit.tipsTitleLine2")}
              </h2>

              {/* Green starburst with subtitle */}
              <div className="relative inline-flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/green-starburst-banner.svg"
                  alt=""
                  className="w-[260px] md:w-[340px] lg:w-[400px] xl:w-[446px] h-auto"
                />
                <p className="absolute font-body text-[12px] md:text-base lg:text-xl xl:text-2xl font-bold leading-[100%] text-[#14222F] text-center px-6">
                  {translate("planVisit.tipsSubtitleLine1")}
                  <br />
                  {translate("planVisit.tipsSubtitleLine2")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Tips banner carousel */}
        <section className="bg-white pb-12 md:pb-20 xl:pb-28">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="relative">
              {/* Left arrow — hidden on mobile */}
              <button
                type="button"
                onClick={scrollPrevTips}
                aria-label="Anterior"
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/arrow-orange-left.svg"
                  alt=""
                  className="w-[28px] md:w-[36px] xl:w-[47px] h-auto"
                />
              </button>

              {/* Embla viewport */}
              <div
                className="overflow-hidden mx-0 md:mx-14 xl:mx-20"
                ref={tipsEmblaRef}
              >
                {isLoadingTipsBanners ? (
                  <div className="flex gap-4 md:gap-6 xl:gap-8">
                    <div className="w-[310px] h-[389px] md:w-[420px] md:h-[514px] xl:w-[504px] xl:h-[614px] bg-gray-100 animate-pulse rounded-2xl shrink-0" />
                  </div>
                ) : tipsBanners.length === 0 ? (
                  <p className="text-center text-sm text-gray-400 font-body py-10">
                    No hay tips disponibles.
                  </p>
                ) : (
                  <div className="flex gap-4 md:gap-6 xl:gap-8">
                    {tipsBanners.map((banner) =>
                      banner.imageUrl ? (
                        <div
                          key={banner.id}
                          className="shrink-0 basis-[85%] md:basis-1/2"
                        >
                          {/* Mobile image (uses imageMobileUrl if available, fallback to imageUrl) */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={banner.imageMobileUrl || banner.imageUrl}
                            alt={banner.altText}
                            className="w-[310px] h-[389px] object-cover rounded-2xl mx-auto md:hidden"
                          />
                          {/* Desktop image */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={banner.imageUrl}
                            alt={banner.altText}
                            className="hidden md:block md:w-[420px] md:h-[514px] xl:w-[504px] xl:h-[614px] object-cover rounded-2xl mx-auto"
                          />
                        </div>
                      ) : null,
                    )}
                  </div>
                )}
              </div>

              {/* Right arrow — hidden on mobile */}
              <button
                type="button"
                onClick={scrollNextTips}
                aria-label="Siguiente"
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/arrow-orange-right.svg"
                  alt=""
                  className="w-[28px] md:w-[36px] xl:w-[47px] h-auto"
                />
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Mapa Visual de instalaciones del Güero */}
        <section className="bg-white pt-8 md:pt-12 xl:pt-16 pb-4 md:pb-6 xl:pb-8">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            {/* Mobile layout */}
            <div className="flex flex-col items-center md:hidden">
              {/* Title */}
              <h2
                className="font-heading text-[#14222F] text-center"
                style={{
                  fontSize: "24px",
                  lineHeight: "100%",
                  fontWeight: 400,
                }}
              >
                {translate("planVisit.mapTitleMobileLine1")}
                <br />
                {translate("planVisit.mapTitleMobileLine2")}
              </h2>

              {/* Confused cantarito with speech bubble */}
              <div
                className="relative mt-6"
                style={{ width: "243px", height: "192.29px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cantarito-confused-questions.svg"
                  alt=""
                  className="block"
                  style={{ width: "243px", height: "192.29px" }}
                />
                <p
                  className="absolute font-body font-bold text-[#14222F] text-right"
                  style={{
                    width: "150px",
                    top: "12px",
                    right: "60px",
                    fontSize: "12px",
                    lineHeight: "100%",
                  }}
                >
                  {translate("planVisit.mapSpeechMobileLine1")}
                  <br />
                  {translate("planVisit.mapSpeechMobileLine2")}
                  <br />
                  {translate("planVisit.mapSpeechMobileLine3")}
                </p>
              </div>

              {/* Description + arrow */}
              <div className="mt-6 w-full flex items-start gap-3">
                <p className="font-body text-sm font-medium leading-[120%] text-[#14222F] text-left">
                  {translate("planVisit.mapDescLine1")}
                  <br />
                  {translate("planVisit.mapDescLine2")}
                  <br />
                  {translate("planVisit.mapDescLine3")}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/orange-curve-arrow.svg"
                  alt=""
                  aria-hidden
                  className="w-[60px] h-auto mt-2 pointer-events-none shrink-0"
                />
              </div>
            </div>

            {/* Desktop layout */}
            <div className="relative hidden md:flex md:flex-row md:items-start md:justify-center gap-6 md:gap-[98px]">
              {/* Left column: title + description */}
              <div className="relative">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-[100%] text-[#14222F]">
                  {translate("planVisit.mapTitleLine1")}
                  <br />
                  {translate("planVisit.mapTitleLine2")}
                  <br />
                  {translate("planVisit.mapTitleLine3")}
                </h2>

                <p className="mt-6 md:mt-[60px] md:ml-[50px] font-body text-sm md:text-base xl:text-base font-medium leading-[100%] text-[#14222F] max-w-[200px]">
                  {translate("planVisit.mapDescLine1")}
                  <br />
                  {translate("planVisit.mapDescLine2")}
                  <br />
                  {translate("planVisit.mapDescLine3")}
                </p>

                {/* Orange curve arrow pointing down from the description */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/orange-curve-arrow.svg"
                  alt=""
                  aria-hidden
                  className="absolute left-[60%] top-[80%] w-[80px] md:w-[100px] xl:w-[120px] h-auto pointer-events-none"
                />
              </div>

              {/* Right column: confused cantarito with speech bubble (single SVG) */}
              <div className="relative flex justify-end">
                <div
                  className="relative"
                  style={{ width: "356px", height: "344px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/cantarito-confused-questions.svg"
                    alt=""
                    className="block"
                    style={{ width: "356px", height: "344px" }}
                  />
                  <p
                    className="absolute font-body font-bold text-[#14222F] text-left"
                    style={{
                      width: "293px",
                      top: "20px",
                      right: "20px",
                      fontSize: "24px",
                      lineHeight: "100%",
                    }}
                  >
                    {translate("planVisit.mapSpeechLine1")}
                    <br />
                    {translate("planVisit.mapSpeechLine2")}
                    <br />
                    {translate("planVisit.mapSpeechLine3")}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Mapa interactivo del lugar */}
        <section className="bg-white pb-12 md:pb-20 xl:pb-28">
          {/* Mountains-stars banner (top of map section) — clickable Amatitán photo */}
          <div className="mb-[24px] flex justify-center">
            <button
              type="button"
              onClick={() =>
                setSelectedZone({
                  id: "amatitan",
                  name: "Amatitán",
                  src: "/images/mountains-stars-teal-banner.svg",
                  width: 543,
                  height: 0,
                  photoUrl: "/images/Mapa/Fotos/Amatitán.jpg",
                })
              }
              aria-label="Amatitán"
              className="w-full max-w-[543px] cursor-pointer transition-transform duration-150 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#FD710C] rounded-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mountains-stars-teal-banner.svg"
                alt="Amatitán"
                className="w-full h-auto pointer-events-none"
              />
            </button>
          </div>

          <div className="mx-auto px-5 sm:px-6 md:px-10">
            {/*
              Responsive wrapper. The native canvas is 710 × 946 (sum of grid
              columns/rows + gaps, including the directions row at the bottom).
              We use CSS container queries: the outer div sets
              `container-type: inline-size` and reserves space via
              `aspect-ratio`; the inner grid keeps its native size and is
              scaled with `transform: scale(100cqw / 710)` so every tile
              shrinks together with the container, preserving the desktop
              layout exactly. On screens narrower than 710px the grid
              shrinks; above 710px it stays at native size.
            */}
            <div
              style={{
                containerType: "inline-size",
                width: "100%",
                maxWidth: "710px",
                aspectRatio: "710 / 946",
                margin: "0 auto",
                position: "relative",
                // `overflow-x: clip` recorta horizontalmente (Carretera 750px)
                // pero permite que `overflow-y: visible` deje salir el preview
                // que aparece arriba de cada zona en hover.
                overflowX: "clip",
                overflowY: "visible",
              }}
            >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "710px",
                height: "946px",
                transform: "scale(calc(100cqi / 710px))",
                transformOrigin: "top left",
                display: "grid",
                // Column widths derived from each piece's native size:
                //   1: Estacionamiento (189) | 2-3: Zona 2 Palapas (320 → 161+159)
                //   4: Coffe (60) | 5: Tiendita/Barra 3/Z2 Cajas/Restaurante (~121)
                gridTemplateColumns: "189px 161px 159px 60px 121px",
                // Row heights tuned so each row fits its tallest tile and the
                // big spans (Estacionamiento 685, Zona 2 Palapas 228,
                // Zona 1 Palapas 272) line up exactly:
                //   row1=79 Spot, row2=60 Baños, row3=58 (filler/Tiendita),
                //   row4=110 Barra 3, row5=66 Cantares/Cantarito/Z2 Cajas,
                //   row6=80 (tighter so cantarito-spot↔zona1-palapas gap ≈ 13px),
                //   row7=102 (Restaurante 131 spans 6-7 = 182),
                //   row8=130 Barra 2, row9=52 Entrada,
                //   row10=99 Carretera (71.43 image + 27px top space → 33px gap from entrada),
                //   row11=50 Guadalajara/Tequila directions (40px arrow + ~24px text)
                gridTemplateRows:
                  "79px 60px 58px 110px 66px 80px 102px 130px 52px 99px 50px",
                gridTemplateAreas: MAP_GRID_AREAS,
                placeItems: "center",
                // columnGap tuned so the visible gap between Zona 1 de Cajas
                // (centered in col 2) and Zona 1 de Palapas (centered across
                // cols 3-4) lands at ~28.27px, matching the Figma spec.
                columnGap: "5px",
                rowGap: "6px",
              }}
            >
              {renderZoneTile(MAP_ZONES.spotFoto, "spotFoto")}
              {renderZoneTile(MAP_ZONES.coffe, "coffe")}
              {renderZoneTile(MAP_ZONES.banos, "banos")}
              {renderZoneTile(MAP_ZONES.tiendita, "tiendita")}
              {renderZoneTile(MAP_ZONES.barra3, "barra3")}
              {renderZoneTile(MAP_ZONES.zona2Palapas, "zona2Palapas")}
              {renderZoneTile(MAP_ZONES.cantaresEstrella, "cantaresEstrella")}
              {renderZoneTile(MAP_ZONES.cantaritoSpot, "cantaritoSpot")}
              {renderZoneTile(MAP_ZONES.zona1Cajas, "zona1Cajas")}
              {renderZoneTile(MAP_ZONES.botanas, "botanas")}
              {renderZoneTile(MAP_ZONES.barra1, "barra1")}
              {renderZoneTile(MAP_ZONES.zona2Cajas, "zona2Cajas")}
              {renderZoneTile(MAP_ZONES.restaurante, "restaurante")}
              {renderZoneTile(MAP_ZONES.barra2, "barra2")}
              {renderZoneTile(MAP_ZONES.entrada, "entrada")}
              {renderZoneTile(MAP_ZONES.entradaPrincipal, "entradaPrincipal")}
              {renderZoneTile(MAP_ZONES.carretera, "carretera", {
                alignSelf: "end",
              })}

              {/* Direction: Guadalajara (left) */}
              <div
                className="flex items-center justify-start gap-2 pointer-events-none select-none"
                style={{ gridArea: "guadalajara", justifySelf: "start" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/arrow-left-guadalajara.svg"
                  alt=""
                  width={47}
                  height={40}
                  className="block shrink-0"
                  style={{ width: "47px", height: "40px" }}
                />
                <span
                  className="text-center"
                  style={{
                    fontFamily:
                      'var(--font-roboto-condensed), "Roboto Condensed", Roboto, sans-serif',
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "#000",
                  }}
                >
                  Guadalajara
                  <br />
                  <span style={{ display: "inline-block", marginTop: "4px" }}>
                    a 45 min
                  </span>
                </span>
              </div>

              {/* Direction: Tequila (right) */}
              <div
                className="flex items-center justify-end gap-2 pointer-events-none select-none"
                style={{ gridArea: "tequila", justifySelf: "end" }}
              >
                <span
                  className="text-center"
                  style={{
                    fontFamily:
                      'var(--font-roboto-condensed), "Roboto Condensed", Roboto, sans-serif',
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "#000",
                  }}
                >
                  Tequila, Jalisco
                  <br />
                  <span style={{ display: "inline-block", marginTop: "4px" }}>
                    Pueblo mágico a 15 min
                  </span>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/arrow-right-tequila.svg"
                  alt=""
                  width={47}
                  height={40}
                  className="block shrink-0"
                  style={{ width: "47px", height: "40px" }}
                />
              </div>

              {/* Estacionamiento (parent grid containing Segunda Entrada) */}
              <div
                role="button"
                tabIndex={0}
                aria-label={MAP_ZONES.estacionamiento.name}
                onClick={() => setSelectedZone(MAP_ZONES.estacionamiento)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedZone(MAP_ZONES.estacionamiento);
                  }
                }}
                onMouseEnter={() =>
                  setHoveredZoneId(MAP_ZONES.estacionamiento.id)
                }
                onMouseLeave={() => setHoveredZoneId(null)}
                className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FD710C]"
                style={{
                  gridArea: "estacionamiento",
                  width: `${MAP_ZONES.estacionamiento.width}px`,
                  height: `${MAP_ZONES.estacionamiento.height}px`,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gridTemplateRows: "1fr 1fr 1fr",
                  gridTemplateAreas: `". . ." ". . segundaEntrada" ". . ."`,
                  placeItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MAP_ZONES.estacionamiento.src}
                  alt={MAP_ZONES.estacionamiento.name}
                  width={MAP_ZONES.estacionamiento.width}
                  height={MAP_ZONES.estacionamiento.height}
                  className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    width: `${MAP_ZONES.estacionamiento.width}px`,
                    height: `${MAP_ZONES.estacionamiento.height}px`,
                  }}
                />
                {/* Estacionamiento label (top of the column) */}
                <span
                  className="absolute left-0 right-0 text-center pointer-events-none select-none"
                  style={{
                    top: "160px",
                    fontFamily: 'var(--font-roboto-condensed), "Roboto Condensed", Roboto, sans-serif',
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "#14222F",
                    zIndex: 1,
                  }}
                >
                  Estacionamiento
                </span>
                {/* Entrada Estacionamiento label (bottom of the column) */}
                <span
                  className="absolute left-0 right-0 text-center pointer-events-none select-none"
                  style={{
                    bottom: "20px",
                    fontFamily: 'var(--font-roboto-condensed), "Roboto Condensed", Roboto, sans-serif',
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "#14222F",
                    zIndex: 1,
                  }}
                >
                  Entrada
                  <br />
                  Estacionamiento
                </span>
                {renderZoneTile(MAP_ZONES.segundaEntrada, "segundaEntrada", {
                  zIndex: 2,
                })}
              </div>

              {/* Zona 1 de Palapas (parent grid containing Patio) */}
              <div
                role="button"
                tabIndex={0}
                aria-label={MAP_ZONES.zona1Palapas.name}
                onClick={() => setSelectedZone(MAP_ZONES.zona1Palapas)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedZone(MAP_ZONES.zona1Palapas);
                  }
                }}
                onMouseEnter={() =>
                  setHoveredZoneId(MAP_ZONES.zona1Palapas.id)
                }
                onMouseLeave={() => setHoveredZoneId(null)}
                className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FD710C]"
                style={{
                  gridArea: "zona1Palapas",
                  width: `${MAP_ZONES.zona1Palapas.width}px`,
                  height: `${MAP_ZONES.zona1Palapas.height}px`,
                  display: "grid",
                  gridTemplateColumns: "1fr 0.9fr 1.1fr",
                  gridTemplateRows: "1.3fr 0.7fr 1fr",
                  gridTemplateAreas: `". . patio" ". . ." ". . ."`,
                  placeItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MAP_ZONES.zona1Palapas.src}
                  alt={MAP_ZONES.zona1Palapas.name}
                  width={MAP_ZONES.zona1Palapas.width}
                  height={MAP_ZONES.zona1Palapas.height}
                  className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    width: `${MAP_ZONES.zona1Palapas.width}px`,
                    height: `${MAP_ZONES.zona1Palapas.height}px`,
                  }}
                />
                {/* Zona 1 de Palapas label */}
                <span
                  className="absolute text-center pointer-events-none select-none"
                  style={{
                    left: "0",
                    right: "60px",
                    bottom: "70px",
                    fontFamily:
                      'var(--font-roboto-condensed), "Roboto Condensed", Roboto, sans-serif',
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "#14222F",
                    zIndex: 1,
                  }}
                >
                  Zona 1
                  <br />
                  <span style={{ display: "inline-block", marginTop: "2px" }}>
                    de Palapas
                  </span>
                </span>
                {renderZoneTile(MAP_ZONES.patio, "patio", { zIndex: 2 })}
              </div>
            </div>
            </div>
          </div>

          {/* Invite (bottom): "El lugar es grande..." — Mobile */}
          <div className="md:hidden max-w-[820px] mx-auto px-5 sm:px-6 mt-8">
            <div className="flex items-center" style={{ gap: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/map-pin-clouds-icon.svg"
                alt=""
                aria-hidden
                className="block shrink-0 w-[90px] h-auto"
                style={{ marginTop: "28px" }}
              />
              <p
                className="font-body text-[#14222F]"
                style={{
                  marginLeft: "-10px",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                }}
              >
                {translate("planVisit.mapInviteMobileLine1")}
                <br />
                <span style={{ display: "inline-block", marginTop: "6px" }}>
                  {translate("planVisit.mapInviteMobileLine2")}
                </span>
                <br />
                <span style={{ display: "inline-block", marginTop: "2px" }}>
                  {translate("planVisit.mapInviteMobileLine3")}
                </span>
              </p>
            </div>
          </div>

          {/* Invite (bottom): "El lugar es grande..." — Desktop */}
          <div className="hidden md:block max-w-[820px] mx-auto px-5 sm:px-6 md:px-10 mt-10 xl:mt-12">
            <div className="flex items-center" style={{ gap: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/map-pin-clouds-icon.svg"
                alt=""
                aria-hidden
                className="block shrink-0 w-[160px] xl:w-[200px] h-auto"
                style={{ marginTop: "30px" }}
              />
              <p
                className="font-body text-[#14222F]"
                style={{
                  width: "620px",
                  maxWidth: "100%",
                  marginLeft: "-30px",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 2.4vw, 24px)",
                  lineHeight: "100%",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("planVisit.mapInviteLine1")}
                <br />
                <span style={{ display: "inline-block", marginTop: "8px" }}>
                  {translate("planVisit.mapInviteLine2")}
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modal: enlarged zone photo */}
      {selectedZone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedZone(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedZone(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
              aria-label="Cerrar"
            >
              &times;
            </button>
            {selectedZone.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedZone.photoUrl}
                alt={selectedZone.name}
                className="w-full h-auto rounded-xl"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-xl bg-[#EDDCB6] flex items-center justify-center">
                <p className="font-body text-[#14222F] text-lg font-bold text-center px-4">
                  {selectedZone.name}
                  <br />
                  <span className="font-medium text-sm opacity-70">
                    (Foto pendiente)
                  </span>
                </p>
              </div>
            )}
            <p className="mt-4 text-white text-center font-body font-bold text-lg">
              {selectedZone.name}
            </p>
          </div>
        </div>
      )}

      <OgFooter />
    </div>
  );
}
