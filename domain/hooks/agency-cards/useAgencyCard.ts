import { useQuery } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";

export function useAgencyCard(id: string) {
  return useQuery({
    queryKey: ["agency-cards", id],
    queryFn: () => agencyCardService.getById(id),
    enabled: !!id,
  });
}
