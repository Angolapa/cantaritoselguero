"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { AtButton, MlAvailabilityCard, MlImageUpload } from "@/libs/cantaritos-ui";
import { OgComboForm } from "@/libs/cantaritos-ui/organisms/og-combo-form";
import { ComboFormValues } from "@/libs/cantaritos-ui/organisms/og-combo-form";
import { useCreateCombo, useUploadComboImage } from "@/domain/hooks/combos";
import { useProducts } from "@/domain/hooks/products";

export default function NewComboPage() {
  const router = useRouter();
  const createCombo = useCreateCombo();
  const uploadImage = useUploadComboImage();
  const { data: products = [] } = useProducts();

  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isLoading = createCombo.isPending || uploadImage.isPending;

  const handleSubmit = (values: ComboFormValues) => {
    if (!values.nameEs.trim()) return;
    if (values.items.length === 0) return;

    const price = Number(values.price);
    if (!Number.isFinite(price) || price < 0) return;

    createCombo.mutate(
      {
        nameEs: values.nameEs.trim(),
        nameEn: values.nameEn.trim(),
        descriptionEs: values.descriptionEs.trim() || undefined,
        descriptionEn: values.descriptionEn.trim() || undefined,
        price,
        isActive,
        items: values.items,
      },
      {
        onSuccess: (combo) => {
          if (selectedFile) {
            uploadImage.mutate(
              { id: combo.id, file: selectedFile },
              { onSuccess: () => router.push("/admin/combos") },
            );
          } else {
            router.push("/admin/combos");
          }
        },
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
              <span className="text-gray-400">Nuevo Combo</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Combo</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="combo-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgComboForm
            products={products}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        <div className="space-y-6">
          <MlImageUpload
            onFileSelect={setSelectedFile}
            isUploading={uploadImage.isPending}
          />
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {/* Error */}
      {(createCombo.error || uploadImage.error) && (
        <p className="text-sm text-red-500">
          {createCombo.error?.message ||
            uploadImage.error?.message ||
            "Error al crear combo"}
        </p>
      )}
    </div>
  );
}
