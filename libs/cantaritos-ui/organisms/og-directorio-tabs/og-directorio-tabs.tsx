"use client";

import { useTranslation } from "@/domain/stores";

import type { DirectorioTab } from "../og-directorio-hero/og-directorio-hero.types";
import type { OgDirectorioTabsProps } from "./og-directorio-tabs.types";

const INACTIVE_BG = "#FFAF32";
const TOURS_ACTIVE_BG = "#00A19E";
const HOSPEDAJE_ACTIVE_BG = "#E64927";
const TAB_TEXT = "#14222F";
const SLANT = "24px";
const HALF_SLANT = "12px";

export function OgDirectorioTabs({ activeTab, onTabChange }: OgDirectorioTabsProps) {
  const { translate } = useTranslation();

  const toursLabel = translate("directorio.tabs.tours");
  const hospedajeLabel = translate("directorio.tabs.hospedaje");

  const tabs: { id: DirectorioTab; label: string; activeBg: string }[] = [
    { id: "tours", label: toursLabel, activeBg: TOURS_ACTIVE_BG },
    { id: "hospedaje", label: hospedajeLabel, activeBg: HOSPEDAJE_ACTIVE_BG },
  ];

  const toursActive = activeTab === "tours";

  const toursSlashDown = `polygon(0 0, 100% 0, calc(100% - ${SLANT}) 100%, 0 100%)`;
  const toursSlashUp = `polygon(0 0, calc(100% - ${SLANT}) 0, 100% 100%, 0 100%)`;
  const hospSlashDown = `polygon(${SLANT} 0, 100% 0, 100% 100%, 0 100%)`;
  const hospSlashUp = `polygon(0 0, 100% 0, 100% 100%, ${SLANT} 100%)`;

  return (
    <div
      className="flex w-full overflow-hidden"
      role="tablist"
      aria-label={`${toursLabel} / ${hospedajeLabel}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isTours = tab.id === "tours";

        const clipPath = isTours
          ? toursActive
            ? toursSlashUp
            : toursSlashDown
          : toursActive
            ? hospSlashUp
            : hospSlashDown;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className="font-heading uppercase text-center leading-none text-[24px] lg:text-[56px] py-4 lg:py-8 transition-colors border-0 outline-none cursor-pointer block appearance-none"
            style={{
              width: `calc(50% + ${HALF_SLANT})`,
              marginLeft: isTours ? 0 : `-${SLANT}`,
              backgroundColor: isActive ? tab.activeBg : INACTIVE_BG,
              color: TAB_TEXT,
              clipPath,
              transform: "translateZ(0)",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
