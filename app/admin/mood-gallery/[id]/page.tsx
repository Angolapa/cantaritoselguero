"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  MlAvailabilityCard,
  MlImageUpload,
} from "@/libs/cantaritos-ui";
import { OgMoodGalleryForm } from "@/libs/cantaritos-ui/organisms/og-mood-gallery-form";
import { MoodGalleryFormValues } from "@/libs/cantaritos-ui/organisms/og-mood-gallery-form";
import {
  useMoodGalleryItem,
  useUpdateMoodGallery,
  useUploadMoodGalleryImage,
  useUploadMoodGalleryMobileImage,
} from "@/domain/hooks/mood-gallery";

export default function EditMoodGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: item, isLoading: isLoadingItem } = useMoodGalleryItem(id);
  const updateMoodGallery = useUpdateMoodGallery();
  const uploadImage = useUploadMoodGalleryImage();
  const uploadMobileImage = useUploadMoodGalleryMobileImage();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? item?.isActive ?? true;

  const isSaving =
    updateMoodGallery.isPending || uploadImage.isPending || uploadMobileImage.isPending;

  const handleSubmit = (values: MoodGalleryFormValues) => {
    if (!values.altEs.trim() || !values.altEn.trim()) return;

    updateMoodGallery.mutate(
      {
        id,
        data: {
          title: values.title || undefined,
          altEs: values.altEs.trim(),
          altEn: values.altEn.trim(),
          section: values.section || "mood-carousel",
          order: Number(values.order) || 0,
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/admin/mood-gallery"),
      },
    );
  };

  const handleDesktopUpload = (file: File) => {
    uploadImage.mutate({ id, file });
  };

  const handleMobileUpload = (file: File) => {
    uploadMobileImage.mutate({ id, file });
  };

  if (isLoadingItem) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando imagen..." />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Imagen no encontrada</p>
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
            href="/admin/mood-gallery"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/mood-gallery" className="hover:text-primary">
                Mood Gallery
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">
              {item.title || item.altEs}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/mood-gallery")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="mood-gallery-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgMoodGalleryForm
            defaultValues={{
              title: item.title ?? "",
              altEs: item.altEs,
              altEn: item.altEn,
              section: item.section,
              order: String(item.order),
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
          />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen Desktop</h3>
            <MlImageUpload
              currentImage={item.imageUrl ?? undefined}
              onFileSelect={handleDesktopUpload}
              isUploading={uploadImage.isPending}
            />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen Mobile (opcional)</h3>
            <MlImageUpload
              currentImage={item.imageMobileUrl ?? undefined}
              onFileSelect={handleMobileUpload}
              isUploading={uploadMobileImage.isPending}
            />
          </div>
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActiveOverride}
          />
        </div>
      </div>

      {/* Error */}
      {(updateMoodGallery.error || uploadImage.error || uploadMobileImage.error) && (
        <p className="text-sm text-red-500">
          {updateMoodGallery.error?.message ||
            uploadImage.error?.message ||
            uploadMobileImage.error?.message ||
            "Error al actualizar imagen"}
        </p>
      )}
    </div>
  );
}
