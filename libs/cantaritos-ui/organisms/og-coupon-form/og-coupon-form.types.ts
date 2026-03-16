export interface CouponFormValues {
  type: string;
  name: string;
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
