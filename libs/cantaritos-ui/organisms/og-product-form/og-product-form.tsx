"use client";

import { useState } from "react";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput, AtSwitch, AtTextarea } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgProductFormProps } from "./og-product-form.types";

export function OgProductForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: OgProductFormProps) {
  const [isUnlimitedStock, setIsUnlimitedStock] = useState(
    !defaultValues?.stock,
  );

  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información General</h2>
        </div>

        <MlForm
          id="product-form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onSubmit({
              nameEs: (formData.get("nameEs") ?? "").toString().trim(),
              nameEn: (formData.get("nameEn") ?? "").toString().trim(),
              descriptionEs: (formData.get("descriptionEs") ?? "").toString().trim(),
              descriptionEn: (formData.get("descriptionEn") ?? "").toString().trim(),
              basePrice: (formData.get("basePrice") ?? "").toString().trim(),
              stock: isUnlimitedStock
                ? ""
                : (formData.get("stock") ?? "").toString().trim(),
            });
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Nombre (Español)"
              name="nameEs"
              placeholder="Ej: Cantarito"
              defaultValue={defaultValues?.nameEs}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Nombre (Inglés)"
              name="nameEn"
              placeholder="Ej: Cantarito"
              defaultValue={defaultValues?.nameEn}
              isRequired
              isDisabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtTextarea
              label="Descripción (Español)"
              name="descriptionEs"
              placeholder="Descripción del producto..."
              defaultValue={defaultValues?.descriptionEs}
              minRows={3}
              isDisabled={isLoading}
            />
            <AtTextarea
              label="Descripción (Inglés)"
              name="descriptionEn"
              placeholder="Product description..."
              defaultValue={defaultValues?.descriptionEn}
              minRows={3}
              isDisabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Precio base ($)"
              name="basePrice"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              defaultValue={defaultValues?.basePrice}
              isRequired
              isDisabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <AtSwitch
                isSelected={isUnlimitedStock}
                onValueChange={setIsUnlimitedStock}
                isDisabled={isLoading}
                size="sm"
              >
                Stock ilimitado
              </AtSwitch>
              {!isUnlimitedStock && (
                <AtInput
                  label="Stock"
                  name="stock"
                  type="number"
                  placeholder="0"
                  min="0"
                  defaultValue={defaultValues?.stock}
                  isDisabled={isLoading}
                />
              )}
            </div>
          </div>
        </MlForm>
      </CardBody>
    </Card>
  );
}
