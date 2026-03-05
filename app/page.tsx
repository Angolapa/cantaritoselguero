"use client";

import Link from "next/link";

import { Award, Home, User,UtensilsCrossed } from "lucide-react";

import { OgNavbar } from "@/libs/cantaritos-ui";

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
              <img
                alt="Playera Oficial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/product.png"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-body font-bold text-sm">
                  Playera Oficial
                </p>
                <p className="text-brand-yellow font-body font-bold text-sm">
                  $249.00
                </p>
              </div>
            </div>

            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
              <img
                alt="Playera Oficial"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/product.png"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
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

        {/* Spacer for mobile bottom nav */}
        <div className="h-20 md:hidden" />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-6 pt-2 flex justify-around items-center z-40">
        <Link href="/" className="flex flex-col items-center text-primary">
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-body font-semibold mt-1">
            Home
          </span>
        </Link>
        <Link
          href="/products"
          className="flex flex-col items-center text-gray-400 dark:text-gray-600"
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span className="text-[10px] font-body font-semibold mt-1">
            Menu
          </span>
        </Link>
        <div className="flex flex-col items-center text-gray-400 dark:text-gray-600">
          <Award className="h-5 w-5" />
          <span className="text-[10px] font-body font-semibold mt-1">
            Rewards
          </span>
        </div>
        <Link
          href="/login"
          className="flex flex-col items-center text-gray-400 dark:text-gray-600"
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-body font-semibold mt-1">
            Profile
          </span>
        </Link>
      </nav>
    </div>
  );
}
