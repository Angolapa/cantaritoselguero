"use client";

import { ImageIcon } from "lucide-react";

import { AtSocialIcon } from "@/libs/cantaritos-ui/atoms";

import { MlAgencyCardProps } from "./ml-agency-card.types";

const STATIC_LABEL_COLOR = "#C6C6C6";
const VALUE_COLOR = "#14222F";

export function MlAgencyCard({ card, className = "" }: MlAgencyCardProps) {
  const hasContact = Boolean(card.email) || Boolean(card.phone);
  const hasSocial =
    Boolean(card.facebookUrl) ||
    Boolean(card.instagramUrl) ||
    Boolean(card.tiktokUrl) ||
    Boolean(card.socialHandle);

  return (
    <article
      className={`flex w-full flex-col rounded-2xl bg-white p-4 shadow-sm ${className}`.trim()}
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-[#7A7A7A]">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.title}
            className="h-full w-full object-contain"
          />
        ) : (
          <ImageIcon className="h-12 w-12 text-white/80" strokeWidth={1.5} />
        )}
      </div>

      <h3
        className="mt-4"
        style={{
          color: "#282828",
          fontFamily: "Roboto, sans-serif",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "100%",
        }}
      >
        {card.title}
      </h3>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
        <div className="flex flex-col">
          <span className="text-[11px]" style={{ color: STATIC_LABEL_COLOR }}>
            Ubicación
          </span>
          <span
            style={{
              color: "#282828",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            {card.location}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px]" style={{ color: STATIC_LABEL_COLOR }}>
            Tipo de Hospedaje
          </span>
          <span
            style={{
              color: "#282828",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            {card.lodgingType}
          </span>
        </div>
      </div>

      {card.distance && (
        <div className="mt-3 flex flex-col">
          <span className="text-[11px]" style={{ color: STATIC_LABEL_COLOR }}>
            Distancia aprox. a Cantaritos el Güero #1
          </span>
          <span className="text-sm font-semibold" style={{ color: VALUE_COLOR }}>
            {card.distance}
          </span>
        </div>
      )}

      {hasContact && (
        <div className="mt-3 flex flex-col">
          <span className="text-[11px]" style={{ color: STATIC_LABEL_COLOR }}>
            Contacto
          </span>
          {card.email && (
            <span className="text-sm font-semibold" style={{ color: VALUE_COLOR }}>
              {card.email}
            </span>
          )}
          {card.phone && (
            <span className="text-sm font-semibold" style={{ color: VALUE_COLOR }}>
              {card.phone}
            </span>
          )}
        </div>
      )}

      {hasSocial && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px]" style={{ color: STATIC_LABEL_COLOR }}>
              Redes Sociales
            </span>
            {card.socialHandle && (
              <span
                className="text-sm font-semibold truncate"
                style={{ color: VALUE_COLOR }}
              >
                {card.socialHandle}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {card.facebookUrl && (
              <AtSocialIcon network="facebook" href={card.facebookUrl} />
            )}
            {card.instagramUrl && (
              <AtSocialIcon network="instagram" href={card.instagramUrl} />
            )}
            {card.tiktokUrl && (
              <AtSocialIcon network="tiktok" href={card.tiktokUrl} />
            )}
          </div>
        </div>
      )}
    </article>
  );
}
