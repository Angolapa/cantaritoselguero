import { InputHTMLAttributes,ReactNode } from "react";

export interface AtInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  classNames?: {
    inputWrapper?: string;
    innerWrapper?: string;
    input?: string;
  };
}
