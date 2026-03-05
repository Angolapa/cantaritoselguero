import { FormHTMLAttributes } from "react";

export interface MlFormProps extends FormHTMLAttributes<HTMLFormElement> {
  validationBehavior?: "native" | "aria";
}
