"use client";

import { AtSwitchProps } from "./at-switch.types";

export function AtSwitch({
  isSelected = false,
  onValueChange,
  isDisabled = false,
  "aria-label": ariaLabel,
}: AtSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isSelected}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={() => onValueChange?.(!isSelected)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
        transition-colors duration-200 focus:outline-none focus-visible:ring-2
        focus-visible:ring-primary/50 focus-visible:ring-offset-2
        ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${isSelected ? "bg-primary" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-white shadow-sm
          transition-transform duration-200
          ${isSelected ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
