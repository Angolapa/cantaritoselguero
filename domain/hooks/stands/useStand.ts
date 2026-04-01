import { useQuery } from "@tanstack/react-query";

import { standService } from "@/domain/services";

export function useStand(id: string) {
  return useQuery({
    queryKey: ["stands", id],
    queryFn: () => standService.getById(id),
    enabled: !!id,
  });
}
