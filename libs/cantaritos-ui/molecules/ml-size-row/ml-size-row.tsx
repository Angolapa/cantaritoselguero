"use client";

import { useState } from "react";

import { Check, GripVertical,Trash2 } from "lucide-react";

import { AtButton, AtInput } from "@/libs/cantaritos-ui/atoms";

import { MlSizeRowProps } from "./ml-size-row.types";

export function MlSizeRow({
  size,
  onSave,
  onDelete,
  isLoading = false,
}: MlSizeRowProps) {
  const [name, setName] = useState(size?.name ?? "");
  const [price, setPrice] = useState(size?.price?.toString() ?? "");

  const handleSave = () => {
    if (!name.trim() || !price.trim()) return;
    onSave({ name: name.trim(), price: parseFloat(price) });
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <GripVertical className="h-5 w-5 shrink-0 text-gray-400" />
      <div className="flex-1">
        <AtInput
          size="sm"
          placeholder="Nombre del tamano"
          value={name}
          onValueChange={setName}
          isDisabled={isLoading}
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
        />
      </div>
      <AtButton
        isIconOnly
        variant="light"
        size="sm"
        color="primary"
        onPress={handleSave}
        isLoading={isLoading}
        aria-label="Guardar tamano"
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
          aria-label="Eliminar tamano"
        >
          <Trash2 className="h-4 w-4" />
        </AtButton>
      )}
    </div>
  );
}
