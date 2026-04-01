export interface CouponFormValues {
  type: string;
  nameEs: string;
  nameEn: string;
  discountPercent: string;
  maxDiscount: string;
  totalQuantity: string;
  expiresAt: string;
}

export interface OgCouponFormProps {
  defaultValues?: Partial<CouponFormValues>;
  onSubmit: (values: CouponFormValues) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}
