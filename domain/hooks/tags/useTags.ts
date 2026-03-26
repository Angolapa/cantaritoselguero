import { useQuery } from "@tanstack/react-query";

import { tagService } from "@/domain/services";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => tagService.getAll(),
  });
}
