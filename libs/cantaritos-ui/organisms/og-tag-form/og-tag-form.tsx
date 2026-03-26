"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgTagFormProps } from "./og-tag-form.types";

export function OgTagForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: OgTagFormProps) {
  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información de la Etiqueta</h2>
        </div>

        <MlForm
          id="tag-form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onSubmit({
              nameEs: (formData.get("nameEs") ?? "").toString().trim(),
              nameEn: (formData.get("nameEn") ?? "").toString().trim(),
            });
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Nombre (Español)"
              name="nameEs"
              placeholder="Ej: Alcohólica"
              defaultValue={defaultValues?.nameEs}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Nombre (Inglés)"
              name="nameEn"
              placeholder="Ej: Alcoholic"
              defaultValue={defaultValues?.nameEn}
              isRequired
              isDisabled={isLoading}
            />
          </div>
        </MlForm>
      </CardBody>
    </Card>
  );
}
