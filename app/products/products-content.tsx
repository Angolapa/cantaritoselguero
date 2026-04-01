"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Package } from "lucide-react";

import { MlSearchBar } from "@/libs/cantaritos-ui";
import { useProducts } from "@/domain/hooks/products";
import { useTags } from "@/domain/hooks/tags";
import { useAuthStore } from "@/domain/stores";
import { Product, Tag } from "@/domain/types";

export default function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: products = [], isLoading } = useProducts();
  const { data: tags = [] } = useTags();
  const [search, setSearch] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const selectedTagId = searchParams.get("tag");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

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

  if (!isAuthenticated) return null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      <h1 className="text-2xl md:text-4xl font-heading text-gray-900 dark:text-white">
        Nuestros Productos
      </h1>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product: Product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer block"
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-body font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <span
                    className={`shrink-0 text-xs font-body font-medium px-2 py-0.5 rounded-full ${
                      product.isActive &&
                      (product.stock === undefined || product.stock > 0)
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive &&
                    (product.stock === undefined || product.stock > 0)
                      ? "Disponible"
                      : "Agotado"}
                  </span>
                </div>

                <p className="text-lg font-body font-bold text-primary">
                  ${product.basePrice.toFixed(2)}
                </p>

                {/* Sizes */}
                {product.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.sizes
                      .filter((sizeOption) => sizeOption.isActive)
                      .map((size) => (
                        <span
                          key={size.id}
                          className="text-xs font-body bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full"
                        >
                          {size.name} — ${size.price.toFixed(2)}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
