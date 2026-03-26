import { useMutation, useQueryClient } from "@tanstack/react-query";

import { comboService } from "@/domain/services";
import { UpdateComboRequest } from "@/domain/types";

export function useUpdateCombo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateComboRequest }) =>
      comboService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      queryClient.invalidateQueries({ queryKey: ["combos", variables.id] });
    },
  });
}
