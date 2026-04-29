"use client";

import { OgAgencyCardsGrid, OgFooter, OgNavbar } from "@/libs/cantaritos-ui";
import { useAgencyCards } from "@/domain/hooks/agency-cards";

export default function AgenciasPage() {
  const { data: agencyCards = [], isLoading } = useAgencyCards({ active: true });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFAF32]">
      <OgNavbar />
      <main className="flex-1">
        <OgAgencyCardsGrid cards={agencyCards} isLoading={isLoading} />
      </main>
      <OgFooter />
    </div>
  );
}
