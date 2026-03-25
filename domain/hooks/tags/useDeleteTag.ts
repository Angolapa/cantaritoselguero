import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tagService } from "@/domain/services";

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tagService.delete(id),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["tags", id],
        exact: true,
      });
    },
  });
}
