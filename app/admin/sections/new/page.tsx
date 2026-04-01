"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { AtButton, MlAvailabilityCard } from "@/libs/cantaritos-ui";
import { OgSectionForm } from "@/libs/cantaritos-ui/organisms/og-section-form";
import { SectionFormValues } from "@/libs/cantaritos-ui/organisms/og-section-form";
import { useCreateSection } from "@/domain/hooks/sections";

export default function NewSectionPage() {
  const router = useRouter();
  const createSection = useCreateSection();

  const [isActive, setIsActive] = useState(true);

  const isLoading = createSection.isPending;

  const handleSubmit = (values: SectionFormValues) => {
    if (!values.nameEs.trim()) return;
    if (!values.slug.trim()) return;

    const order = values.order ? Number(values.order) : undefined;

    createSection.mutate(
      {
        nameEs: values.nameEs.trim(),
        nameEn: values.nameEn.trim(),
        slug: values.slug.trim(),
        order,
        isActive,
      },
      {
        onSuccess: () => router.push("/admin/sections"),
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AtButton
            as={Link}
            href="/admin/sections"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/sections" className="hover:text-primary">
                Secciones
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Nueva Sección</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Sección</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="section-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgSectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {/* Error */}
      {createSection.error && (
        <p className="text-sm text-red-500">
          {createSection.error?.message || "Error al crear sección"}
        </p>
      )}
    </div>
  );
}
