"use client";

import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { Layers, Package, Plus, Trash2 } from "lucide-react";

import { AtButton, AtChip, AtInput } from "@/libs/cantaritos-ui/atoms";
import { Product, Combo, SectionItem } from "@/domain/types";

import { OgSectionItemsProps } from "./og-section-items.types";

export function OgSectionItems({
  items,
  products,
  combos,
  onAddProduct,
  onAddCombo,
  onRemoveItem,
  isLoading = false,
}: OgSectionItemsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"product" | "combo">("product");

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  const nextOrder = items.length > 0
    ? Math.max(...items.map((sectionItem) => sectionItem.order)) + 1
    : 1;

  const filteredResults = searchTerm.trim()
    ? searchType === "product"
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : combos.filter((combo) =>
          combo.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    : [];

  const handleAdd = (item: Product | Combo) => {
    if (searchType === "product") {
      onAddProduct(item.id, nextOrder);
    } else {
      onAddCombo(item.id, nextOrder);
    }
    setSearchTerm("");
  };

  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Items de la Sección</h2>
        </div>

        {/* Tipo selector + busqueda */}
        <div className="mb-4 flex gap-2">
          <AtButton
            size="sm"
            variant={searchType === "product" ? "solid" : "light"}
            color={searchType === "product" ? "primary" : "default"}
            onPress={() => setSearchType("product")}
          >
            Producto
          </AtButton>
          <AtButton
            size="sm"
            variant={searchType === "combo" ? "solid" : "light"}
            color={searchType === "combo" ? "primary" : "default"}
            onPress={() => setSearchType("combo")}
          >
            Combo
          </AtButton>
        </div>

        <div className="relative mb-4">
          <AtInput
            label={`Agregar ${searchType === "product" ? "producto" : "combo"}`}
            placeholder={`Buscar ${searchType === "product" ? "producto" : "combo"}...`}
            value={searchTerm}
            onValueChange={setSearchTerm}
            isDisabled={isLoading}
          />
          {filteredResults.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
              {filteredResults.slice(0, 10).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
                  onClick={() => handleAdd(item)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                    {searchType === "product" ? (
                      <Package className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Layers className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      ${("basePrice" in item ? item.basePrice : item.price).toFixed(2)}
                    </p>
                  </div>
                  <Plus className="ml-auto h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Items actuales */}
        {sortedItems.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">
            Aún no hay items en esta sección
          </p>
        ) : (
          <div className="space-y-2">
            {sortedItems.map((item: SectionItem) => {
              const name = item.type === "product"
                ? item.product?.name
                : item.combo?.name;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-500">
                      {item.order}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                      {item.type === "product" ? (
                        <Package className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Layers className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{name ?? "Sin nombre"}</span>
                      <AtChip size="sm" variant="light" className="ml-2">
                        {item.type === "product" ? "Producto" : "Combo"}
                      </AtChip>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Quitar item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
