import { useQuery } from "@tanstack/react-query";

import { moodGalleryService } from "@/domain/services";

export function useMoodGalleryItems(params?: { section?: string; active?: boolean }) {
  return useQuery({
    queryKey: ["mood-gallery", params],
    queryFn: () => moodGalleryService.getAll(params),
  });
}
