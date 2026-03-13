import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bannerService } from "@/domain/services";
import { CreateBannerRequest } from "@/domain/types";

export function useCreateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBannerRequest) => bannerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
}
