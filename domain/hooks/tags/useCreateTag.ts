import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tagService } from "@/domain/services";
import { CreateTagRequest } from "@/domain/types";

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTagRequest) => tagService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}
