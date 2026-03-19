import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moodGalleryService } from "@/domain/services";
import { CreateMoodGalleryRequest } from "@/domain/types";

export function useCreateMoodGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMoodGalleryRequest) => moodGalleryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mood-gallery"] });
    },
  });
}
