import { useQuery } from "@tanstack/react-query";

import { comboService } from "@/domain/services";

export function useCombo(id: string) {
  return useQuery({
    queryKey: ["combos", id],
    queryFn: () => comboService.getById(id),
    enabled: !!id,
  });
}
