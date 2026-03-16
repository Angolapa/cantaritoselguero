"use client";

import Image from "next/image";
import Link from "next/link";

import { OgBannerCarousel, OgEventBanner, OgFooter, OgNavbar, OgPromoBanner } from "@/libs/cantaritos-ui";
import { useBanners } from "@/domain/hooks/banners";
import { useLocaleStore, useTranslation } from "@/domain/stores";

export default function HomePage() {
  const { translate } = useTranslation();
  const locale = useLocaleStore((state) => state.locale);
  const bannerSection = locale === "es" ? "home-carousel" : "home-carousel-en";
  const { data: banners = [], isLoading: isLoadingBanners } = useBanners({
    section: bannerSection,
    active: true,
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />

      <div className="bg-[#E64927] -mt-px">
        <Image
          src="/images/home.png"
          alt="Cantaritos El Güero"
          width={1440}
          height={718}
          className="w-full h-auto block"
          priority
        />
      </div>

      <OgBannerCarousel banners={banners} isLoading={isLoadingBanners} />

      <main className="mx-auto max-w-[1440px]">
        {/* Hero section */}
        <section className="px-6 pt-8 pb-4 flex justify-center">
          <Image
            src={locale === "en" ? "/images/hero-title-i.png" : "/images/hero-title.svg"}
            alt={translate("home.heroAlt")}
            width={950}
            height={208}
            className="w-[300px] md:w-[950px] h-auto"
            priority
          />
        </section>

        {/* Video section */}
        <section className="px-6 py-8 flex justify-center">
          <div className="w-[335px] h-[440px] md:w-[1280px] md:h-[720px] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
            </div>
          </div>
        </section>

        {/* Promo Banners */}
        <section className="px-6 py-8 space-y-8">
          <OgPromoBanner
            bgColor="bg-[#E9DCB7]"
            title={<>
              <span className="md:hidden">{translate("home.preOrder.titleMobileLine1")}<br />{translate("home.preOrder.titleMobileLine2")}</span>
              <span className="hidden md:inline">{translate("home.preOrder.titleDesktopLine1")}<br />{translate("home.preOrder.titleDesktopLine2")}<br />{translate("home.preOrder.titleDesktopLine3")}</span>
            </>}
            subtitle=""
            description={<>
              <span className="md:hidden">{translate("home.preOrder.descMobileLine1")}<br />{translate("home.preOrder.descMobileLine2")}</span>
              <span className="hidden md:inline">{translate("home.preOrder.descDesktopLine1")}<br />{translate("home.preOrder.descDesktopLine2")}</span>
            </>}
            highlightText={<>
              <span className="md:hidden">{translate("home.preOrder.highlightMobileLine1")}<br />{translate("home.preOrder.highlightMobileLine2")}</span>
              <span className="hidden md:inline">{translate("home.preOrder.highlightDesktopLine1")}<br />{translate("home.preOrder.highlightDesktopLine2")}</span>
            </>}
            buttonLabel={translate("home.preOrder.button")}
            buttonHref="/compra-anticipada"
            imageSrc="/images/Anticipa_tu_consumo.png"
            imageAlt="Ilustración de compra anticipada"
            titleColor="text-[#14222F]"
            descriptionColor="text-[#14222F]"
            highlightColor="text-[#C02E19]"
            buttonVariant="dark"
          />

          <OgPromoBanner
            bgColor="bg-[#C02E19]"
            title={translate("home.reservation.title")}
            subtitle={<>
              <span className="md:hidden">{translate("home.reservation.subtitleMobileLine1")}<br />{translate("home.reservation.subtitleMobileLine2")}</span>
              <span className="hidden md:inline">{translate("home.reservation.subtitle")}</span>
            </>}
            description={<>
              <span className="md:hidden">{translate("home.reservation.description")}</span>
              <span className="hidden md:inline">{translate("home.reservation.descDesktopLine1")}<br />{translate("home.reservation.descDesktopLine2")}</span>
            </>}
            warningText={<>
              <span className="md:hidden">{translate("home.reservation.warningMobileLine1")}<br />{translate("home.reservation.warningMobileLine2")}<br />{translate("home.reservation.warningMobileLine3")}</span>
              <span className="hidden md:inline">{translate("home.reservation.warning")}</span>
            </>}
            buttonLabel={translate("home.reservation.button")}
            buttonHref="/reservaciones"
            imageSrc="/images/Reservaciones.png"
            imageAlt="Ilustración de reservaciones"
            titleColor="text-[#EDDCB6]"
            subtitleColor="text-[#FFAF32]"
            descriptionColor="text-[#EDDCB6]"
            highlightColor="text-[#FFAF32]"
            buttonVariant="dark"
          />

          <OgPromoBanner
            bgColor="bg-[#F9B233]"
            title={translate("home.shuttle.title")}
            subtitle={<>
              <span className="md:hidden">{translate("home.shuttle.subtitleMobileLine1")}<br />{translate("home.shuttle.subtitleMobileLine2")}</span>
              <span className="hidden md:inline">{translate("home.shuttle.subtitleDesktopLine1")}<br />{translate("home.shuttle.subtitleDesktopLine2")}<br />{translate("home.shuttle.subtitleDesktopLine3")}</span>
            </>}
            description={<>
              <span className="md:hidden">{translate("home.shuttle.descMobileLine1")}<br />{translate("home.shuttle.descMobileLine2")}<br />{translate("home.shuttle.descMobileLine3")}</span>
              <span className="hidden md:inline">{translate("home.shuttle.description")}</span>
            </>}
            buttonLabel={translate("home.shuttle.button")}
            buttonHref="/ruta-al-guero"
            imageSrc="/images/Ruta_al_Guero.png"
            imageAlt="Ilustración de la ruta al Güero"
            titleColor="text-[#1E293B]"
            subtitleColor="text-[#1E293B]"
            descriptionColor="text-[#1E293B]/80"
            buttonVariant="dark"
          />
        </section>

        {/* Merch Oficial */}
        <section className="flex items-center justify-center px-6 md:px-10 xl:px-[206px] py-8 max-w-[1443px] mx-auto md:gap-[35px]">
          <h2 className="font-heading text-[#14222F] text-2xl md:text-5xl lg:text-[56px] leading-none whitespace-nowrap">
            {translate("home.mostPopular")}
          </h2>
          <Image
            src="/images/cowboy.png"
            alt="Cowboy NEW"
            width={238}
            height={179}
            className="w-[150px] md:w-[238px] h-auto object-contain"
          />
        </section>

        {/* Cantaritos grid */}
        <section className="px-6 py-4 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-[1071px] md:h-[270px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden h-[200px] md:h-full ${i === 4 ? "hidden md:block" : ""}`}
              >
                <Image
                  src="/images/Cantarito.jpg"
                  alt="Cantaritos El Güero"
                  width={200}
                  height={270}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-4 flex justify-center">
          <Link
            href="/products"
            className="flex items-center justify-center px-4 h-[28px] md:px-6 md:h-[56px] bg-[#1E293B] hover:bg-[#334155] text-white font-body font-bold text-[10px] md:text-2xl md:leading-6 rounded-full transition-all active:scale-95"
          >
            {translate("home.shopButton")}
          </Link>
        </section>

      </main>

      <OgEventBanner />
      <OgFooter />
    </div>
  );
}
