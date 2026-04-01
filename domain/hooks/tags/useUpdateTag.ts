import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tagService } from "@/domain/services";
import { UpdateTagRequest } from "@/domain/types";

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTagRequest }) =>
      tagService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["tags", variables.id] });
    },
  });
}
