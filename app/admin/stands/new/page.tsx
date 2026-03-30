"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardBody } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  AtInput,
  AtTextarea,
  MlAvailabilityCard,
} from "@/libs/cantaritos-ui";
import { useCreateStand } from "@/domain/hooks/stands";

export default function NewStandPage() {
  const router = useRouter();
  const createStand = useCreateStand();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: "",
  });
  const [isActive, setIsActive] = useState(true);

  const isLoading = createStand.isPending;

  const handleInputChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = changeEvent.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (!formData.name.trim()) {
      alert("El nombre del stand es requerido");
      return;
    }

    createStand.mutate({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      location: formData.location.trim() || undefined,
      image: formData.image.trim() || undefined,
      isActive,
    }, {
      onSuccess: () => {
        router.push("/admin/stands");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AtButton
            as={Link}
            href="/admin/stands"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/stands" className="hover:text-primary">
                Stands
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Nuevo Stand</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Stand</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="stand-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card shadow="sm">
            <CardBody className="p-6">
              <form id="stand-form" onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <AtInput
                    label="Nombre del Stand"
                    placeholder="ej. Stand de Micheladas"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isRequired
                  />
                </div>

                <div className="mb-1">
                  <AtTextarea
                    label="Descripción"
                    labelPlacement="outside"
                    placeholder="ej. Micheladas artesanales con bebidas variadas"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    minRows={3}
                  />
                </div>

                <div className="pt-1">
                  <AtInput
                    label="Ubicación"
                    placeholder="ej. Zona A, Pasillo 3"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <AtInput
                    label="Imagen (URL, opcional)"
                    placeholder="https://..."
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </CardBody>
          </Card>
        </div>

        <div>
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {/* Error */}
      {createStand.error && (
        <p className="text-sm text-red-500">
          {createStand.error?.message || "Error al crear stand"}
        </p>
      )}
    </div>
  );
}
