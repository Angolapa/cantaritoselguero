import { useMutation, useQueryClient } from "@tanstack/react-query";

import { comboService } from "@/domain/services";

export function useDeleteCombo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => comboService.delete(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({
        queryKey: ["combos"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["combos", id],
        exact: true,
      });
    },
  });
}
