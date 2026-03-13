"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  MlAvailabilityCard,
  MlImageUpload,
  OgBannerForm,
} from "@/libs/cantaritos-ui";
import { BannerFormValues } from "@/libs/cantaritos-ui/organisms/og-banner-form";
import {
  useCreateBanner,
  useUploadBannerImage,
  useUploadBannerMobileImage,
} from "@/domain/hooks/banners";

export default function NewBannerPage() {
  const router = useRouter();
  const createBanner = useCreateBanner();
  const uploadImage = useUploadBannerImage();
  const uploadMobileImage = useUploadBannerMobileImage();

  const [isActive, setIsActive] = useState(true);
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);

  const isLoading =
    createBanner.isPending || uploadImage.isPending || uploadMobileImage.isPending;

  const handleSubmit = (values: BannerFormValues) => {
    if (!values.altText.trim()) return;
    if (!desktopFile) {
      alert("Debes seleccionar una imagen desktop para el banner.");
      return;
    }

    createBanner.mutate(
      {
        imageUrl: "https://placeholder.co/1440x400",
        altText: values.altText.trim(),
        title: values.title || undefined,
        linkUrl: values.linkUrl || undefined,
        section: values.section || "home-carousel",
        order: Number(values.order) || 0,
        backgroundColor: values.backgroundColor || undefined,
        startDate: values.startDate ? new Date(values.startDate).toISOString() : undefined,
        endDate: values.endDate ? new Date(values.endDate).toISOString() : undefined,
        isActive,
      },
      {
        onSuccess: (banner) => {
          // Desktop image is required, upload it first
          uploadImage.mutate(
            { id: banner.id, file: desktopFile },
            {
              onSuccess: () => {
                if (mobileFile) {
                  uploadMobileImage.mutate(
                    { id: banner.id, file: mobileFile },
                    { onSuccess: () => router.push("/admin/banners") },
                  );
                } else {
                  router.push("/admin/banners");
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
            href="/admin/banners"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/banners" className="hover:text-primary">
                Banners
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Nuevo Banner</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Banner</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="banner-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgBannerForm onSubmit={handleSubmit} isLoading={isLoading} />
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
      {(createBanner.error || uploadImage.error || uploadMobileImage.error) && (
        <p className="text-sm text-red-500">
          {createBanner.error?.message ||
            uploadImage.error?.message ||
            uploadMobileImage.error?.message ||
            "Error al crear banner"}
        </p>
      )}
    </div>
  );
}
