export type SocialNetwork = "facebook" | "instagram" | "tiktok";

export interface AtSocialIconProps {
  network: SocialNetwork;
  href: string;
  size?: number;
  className?: string;
  ariaLabel?: string;
}
