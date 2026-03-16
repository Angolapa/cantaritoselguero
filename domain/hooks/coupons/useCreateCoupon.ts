import { useMutation, useQueryClient } from "@tanstack/react-query";

import { couponService } from "@/domain/services";
import { CreateCouponRequest } from "@/domain/types";

export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCouponRequest) => couponService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
}
