import { useMutation, useQueryClient } from "@tanstack/react-query";

import { comboService } from "@/domain/services";

export function useUploadComboImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      comboService.uploadImage(id, file),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      queryClient.invalidateQueries({ queryKey: ["combos", variables.id] });
    },
  });
}
