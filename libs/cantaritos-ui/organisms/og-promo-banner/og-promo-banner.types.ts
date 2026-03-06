import { ReactNode } from "react";

export interface OgPromoBannerProps {
  bgColor: string;
  title: string;
  subtitle: string;
  description: string;
  highlightText?: string;
  warningText?: string;
  buttonLabel: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  highlightColor?: string;
  buttonVariant?: "dark" | "light";
}
