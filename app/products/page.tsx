"use client";

import { Suspense } from "react";

import { OgNavbar } from "@/libs/cantaritos-ui";

import ProductsContent from "./products-content";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />
      <Suspense fallback={<LoadingFallback />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}

function LoadingFallback() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </main>
  );
}
