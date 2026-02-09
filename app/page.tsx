import Link from "next/link";

import { AtButton } from "@/libs/cantaritos-ui";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-bold">Página en construcción</h1>

        <Link href="/login">
          <AtButton>Ir a iniciar sesión</AtButton>
        </Link>
      </div>
    </main>
  );
}
