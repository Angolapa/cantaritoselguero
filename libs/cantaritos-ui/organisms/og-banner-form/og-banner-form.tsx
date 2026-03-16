"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import { OgBannerFormProps } from "./og-banner-form.types";

const SECTION_OPTIONS = [
  { value: "home-carousel", label: "Carrusel Home" },
];

const LOCALE_OPTIONS = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
];

const selectStyles =
  "flex-1 h-11 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-gray-900 dark:text-white outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed";

function parseSection(raw?: string): { baseSection: string; locale: string } {
  if (!raw) return { baseSection: "home-carousel", locale: "es" };
  if (raw.endsWith("-en")) return { baseSection: raw.slice(0, -3), locale: "en" };
  return { baseSection: raw, locale: "es" };
}

export function OgBannerForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: OgBannerFormProps) {
  const { baseSection, locale: defaultLocale } = parseSection(defaultValues?.section);

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
            const sectionBase = (formData.get("section") ?? "home-carousel").toString().trim();
            const localeVal = (formData.get("locale") ?? "es").toString().trim();
            const section = localeVal === "en" ? `${sectionBase}-en` : sectionBase;
            onSubmit({
              title: (formData.get("title") ?? "").toString().trim(),
              altText: (formData.get("altText") ?? "").toString().trim(),
              linkUrl: (formData.get("linkUrl") ?? "").toString().trim(),
              section,
              locale: localeVal,
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="section" className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Sección
              </label>
              <select
                id="section"
                name="section"
                defaultValue={baseSection}
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
            <div className="flex flex-col gap-1.5">
              <label htmlFor="locale" className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Idioma
              </label>
              <select
                id="locale"
                name="locale"
                defaultValue={defaultLocale}
                disabled={isLoading}
                className={selectStyles}
              >
                {LOCALE_OPTIONS.map((opt) => (
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
