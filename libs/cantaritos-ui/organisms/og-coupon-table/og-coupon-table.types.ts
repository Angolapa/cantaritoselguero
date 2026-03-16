import { Coupon } from "@/domain/types";

export interface OgCouponTableProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  isLoading?: boolean;
}
