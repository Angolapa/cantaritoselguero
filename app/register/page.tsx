"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useRegister } from "@/domain/hooks/auth";
import { AtButton, AtInput, MlForm } from "@/libs/cantaritos-ui";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Registro</h1>

        <MlForm onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const phone = formData.get("phone") as string;
          register(
            {
              name: formData.get("name") as string,
              email: formData.get("email") as string,
              password: formData.get("password") as string,
              ...(phone && { phone }),
            },
            { onSuccess: () => router.push("/login") },
          );
        }}>
          <AtInput
            label="Nombre"
            name="name"
            type="text"
            placeholder="Tu nombre"
            isRequired
          />

          <AtInput
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="tu@email.com"
            isRequired
          />

          <AtInput
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            minLength={6}
            isRequired
          />

          <AtInput
            label="Teléfono"
            name="phone"
            type="tel"
            placeholder="(opcional)"
          />

          {error && (
            <p className="text-sm text-red-500">
              {error.message || "Error al registrar"}
            </p>
          )}

          <AtButton className="mt-4" type="submit" fullWidth isLoading={isPending}>
            Registrarse
          </AtButton>
        </MlForm>

        <p className="mt-4 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-primary-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
