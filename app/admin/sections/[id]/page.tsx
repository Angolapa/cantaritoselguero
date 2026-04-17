"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import { AtButton, MlAvailabilityCard } from "@/libs/cantaritos-ui";
import { OgSectionForm } from "@/libs/cantaritos-ui/organisms/og-section-form";
import { SectionFormValues } from "@/libs/cantaritos-ui/organisms/og-section-form";
import { OgSectionItems } from "@/libs/cantaritos-ui/organisms/og-section-items";
import { useCombos } from "@/domain/hooks/combos";
import { useProducts } from "@/domain/hooks/products";
import {
  useAddSectionItem,
  useRemoveSectionItem,
  useSection,
  useUpdateSection,
} from "@/domain/hooks/sections";

export default function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: section, isLoading: isLoadingSection } = useSection(id);
  const { data: products = [] } = useProducts();
  const { data: combos = [] } = useCombos();
  const updateSection = useUpdateSection();
  const addItem = useAddSectionItem();
  const removeItem = useRemoveSectionItem();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? section?.isActive ?? true;

  const isSaving = updateSection.isPending;

  const handleSubmit = (values: SectionFormValues) => {
    if (!values.nameEs.trim()) return;

    const order = values.order ? Number(values.order) : undefined;

    updateSection.mutate(
      {
        id,
        data: {
          nameEs: values.nameEs.trim(),
          nameEn: values.nameEn.trim(),
          slug: values.slug.trim() || undefined,
          order,
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/admin/sections"),
      },
    );
  };

  const handleAddProduct = (productId: string, order: number) => {
    addItem.mutate({ sectionId: id, data: { productId, order } });
  };

  const handleAddCombo = (comboId: string, order: number) => {
    addItem.mutate({ sectionId: id, data: { comboId, order } });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem.mutate({ sectionId: id, itemId });
  };

  if (isLoadingSection) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando sección..." />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Sección no encontrada</p>
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
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">{section.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/sections")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="section-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <OgSectionForm
            defaultValues={{
              nameEs: section.nameEs ?? section.name,
              nameEn: section.nameEn ?? "",
              slug: section.slug,
              order: section.order.toString(),
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isEdit
          />
          <OgSectionItems
            sectionId={id}
            items={section.items ?? []}
            products={products}
            combos={combos}
            onAddProduct={handleAddProduct}
            onAddCombo={handleAddCombo}
            onRemoveItem={handleRemoveItem}
            isLoading={addItem.isPending || removeItem.isPending}
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
      {(updateSection.error || addItem.error || removeItem.error) && (
        <p className="text-sm text-red-500">
          {updateSection.error?.message ||
            addItem.error?.message ||
            removeItem.error?.message ||
            "Error al actualizar sección"}
        </p>
      )}
    </div>
  );
}
