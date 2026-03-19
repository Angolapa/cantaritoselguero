import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moodGalleryService } from "@/domain/services";

export function useUploadMoodGalleryMobileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      moodGalleryService.uploadMobileImage(id, file),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["mood-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["mood-gallery", variables.id] });
    },
  });
}
