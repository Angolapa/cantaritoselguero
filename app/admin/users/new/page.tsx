"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardBody } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  AtSwitch,
  OgUserForm,
} from "@/libs/cantaritos-ui";
import { UserFormValues } from "@/libs/cantaritos-ui/organisms/og-user-form";
import { useCreateUser } from "@/domain/hooks/users";

export default function NewUserPage() {
  const router = useRouter();
  const createUser = useCreateUser();

  const [isActive, setIsActive] = useState(true);

  const isLoading = createUser.isPending;

  const handleSubmit = (values: UserFormValues) => {
    if (!values.name.trim()) return;
    if (!values.email.trim()) return;
    if (!values.password) return;

    createUser.mutate(
      {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        phone: values.phone || undefined,
        role: values.role,
        isActive,
      },
      {
        onSuccess: () => {
          router.push("/admin/users");
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
              <span className="text-gray-400">Nuevo Usuario</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Usuario</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="user-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgUserForm onSubmit={handleSubmit} isLoading={isLoading} />
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
                  onValueChange={setIsActive}
                  aria-label="Cuenta activa"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Error */}
      {createUser.error && (
        <p className="text-sm text-red-500">
          {createUser.error?.message || "Error al crear usuario"}
        </p>
      )}
    </div>
  );
}
