import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bannerService } from "@/domain/services";

export function useDeleteBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bannerService.delete(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banners", id] });
    },
  });
}
