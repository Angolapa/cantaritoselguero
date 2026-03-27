"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeft, Minus, Package, Plus } from "lucide-react";

import { OgNavbar } from "@/libs/cantaritos-ui";
import { useProduct } from "@/domain/hooks/products";
import { useAuthStore, useCartStore } from "@/domain/stores";
import type { Modifier, ModifierGroup } from "@/domain/types";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading } = useProduct(productId);

  const [lastSyncedProductId, setLastSyncedProductId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<string, string[]>
  >({});
  const [quantity, setQuantity] = useState(1);

  if (product && product.id !== lastSyncedProductId) {
    const defaultSize =
      product.sizes.find((sizeOption) => sizeOption.isDefault && sizeOption.isActive) ||
      product.sizes.find((sizeOption) => sizeOption.isActive);
    setSelectedSizeId(defaultSize?.id ?? null);

    const defaults: Record<string, string[]> = {};
    for (const group of product.modifierGroups) {
      defaults[group.id] = group.modifiers
        .filter((modifierOption) => modifierOption.isDefault && modifierOption.isActive)
        .map((modifierOption) => modifierOption.id);
    }
    setSelectedModifiers(defaults);
    setLastSyncedProductId(product.id);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const activeSizes = useMemo(
    () => product?.sizes.filter((sizeOption) => sizeOption.isActive) ?? [],
    [product],
  );

  const selectedSize = useMemo(
    () => activeSizes.find((sizeOption) => sizeOption.id === selectedSizeId),
    [activeSizes, selectedSizeId],
  );

  const allSelectedModifiers = useMemo(() => {
    if (!product) return [];
    const mods: Modifier[] = [];
    for (const group of product.modifierGroups) {
      const groupSelected = selectedModifiers[group.id] ?? [];
      for (const mod of group.modifiers) {
        if (groupSelected.includes(mod.id)) {
          mods.push(mod);
        }
      }
    }
    return mods;
  }, [product, selectedModifiers]);

  const unitPrice = useMemo(() => {
    const sizePrice = selectedSize?.price ?? product?.basePrice ?? 0;
    const modSum = allSelectedModifiers.reduce(
      (sum, modifierOption) => sum + modifierOption.priceAdjustment,
      0,
    );
    return sizePrice + modSum;
  }, [selectedSize, product, allSelectedModifiers]);

  const totalPrice = unitPrice * quantity;

  function toggleModifier(group: ModifierGroup, modifierId: string) {
    setSelectedModifiers((prev) => {
      const current = prev[group.id] ?? [];
      if (group.maxSelect === 1) {
        // Radio behavior
        return { ...prev, [group.id]: [modifierId] };
      }
      // Checkbox behavior
      if (current.includes(modifierId)) {
        return {
          ...prev,
          [group.id]: current.filter((id) => id !== modifierId),
        };
      }
      if (current.length >= group.maxSelect) {
        return prev;
      }
      return { ...prev, [group.id]: [...current, modifierId] };
    });
  }

  function validateModifiers(): boolean {
    if (!product) return false;
    for (const group of product.modifierGroups) {
      const count = (selectedModifiers[group.id] ?? []).length;
      if (group.isRequired && count < group.minSelect) return false;
      if (count > group.maxSelect) return false;
    }
    return true;
  }

  function handleAddToCart() {
    if (!product || !selectedSize) return;
    if (!validateModifiers()) return;

    addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      selectedSize: {
        id: selectedSize.id,
        name: selectedSize.name,
        price: selectedSize.price,
      },
      selectedModifiers: allSelectedModifiers.map((selectedModifier) => ({
        id: selectedModifier.id,
        name: selectedModifier.name,
        priceAdjustment: selectedModifier.priceAdjustment,
      })),
      quantity,
      unitPrice,
    });

    router.push("/products");
  }

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <OgNavbar />
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <OgNavbar />
        <div className="text-center py-20 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="font-body">Producto no encontrado.</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 text-primary font-body font-medium hover:underline"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <OgNavbar />

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Back button */}
        <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 font-body text-sm hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </button>

        {/* Product image */}
        <div className="relative aspect-square max-h-80 w-full rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-24 w-24 text-gray-300" />
            </div>
          )}
        </div>

        {/* Name + description + base price */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-heading text-gray-900 dark:text-white">
            {product.name}
          </h1>
          {product.description && (
            <p className="font-body text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
          )}
          <p className="text-xl font-body font-bold text-primary">
            Desde ${product.basePrice.toFixed(2)}
          </p>
        </div>

        {/* Size selector */}
        {activeSizes.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-body font-bold text-gray-900 dark:text-white">
              Tamaño
              <span className="ml-2 text-xs font-normal text-primary">
                Requerido
              </span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {activeSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSizeId(size.id)}
                  className={`px-4 py-2 rounded-xl font-body text-sm font-medium border-2 transition-all ${
                    selectedSizeId === size.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  {size.name} — ${size.price.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modifier groups */}
        {product.modifierGroups.map((group) => {
          const activeModifiers = group.modifiers.filter(
            (modifierOption) => modifierOption.isActive,
          );
          if (activeModifiers.length === 0) return null;
          const groupSelection = selectedModifiers[group.id] ?? [];
          const isRadio = group.maxSelect === 1;

          return (
            <div key={group.id} className="space-y-3">
              <h2 className="font-body font-bold text-gray-900 dark:text-white">
                {group.name}
                {group.isRequired && (
                  <span className="ml-2 text-xs font-normal text-primary">
                    Requerido
                  </span>
                )}
                {!isRadio && (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    (Máx. {group.maxSelect})
                  </span>
                )}
              </h2>
              {group.description && (
                <p className="font-body text-sm text-gray-500">
                  {group.description}
                </p>
              )}
              <div className="space-y-2">
                {activeModifiers.map((mod) => {
                  const isSelected = groupSelection.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModifier(group, mod.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 flex items-center justify-center rounded-${isRadio ? "full" : "md"} border-2 ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && (
                            <div
                              className={`bg-white ${isRadio ? "h-2 w-2 rounded-full" : "h-2.5 w-2.5 rounded-sm"}`}
                            />
                          )}
                        </div>
                        <span className="font-body text-sm text-gray-900 dark:text-white">
                          {mod.name}
                        </span>
                      </div>
                      {mod.priceAdjustment !== 0 && (
                        <span className="font-body text-sm text-gray-500">
                          {mod.priceAdjustment > 0 ? "+" : ""}$
                          {mod.priceAdjustment.toFixed(2)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quantity */}
        <div className="space-y-3">
          <h2 className="font-body font-bold text-gray-900 dark:text-white">
            Cantidad
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setQuantity((currentQuantity) =>
                  Math.max(1, currentQuantity - 1),
                )
              }
              className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-body text-lg font-bold text-gray-900 dark:text-white min-w-[2ch] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
              className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-40">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !validateModifiers()}
            className="w-full py-3 rounded-xl font-body font-bold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
          >
            Agregar al carrito — ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
