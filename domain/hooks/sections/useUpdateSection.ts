import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";
import { UpdateSectionRequest } from "@/domain/types";

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSectionRequest }) =>
      sectionService.update(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["sections", variables.id] });
    },
  });
}
