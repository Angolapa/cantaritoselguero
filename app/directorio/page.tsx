"use client";

import { useState } from "react";

import {
  OgDirectorioHero,
  OgDirectorioTabs,
  OgDirectorioToursPanel,
  OgFooter,
  OgNavbar,
} from "@/libs/cantaritos-ui";
import type { DirectorioTab } from "@/libs/cantaritos-ui";

const TOURS_PANEL_BG = "#00A19E";
const HOSPEDAJE_PANEL_BG = "#E64927";

export default function DirectorioPage() {
  const [activeTab, setActiveTab] = useState<DirectorioTab>("tours");

  const panelBg = activeTab === "tours" ? TOURS_PANEL_BG : HOSPEDAJE_PANEL_BG;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFAF32]">
      <OgNavbar />
      <main className="flex-1 flex flex-col">
        <OgDirectorioHero />

        <section className="w-full" style={{ backgroundColor: panelBg }}>
          <OgDirectorioTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "tours" && <OgDirectorioToursPanel />}
        </section>
      </main>
      <OgFooter />
    </div>
  );
}
