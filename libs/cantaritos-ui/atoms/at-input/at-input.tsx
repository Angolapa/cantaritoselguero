"use client";

import { AtInputProps } from "./at-input.types";

const sizeStyles = {
  sm: { wrapper: "h-9 text-xs", label: "text-xs" },
  md: { wrapper: "h-11 text-sm", label: "text-sm" },
  lg: { wrapper: "h-13 text-base", label: "text-base" },
};

export function AtInput({
  label,
  size = "md",
  isRequired = false,
  isDisabled = false,
  startContent,
  endContent,
  value,
  onValueChange,
  classNames,
  className = "",
  ...props
}: AtInputProps) {
  const sizes = sizeStyles[size];

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={props.id ?? props.name}
          className={`font-medium text-gray-700 dark:text-gray-300 ${sizes.label}`}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div
        className={`flex items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
          isDisabled ? "opacity-60 cursor-not-allowed bg-gray-50" : ""
        } ${sizes.wrapper} ${classNames?.inputWrapper ?? ""}`}
      >
        {startContent && (
          <span className="shrink-0 mr-2">{startContent}</span>
        )}
        <input
          id={props.id ?? props.name}
          value={value}
          onChange={(e) => {
            onValueChange?.(e.target.value);
            props.onChange?.(e);
          }}
          required={isRequired}
          disabled={isDisabled}
          className={`flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 disabled:cursor-not-allowed w-full ${sizes.wrapper} ${classNames?.input ?? ""}`}
          {...props}
        />
        {endContent && (
          <span className="shrink-0 ml-2">{endContent}</span>
        )}
      </div>
    </div>
  );
}
