import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sectionService } from "@/domain/services";
import { CreateSectionRequest } from "@/domain/types";

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSectionRequest) => sectionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
