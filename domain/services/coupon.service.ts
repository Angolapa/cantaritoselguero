import {
  Coupon,
  CreateCouponRequest,
  UpdateCouponRequest,
} from "@/domain/types";
import { authFetcher } from "@/shared/utils/fetch";

export const couponService = {
  getAll: (params?: { type?: string }): Promise<Coupon[]> => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set("type", params.type);
    const query = searchParams.toString();
    return authFetcher<Coupon[]>(`/coupons${query ? `?${query}` : ""}`);
  },

  getById: (id: string): Promise<Coupon> =>
    authFetcher<Coupon>(`/coupons/${id}`),

  create: (data: CreateCouponRequest): Promise<Coupon> =>
    authFetcher<Coupon>("/coupons", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateCouponRequest): Promise<Coupon> =>
    authFetcher<Coupon>(`/coupons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  toggle: (id: string): Promise<Coupon> =>
    authFetcher<Coupon>(`/coupons/${id}/toggle`, {
      method: "PATCH",
    }),
};
