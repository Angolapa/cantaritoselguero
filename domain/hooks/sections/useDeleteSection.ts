import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sectionService.delete(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({
        queryKey: ["sections"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["sections", id],
        exact: true,
      });
    },
  });
}
