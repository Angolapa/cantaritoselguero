import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";
import { UpdateAgencyCardRequest } from "@/domain/types";

export function useUpdateAgencyCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAgencyCardRequest }) =>
      agencyCardService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agency-cards"] });
      queryClient.invalidateQueries({ queryKey: ["agency-cards", variables.id] });
    },
  });
}
