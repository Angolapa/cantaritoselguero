"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "cantaritos-age-verified";
const MIN_LEGAL_AGE = 18;

export function OgAgeGate() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [birthYear, setBirthYear] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUnderageModal, setShowUnderageModal] = useState(false);

  const shouldShow = pathname?.startsWith("/products") ?? false;

  useEffect(() => {
    if (!shouldShow) {
      setIsReady(true);
      setIsVerified(true);
      return;
    }
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    setIsVerified(stored === "true");
    setIsReady(true);
  }, [shouldShow]);

  const handleAccept = () => {
    const numericYear = Number(birthYear);
    const currentYear = new Date().getFullYear();

    if (!/^\d{4}$/.test(birthYear) || Number.isNaN(numericYear)) {
      setErrorMessage("Por favor introduce un año válido (YYYY)");
      return;
    }

    if (currentYear - numericYear < MIN_LEGAL_AGE) {
      setShowUnderageModal(true);
      setErrorMessage(null);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsVerified(true);
    setErrorMessage(null);
  };

  if (!isReady || isVerified) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#14222F] overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-[434px] flex flex-col items-center text-center">
          <Image
            src="/images/Logo.png"
            alt="Cantaritos El Güero"
            width={220}
            height={120}
            priority
            className="h-auto w-[220px]"
          />

          <p
            className="mt-6 text-white text-center"
            style={{
              fontFamily: "\"Roboto Condensed\", Roboto, sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "100%",
            }}
          >
            Para acceder a la web, debes ser mayor de edad para la compra y consumo de bebidas alcohólicas
          </p>

          <div className="mt-6 w-full bg-[#FFAF32] rounded-lg px-6 py-8 text-[#14222F]">
            <h2
              className="font-heading"
              style={{
                color: "#14222F",
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "100%",
              }}
            >
              Por favor introduce
              <br />
              tu año de nacimiento
            </h2>

            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={birthYear}
              onChange={(event) => {
                const digitsOnly = event.target.value.replace(/\D/g, "");
                setBirthYear(digitsOnly);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="YYYY"
              aria-label="Año de nacimiento"
              className="mt-8 w-full bg-transparent text-center text-[#E64927] font-heading text-3xl tracking-[0.3em] outline-none placeholder:text-[#E64927]/70"
            />

            {errorMessage && (
              <p className="mt-3 text-sm font-body font-bold text-[#B3261E]">{errorMessage}</p>
            )}

            <div className="mt-8 text-sm font-body font-bold text-[#C02E19] space-y-1">
              <p>Usamos tracking y otras cookies</p>
              <p>
                <Link href="/politica-de-cookies" className="underline">
                  Política de Cookies
                </Link>{" "}
                y{" "}
                <Link href="/aviso-de-privacidad" className="underline">
                  Política de Privacidad
                </Link>
              </p>
            </div>

            <p className="mt-4 text-sm font-body font-bold text-[#C02E19]">
              Gestionar Cookies / Aceptar todas las cookies
            </p>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleAccept}
                className="px-6 py-2 rounded-full bg-[#FFAF32] text-[#14222F] font-body font-bold text-sm min-w-[120px] border border-[#14222F]"
              >
                Gestionar
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-6 py-2 rounded-full bg-[#14222F] text-white font-body font-bold text-sm min-w-[120px]"
              >
                Aceptar
              </button>
            </div>
          </div>

          <p className="mt-6 text-white font-body font-bold text-sm">
            Aceptar{" "}
            <Link href="/terminos-y-condiciones" className="underline">
              Términos y Condiciones
            </Link>
          </p>

          <p className="mt-8 text-white font-body text-xs leading-relaxed">
            Para obtener más información sobre un consumo de
            <br />
            alcohol responsable
            <br />
            visita{" "}
            <a
              href="https://alcoholinformate.org.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              alcoholinformate.org.mx
            </a>{" "}
            &{" "}
            <a
              href="https://responsibility.org/?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              responsibility.org/?lang=es
            </a>
          </p>

          <p className="mt-4 text-white font-body text-xs">
            © 2026 Cantaritos el Güero #1, ande their respective trade dresses are trademarks.
          </p>
        </div>
      </div>

      {showUnderageModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-6 bg-black/50">
          <div className="relative w-full max-w-[360px] bg-white rounded-2xl p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setShowUnderageModal(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#F4F4F5] text-[#18181B] flex items-center justify-center"
            >
              ×
            </button>

            <div className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h3
              style={{
                color: "#18181B",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
              }}
            >
              Acceso restringido
            </h3>

            <p
              className="mt-3"
              style={{
                color: "#18181B",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "150%",
              }}
            >
              De acuerdo con la fecha de nacimiento que ingresaste, eres menor de edad.
            </p>
            <p
              className="mt-3"
              style={{
                color: "#18181B",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "150%",
              }}
            >
              Si crees que hubo un error al ingresar tu fecha de nacimiento, por favor vuelve atrás e inténtalo de nuevo.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowUnderageModal(false);
                  setBirthYear("");
                }}
                className="px-6 py-2 rounded-full bg-white text-[#18181B] font-body font-bold text-sm border border-[#2F80ED]"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
