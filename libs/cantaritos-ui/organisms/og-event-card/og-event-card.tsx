"use client";

import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "@/domain/stores";

export function OgEventCard() {
  const { translate } = useTranslation();

  return (
    <section
      className="mx-auto overflow-hidden relative"
      style={{ backgroundColor: "#00CF70", borderRadius: "12px", maxWidth: "322px" }}
    >
      {/* Title */}
      <div style={{ padding: "23px 21px 0 21px" }}>
        <h3
          style={{
            color: "#14222F",
            fontFamily: "var(--font-barrio), Barrio, cursive",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "100%",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {translate("products.event.title")}
        </h3>
      </div>

      {/* Two columns: text left + image right */}
      <div className="flex pr-0" style={{ marginTop: "10px", paddingLeft: "21px" }}>
        <div className="flex-1 flex flex-col">
          <p
            style={{
              fontFamily: "var(--font-barrio), Barrio, cursive",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            <span style={{ color: "#14222F" }}>
              {translate("products.event.subtitleDark1")}
            </span>
            <span style={{ color: "#FFF" }}>
              {translate("products.event.subtitleLight1")}
            </span>
            <span style={{ color: "#14222F", whiteSpace: "pre-line" }}>
              {translate("products.event.subtitleDark2")}
            </span>
            <span style={{ color: "#FFF" }}>
              {translate("products.event.subtitleLight2")}
            </span>
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
            {translate("products.event.descLine1")}
            <br />
            {translate("products.event.descLine2")}
            <br />
            {translate("products.event.descLine3")}
          </p>

          <div style={{ marginTop: "17px" }}>
            <Link
              href="/cotizar-evento"
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
              {translate("products.event.button")}
            </Link>
          </div>
        </div>

        {/* Right illustration */}
        <div className="shrink-0 self-start" style={{ marginTop: "0px", marginRight: "28px", marginLeft: "-65px" }}>
          <Image
            src="/images/product/TuEvento.svg"
            alt={translate("products.event.title")}
            width={112}
            height={121}
          />
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: "20px" }} />
    </section>
  );
}
