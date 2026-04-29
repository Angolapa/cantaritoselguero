import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";
import { CreateAgencyCardRequest } from "@/domain/types";

export function useCreateAgencyCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgencyCardRequest) => agencyCardService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency-cards"] });
    },
  });
}
