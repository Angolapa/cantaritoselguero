"use client";

import Image from "next/image";
import Link from "next/link";

import { UtensilsCrossed } from "lucide-react";

import { OgFooter, OgNavbar, OgPromoBanner } from "@/libs/cantaritos-ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />

      <main className="mx-auto max-w-7xl">
        {/* Hero section */}
        <section className="px-6 pt-8 pb-4 space-y-2">
          <h1 className="text-4xl md:text-6xl font-heading text-gray-900 dark:text-white leading-tight">
            Tradición de Jalisco
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-body text-sm md:text-base">
            SOMOS EL ALMA DE LA FIESTA JALICENSE
          </p>
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

      <OgFooter />
    </div>
  );
}
