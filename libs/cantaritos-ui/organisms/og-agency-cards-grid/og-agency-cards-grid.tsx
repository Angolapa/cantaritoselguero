"use client";

import { useEffect, useMemo, useState } from "react";

import { Search, SlidersHorizontal } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlAgencyCard } from "@/libs/cantaritos-ui/molecules";

import { OgAgencyCardsGridProps } from "./og-agency-cards-grid.types";

const BACKGROUND_COLOR = "#FFAF32";
const FILTER_BUTTON_COLOR = "#0E7C7B";
const LOAD_MORE_BG = "#14222F";
const MOBILE_BREAKPOINT = 1024;
const MOBILE_INITIAL_COUNT = 3;
const DESKTOP_INITIAL_COUNT = 9;
const MOBILE_LOAD_STEP = 3;
const DESKTOP_LOAD_STEP = 9;

export function OgAgencyCardsGrid({
  cards,
  isLoading = false,
  searchPlaceholder = "Buscar agencia",
}: OgAgencyCardsGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [visibleCount, setVisibleCount] = useState(DESKTOP_INITIAL_COUNT);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const updateViewport = (matches: boolean) => {
      setIsMobileViewport(matches);
      setVisibleCount(matches ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT);
    };

    updateViewport(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => updateViewport(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const filteredCards = useMemo(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm) return cards;
    return cards.filter((card) => {
      const haystack = [
        card.title,
        card.location,
        card.lodgingType,
        card.socialHandle ?? "",
        card.email ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(trimmedTerm);
    });
  }, [cards, searchTerm]);

  useEffect(() => {
    setVisibleCount(isMobileViewport ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT);
  }, [isMobileViewport, searchTerm]);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const hasMoreCards = visibleCount < filteredCards.length;

  const handleLoadMore = () => {
    const step = isMobileViewport ? MOBILE_LOAD_STEP : DESKTOP_LOAD_STEP;
    setVisibleCount((prev) => prev + step);
  };

  return (
    <section
      className="w-full"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 lg:px-8 lg:py-10">
        <div className="flex w-full items-center gap-3">
          <div className="flex-1">
            <AtInput
              placeholder={searchPlaceholder}
              value={searchTerm}
              onValueChange={setSearchTerm}
              startContent={<Search className="h-4 w-4 text-gray-400" />}
              classNames={{
                inputWrapper:
                  "bg-white h-11 rounded-2xl shadow-sm border border-white",
              }}
            />
          </div>
          <button
            type="button"
            aria-label="Filtros"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
            style={{ backgroundColor: FILTER_BUTTON_COLOR }}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {isLoading ? (
          <p className="mt-8 text-center text-sm text-white/90">
            Cargando agencias...
          </p>
        ) : filteredCards.length === 0 ? (
          <p className="mt-8 text-center text-sm text-white/90">
            No se encontraron agencias.
          </p>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCards.map((card) => (
                <MlAgencyCard key={card.id} card={card} />
              ))}
            </div>
            {hasMoreCards && (
              <div className="mt-8 flex justify-center lg:mt-10">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="font-heading inline-flex items-center justify-center gap-2 rounded-full text-white px-3 py-4 text-[12px] font-bold leading-none lg:px-6 lg:text-[24px] lg:leading-[24px]"
                  style={{ backgroundColor: LOAD_MORE_BG, fontFamily: "Roboto, sans-serif" }}
                >
                  Cargar más
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
