import { useMutation, useQueryClient } from "@tanstack/react-query";

import { standService } from "@/domain/services";
import { CreateStandRequest } from "@/domain/types";

export function useCreateStand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStandRequest) => standService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stands"] });
    },
  });
}
