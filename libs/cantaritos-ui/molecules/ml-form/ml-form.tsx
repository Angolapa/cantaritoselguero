"use client";

import { MlFormProps } from "./ml-form.types";

export function MlForm({
  validationBehavior = "native",
  className,
  ...props
}: MlFormProps) {
  return (
    <form
      noValidate={validationBehavior !== "native"}
      className={`flex flex-col gap-4 ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
