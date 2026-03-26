import { useQuery } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";

export function useSection(id: string) {
  return useQuery({
    queryKey: ["sections", id],
    queryFn: () => sectionService.getById(id),
    enabled: !!id,
  });
}
