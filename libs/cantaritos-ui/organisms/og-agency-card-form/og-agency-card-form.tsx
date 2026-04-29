"use client";

import { Card, CardBody } from "@heroui/react";
import { Info } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";
import { MlForm } from "@/libs/cantaritos-ui/molecules";

import {
  AgencyCardFormValues,
  OgAgencyCardFormProps,
} from "./og-agency-card-form.types";

export function OgAgencyCardForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: OgAgencyCardFormProps) {
  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);
    const values: AgencyCardFormValues = {
      title: (formData.get("title") ?? "").toString().trim(),
      location: (formData.get("location") ?? "").toString().trim(),
      lodgingType: (formData.get("lodgingType") ?? "").toString().trim(),
      distance: (formData.get("distance") ?? "").toString().trim(),
      email: (formData.get("email") ?? "").toString().trim(),
      phone: (formData.get("phone") ?? "").toString().trim(),
      socialHandle: (formData.get("socialHandle") ?? "").toString().trim(),
      facebookUrl: (formData.get("facebookUrl") ?? "").toString().trim(),
      instagramUrl: (formData.get("instagramUrl") ?? "").toString().trim(),
      tiktokUrl: (formData.get("tiktokUrl") ?? "").toString().trim(),
      order: (formData.get("order") ?? "0").toString().trim(),
    };
    onSubmit(values);
  };

  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Información de la Agencia</h2>
        </div>

        <MlForm id="agency-card-form" onSubmit={handleSubmit}>
          <AtInput
            label="Nombre de la agencia"
            name="title"
            placeholder="Ej: Agencia CDMX"
            defaultValue={defaultValues?.title}
            isRequired
            isDisabled={isLoading}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Ubicación"
              name="location"
              placeholder="Ej: Tequila, Jalisco"
              defaultValue={defaultValues?.location}
              isRequired
              isDisabled={isLoading}
            />
            <AtInput
              label="Tipo de Hospedaje"
              name="lodgingType"
              placeholder="Ej: Hotel"
              defaultValue={defaultValues?.lodgingType}
              isRequired
              isDisabled={isLoading}
            />
          </div>

          <AtInput
            label="Distancia aprox. a Cantaritos el Güero #1"
            name="distance"
            placeholder="Ej: 7km - 10 min"
            defaultValue={defaultValues?.distance}
            isDisabled={isLoading}
          />

          <h3 className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Contacto
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AtInput
              label="Email"
              name="email"
              type="email"
              placeholder="correo@agencia.mx"
              defaultValue={defaultValues?.email}
              isDisabled={isLoading}
            />
            <AtInput
              label="Teléfono"
              name="phone"
              placeholder="331-0000-000"
              defaultValue={defaultValues?.phone}
              isDisabled={isLoading}
            />
          </div>

          <h3 className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Redes Sociales
          </h3>

          <AtInput
            label="Handle social"
            name="socialHandle"
            placeholder="@Agencia De Tours"
            defaultValue={defaultValues?.socialHandle}
            isDisabled={isLoading}
          />
          <AtInput
            label="Facebook URL"
            name="facebookUrl"
            placeholder="https://facebook.com/agencia"
            defaultValue={defaultValues?.facebookUrl}
            isDisabled={isLoading}
          />
          <AtInput
            label="Instagram URL"
            name="instagramUrl"
            placeholder="https://instagram.com/agencia"
            defaultValue={defaultValues?.instagramUrl}
            isDisabled={isLoading}
          />
          <AtInput
            label="TikTok URL"
            name="tiktokUrl"
            placeholder="https://tiktok.com/@agencia"
            defaultValue={defaultValues?.tiktokUrl}
            isDisabled={isLoading}
          />

          <AtInput
            label="Orden"
            name="order"
            type="number"
            min="0"
            placeholder="0"
            defaultValue={defaultValues?.order ?? "0"}
            isDisabled={isLoading}
          />
        </MlForm>
      </CardBody>
    </Card>
  );
}
