import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bannerService } from "@/domain/services";

export function useUploadBannerImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      bannerService.uploadImage(id, file),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banners", variables.id] });
    },
  });
}
