"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgBannerFormProps } from "./og-banner-form.types";

export function OgBannerForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: OgBannerFormProps) {
  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información del Banner</h2>
        </div>

        <MlForm
          id="banner-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              title: (formData.get("title") ?? "").toString().trim(),
              altText: (formData.get("altText") ?? "").toString().trim(),
              linkUrl: (formData.get("linkUrl") ?? "").toString().trim(),
              section: (formData.get("section") ?? "").toString().trim(),
              order: (formData.get("order") ?? "").toString().trim(),
              backgroundColor: (formData.get("backgroundColor") ?? "").toString().trim(),
              startDate: (formData.get("startDate") ?? "").toString().trim(),
              endDate: (formData.get("endDate") ?? "").toString().trim(),
            });
          }}
        >
          <AtInput
            label="Título"
            name="title"
            placeholder="Ej: Promoción de verano"
            defaultValue={defaultValues?.title}
            isDisabled={isLoading}
          />
          <AtInput
            label="Texto alternativo"
            name="altText"
            placeholder="Descripción de la imagen para accesibilidad"
            defaultValue={defaultValues?.altText}
            isRequired
            isDisabled={isLoading}
          />
          <AtInput
            label="URL de enlace"
            name="linkUrl"
            placeholder="https://ejemplo.com/promo"
            defaultValue={defaultValues?.linkUrl}
            isDisabled={isLoading}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Sección"
              name="section"
              placeholder="home-carousel"
              defaultValue={defaultValues?.section ?? "home-carousel"}
              isDisabled={isLoading}
            />
            <AtInput
              label="Orden"
              name="order"
              type="number"
              placeholder="0"
              min="0"
              defaultValue={defaultValues?.order ?? "0"}
              isDisabled={isLoading}
            />
          </div>
          <AtInput
            label="Color de fondo"
            name="backgroundColor"
            placeholder="#FF5733"
            defaultValue={defaultValues?.backgroundColor}
            isDisabled={isLoading}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Fecha inicio"
              name="startDate"
              type="datetime-local"
              defaultValue={defaultValues?.startDate}
              isDisabled={isLoading}
            />
            <AtInput
              label="Fecha fin"
              name="endDate"
              type="datetime-local"
              defaultValue={defaultValues?.endDate}
              isDisabled={isLoading}
            />
          </div>
        </MlForm>
      </CardBody>
    </Card>
  );
}
