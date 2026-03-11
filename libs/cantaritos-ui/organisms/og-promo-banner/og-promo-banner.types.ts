import { ReactNode } from "react";

export interface OgPromoBannerProps {
  bgColor: string;
  title: ReactNode;
  subtitle: ReactNode;
  description: ReactNode;
  highlightText?: ReactNode;
  warningText?: ReactNode;
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
