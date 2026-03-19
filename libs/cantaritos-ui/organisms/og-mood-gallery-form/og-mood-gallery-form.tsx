"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgMoodGalleryFormProps } from "./og-mood-gallery-form.types";

const SECTION_OPTIONS = [
  { value: "mood-carousel", label: "Mood Carousel" },
];

const selectStyles =
  "flex-1 h-11 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-gray-900 dark:text-white outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed";

export function OgMoodGalleryForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: OgMoodGalleryFormProps) {
  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información de la Imagen</h2>
        </div>

        <MlForm
          id="mood-gallery-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              title: (formData.get("title") ?? "").toString().trim(),
              altEs: (formData.get("altEs") ?? "").toString().trim(),
              altEn: (formData.get("altEn") ?? "").toString().trim(),
              section: (formData.get("section") ?? "mood-carousel").toString().trim(),
              order: (formData.get("order") ?? "0").toString().trim(),
            });
          }}
        >
          <AtInput
            label="Título / Caption"
            name="title"
            placeholder="Ej: Ambiente festivo"
            defaultValue={defaultValues?.title}
            isDisabled={isLoading}
          />
          <AtInput
            label="Texto alternativo (Español)"
            name="altEs"
            placeholder="Descripción de la imagen en español"
            defaultValue={defaultValues?.altEs}
            isRequired
            isDisabled={isLoading}
          />
          <AtInput
            label="Texto alternativo (English)"
            name="altEn"
            placeholder="Image description in English"
            defaultValue={defaultValues?.altEn}
            isRequired
            isDisabled={isLoading}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="section" className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Sección
              </label>
              <select
                id="section"
                name="section"
                defaultValue={defaultValues?.section ?? "mood-carousel"}
                disabled={isLoading}
                className={selectStyles}
              >
                {SECTION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
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
        </MlForm>
      </CardBody>
    </Card>
  );
}
