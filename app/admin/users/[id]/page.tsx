"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardBody, Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  AtSwitch,
  OgUserForm,
} from "@/libs/cantaritos-ui";
import { UserFormValues } from "@/libs/cantaritos-ui/organisms/og-user-form";
import { useUpdateUser, useUser } from "@/domain/hooks/users";

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useUser(id);
  const updateUser = useUpdateUser();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? user?.isActive ?? true;

  const isSaving = updateUser.isPending;

  const handleSubmit = (values: UserFormValues) => {
    if (!values.name.trim()) return;
    if (!values.email.trim()) return;

    updateUser.mutate(
      {
        id,
        data: {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone || undefined,
          role: values.role,
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/admin/users"),
      },
    );
  };

  if (isLoadingUser) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando usuario..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Usuario no encontrado</p>
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
            href="/admin/users"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/users" className="hover:text-primary">
                Usuarios
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">{user.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/users")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="user-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgUserForm
            defaultValues={{
              name: user.name,
              email: user.email,
              phone: user.phone ?? "",
              role: user.role,
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isEditing
          />
        </div>
        <div className="space-y-6">
          <Card shadow="sm">
            <CardBody className="p-6">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                Estado de la cuenta
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Cuenta activa</span>
                  <span className="text-xs text-gray-500">
                    El usuario puede iniciar sesión
                  </span>
                </div>
                <AtSwitch
                  isSelected={isActive}
                  onValueChange={setIsActiveOverride}
                  aria-label="Cuenta activa"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Error */}
      {updateUser.error && (
        <p className="text-sm text-red-500">
          {updateUser.error?.message || "Error al actualizar usuario"}
        </p>
      )}
    </div>
  );
}
