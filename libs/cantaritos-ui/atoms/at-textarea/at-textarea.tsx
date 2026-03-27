"use client";

import { AtTextareaProps } from "./at-textarea.types";

export function AtTextarea({
  label,
  isRequired = false,
  isDisabled = false,
  minRows = 3,
  labelPlacement = "outside",
  classNames,
  className = "",
  ...props
}: AtTextareaProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && labelPlacement === "outside" && (
        <label
          htmlFor={props.id ?? props.name}
          className={`font-medium text-gray-700 dark:text-gray-300 ${classNames?.label ?? ""}`}
        >
          {label}
          {isRequired && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <div
        className={`rounded-xl border border-gray-300 bg-white px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 ${
          isDisabled ? "cursor-not-allowed bg-gray-50 opacity-60" : ""
        } ${classNames?.inputWrapper ?? ""}`}
      >
        <textarea
          id={props.id ?? props.name}
          required={isRequired}
          disabled={isDisabled}
          rows={minRows}
          className={`w-full resize-none bg-transparent text-gray-900 outline-none placeholder-gray-400 disabled:cursor-not-allowed dark:text-white ${classNames?.input ?? ""}`}
          {...props}
        />
      </div>
    </div>
  );
}
