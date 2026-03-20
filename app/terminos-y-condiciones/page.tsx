"use client";

import { OgFooter, OgNavbar } from "@/libs/cantaritos-ui";
import { useTranslation } from "@/domain/stores/locale-store";

export default function TerminosPage() {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <OgNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center pt-10 lg:pt-16 px-6 lg:px-16 xl:px-24">
          <div className="relative w-full max-w-[885px]">
            {/* Desktop SVG */}
            <img
              src="/images/tym-desktop.svg"
              alt=""
              className="hidden md:block w-full h-auto"
            />
            {/* Mobile SVG */}
            <img
              src="/images/tym-mo.svg"
              alt=""
              className="block md:hidden w-full h-auto"
            />

            {/* Title overlaid on the speech bubble - Desktop */}
            <div className="hidden md:flex absolute inset-0 w-[75%] h-[56%] items-center px-[4%]">
              <h1
                className="font-heading uppercase leading-[100%] whitespace-nowrap"
                style={{
                  color: "#14222F",
                  fontSize: "clamp(28px, 7.5vw, 72px)",
                  fontWeight: 400,
                }}
              >
                {translate("terms.titleDesktopLine1")}
                <br />
                {translate("terms.titleDesktopLine2")}
              </h1>
            </div>

            {/* Title overlaid on the speech bubble - Mobile */}
            <div className="flex md:hidden absolute inset-0 w-[62%] h-[55%] items-center px-[3%]">
              <h1
                className="font-heading uppercase leading-[100%]"
                style={{
                  color: "#14222F",
                  fontSize: "clamp(14px, 5.5vw, 24px)",
                  fontWeight: 400,
                }}
              >
                {translate("terms.titleMobileLine1")}
                <br />
                {translate("terms.titleMobileLine2")}
                <br />
                {translate("terms.titleMobileLine3")}
              </h1>
            </div>
          </div>

          {/* Legal basis subtitle */}
          <p
            className="font-body text-xs font-bold leading-[100%] mt-6 lg:mt-8 max-w-[700px] text-center"
            style={{ color: "#E64927" }}
          >
            {translate("terms.legalBasis")}
          </p>
        </section>

        {/* Terms Content */}
        <section className="px-6 lg:px-16 xl:px-24 py-10 lg:py-16 max-w-[900px] mx-auto">
          {/* 1. Objetivo */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s1Title")}
            </h2>
            <p
              className="font-body text-base font-medium leading-[100%]"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s1Text")}
            </p>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 2. Restricción por mayoría de edad */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s2Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s2Bullet1", "s2Bullet2", "s2Bullet3"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 3. Información al consumidor y precios */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s3Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s3Bullet1", "s3Bullet2", "s3Bullet3", "s3Bullet4", "s3Bullet5"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 4. Solicitud y proceso de venta */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s4Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li
                className="font-body text-base font-medium leading-[100%]"
                style={{ color: "#14222F" }}
              >
                {translate("terms.s4Bullet1")}
              </li>
              <li
                className="font-body text-base font-medium leading-[100%]"
                style={{ color: "#14222F" }}
              >
                {translate("terms.s4Bullet2")}
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s4Sub1")}
                  </li>
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s4Sub2")}
                  </li>
                </ul>
              </li>
              {(["s4Bullet3", "s4Bullet4", "s4Bullet5"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 5. Formas de pago */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s5Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li
                className="font-body text-base font-medium leading-[100%]"
                style={{ color: "#14222F" }}
              >
                {translate("terms.s5Bullet1")}
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s5Sub1")}
                  </li>
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s5Sub2")}
                  </li>
                </ul>
              </li>
              <li
                className="font-body text-base font-medium leading-[100%]"
                style={{ color: "#14222F" }}
              >
                {translate("terms.s5Bullet2")}
              </li>
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 6. Entrega y consumo en el establecimiento */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s6Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s6Bullet1", "s6Bullet2", "s6Bullet3", "s6Bullet4", "s6Bullet5"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 7. Cancelaciones y cambios */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s7Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s7Bullet1", "s7Bullet2", "s7Bullet3", "s7Bullet4"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 8. Política de postventa y devoluciones */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s8Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s8Bullet1", "s8Bullet2", "s8Bullet3"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 9. Propinas y servicio */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s9Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s9Bullet1", "s9Bullet2"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 10. Facturación */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s10Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s10Bullet1", "s10Bullet2"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 11. Derechos del consumidor y trato digno */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s11Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {(["s11Bullet1", "s11Bullet2", "s11Bullet3"] as const).map((key) => (
                <li
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 12. Disposiciones finales */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s12Title")}
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li
                className="font-body text-base font-medium leading-[100%]"
                style={{ color: "#14222F" }}
              >
                {translate("terms.s12Bullet1")}
                <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s12Sub1")}
                  </li>
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s12Sub2")}
                  </li>
                  <li className="font-body text-base font-medium leading-[100%]">
                    {translate("terms.s12Sub3")}
                  </li>
                </ul>
              </li>
              <li
                className="font-body text-base font-medium leading-[100%]"
                style={{ color: "#14222F" }}
              >
                {translate("terms.s12Bullet2")}
              </li>
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-[#14222F] mb-8" />

          {/* 13. Programa "Hospedaje Aliado del Güero" */}
          <div className="mb-8">
            <h2
              className="font-body text-[32px] font-bold leading-[100%] mb-4"
              style={{ color: "#14222F" }}
            >
              {translate("terms.s13Title")}
            </h2>
            <div className="flex flex-col gap-4">
              {(["s13P1", "s13P2", "s13P3", "s13P4", "s13P5", "s13P6"] as const).map((key) => (
                <p
                  key={key}
                  className="font-body text-base font-medium leading-[100%]"
                  style={{ color: "#14222F" }}
                >
                  {translate(`terms.${key}`)}
                </p>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p
            className="font-body text-[32px] font-semibold leading-[100%] mt-8"
            style={{ color: "#14222F" }}
          >
            {translate("terms.disclaimer")}
          </p>
        </section>
      </main>

      <OgFooter />
    </div>
  );
}
