import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";

export function useDeleteAgencyCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => agencyCardService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency-cards"] });
    },
  });
}
