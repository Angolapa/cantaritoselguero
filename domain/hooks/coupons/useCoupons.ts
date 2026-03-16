import { useQuery } from "@tanstack/react-query";

import { couponService } from "@/domain/services";

export function useCoupons(params?: { type?: string }) {
  return useQuery({
    queryKey: ["coupons", params],
    queryFn: () => couponService.getAll(params),
  });
}
