import { useQuery } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";

export function useAgencyCards(params?: { active?: boolean }) {
  return useQuery({
    queryKey: ["agency-cards", params ?? {}],
    queryFn: () => agencyCardService.getAll(params),
  });
}
