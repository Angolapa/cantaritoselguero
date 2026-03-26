"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import { AtButton, MlAvailabilityCard, MlImageUpload } from "@/libs/cantaritos-ui";
import { OgComboForm } from "@/libs/cantaritos-ui/organisms/og-combo-form";
import { ComboFormValues } from "@/libs/cantaritos-ui/organisms/og-combo-form";
import { useCombo, useUpdateCombo, useUploadComboImage } from "@/domain/hooks/combos";
import { useProducts } from "@/domain/hooks/products";

export default function EditComboPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: combo, isLoading: isLoadingCombo } = useCombo(id);
  const { data: products = [] } = useProducts();
  const updateCombo = useUpdateCombo();
  const uploadImage = useUploadComboImage();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? combo?.isActive ?? true;

  const isSaving = updateCombo.isPending || uploadImage.isPending;

  const handleSubmit = (values: ComboFormValues) => {
    if (!values.nameEs.trim()) return;
    if (values.items.length === 0) return;

    const price = Number(values.price);
    if (!Number.isFinite(price) || price < 0) return;

    updateCombo.mutate(
      {
        id,
        data: {
          nameEs: values.nameEs.trim(),
          nameEn: values.nameEn.trim(),
          descriptionEs: values.descriptionEs.trim() || undefined,
          descriptionEn: values.descriptionEn.trim() || undefined,
          price,
          isActive,
          items: values.items,
        },
      },
      {
        onSuccess: () => router.push("/admin/combos"),
      },
    );
  };

  const handleImageUpload = (file: File) => {
    uploadImage.mutate({ id, file });
  };

  if (isLoadingCombo) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando combo..." />
      </div>
    );
  }

  if (!combo) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Combo no encontrado</p>
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
            href="/admin/combos"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/combos" className="hover:text-primary">
                Combos
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">{combo.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/combos")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="combo-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgComboForm
            defaultValues={{
              nameEs: combo.name,
              nameEn: "",
              descriptionEs: combo.description ?? "",
              descriptionEn: "",
              price: combo.price.toString(),
              items: combo.items.map((comboItem) => ({
                productId: comboItem.productId,
                quantity: comboItem.quantity,
              })),
            }}
            products={products}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isEdit
          />
        </div>
        <div className="space-y-6">
          <MlImageUpload
            currentImage={combo.image}
            onFileSelect={handleImageUpload}
            isUploading={uploadImage.isPending}
          />
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActiveOverride}
          />
        </div>
      </div>

      {/* Error */}
      {(updateCombo.error || uploadImage.error) && (
        <p className="text-sm text-red-500">
          {updateCombo.error?.message ||
            uploadImage.error?.message ||
            "Error al actualizar combo"}
        </p>
      )}
    </div>
  );
}
