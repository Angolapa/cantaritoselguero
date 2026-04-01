"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { AtButton, MlAvailabilityCard } from "@/libs/cantaritos-ui";
import { OgTagForm } from "@/libs/cantaritos-ui/organisms/og-tag-form";
import { TagFormValues } from "@/libs/cantaritos-ui/organisms/og-tag-form";
import { useCreateTag } from "@/domain/hooks/tags";

export default function NewTagPage() {
  const router = useRouter();
  const createTag = useCreateTag();

  const [isActive, setIsActive] = useState(true);

  const isLoading = createTag.isPending;

  const handleSubmit = (values: TagFormValues) => {
    if (!values.nameEs.trim()) return;

    createTag.mutate(
      {
        nameEs: values.nameEs.trim(),
        nameEn: values.nameEn.trim(),
        isActive,
      },
      {
        onSuccess: () => router.push("/admin/tags"),
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
            href="/admin/tags"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/tags" className="hover:text-primary">
                Etiquetas
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Nueva Etiqueta</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Etiqueta</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="tag-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgTagForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {/* Error */}
      {createTag.error && (
        <p className="text-sm text-red-500">
          {createTag.error?.message || "Error al crear etiqueta"}
        </p>
      )}
    </div>
  );
}
