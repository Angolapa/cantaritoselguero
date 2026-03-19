import { useQuery } from "@tanstack/react-query";

import { moodGalleryService } from "@/domain/services";

export function useMoodGalleryItem(id: string) {
  return useQuery({
    queryKey: ["mood-gallery", id],
    queryFn: () => moodGalleryService.getById(id),
    enabled: !!id,
  });
}
