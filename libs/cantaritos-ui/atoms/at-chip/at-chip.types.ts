import { ReactNode } from "react";

export interface AtChipProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "bordered" | "flat" | "light";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
  onClick?: () => void;
}
