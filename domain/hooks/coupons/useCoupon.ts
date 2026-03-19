import { useQuery } from "@tanstack/react-query";

import { couponService } from "@/domain/services";

export function useCoupon(id: string) {
  return useQuery({
    queryKey: ["coupons", id],
    queryFn: () => couponService.getById(id),
    enabled: !!id,
  });
}
