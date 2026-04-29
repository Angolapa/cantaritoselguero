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

export function AtSocialIcon({
  network,
  href,
  size = 24,
  className = "",
  ariaLabel,
}: AtSocialIconProps) {
  const label = ariaLabel || NETWORK_LABEL[network];

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
        width={size}
        height={size}
        aria-hidden="true"
      />
    </a>
  );
}
