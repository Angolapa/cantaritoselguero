import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";

export function useRemoveSectionItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      itemId,
    }: {
      sectionId: string;
      itemId: string;
    }) => sectionService.removeItem(sectionId, itemId),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({
        queryKey: ["sections", variables.sectionId],
      });
    },
  });
}
