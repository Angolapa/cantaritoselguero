"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";

import { MlSearchBar, OgNavbar } from "@/libs/cantaritos-ui";
import { useProducts } from "@/domain/hooks/products";
import { useAuthStore } from "@/domain/stores";
import { Product } from "@/domain/types";

export default function ProductsPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((p: Product) =>
        p.name.toLowerCase().includes(term),
      );
    }
    if (showAvailableOnly) {
      result = result.filter(
        (p: Product) => p.isActive && (p.stock === undefined || p.stock > 0),
      );
    }
    return result;
  }, [products, search, showAvailableOnly]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />

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
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Solo disponibles
          </label>
        </div>

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
                        .filter((s) => s.isActive)
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
    </div>
  );
}
