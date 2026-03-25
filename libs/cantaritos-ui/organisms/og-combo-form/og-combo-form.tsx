"use client";

import { useState } from "react";

import { Card, CardBody } from "@heroui/react";
import { Info, Minus, Package, Plus, Trash2 } from "lucide-react";

import { AtButton, AtInput } from "@/libs/cantaritos-ui/atoms";
import { AtTextarea } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";
import { Product } from "@/domain/types";

import { ComboProductItem, OgComboFormProps } from "./og-combo-form.types";

export function OgComboForm({
  defaultValues,
  products,
  onSubmit,
  isLoading = false,
}: OgComboFormProps) {
  const [items, setItems] = useState<ComboProductItem[]>(
    defaultValues?.items ?? [],
  );
  const [searchTerm, setSearchTerm] = useState("");

  const addProduct = (product: Product) => {
    const existing = items.find((comboItem) => comboItem.productId === product.id);
    if (existing) {
      setItems(
        items.map((comboItem) =>
          comboItem.productId === product.id
            ? { ...comboItem, quantity: comboItem.quantity + 1 }
            : comboItem,
        ),
      );
    } else {
      setItems([...items, { productId: product.id, quantity: 1 }]);
    }
    setSearchTerm("");
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(
      items
        .map((comboItem) =>
          comboItem.productId === productId
            ? { ...comboItem, quantity: Math.max(0, comboItem.quantity + delta) }
            : comboItem,
        )
        .filter((comboItem) => comboItem.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((comboItem) => comboItem.productId !== productId));
  };

  const getProductName = (productId: string) => {
    return products.find((product) => product.id === productId)?.name ?? "Producto";
  };

  const getProductImage = (productId: string) => {
    return products.find((product) => product.id === productId)?.image;
  };

  const filteredProducts = searchTerm.trim()
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Info del combo */}
      <Card shadow="sm">
        <CardBody className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Información del Combo</h2>
          </div>

          <MlForm
            id="combo-form"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              onSubmit({
                nameEs: (formData.get("nameEs") ?? "").toString().trim(),
                nameEn: (formData.get("nameEn") ?? "").toString().trim(),
                descriptionEs: (formData.get("descriptionEs") ?? "").toString().trim(),
                descriptionEn: (formData.get("descriptionEn") ?? "").toString().trim(),
                price: (formData.get("price") ?? "").toString().trim(),
                items,
              });
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AtInput
                label="Nombre (Español)"
                name="nameEs"
                placeholder="Ej: Combo Familiar"
                defaultValue={defaultValues?.nameEs}
                isRequired
                isDisabled={isLoading}
              />
              <AtInput
                label="Nombre (Inglés)"
                name="nameEn"
                placeholder="Ej: Family Combo"
                defaultValue={defaultValues?.nameEn}
                isRequired
                isDisabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AtTextarea
                label="Descripción (Español)"
                name="descriptionEs"
                placeholder="Descripción del combo..."
                defaultValue={defaultValues?.descriptionEs}
                minRows={2}
                isDisabled={isLoading}
              />
              <AtTextarea
                label="Descripción (Inglés)"
                name="descriptionEn"
                placeholder="Combo description..."
                defaultValue={defaultValues?.descriptionEn}
                minRows={2}
                isDisabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <AtInput
                label="Precio ($)"
                name="price"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                defaultValue={defaultValues?.price}
                isRequired
                isDisabled={isLoading}
              />
            </div>
          </MlForm>
        </CardBody>
      </Card>

      {/* Selector de productos */}
      <Card shadow="sm">
        <CardBody className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Productos del Combo</h2>
          </div>

          {/* Buscar producto */}
          <div className="relative mb-4">
            <AtInput
              label="Agregar producto"
              placeholder="Buscar producto por nombre..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              isDisabled={isLoading}
            />
            {filteredProducts.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                {filteredProducts.slice(0, 10).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
                    onClick={() => addProduct(product)}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-8 w-8 rounded object-cover"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                        <Package className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        ${product.basePrice.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Items seleccionados */}
          {items.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-400">
              Aún no hay productos en este combo
            </p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    {getProductImage(item.productId) ? (
                      <img
                        src={getProductImage(item.productId)}
                        alt={getProductName(item.productId)}
                        className="h-8 w-8 rounded object-cover"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                        <Package className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {getProductName(item.productId)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AtButton
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => updateQuantity(item.productId, -1)}
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="h-3 w-3" />
                    </AtButton>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <AtButton
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => updateQuantity(item.productId, 1)}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-3 w-3" />
                    </AtButton>
                    <AtButton
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => removeItem(item.productId)}
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-3 w-3" />
                    </AtButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
