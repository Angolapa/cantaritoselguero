import { ButtonHTMLAttributes,ElementType, ReactNode } from "react";

export interface AtButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color?: "primary" | "danger" | "default";
  variant?: "solid" | "bordered" | "light";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onPress?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ElementType<any>;
  href?: string;
}
