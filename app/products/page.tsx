"use client";

import {
  OgBannerCarousel,
  OgCategoryShortcuts,
  OgFooter,
  OgNavbar,
  OgEventCard,
  OgReservationsBanner,
  OgRouteBanner,
  OgSectionDisplay,
} from "@/libs/cantaritos-ui";
import { useBanners } from "@/domain/hooks/banners/useBanners";
import { useSections } from "@/domain/hooks/sections/useSections";
import { useTranslation } from "@/domain/stores";
import { Section } from "@/domain/types";

import type { SectionBannerColor } from "@/libs/cantaritos-ui";

const CATEGORY_KEYS = [
  { key: "products.categories.anticipate", image: "/images/product/ANTICIPATUCONSUMO.svg" },
  { key: "products.categories.reservations", image: "/images/product/RESERVACIONES.svg" },
  { key: "products.categories.route", image: "/images/product/RUTAALGUERO.svg" },
  { key: "products.categories.merch", image: "/images/product/MERCH.svg" },
  { key: "products.categories.event", image: "/images/product/ELGUEROENTUEVENTO.svg" },
];

const BANNER_COLOR_BY_SLUG: Record<string, SectionBannerColor> = {
  "merch-oficial-del-guero": "orange",
};

export default function ProductsPage() {
  const { data: sections = [] } = useSections();
  const { data: productsBanners = [] } = useBanners({
    section: "products-carousel",
    active: true,
  });
  const { translate } = useTranslation();

  const categories = CATEGORY_KEYS.map((category) => ({
    label: translate(category.key),
    image: category.image,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <OgNavbar />
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 space-y-8">
        <div
          className="md:hidden mx-auto flex flex-col items-center justify-center gap-4"
          style={{ width: "336px", height: "259px" }}
        >
          <OgBannerCarousel
            banners={productsBanners}
            showArrows
            className="w-full h-full rounded-2xl overflow-hidden"
          />
        </div>

        <OgCategoryShortcuts categories={categories} className="md:hidden" />

        <div className="md:hidden space-y-8">
          {sections.map((section: Section, index: number) => (
            <div key={section.id} className="space-y-8">
              <OgSectionDisplay
                section={section}
                color={BANNER_COLOR_BY_SLUG[section.slug] ?? "teal"}
                viewMoreHref={`/sections/${section.slug}`}
                viewMoreLabel={translate("products.viewMore")}
              />
              {section.slug === "ya-hace-hambre" && (
                <>
                  <OgReservationsBanner />
                  <OgRouteBanner />
                </>
              )}
            </div>
          ))}
        </div>

        <OgEventCard />
      </main>
      <OgFooter />
    </div>
  );
}
