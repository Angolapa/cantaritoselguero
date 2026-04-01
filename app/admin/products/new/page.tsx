"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardBody } from "@heroui/react";
import { ArrowLeft, Tag as TagIcon } from "lucide-react";

import {
  AtButton,
  AtChip,
  MlAvailabilityCard,
  MlImageUpload,
  OgProductForm,
} from "@/libs/cantaritos-ui";
import { ProductFormValues } from "@/libs/cantaritos-ui/organisms/og-product-form";
import {
  useAssignProductTags,
  useCreateProduct,
  useUploadProductImage,
} from "@/domain/hooks/products";
import { useTags } from "@/domain/hooks/tags";
import { Tag } from "@/domain/types";

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const uploadImage = useUploadProductImage();
  const assignTags = useAssignProductTags();
  const { data: allTags = [] } = useTags();

  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const isLoading =
    createProduct.isPending || uploadImage.isPending || assignTags.isPending;

  const handleToggleTag = (tagId: string) => {
    setSelectedTagIds((previous) =>
      previous.includes(tagId)
        ? previous.filter((id) => id !== tagId)
        : [...previous, tagId],
    );
  };

  const handleSubmit = async (values: ProductFormValues) => {
    if (!values.nameEs.trim()) return;

    const basePrice = Number(values.basePrice);
    if (!Number.isFinite(basePrice) || basePrice < 0) return;

    const stock = values.stock ? Number(values.stock) : undefined;
    if (stock !== undefined && (!Number.isFinite(stock) || stock < 0)) return;

    try {
      const product = await createProduct.mutateAsync({
        nameEs: values.nameEs.trim(),
        nameEn: values.nameEn.trim(),
        descriptionEs: values.descriptionEs || undefined,
        descriptionEn: values.descriptionEn || undefined,
        basePrice,
        stock,
        isActive,
      });

      await Promise.all([
        selectedFile
          ? uploadImage.mutateAsync({ id: product.id, file: selectedFile })
          : undefined,
        selectedTagIds.length > 0
          ? assignTags.mutateAsync({
              productId: product.id,
              tagIds: selectedTagIds,
            })
          : undefined,
      ]);

      router.push("/admin/products");
    } catch {
      // errors displayed via mutation.error states below
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AtButton
            as={Link}
            href="/admin/products"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/products" className="hover:text-primary">
                Productos
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Nuevo Producto</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Producto</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="product-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgProductForm onSubmit={handleSubmit} isLoading={isLoading} />
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
          {allTags.length > 0 && (
            <Card shadow="sm">
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <TagIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Etiquetas</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag: Tag) => {
                    const isSelected = selectedTagIds.includes(tag.id);
                    return (
                      <AtChip
                        key={tag.id}
                        variant={isSelected ? "solid" : "bordered"}
                        color={isSelected ? "primary" : "default"}
                        className="cursor-pointer select-none"
                        onClick={() => handleToggleTag(tag.id)}
                      >
                        {tag.name}
                      </AtChip>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Error */}
      {(createProduct.error || uploadImage.error || assignTags.error) && (
        <p className="text-sm text-red-500">
          {createProduct.error?.message ||
            uploadImage.error?.message ||
            assignTags.error?.message ||
            "Error al crear producto"}
        </p>
      )}
    </div>
  );
}
