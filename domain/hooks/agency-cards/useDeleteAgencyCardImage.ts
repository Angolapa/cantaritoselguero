import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";

export function useDeleteAgencyCardImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => agencyCardService.deleteImage(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: ["agency-cards"] });
      queryClient.invalidateQueries({ queryKey: ["agency-cards", id] });
    },
  });
}
