import { useMutation, useQueryClient } from "@tanstack/react-query";

import { couponService } from "@/domain/services";

export function useToggleCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => couponService.toggle(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupons", id] });
    },
  });
}
