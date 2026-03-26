import { useQuery } from "@tanstack/react-query";

import { comboService } from "@/domain/services";

export function useCombos() {
  return useQuery({
    queryKey: ["combos"],
    queryFn: () => comboService.getAll(),
  });
}
