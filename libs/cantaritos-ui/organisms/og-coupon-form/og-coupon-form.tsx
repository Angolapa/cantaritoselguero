"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgCouponFormProps } from "./og-coupon-form.types";

const TYPE_OPTIONS = [
  { value: "GLOBAL", label: "Global (múltiples usuarios)" },
  { value: "UNIQUE", label: "Único (un solo usuario)" },
];

const selectStyles =
  "flex-1 h-11 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-gray-900 dark:text-white outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed";

export function OgCouponForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  isEdit = false,
}: OgCouponFormProps) {
  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información del Cupón</h2>
        </div>

        <MlForm
          id="coupon-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              type: (formData.get("type") ?? "GLOBAL").toString().trim(),
              nameEs: (formData.get("nameEs") ?? "").toString().trim(),
              nameEn: (formData.get("nameEn") ?? "").toString().trim(),
              discountPercent: (formData.get("discountPercent") ?? "").toString().trim(),
              maxDiscount: (formData.get("maxDiscount") ?? "").toString().trim(),
              totalQuantity: (formData.get("totalQuantity") ?? "").toString().trim(),
              expiresAt: (formData.get("expiresAt") ?? "").toString().trim(),
            });
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Tipo de cupón
            </label>
            <select
              id="type"
              name="type"
              defaultValue={defaultValues?.type ?? "GLOBAL"}
              disabled={isLoading || isEdit}
              className={selectStyles}
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Nombre (Español)"
              name="nameEs"
              placeholder="Ej: VERANO2026"
              defaultValue={defaultValues?.nameEs}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Nombre (Inglés)"
              name="nameEn"
              placeholder="Ej: SUMMER2026"
              defaultValue={defaultValues?.nameEn}
              isDisabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Porcentaje de descuento"
              name="discountPercent"
              type="number"
              placeholder="15"
              min="0.01"
              max="100"
              step="0.01"
              defaultValue={defaultValues?.discountPercent}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Descuento máximo ($)"
              name="maxDiscount"
              type="number"
              placeholder="100.00"
              min="0.01"
              step="0.01"
              defaultValue={defaultValues?.maxDiscount}
              isRequired
              isDisabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Cantidad total de usos"
              name="totalQuantity"
              type="number"
              placeholder="500"
              min="1"
              step="1"
              defaultValue={defaultValues?.totalQuantity}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Fecha de expiración"
              name="expiresAt"
              type="datetime-local"
              defaultValue={defaultValues?.expiresAt}
              isRequired
              isDisabled={isLoading}
            />
          </div>
        </MlForm>
      </CardBody>
    </Card>
  );
}
