export type SocialNetwork = "facebook" | "instagram" | "tiktok";

export interface AtSocialIconProps {
  network: SocialNetwork;
  href: string;
  className?: string;
  ariaLabel?: string;
}
