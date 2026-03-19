import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moodGalleryService } from "@/domain/services";

export function useDeleteMoodGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => moodGalleryService.delete(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: ["mood-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["mood-gallery", id] });
    },
  });
}
