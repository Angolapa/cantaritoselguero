import { Product } from "@/domain/types";

export interface ComboProductItem {
  productId: string;
  quantity: number;
}

export interface ComboFormValues {
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  price: string;
  items: ComboProductItem[];
}

export interface OgComboFormProps {
  defaultValues?: Partial<ComboFormValues>;
  products: Product[];
  onSubmit: (values: ComboFormValues) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}
