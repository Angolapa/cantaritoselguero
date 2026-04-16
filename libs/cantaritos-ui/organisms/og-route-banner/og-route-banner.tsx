"use client";

import Image from "next/image";
import Link from "next/link";

export function OgRouteBanner() {
  return (
    <section
      className="mx-auto overflow-hidden relative"
      style={{ backgroundColor: "#FFAB00", borderRadius: "12px", maxWidth: "322px" }}
    >
      {/* Title */}
      <div style={{ padding: "12px 12px 0 12px" }}>
        <h3
          style={{
            color: "#14222F",
            fontFamily: "var(--font-barrio), Barrio, cursive",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "100%",
            whiteSpace: "nowrap",
          }}
        >
          Ruta al güero
        </h3>
      </div>

      {/* Two columns: text left + image right */}
      <div className="flex pl-3 pr-0" style={{ marginTop: "10px" }}>
        <div className="flex-1 flex flex-col">
          <p
            style={{
              color: "#14222F",
              fontFamily: "var(--font-barrio), Barrio, cursive",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            El plan empieza
            <br />
            desde que te subes.
          </p>

          <p
            style={{
              marginTop: "14px",
              color: "#14222F",
              fontFamily: "Roboto, sans-serif",
              fontSize: "10px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "120%",
            }}
          >
            Súbete a La Ruta del Güero y llega
            <br />
            sin manejar, sin complicaciones
            <br />
            y con el plan armado.
          </p>

          <div style={{ marginTop: "17px" }}>
            <Link
              href="/horarios"
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
            >
              Ver horarios
            </Link>
          </div>
        </div>

        {/* Right illustration */}
        <div className="shrink-0 self-start" style={{ marginTop: "0px", marginRight: "5px", marginLeft: "-45px" }}>
          <Image
            src="/images/product/Ruta.svg"
            alt="Ruta al Güero"
            width={144}
            height={122}
          />
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: "12px" }} />
    </section>
  );
}
