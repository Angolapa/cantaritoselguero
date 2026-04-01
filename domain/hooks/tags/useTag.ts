import { useQuery } from "@tanstack/react-query";

import { tagService } from "@/domain/services";

export function useTag(id: string) {
  return useQuery({
    queryKey: ["tags", id],
    queryFn: () => tagService.getById(id),
    enabled: !!id,
  });
}
