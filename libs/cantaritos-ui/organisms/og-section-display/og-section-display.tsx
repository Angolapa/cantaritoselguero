"use client";

import Link from "next/link";
import { Package } from "lucide-react";

import { MlSectionBanner } from "../../molecules/ml-section-banner";
import { OgSectionDisplayProps } from "./og-section-display.types";

export function OgSectionDisplay({
  section,
  color = "teal",
  viewMoreHref,
  viewMoreLabel = "Ver más",
}: OgSectionDisplayProps) {
  const items = section.items ?? [];

  return (
    <section className="space-y-4">
      <div className="flex justify-center">
        <MlSectionBanner title={section.name} color={color} />
      </div>

      <div className="-mx-4 overflow-x-auto">
        <ul className="flex gap-3 px-4 pb-2">
          {items.map((item) => {
            const entity = item.product ?? item.combo;
            if (!entity) return null;

            const name = entity.name;
            const description = "description" in entity ? entity.description : undefined;
            const price =
              "basePrice" in entity ? entity.basePrice : (entity as { price?: number }).price;
            const image = entity.image;

            return (
              <li
                key={item.id}
                className="w-[180px] shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="px-3 pt-2 pb-3">
                  <p
                    style={{
                      color: "#E64927",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "8px",
                      fontWeight: 500,
                      lineHeight: "134%",
                    }}
                  >
                    NEW
                  </p>
                  <h3
                    className="uppercase"
                    style={{
                      color: "#18181B",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "10px",
                      fontWeight: 900,
                      lineHeight: "143%",
                    }}
                  >
                    {name}
                  </h3>
                  {description && (
                    <p
                      className="mt-1"
                      style={{
                        color: "#14222F",
                        fontFamily: "\"Roboto Condensed\", Roboto, sans-serif",
                        fontSize: "8px",
                        fontWeight: 400,
                        lineHeight: "100%",
                      }}
                    >
                      {description}
                    </p>
                  )}
                  {typeof price === "number" && (
                    <p
                      className="mt-2"
                      style={{
                        color: "#E64927",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        lineHeight: "18px",
                      }}
                    >
                      ${price.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {viewMoreHref && (
        <div className="flex justify-center">
          <Link
            href={viewMoreHref}
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
            {viewMoreLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
