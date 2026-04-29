"use client";

import Image from "next/image";

import { AtSocialIconProps, SocialNetwork } from "./at-social-icon.types";

const NETWORK_LABEL: Record<SocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

const NETWORK_ICON: Record<SocialNetwork, string> = {
  facebook: "/images/Direct/facebook.svg",
  instagram: "/images/Direct/instagram.svg",
  tiktok: "/images/Direct/tiktok.svg",
};

const NETWORK_DIMENSIONS: Record<
  SocialNetwork,
  { width: number; height: number }
> = {
  facebook: { width: 24, height: 24 },
  instagram: { width: 24, height: 24 },
  tiktok: { width: 20, height: 24 },
};

export function AtSocialIcon({
  network,
  href,
  className = "",
  ariaLabel,
}: AtSocialIconProps) {
  const label = ariaLabel || NETWORK_LABEL[network];
  const { width, height } = NETWORK_DIMENSIONS[network];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center transition-opacity hover:opacity-80 ${className}`.trim()}
    >
      <Image
        src={NETWORK_ICON[network]}
        alt=""
        width={width}
        height={height}
        aria-hidden="true"
      />
    </a>
  );
}
