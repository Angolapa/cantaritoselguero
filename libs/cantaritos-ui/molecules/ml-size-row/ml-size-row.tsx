"use client";

import { useState } from "react";

import { Check, GripVertical, Infinity, Trash2 } from "lucide-react";

import { AtButton, AtInput } from "@/libs/cantaritos-ui/atoms";

import { MlSizeRowProps } from "./ml-size-row.types";

export function MlSizeRow({
  size,
  onSave,
  onDelete,
  isLoading = false,
}: MlSizeRowProps) {
  const [nameEs, setNameEs] = useState(size?.nameEs ?? size?.name ?? "");
  const [nameEn, setNameEn] = useState(size?.nameEn ?? "");
  const [price, setPrice] = useState(size?.price?.toString() ?? "");
  const [stock, setStock] = useState(size?.stock?.toString() ?? "");
  const [isInfiniteStock, setIsInfiniteStock] = useState(
    size ? size.stock === null || size.stock === undefined : true,
  );
  const [hasTriedSave, setHasTriedSave] = useState(false);

  const isNameEsInvalid = hasTriedSave && !nameEs.trim();
  const isNameEnInvalid = hasTriedSave && !nameEn.trim();
  const isPriceInvalid = hasTriedSave && !price.trim();
  const isStockInvalid =
    hasTriedSave && !isInfiniteStock && stock.trim() === "";

  const handleSave = () => {
    setHasTriedSave(true);

    if (!nameEs.trim() || !nameEn.trim() || !price.trim()) return;
    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) return;

    let parsedStock: number | null = null;
    if (!isInfiniteStock) {
      if (stock.trim() === "") return;
      const stockNum = Number(stock);
      if (!Number.isInteger(stockNum) || stockNum < 0) return;
      parsedStock = stockNum;
    }

    setHasTriedSave(false);
    onSave({ nameEs: nameEs.trim(), nameEn: nameEn.trim(), price: parsedPrice, stock: parsedStock });
  };

  const handleToggleInfiniteStock = () => {
    setIsInfiniteStock((prev) => {
      if (!prev) setStock("");
      return !prev;
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <GripVertical className="h-5 w-5 shrink-0 text-gray-400" />
      <div className="flex-1">
        <AtInput
          size="sm"
          placeholder="Nombre (ES)"
          value={nameEs}
          onValueChange={setNameEs}
          isDisabled={isLoading}
          isInvalid={isNameEsInvalid}
        />
      </div>
      <div className="flex-1">
        <AtInput
          size="sm"
          placeholder="Name (EN)"
          value={nameEn}
          onValueChange={setNameEn}
          isDisabled={isLoading}
          isInvalid={isNameEnInvalid}
        />
      </div>
      <div className="w-32">
        <AtInput
          size="sm"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          startContent={<span className="text-sm text-gray-400">$</span>}
          value={price}
          onValueChange={setPrice}
          isDisabled={isLoading}
          isInvalid={isPriceInvalid}
        />
      </div>
      <div className="w-28">
        <AtInput
          size="sm"
          type="number"
          placeholder="Stock"
          step="1"
          min="0"
          value={isInfiniteStock ? "" : stock}
          onValueChange={setStock}
          isDisabled={isLoading || isInfiniteStock}
          isInvalid={isStockInvalid}
        />
      </div>
      <AtButton
        isIconOnly
        variant="light"
        size="sm"
        color={isInfiniteStock ? "primary" : "default"}
        onPress={handleToggleInfiniteStock}
        isDisabled={isLoading}
        aria-label="Stock infinito"
      >
        <Infinity className="h-4 w-4" />
      </AtButton>
      <AtButton
        isIconOnly
        variant="light"
        size="sm"
        color="primary"
        onPress={handleSave}
        isLoading={isLoading}
        aria-label="Guardar tamaño"
      >
        <Check className="h-4 w-4" />
      </AtButton>
      {onDelete && (
        <AtButton
          isIconOnly
          variant="light"
          size="sm"
          color="danger"
          onPress={onDelete}
          isDisabled={isLoading}
          aria-label="Eliminar tamaño"
        >
          <Trash2 className="h-4 w-4" />
        </AtButton>
      )}
    </div>
  );
}
