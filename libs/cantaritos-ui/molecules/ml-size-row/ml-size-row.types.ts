import { ProductSize } from "@/domain/types";

export interface MlSizeRowProps {
  size?: ProductSize;
  onSave: (values: { nameEs: string; nameEn: string; price: number; stock?: number | null }) => void;
  onDelete?: () => void;
  isLoading?: boolean;
}
