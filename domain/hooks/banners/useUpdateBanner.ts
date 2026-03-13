import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bannerService } from "@/domain/services";
import { UpdateBannerRequest } from "@/domain/types";

export function useUpdateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBannerRequest }) =>
      bannerService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banners", variables.id] });
    },
  });
}
