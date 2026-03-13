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
  OgBannerForm,
} from "@/libs/cantaritos-ui";
import { BannerFormValues } from "@/libs/cantaritos-ui/organisms/og-banner-form";
import {
  useBanner,
  useUpdateBanner,
  useUploadBannerImage,
  useUploadBannerMobileImage,
} from "@/domain/hooks/banners";

function toLocalDatetime(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export default function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: banner, isLoading: isLoadingBanner } = useBanner(id);
  const updateBanner = useUpdateBanner();
  const uploadImage = useUploadBannerImage();
  const uploadMobileImage = useUploadBannerMobileImage();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? banner?.isActive ?? true;

  const isSaving =
    updateBanner.isPending || uploadImage.isPending || uploadMobileImage.isPending;

  const handleSubmit = (values: BannerFormValues) => {
    if (!values.altText.trim()) return;

    updateBanner.mutate(
      {
        id,
        data: {
          title: values.title || undefined,
          altText: values.altText.trim(),
          linkUrl: values.linkUrl || undefined,
          section: values.section || "home-carousel",
          order: Number(values.order) || 0,
          backgroundColor: values.backgroundColor || undefined,
          startDate: values.startDate
            ? new Date(values.startDate).toISOString()
            : undefined,
          endDate: values.endDate
            ? new Date(values.endDate).toISOString()
            : undefined,
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/admin/banners"),
      },
    );
  };

  const handleDesktopUpload = (file: File) => {
    uploadImage.mutate({ id, file });
  };

  const handleMobileUpload = (file: File) => {
    uploadMobileImage.mutate({ id, file });
  };

  if (isLoadingBanner) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando banner..." />
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Banner no encontrado</p>
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
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">
              {banner.title || banner.altText}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/banners")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="banner-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgBannerForm
            defaultValues={{
              title: banner.title ?? "",
              altText: banner.altText,
              linkUrl: banner.linkUrl ?? "",
              section: banner.section,
              order: String(banner.order),
              backgroundColor: banner.backgroundColor ?? "",
              startDate: toLocalDatetime(banner.startDate),
              endDate: toLocalDatetime(banner.endDate),
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
          />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen Desktop</h3>
            <MlImageUpload
              currentImage={banner.imageUrl}
              onFileSelect={handleDesktopUpload}
              isUploading={uploadImage.isPending}
            />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen Mobile (opcional)</h3>
            <MlImageUpload
              currentImage={banner.imageMobileUrl ?? undefined}
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
      {(updateBanner.error || uploadImage.error || uploadMobileImage.error) && (
        <p className="text-sm text-red-500">
          {updateBanner.error?.message ||
            uploadImage.error?.message ||
            uploadMobileImage.error?.message ||
            "Error al actualizar banner"}
        </p>
      )}
    </div>
  );
}
