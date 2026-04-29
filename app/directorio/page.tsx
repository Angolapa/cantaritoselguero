"use client";

import { useState } from "react";

import {
  OgAgencyCardsGrid,
  OgDirectorioHero,
  OgDirectorioHospedajePanel,
  OgDirectorioTabs,
  OgDirectorioToursPanel,
  OgFooter,
  OgNavbar,
} from "@/libs/cantaritos-ui";
import type { DirectorioTab } from "@/libs/cantaritos-ui";
import { useAgencyCards } from "@/domain/hooks/agency-cards";

const TOURS_PANEL_BG = "#00A19E";
const HOSPEDAJE_PANEL_BG = "#E64927";

export default function DirectorioPage() {
  const [activeTab, setActiveTab] = useState<DirectorioTab>("tours");
  const { data: agencyCards = [], isLoading: isLoadingAgencyCards } =
    useAgencyCards({ active: true });

  const panelBg = activeTab === "tours" ? TOURS_PANEL_BG : HOSPEDAJE_PANEL_BG;
  const searchPlaceholder =
    activeTab === "tours" ? "Buscar agencia" : "Buscar hotel";

  return (
    <div className="min-h-screen flex flex-col bg-[#FFAF32]">
      <OgNavbar />
      <main className="flex-1 flex flex-col">
        <OgDirectorioHero />

        <section className="w-full" style={{ backgroundColor: panelBg }}>
          <OgDirectorioTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "tours" && <OgDirectorioToursPanel />}
          {activeTab === "hospedaje" && <OgDirectorioHospedajePanel />}
        </section>

        <OgAgencyCardsGrid
          cards={agencyCards}
          isLoading={isLoadingAgencyCards}
          searchPlaceholder={searchPlaceholder}
        />
      </main>
      <OgFooter />
    </div>
  );
}
