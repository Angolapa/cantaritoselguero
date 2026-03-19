// --- Coupon ---

export interface CouponUsage {
  id: string;
  userId: string;
  orderId: string;
  usedAt: string;
}

export interface Coupon {
  id: string;
  type: "GLOBAL" | "UNIQUE";
  name: string;
  discountPercent: number;
  maxDiscount: number;
  totalQuantity: number;
  usedQuantity: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  usages: CouponUsage[];
}

export interface CreateCouponRequest {
  type: "GLOBAL" | "UNIQUE";
  name: string;
  discountPercent: number;
  maxDiscount: number;
  totalQuantity: number;
  expiresAt: string;
  isActive?: boolean;
}

export interface UpdateCouponRequest {
  name?: string;
  discountPercent?: number;
  maxDiscount?: number;
  totalQuantity?: number;
  expiresAt?: string;
  isActive?: boolean;
}
