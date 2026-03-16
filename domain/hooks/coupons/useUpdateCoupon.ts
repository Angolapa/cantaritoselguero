import { useMutation, useQueryClient } from "@tanstack/react-query";

import { couponService } from "@/domain/services";
import { UpdateCouponRequest } from "@/domain/types";

export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCouponRequest }) =>
      couponService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupons", variables.id] });
    },
  });
}
