"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AtButton, AtInput, MlForm } from "@/libs/cantaritos-ui";
import { OgNavbar } from "@/libs/cantaritos-ui";
import { useLogin } from "@/domain/hooks/auth";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <OgNavbar />

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <h1 className="mb-6 text-center text-2xl font-heading text-gray-900 dark:text-white">
            Iniciar Sesión
          </h1>

          <MlForm
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = (formData.get("email") ?? "").toString().trim();
              const password = (formData.get("password") ?? "").toString();
              if (!email || !password) return;
              login(
                { email, password },
                { onSuccess: () => router.push("/") },
              );
            }}
          >
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
              isRequired
            />

            {error && (
              <p className="text-sm text-red-500">
                {error.message || "Error al iniciar sesión"}
              </p>
            )}

            <AtButton className="mt-4" type="submit" fullWidth isLoading={isPending}>
              Entrar
            </AtButton>
          </MlForm>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
