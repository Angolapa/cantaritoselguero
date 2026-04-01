export interface ProductFormValues {
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  basePrice: string;
  stock: string;
}

export interface OgProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
}
