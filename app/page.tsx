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

            {/* Placeholder cards for desktop (hidden on mobile) */}
            <div className="hidden md:block aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <UtensilsCrossed className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-body text-sm">Próximamente</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
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
        <section className="px-6 py-4">
          <Link
            href="/products"
            className="block w-full bg-primary hover:bg-orange-700 text-white font-body font-bold py-4 rounded-full shadow-lg transition-all active:scale-95 text-sm uppercase tracking-widest text-center"
          >
            ORDENAR AHORA
          </Link>
        </section>

        {/* Promo Banners */}
        <section className="px-6 py-8 space-y-8">
          <OgPromoBanner
            bgColor="bg-[#E9DCB7]"
            title="SI VIENES CON SED, PAGA ANTES"
            subtitle=""
            description="Así llegas directo por tu cantarito y arrancas sin escalas."
            highlightText="La banda no espera... y tú tampoco deberías."
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
            description="Siempre hay espacio para arrancar la fiesta."
            warningText="Reservaciones a partir de 60 compas y requiere pago de consumo anticipado mínimo de $10,000 mxn."
            buttonLabel="Reserva aquí"
            buttonHref="/reservaciones"
            imageSrc="/images/Reservaciones.png"
            imageAlt="Ilustración de reservaciones"
            titleColor="text-brand-yellow"
            subtitleColor="text-white"
            descriptionColor="text-white/80"
            highlightColor="text-brand-yellow"
            buttonVariant="dark"
          />

          <OgPromoBanner
            bgColor="bg-[#F9B233]"
            title="RUTA AL GÜERO"
            subtitle="EL PLAN EMPIEZA DESDE QUE TE SUBES."
            description="Súbete a La Ruta del Güero y llega sin manejar, sin complicaciones y con el plan armado."
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

      </main>

      <OgEventBanner />
      <OgFooter />
    </div>
  );
}
