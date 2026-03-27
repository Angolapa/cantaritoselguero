"use client";

import { AtButtonProps } from "./at-button.types";

const colorStyles = {
  solid: {
    primary:
      "bg-primary text-white hover:bg-orange-700 active:bg-orange-800",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    default:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
  },
  bordered: {
    primary:
      "border border-primary text-primary bg-transparent hover:bg-primary/10",
    danger:
      "border border-red-600 text-red-600 bg-transparent hover:bg-red-50",
    default:
      "border border-gray-300 text-gray-900 bg-transparent hover:bg-gray-50",
  },
  light: {
    primary: "text-primary bg-transparent hover:bg-primary/10",
    danger: "text-red-600 bg-transparent hover:bg-red-50",
    default: "text-gray-700 bg-transparent hover:bg-gray-100",
  },
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

const iconSizeStyles = {
  sm: "p-1.5 rounded-lg",
  md: "p-2 rounded-xl",
  lg: "p-3 rounded-xl",
};

export function AtButton({
  color = "primary",
  variant = "solid",
  size = "md",
  fullWidth = false,
  isIconOnly = false,
  isLoading = false,
  isDisabled = false,
  startContent,
  endContent,
  onPress,
  as: Component,
  href,
  className = "",
  children,
  ...props
}: AtButtonProps) {
  const disabled = isDisabled || isLoading;
  const base =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 select-none";
  const sizeClass = isIconOnly ? iconSizeStyles[size] : sizeStyles[size];
  const colorClass = colorStyles[variant][color];
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const classes =
    `${base} ${sizeClass} ${colorClass} ${widthClass} ${disabledClass} ${className}`.trim();

  const content = (
    <>
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!isLoading && startContent}
      {isIconOnly ? !isLoading && children : children}
      {!isLoading && endContent}
    </>
  );

  if (Component) {
    return (
      <Component className={classes} href={href}>
        {content}
      </Component>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onPress}
      {...props}
    >
      {content}
    </button>
  );
}
