import { Coupon } from "@/domain/types";

export interface OgCouponUsageModalProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
}
