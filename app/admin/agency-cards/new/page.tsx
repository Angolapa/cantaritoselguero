"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  MlAvailabilityCard,
  MlImageUpload,
  OgAgencyCardForm,
} from "@/libs/cantaritos-ui";
import { AgencyCardFormValues } from "@/libs/cantaritos-ui/organisms/og-agency-card-form";
import {
  useCreateAgencyCard,
  useUploadAgencyCardImage,
} from "@/domain/hooks/agency-cards";

export default function NewAgencyCardPage() {
  const router = useRouter();
  const createAgencyCard = useCreateAgencyCard();
  const uploadImage = useUploadAgencyCardImage();

  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isLoading = createAgencyCard.isPending || uploadImage.isPending;

  const handleSubmit = (values: AgencyCardFormValues) => {
    if (
      !values.title.trim() ||
      !values.location.trim() ||
      !values.lodgingType.trim()
    ) {
      alert("Nombre, ubicación y tipo de hospedaje son requeridos");
      return;
    }

    createAgencyCard.mutate(
      {
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
      {
        onSuccess: (card) => {
          if (imageFile) {
            uploadImage.mutate(
              { id: card.id, file: imageFile },
              { onSuccess: () => router.push("/admin/agency-cards") },
            );
          } else {
            router.push("/admin/agency-cards");
          }
        },
      },
    );
  };

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
              <span className="text-gray-400">Nueva Agencia</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Agencia</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="agency-card-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgAgencyCardForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <h3 className="font-semibold text-sm">Imagen de la Agencia</h3>
            <MlImageUpload
              onFileSelect={setImageFile}
              isUploading={uploadImage.isPending}
            />
          </div>
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {(createAgencyCard.error || uploadImage.error) && (
        <p className="text-sm text-red-500">
          {createAgencyCard.error?.message ||
            uploadImage.error?.message ||
            "Error al crear agencia"}
        </p>
      )}
    </div>
  );
}
