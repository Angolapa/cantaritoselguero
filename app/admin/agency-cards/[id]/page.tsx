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
  OgAgencyCardForm,
} from "@/libs/cantaritos-ui";
import { AgencyCardFormValues } from "@/libs/cantaritos-ui/organisms/og-agency-card-form";
import {
  useAgencyCard,
  useUpdateAgencyCard,
  useUploadAgencyCardImage,
} from "@/domain/hooks/agency-cards";

export default function EditAgencyCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: agencyCard, isLoading: isLoadingCard } = useAgencyCard(id);
  const updateAgencyCard = useUpdateAgencyCard();
  const uploadImage = useUploadAgencyCardImage();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? agencyCard?.isActive ?? true;

  const isSaving = updateAgencyCard.isPending || uploadImage.isPending;

  const handleSubmit = (values: AgencyCardFormValues) => {
    if (
      !values.title.trim() ||
      !values.location.trim() ||
      !values.lodgingType.trim()
    ) {
      alert("Nombre, ubicación y tipo de hospedaje son requeridos");
      return;
    }

    updateAgencyCard.mutate(
      {
        id,
        data: {
          title: values.title,
          location: values.location,
          lodgingType: values.lodgingType,
          distance: values.distance || null,
          email: values.email || null,
          phone: values.phone || null,
          socialHandle: values.socialHandle || null,
          facebookUrl: values.facebookUrl || null,
          instagramUrl: values.instagramUrl || null,
          tiktokUrl: values.tiktokUrl || null,
          order: Number(values.order) || 0,
          isActive,
        },
      },
      { onSuccess: () => router.push("/admin/agency-cards") },
    );
  };

  const handleImageUpload = (file: File) => {
    uploadImage.mutate({ id, file });
  };

  if (isLoadingCard) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando agencia..." />
      </div>
    );
  }

  if (!agencyCard) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Agencia no encontrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AtButton
            as={Link}
            href="/admin/agency-cards"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/agency-cards" className="hover:text-primary">
                Agencias
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">{agencyCard.title}</span>
            </nav>
            <h1 className="text-xl font-bold">Editar Agencia</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/agency-cards")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="agency-card-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgAgencyCardForm
            defaultValues={{
              title: agencyCard.title,
              location: agencyCard.location,
              lodgingType: agencyCard.lodgingType,
              distance: agencyCard.distance ?? "",
              email: agencyCard.email ?? "",
              phone: agencyCard.phone ?? "",
              socialHandle: agencyCard.socialHandle ?? "",
              facebookUrl: agencyCard.facebookUrl ?? "",
              instagramUrl: agencyCard.instagramUrl ?? "",
              tiktokUrl: agencyCard.tiktokUrl ?? "",
              order: String(agencyCard.order),
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
          />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen de la Agencia</h3>
            <MlImageUpload
              currentImage={agencyCard.imageUrl ?? undefined}
              onFileSelect={handleImageUpload}
              isUploading={uploadImage.isPending}
            />
          </div>
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActiveOverride}
          />
        </div>
      </div>

      {(updateAgencyCard.error || uploadImage.error) && (
        <p className="text-sm text-red-500">
          {updateAgencyCard.error?.message ||
            uploadImage.error?.message ||
            "Error al actualizar agencia"}
        </p>
      )}
    </div>
  );
}
