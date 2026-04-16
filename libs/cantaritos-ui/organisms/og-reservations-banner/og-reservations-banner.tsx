"use client";

import Image from "next/image";
import Link from "next/link";

export function OgReservationsBanner() {
  return (
    <section
      className="-mx-4 overflow-hidden"
      style={{ backgroundColor: "#D11300" }}
    >
      {/* Top: texts left + illustration right */}
      <div className="flex items-start px-5 pt-5">
        <div className="flex-1 flex flex-col gap-2">
          <h3
            style={{
              color: "#EDDCB6",
              fontFamily: "var(--font-barrio), Barrio, cursive",
              fontSize: "28px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            ¿reservación?
          </h3>

          <p
            style={{
              color: "#FFAF32",
              fontFamily: "var(--font-barrio), Barrio, cursive",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            Solo si vienes con
            <br />
            todos tus reales.
          </p>

          <p
            style={{
              color: "#EDDCB6",
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "100%",
            }}
          >
            Siempre hay espacio para
            <br />
            arrancar la fiesta.
          </p>
        </div>

        {/* Right illustration */}
        <div className="shrink-0">
          <Image
            src="/images/product/Reservaciones-mobile.svg"
            alt="Reservaciones"
            width={151}
            height={132}
          />
        </div>
      </div>

      {/* Bottom: warning left + button right */}
      <div className="flex items-center justify-between px-5 pb-5 pt-2">
        <div className="flex items-start gap-2 flex-1">
          <Image
            src="/images/product/Advertencia.mobile.svg"
            alt="Advertencia"
            width={32}
            height={28}
            className="shrink-0"
          />
          <p
            style={{
              color: "#FFAF32",
              fontFamily: "Roboto, sans-serif",
              fontSize: "9px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "117%",
            }}
          >
            Reservaciones a partir de 60 compas y
            <br />
            requiere pago de consumo anticipado
            <br />
            mínimo de $10,000 mxn.
          </p>
        </div>

        <Link
          href="/reservaciones"
          style={{
            display: "flex",
            width: "88px",
            height: "32px",
            padding: "6px 10px",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            borderRadius: "16px",
            background: "#14222F",
            backdropFilter: "blur(0)",
            color: "#FFF",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "10px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "20px",
          }}
          className="shrink-0"
        >
          Reserva aquí
        </Link>
      </div>
    </section>
  );
}
