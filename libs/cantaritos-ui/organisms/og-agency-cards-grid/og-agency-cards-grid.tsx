"use client";

import { useMemo, useState } from "react";

import { Search, SlidersHorizontal } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlAgencyCard } from "@/libs/cantaritos-ui/molecules";

import { OgAgencyCardsGridProps } from "./og-agency-cards-grid.types";

const BACKGROUND_COLOR = "#FFAF32";
const FILTER_BUTTON_COLOR = "#0E7C7B";

export function OgAgencyCardsGrid({
  cards,
  isLoading = false,
  searchPlaceholder = "Buscar agencia",
}: OgAgencyCardsGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

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
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <MlAgencyCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
