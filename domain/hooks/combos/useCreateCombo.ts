import { useMutation, useQueryClient } from "@tanstack/react-query";

import { comboService } from "@/domain/services";
import { CreateComboRequest } from "@/domain/types";

export function useCreateCombo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateComboRequest) => comboService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["combos"] });
    },
  });
}
