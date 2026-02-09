"use client";

import { Button } from "@heroui/react";

import { AtInput, MlForm } from "@/libs/cantaritos-ui";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Iniciar Sesión</h1>

        <MlForm>
          <AtInput
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            isRequired
          />

          <AtInput
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            isRequired
          />

          <Button color="primary" className="mt-4" type="submit" fullWidth>
            Entrar
          </Button>
        </MlForm>

        <p className="mt-4 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </main>
  );
}
