"use client";

import { OgFooter, OgNavbar } from "@/libs/cantaritos-ui";
import { useTranslation } from "@/domain/stores/locale-store";

export default function AvisoDePrivacidadPage() {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <OgNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center pt-10 lg:pt-16 px-6 lg:px-16 xl:px-24">
          <div
            className="relative"
            style={{
              width: "523px",
              maxWidth: "100%",
              aspectRatio: "523 / 364",
            }}
          >
            <img
              src="/images/privacy-hero-mobile.svg"
              alt=""
              className="w-full h-full"
            />

            {/* Title - Desktop */}
            <div className="hidden md:flex absolute top-0 right-0 w-[75%] h-[48%] items-center justify-center px-4">
              <h1
                className="font-heading uppercase leading-[100%] whitespace-nowrap"
                style={{
                  color: "#14222F",
                  fontSize: "72px",
                  fontWeight: 400,
                }}
              >
                {translate("privacy.titleDesktopLine1")}
                <br />
                {translate("privacy.titleDesktopLine2")}
              </h1>
            </div>

            {/* Title - Mobile */}
            <div className="flex md:hidden absolute top-0 right-0 w-[75%] h-[48%] items-center justify-center px-2">
              <h1
                className="font-heading uppercase leading-[100%]"
                style={{
                  color: "#14222F",
                  fontSize: "clamp(18px, 6vw, 72px)",
                  fontWeight: 400,
                }}
              >
                {translate("privacy.titleMobileLine1")}
                <br />
                {translate("privacy.titleMobileLine2")}
              </h1>
            </div>
          </div>

          {/* Subtitle + Company */}
          <div className="mt-6 lg:mt-8 max-w-[700px] text-center">
            <p
              className="font-body text-2xl font-bold leading-[100%]"
              style={{ color: "#E64927" }}
            >
              {translate("privacy.subtitle")}
            </p>
            <p
              className="font-body text-2xl font-bold leading-[100%] mt-4"
              style={{ color: "#E64927" }}
            >
              {translate("privacy.company")}
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="px-6 lg:px-16 xl:px-24 py-10 lg:py-16 max-w-[900px] mx-auto">
          {/* Intro */}
          <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
            {translate("privacy.intro1")}
          </p>
          <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-8">
            {translate("privacy.intro2")}
          </p>

          <hr className="border-[#14222F] mb-8" />

          {/* S1: Datos personales */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s1Title")}
            </h2>
            {(["s1P1", "s1P2", "s1P3"] as const).map((key) => (
              <p
                key={key}
                className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4"
              >
                {translate(`privacy.${key}`)}
              </p>
            ))}
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S2: Datos sensibles */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s2Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s2P1")}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s2P2")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S3: Fines */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s3Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s3P1")}
            </p>
            <p className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s3Subtitle")}
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 mb-4">
              {(["s3Bullet1", "s3Bullet2", "s3Bullet3", "s3Bullet4", "s3Bullet5", "s3Bullet6"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%] text-[#14222F]"
                >
                  {translate(`privacy.${key}`)}
                </li>
              ))}
            </ul>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s3P2")}
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 mb-4">
              {(["s3Extra1", "s3Extra2", "s3Extra3"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%] text-[#14222F]"
                >
                  {translate(`privacy.${key}`)}
                </li>
              ))}
            </ul>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s3P3").split("atencion@cantaritoselguero.mx")[0]}
              <a
                href="mailto:atencion@cantaritoselguero.mx"
                className="underline"
              >
                atencion@cantaritoselguero.mx
              </a>
              {translate("privacy.s3P3").split("atencion@cantaritoselguero.mx")[1]}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s3P4")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S4: Con quien compartimos */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s4Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s4P1")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S5: Derechos ARCO */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s5Title")}
            </h2>
            {(["s5P1", "s5P2", "s5P3", "s5P4", "s5P5", "s5P6", "s5P7"] as const).map((key) => (
              <p
                key={key}
                className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4"
              >
                {translate(`privacy.${key}`)}
              </p>
            ))}
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S6: Revocación */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s6Title")}
            </h2>
            {(["s6P1", "s6P2", "s6P3"] as const).map((key) => (
              <p
                key={key}
                className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4"
              >
                {translate(`privacy.${key}`)}
              </p>
            ))}
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S7: Tecnologías de rastreo */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s7Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s7P1")}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s7P2")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S8: Cambios */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s8Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s8P1")}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s8P2")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S9: Fundamento legal */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s9Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s9P1")}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s9P2")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* S10: Consentimiento */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s10Title")}
            </h2>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s10P1")}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s10P2")}
            </p>
            <p className="font-body text-base font-medium leading-[100%] text-[#14222F]">
              {translate("privacy.s10P3")}
            </p>
          </div>

          <hr className="border-[#14222F] mb-8" />

          {/* Disclaimer SVG - Uso de imagen */}
          <div className="relative flex flex-col items-center mb-8">
            <div className="relative w-full max-w-[861px]">
              {/* Desktop SVG */}
              <img
                src="/images/privacy-disclaimer-desktop.svg"
                alt=""
                className="hidden md:block w-full h-auto"
              />
              {/* Mobile SVG */}
              <img
                src="/images/privacy-disclaimer-mobile.svg"
                alt=""
                className="block md:hidden w-full h-auto"
              />

              {/* Title on speech bubble - Desktop */}
              <div className="hidden md:flex absolute inset-0 w-[60%] h-[77%] items-center px-[4%]">
                <h2
                  className="font-heading uppercase leading-[100%] whitespace-nowrap"
                  style={{
                    color: "#14222F",
                    fontSize: "clamp(24px, 6vw, 56px)",
                    fontWeight: 400,
                  }}
                >
                  {translate("privacy.disclaimerLine1")}
                  <br />
                  {translate("privacy.disclaimerLine2")}
                  <br />
                  {translate("privacy.disclaimerLine3")}
                </h2>
              </div>

              {/* Title on speech bubble - Mobile */}
              <div className="flex md:hidden absolute inset-0 w-[55%] h-[65%] items-center px-[3%]">
                <h2
                  className="font-heading uppercase leading-[100%]"
                  style={{
                    color: "#14222F",
                    fontSize: "clamp(12px, 4vw, 20px)",
                    fontWeight: 400,
                  }}
                >
                  {translate("privacy.disclaimerLine1")}
                  <br />
                  {translate("privacy.disclaimerLine2")}
                  <br />
                  {translate("privacy.disclaimerLine3")}
                </h2>
              </div>
            </div>
          </div>

          {/* S11: Derecho de imagen */}
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold leading-[100%] text-[#14222F] mb-4">
              {translate("privacy.s11Title")}
            </h2>
            {(["s11P1", "s11P2", "s11P3", "s11P4", "s11P5"] as const).map((key) => (
              <p
                key={key}
                className="font-body text-base font-medium leading-[100%] text-[#14222F] mb-4"
              >
                {translate(`privacy.${key}`)}
              </p>
            ))}
          </div>
        </section>
      </main>

      <OgFooter />
    </div>
  );
}
