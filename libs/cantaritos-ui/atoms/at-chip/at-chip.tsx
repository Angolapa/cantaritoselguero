"use client";

import { AtChipProps } from "./at-chip.types";

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
} as const;

const COLOR_MAP = {
  default: {
    solid: "bg-gray-200 text-gray-800",
    bordered: "border border-gray-300 text-gray-700 bg-transparent",
    flat: "bg-gray-100 text-gray-700",
    light: "text-gray-600 bg-transparent",
  },
  primary: {
    solid: "bg-primary text-white",
    bordered: "border border-primary text-primary bg-transparent",
    flat: "bg-primary/10 text-primary",
    light: "text-primary bg-transparent",
  },
  secondary: {
    solid: "bg-secondary text-white",
    bordered: "border border-secondary text-secondary bg-transparent",
    flat: "bg-secondary/10 text-secondary",
    light: "text-secondary bg-transparent",
  },
  success: {
    solid: "bg-green-500 text-white",
    bordered: "border border-green-500 text-green-600 bg-transparent",
    flat: "bg-green-100 text-green-700",
    light: "text-green-600 bg-transparent",
  },
  warning: {
    solid: "bg-yellow-500 text-white",
    bordered: "border border-yellow-500 text-yellow-600 bg-transparent",
    flat: "bg-yellow-100 text-yellow-700",
    light: "text-yellow-600 bg-transparent",
  },
  danger: {
    solid: "bg-red-500 text-white",
    bordered: "border border-red-500 text-red-600 bg-transparent",
    flat: "bg-red-100 text-red-700",
    light: "text-red-600 bg-transparent",
  },
} as const;

export function AtChip({
  children,
  size = "md",
  variant = "solid",
  color = "default",
  className = "",
  onClick,
}: AtChipProps) {
  const sizeClass = SIZE_CLASSES[size];
  const colorClass = COLOR_MAP[color][variant];

  const classes = `inline-flex items-center rounded-full font-medium whitespace-nowrap ${sizeClass} ${colorClass} ${className}`.trim();

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
