"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import { AtButton, MlAvailabilityCard } from "@/libs/cantaritos-ui";
import { OgTagForm } from "@/libs/cantaritos-ui/organisms/og-tag-form";
import { TagFormValues } from "@/libs/cantaritos-ui/organisms/og-tag-form";
import { useTag, useUpdateTag } from "@/domain/hooks/tags";

export default function EditTagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: tag, isLoading: isLoadingTag } = useTag(id);
  const updateTag = useUpdateTag();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? tag?.isActive ?? true;

  const isSaving = updateTag.isPending;

  const handleSubmit = (values: TagFormValues) => {
    if (!values.nameEs.trim()) return;

    updateTag.mutate(
      {
        id,
        data: {
          nameEs: values.nameEs.trim(),
          nameEn: values.nameEn.trim(),
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/admin/tags"),
      },
    );
  };

  if (isLoadingTag) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando etiqueta..." />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Etiqueta no encontrada</p>
      </div>
    );
  }

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
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">{tag.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/tags")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="tag-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgTagForm
            defaultValues={{
              nameEs: tag.nameEs ?? tag.name,
              nameEn: tag.nameEn ?? "",
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isEdit
          />
        </div>
        <div className="space-y-6">
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActiveOverride}
          />
        </div>
      </div>

      {/* Error */}
      {updateTag.error && (
        <p className="text-sm text-red-500">
          {updateTag.error?.message || "Error al actualizar etiqueta"}
        </p>
      )}
    </div>
  );
}
