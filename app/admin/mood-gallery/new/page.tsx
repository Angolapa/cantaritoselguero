"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  MlAvailabilityCard,
  MlImageUpload,
} from "@/libs/cantaritos-ui";
import { OgMoodGalleryForm } from "@/libs/cantaritos-ui/organisms/og-mood-gallery-form";
import { MoodGalleryFormValues } from "@/libs/cantaritos-ui/organisms/og-mood-gallery-form";
import {
  useCreateMoodGallery,
  useUploadMoodGalleryImage,
  useUploadMoodGalleryMobileImage,
} from "@/domain/hooks/mood-gallery";

export default function NewMoodGalleryPage() {
  const router = useRouter();
  const createMoodGallery = useCreateMoodGallery();
  const uploadImage = useUploadMoodGalleryImage();
  const uploadMobileImage = useUploadMoodGalleryMobileImage();

  const [isActive, setIsActive] = useState(true);
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);

  const isLoading =
    createMoodGallery.isPending || uploadImage.isPending || uploadMobileImage.isPending;

  const handleSubmit = (values: MoodGalleryFormValues) => {
    if (!values.altEs.trim() || !values.altEn.trim()) return;
    if (!desktopFile) {
      alert("Debes seleccionar una imagen desktop.");
      return;
    }

    createMoodGallery.mutate(
      {
        altEs: values.altEs.trim(),
        altEn: values.altEn.trim(),
        title: values.title || undefined,
        section: values.section || "mood-carousel",
        order: Number(values.order) || 0,
        isActive,
      },
      {
        onSuccess: (item) => {
          uploadImage.mutate(
            { id: item.id, file: desktopFile },
            {
              onSuccess: () => {
                if (mobileFile) {
                  uploadMobileImage.mutate(
                    { id: item.id, file: mobileFile },
                    { onSuccess: () => router.push("/admin/mood-gallery") },
                  );
                } else {
                  router.push("/admin/mood-gallery");
                }
              },
            },
          );
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
              <span className="text-gray-400">Nueva Imagen</span>
            </nav>
            <h1 className="text-xl font-bold">Agregar Imagen</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="mood-gallery-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgMoodGalleryForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen Desktop</h3>
            <MlImageUpload
              onFileSelect={setDesktopFile}
              isUploading={uploadImage.isPending}
            />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen Mobile (opcional)</h3>
            <MlImageUpload
              onFileSelect={setMobileFile}
              isUploading={uploadMobileImage.isPending}
            />
          </div>
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {/* Error */}
      {(createMoodGallery.error || uploadImage.error || uploadMobileImage.error) && (
        <p className="text-sm text-red-500">
          {createMoodGallery.error?.message ||
            uploadImage.error?.message ||
            uploadMobileImage.error?.message ||
            "Error al crear imagen"}
        </p>
      )}
    </div>
  );
}
