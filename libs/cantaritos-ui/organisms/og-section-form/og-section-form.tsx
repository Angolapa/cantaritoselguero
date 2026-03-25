"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgSectionFormProps } from "./og-section-form.types";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function OgSectionForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  isEdit = false,
}: OgSectionFormProps) {
  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información de la Sección</h2>
        </div>

        <MlForm
          id="section-form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const nameEs = (formData.get("nameEs") ?? "").toString().trim();
            const slug = (formData.get("slug") ?? "").toString().trim();
            onSubmit({
              nameEs,
              nameEn: (formData.get("nameEn") ?? "").toString().trim(),
              slug: slug || toSlug(nameEs),
              order: (formData.get("order") ?? "").toString().trim(),
            });
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Nombre (Español)"
              name="nameEs"
              placeholder="Ej: Bebidas Alcohólicas"
              defaultValue={defaultValues?.nameEs}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Nombre (Inglés)"
              name="nameEn"
              placeholder="Ej: Alcoholic Drinks"
              defaultValue={defaultValues?.nameEn}
              isRequired
              isDisabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Slug"
              name="slug"
              placeholder="bebidas-alcoholicas"
              defaultValue={defaultValues?.slug}
              isDisabled={isLoading || isEdit}
            />
            <AtInput
              label="Orden"
              name="order"
              type="number"
              placeholder="1"
              min="0"
              defaultValue={defaultValues?.order}
              isDisabled={isLoading}
            />
          </div>
        </MlForm>
      </CardBody>
    </Card>
  );
}
