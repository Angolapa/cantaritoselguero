import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agencyCardService } from "@/domain/services";

export function useUploadAgencyCardImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      agencyCardService.uploadImage(id, file),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agency-cards"] });
      queryClient.invalidateQueries({ queryKey: ["agency-cards", variables.id] });
    },
  });
}
