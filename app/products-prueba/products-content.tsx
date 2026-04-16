"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Package, Plus } from "lucide-react";

import { MlSearchBar, OgCategoryShortcuts } from "@/libs/cantaritos-ui";
import { useProducts } from "@/domain/hooks/products";
import { useTags } from "@/domain/hooks/tags";
import { Product, Tag } from "@/domain/types";

export default function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: products = [], isLoading } = useProducts();
  const { data: tags = [] } = useTags();
  const [search, setSearch] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [nowMs] = useState(() => Date.now());

  const selectedTagId = searchParams.get("tag");

  const handleSelectTag = (tagId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tagId) {
      params.set("tag", tagId);
    } else {
      params.delete("tag");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      result = result.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm),
      );
    }
    if (showAvailableOnly) {
      result = result.filter(
        (product: Product) =>
          product.isActive && (product.stock === undefined || product.stock > 0),
      );
    }
    if (selectedTagId) {
      result = result.filter((product: Product) =>
        product.tags?.some((tag) => tag.id === selectedTagId),
      );
    }
    return result;
  }, [products, search, showAvailableOnly, selectedTagId]);

  const categories = [
    { label: "ANTICIPA\nTU CONSUMO", image: "/images/product/ANTICIPATUCONSUMO.svg" },
    { label: "RESERVACIONES", image: "/images/product/RESERVACIONES.svg" },
    { label: "RUTA\nAL GÜERO", image: "/images/product/RUTAALGUERO.svg" },
    { label: "MERCH\nOFICIAL DEL\nGÜERO", image: "/images/product/MERCH.svg" },
    { label: "EL GÜERO EN TU EVENTO", image: "/images/product/ELGUEROENTUEVENTO.svg" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      <h1 className="text-2xl md:text-4xl font-heading text-gray-900 dark:text-white">
        Nuestros Productos
      </h1>

      <OgCategoryShortcuts categories={categories} className="md:hidden" />

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <MlSearchBar
          placeholder="Buscar productos..."
          value={search}
          onValueChange={setSearch}
        />
        <label className="flex items-center gap-2 text-sm font-body text-gray-600 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(event) => setShowAvailableOnly(event.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Solo disponibles
        </label>
      </div>

      {/* Tag filters */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectTag(null)}
            className={`text-sm font-body px-3 py-1 rounded-full border transition-colors ${
              !selectedTagId
                ? "bg-primary text-white border-primary"
                : "border-gray-300 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary"
            }`}
          >
            Todos
          </button>
          {tags.map((tag: Tag) => (
            <button
              key={tag.id}
              onClick={() => handleSelectTag(tag.id)}
              className={`text-sm font-body px-3 py-1 rounded-full border transition-colors ${
                selectedTagId === tag.id
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="font-body">No se encontraron productos.</p>
        </div>
      )}

      {/* Product grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredProducts.map((product: Product) => {
            const hasFiniteStock =
              typeof product.stock === "number" && product.stock !== null;
            const isSoldOut =
              !product.isActive || (hasFiniteStock && (product.stock as number) <= 0);
            const createdAtMs = new Date(product.createdAt).getTime();
            const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
            const isNew =
              Number.isFinite(createdAtMs) && nowMs - createdAtMs <= thirtyDaysMs;

            return (
              <Link
                href={`/products-prueba/${product.id}`}
                key={product.id}
                className="relative block bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover ${isSoldOut ? "grayscale opacity-60" : ""}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                  {isSoldOut && (
                    <span className="absolute inset-x-2 top-2 text-center bg-black/60 text-white text-[10px] font-body font-bold uppercase tracking-wider px-2 py-1 rounded">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="px-3 pt-2 pb-3 pr-12">
                  {isNew && (
                    <p
                      style={{
                        color: "#E64927",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "8px",
                        fontWeight: 500,
                        lineHeight: "134%",
                      }}
                    >
                      NEW
                    </p>
                  )}

                  <h3
                    className="uppercase"
                    style={{
                      color: "#18181B",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "10px",
                      fontWeight: 900,
                      lineHeight: "143%",
                    }}
                  >
                    {product.name}
                  </h3>

                  {product.description && (
                    <p
                      className="mt-1"
                      style={{
                        color: "#14222F",
                        fontFamily: "\"Roboto Condensed\", Roboto, sans-serif",
                        fontSize: "8px",
                        fontWeight: 400,
                        lineHeight: "100%",
                      }}
                    >
                      {product.description}
                    </p>
                  )}

                  <p
                    className="mt-2"
                    style={{
                      color: "#E64927",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "18px",
                    }}
                  >
                    ${product.basePrice.toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Add button */}
                <span
                  aria-hidden
                  className={`absolute bottom-3 right-3 w-7 h-7 rounded-full inline-flex items-center justify-center text-white shadow-md ${isSoldOut ? "bg-gray-400" : "bg-[#E64927]"}`}
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
