import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";
import { AddSectionItemRequest } from "@/domain/types";

export function useAddSectionItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      data,
    }: {
      sectionId: string;
      data: AddSectionItemRequest;
    }) => sectionService.addItem(sectionId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({
        queryKey: ["sections", variables.sectionId],
      });
    },
  });
}
