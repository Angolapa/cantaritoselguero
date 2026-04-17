"use client";

import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "@/domain/stores";

export function OgRouteBanner() {
  const { translate } = useTranslation();

  return (
    <section
      className="mx-auto overflow-hidden relative"
      style={{ backgroundColor: "#FFAB00", borderRadius: "12px", maxWidth: "322px" }}
    >
      {/* Title */}
      <div style={{ padding: "23px 24px 0 24px" }}>
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
          {translate("products.route.title")}
        </h3>
      </div>

      {/* Two columns: text left + image right */}
      <div className="flex pr-0" style={{ marginTop: "10px", paddingLeft: "24px" }}>
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
            {translate("products.route.subtitleLine1")}
            <br />
            {translate("products.route.subtitleLine2")}
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
            {translate("products.route.descLine1")}
            <br />
            {translate("products.route.descLine2")}
            <br />
            {translate("products.route.descLine3")}
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
              {translate("products.route.button")}
            </Link>
          </div>
        </div>

        {/* Right illustration */}
        <div className="shrink-0 self-start" style={{ marginTop: "0px", marginRight: "28px", marginLeft: "-65px" }}>
          <Image
            src="/images/product/Ruta.svg"
            alt={translate("products.route.title")}
            width={144}
            height={122}
          />
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: "21px" }} />
    </section>
  );
}
