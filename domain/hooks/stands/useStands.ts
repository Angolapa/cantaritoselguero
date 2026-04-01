import { useQuery } from "@tanstack/react-query";

import { standService } from "@/domain/services";

export function useStands() {
  return useQuery({
    queryKey: ["stands"],
    queryFn: () => standService.getAll(),
  });
}
