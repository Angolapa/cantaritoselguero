import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moodGalleryService } from "@/domain/services";
import { UpdateMoodGalleryRequest } from "@/domain/types";

export function useUpdateMoodGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMoodGalleryRequest }) =>
      moodGalleryService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["mood-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["mood-gallery", variables.id] });
    },
  });
}
