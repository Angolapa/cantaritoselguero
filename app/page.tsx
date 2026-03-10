"use client";

import Image from "next/image";
import Link from "next/link";

import { UtensilsCrossed } from "lucide-react";

import { OgEventBanner, OgFooter, OgNavbar, OgPromoBanner } from "@/libs/cantaritos-ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />

      <Image
        src="/images/home.png"
        alt="Cantaritos El Güero"
        width={1440}
        height={400}
        className="w-full h-auto block -mt-px"
        priority
      />

      <Image
        src="/images/Banner1.png"
        alt="Banner Cantaritos El Güero"
        width={1440}
        height={400}
        className="w-full h-auto block"
      />

      <main className="mx-auto max-w-7xl">
        {/* Hero section */}
        <section className="px-6 pt-8 pb-4 flex justify-center">
          <div className="relative flex items-end justify-center gap-0 md:gap-0 max-w-[335px] md:max-w-[1023px] w-full">
            <Image
              src="/images/hat.png"
              alt=""
              width={150}
              height={150}
              className="w-[40px] h-[40px] md:w-[150px] md:h-[150px] self-end -mr-4 md:-mr-10"
            />
            <h1 className="font-heading text-[#E64927]">
              <svg
                viewBox="0 0 800 250"
                className="w-[250px] md:w-[800px] h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <path
                    id="curve1"
                    d="M 50 110 Q 400 60 750 110"
                    fill="none"
                  />
                  <path
                    id="curve2"
                    d="M 100 200 Q 400 130 700 200"
                    fill="none"
                  />
                </defs>
                <text
                  fill="#E64927"
                  fontSize="65"
                  fontFamily="barrio, system-ui"
                  textAnchor="middle"
                >
                  <textPath href="#curve1" startOffset="50%">
                    ¡SOMOS EL ALMA DE LA
                  </textPath>
                </text>
                <text
                  fill="#E64927"
                  fontSize="65"
                  fontFamily="barrio, system-ui"
                  textAnchor="middle"
                >
                  <textPath href="#curve2" startOffset="50%">
                    FIESTA JALISCIENSE!
                  </textPath>
                </text>
              </svg>
            </h1>
            <Image
              src="/images/boots.png"
              alt=""
              width={134}
              height={158}
              className="w-[47px] h-[53px] md:w-[134px] md:h-[158px] self-end -ml-4 md:-ml-10"
            />
          </div>
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
            title={<>Si vienes {" "}<span className="hidden md:inline"><br /></span>con sed,<br />paga antes</>}
            subtitle=""
            description={<>Así llegas directo por tu cantarito<br />y arrancas sin escalas.</>}
            highlightText={<>La banda no espera…<br />y tú tampoco deberías.</>}
            buttonLabel="Compra Anticipada"
            buttonHref="/compra-anticipada"
            imageSrc="/images/Anticipa_tu_consumo.png"
            imageAlt="Ilustración de compra anticipada"
            titleColor="text-[#1E293B]"
            descriptionColor="text-[#1E293B]/80"
            highlightColor="text-[#B22222]"
            buttonVariant="dark"
          />

          <OgPromoBanner
            bgColor="bg-[#B22222]"
            title="¿RESERVACIÓN?"
            subtitle="SOLO SI VIENES CON TODOS TUS REALES."
            description={<>Siempre hay espacio para<br />arrancar la fiesta.</>}
            warningText={<><span className="md:hidden">Reservaciones a partir de 60 compas y requiere pago de consumo anticipado mínimo de $10,000 mxn.</span><span className="hidden md:inline">Reservaciones a partir de 60 compas<br />y requiere pago de consumo<br />anticipado mínimo de $10,000 mxn.</span></>}
            buttonLabel="Reserva aquí"
            buttonHref="/reservaciones"
            imageSrc="/images/Reservaciones.png"
            imageAlt="Ilustración de reservaciones"
            titleColor="text-[#EDDCB6] md:text-brand-yellow"
            subtitleColor="text-[#FFAF32] md:text-white"
            descriptionColor="text-white/80"
            highlightColor="text-brand-yellow"
            buttonVariant="dark"
          />

          <OgPromoBanner
            bgColor="bg-[#F9B233]"
            title="RUTA AL GÜERO"
            subtitle={<><span className="md:hidden">El plan empieza desde<br />que te subes.</span><span className="hidden md:inline">El plan<br />empieza desde<br />que te subes.</span></>}
            description={<><span className="md:hidden">Súbete a La Ruta del Güero y llega<br />sin manejar, sin complicaciones y<br />con el plan armado.</span><span className="hidden md:inline">Súbete a La Ruta del Güero y llega sin<br />manejar, sin complicaciones y<br />con el plan armado.</span></>}
            buttonLabel="Ver Horarios"
            buttonHref="/ruta-al-guero"
            imageSrc="/images/Ruta_al_Güero.png"
            imageAlt="Ilustración de la ruta al Güero"
            titleColor="text-[#1E293B]"
            subtitleColor="text-[#1E293B]"
            descriptionColor="text-[#1E293B]/80"
            buttonVariant="dark"
          />
        </section>

        {/* Merch Oficial */}
        <section className="flex items-center justify-between px-6 md:px-[206px] py-8 max-w-[1443px] mx-auto">
          <h2 className="font-heading text-[#1E293B] text-2xl md:text-5xl lg:text-6xl leading-tight whitespace-nowrap">
            LA MERCH OFICIAL
            <br />
            NUMERO #1
          </h2>
          <Image
            src="/images/cowboy.png"
            alt="Cowboy NEW"
            width={424}
            height={198}
            className="w-[150px] md:w-[424px] h-auto object-contain"
          />
        </section>

        {/* Image grid */}
        <section className="px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
              <Image
                alt="Playera Oficial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/product.png"
                fill
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white font-body font-bold text-sm">
                  Playera Oficial
                </p>
                <p className="text-brand-yellow font-body font-bold text-sm">
                  $249.00
                </p>
              </div>
            </div>

            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
              <Image
                alt="Playera Oficial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/product.png"
                fill
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white font-body font-bold text-sm">
                  Playera Oficial
                </p>
                <p className="text-brand-yellow font-body font-bold text-sm">
                  $249.00
                </p>
              </div>
            </div>

            {/* Placeholder cards */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <UtensilsCrossed className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-body text-sm">Próximamente</p>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <UtensilsCrossed className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-body text-sm">Próximamente</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-4 flex justify-center">
          <Link
            href="/products"
            className="flex items-center justify-center w-[63px] h-[28px] md:w-[137px] md:h-[56px] bg-[#1E293B] hover:bg-[#334155] text-white font-body font-bold text-[10px] md:text-sm rounded-full transition-all active:scale-95"
          >
            Ver más
          </Link>
        </section>

      </main>

      <OgEventBanner />
      <OgFooter />
    </div>
  );
}
