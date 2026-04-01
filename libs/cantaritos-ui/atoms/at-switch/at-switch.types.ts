export interface AtSwitchProps {
  children?: React.ReactNode;
  isSelected?: boolean;
  onValueChange?: (value: boolean) => void;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
  "aria-label"?: string;
}
