import { TextareaHTMLAttributes } from "react";

export interface AtTextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	minRows?: number;
	labelPlacement?: "outside" | "inside";
	classNames?: {
		inputWrapper?: string;
		input?: string;
		label?: string;
	};
}
