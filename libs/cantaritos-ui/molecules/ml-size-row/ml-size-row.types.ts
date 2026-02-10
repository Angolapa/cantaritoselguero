import { ProductSize } from "@/domain/types";

export interface MlSizeRowProps {
  size?: ProductSize;
  onSave: (values: { name: string; price: number }) => void;
  onDelete?: () => void;
  isLoading?: boolean;
}
