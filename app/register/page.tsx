"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AtButton, AtInput, MlForm } from "@/libs/cantaritos-ui";
import { useRegister } from "@/domain/hooks/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState<
    string | null
  >(null);

  const passwordsDoNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Registro</h1>

        <MlForm onSubmit={(submitEvent) => {
          submitEvent.preventDefault();
          const formData = new FormData(submitEvent.currentTarget);
          const name = (formData.get("name") ?? "").toString().trim();
          const email = (formData.get("email") ?? "").toString().trim();
          const phone = (formData.get("phone") ?? "").toString().trim();
          const birthDate = (formData.get("birthDate") ?? "").toString().trim();
          if (!name || !email || !password) return;
          if (password !== confirmPassword) {
            setPasswordMismatchError("Las contraseñas no coinciden");
            return;
          }
          setPasswordMismatchError(null);
          register(
            {
              name,
              email,
              password,
              ...(phone && { phone }),
              ...(birthDate && { birthDate }),
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
            value={password}
            onValueChange={(value) => {
              setPassword(value);
              if (passwordMismatchError) setPasswordMismatchError(null);
            }}
            isRequired
          />

          <AtInput
            label="Repetir contraseña"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            minLength={6}
            value={confirmPassword}
            onValueChange={(value) => {
              setConfirmPassword(value);
              if (passwordMismatchError) setPasswordMismatchError(null);
            }}
            isInvalid={passwordsDoNotMatch}
            isRequired
          />
          {passwordsDoNotMatch && (
            <p className="-mt-1 text-xs text-red-500">
              Las contraseñas no coinciden
            </p>
          )}

          <AtInput
            label="Teléfono"
            name="phone"
            type="tel"
            placeholder="(opcional)"
          />

          <AtInput
            label="Fecha de nacimiento"
            name="birthDate"
            type="date"
            placeholder="(opcional)"
          />

          {passwordMismatchError && (
            <p className="text-sm text-red-500">{passwordMismatchError}</p>
          )}

          {error && (
            <p className="text-sm text-red-500">
              {error.message || "Error al registrar"}
            </p>
          )}

          <AtButton
            className="mt-4"
            type="submit"
            fullWidth
            isLoading={isPending}
            isDisabled={passwordsDoNotMatch}
          >
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
