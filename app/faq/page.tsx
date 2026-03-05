"use client";

import Link from "next/link";
import { Construction } from "lucide-react";

import { OgNavbar } from "@/libs/cantaritos-ui";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />
      <main className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <Construction className="h-16 w-16 text-brand-yellow mb-4" />
        <h1 className="text-2xl md:text-4xl font-heading text-gray-900 dark:text-white mb-2">
          Preguntas Frecuentes
        </h1>
        <p className="font-body text-gray-500 dark:text-gray-400 mb-6">
          Página en construcción
        </p>
        <Link
          href="/"
          className="font-body font-medium text-primary hover:underline"
        >
          Ir a Inicio
        </Link>
      </main>
    </div>
  );
}
