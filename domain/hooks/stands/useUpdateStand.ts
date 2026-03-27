import { useMutation, useQueryClient } from "@tanstack/react-query";

import { standService } from "@/domain/services";
import { UpdateStandRequest } from "@/domain/types";

export function useUpdateStand(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateStandRequest) => standService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stands"] });
      queryClient.invalidateQueries({ queryKey: ["stands", id] });
    },
  });
}
