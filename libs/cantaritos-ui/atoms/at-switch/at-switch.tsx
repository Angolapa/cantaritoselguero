"use client";

import { AtSwitchProps } from "./at-switch.types";

const SIZE_STYLES = {
  sm: { track: "h-5 w-9", thumb: "h-3 w-3", translate: "translate-x-5" },
  md: { track: "h-6 w-11", thumb: "h-4 w-4", translate: "translate-x-6" },
  lg: { track: "h-7 w-13", thumb: "h-5 w-5", translate: "translate-x-7" },
};

export function AtSwitch({
  children,
  isSelected = false,
  onValueChange,
  isDisabled = false,
  size = "md",
  "aria-label": ariaLabel,
}: AtSwitchProps) {
  const sizeStyle = SIZE_STYLES[size];

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={isSelected}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={() => onValueChange?.(!isSelected)}
      className={`
        relative inline-flex shrink-0 items-center rounded-full
        transition-colors duration-200 focus:outline-none focus-visible:ring-2
        focus-visible:ring-primary/50 focus-visible:ring-offset-2
        ${sizeStyle.track}
        ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${isSelected ? "bg-primary" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block rounded-full bg-white shadow-sm
          transition-transform duration-200
          ${sizeStyle.thumb}
          ${isSelected ? sizeStyle.translate : "translate-x-1"}
        `}
      />
    </button>
  );

  if (!children) return toggle;

  return (
    <label className={`inline-flex items-center gap-2 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
      {toggle}
      <span className="text-sm text-gray-700 dark:text-gray-300">{children}</span>
    </label>
  );
}
