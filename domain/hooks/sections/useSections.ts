import { useQuery } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";

export function useSections() {
  return useQuery({
    queryKey: ["sections"],
    queryFn: () => sectionService.getAll(),
  });
}
