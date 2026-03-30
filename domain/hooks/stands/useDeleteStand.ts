import { useMutation, useQueryClient } from "@tanstack/react-query";

import { standService } from "@/domain/services";

export function useDeleteStand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => standService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stands"] });
    },
  });
}
