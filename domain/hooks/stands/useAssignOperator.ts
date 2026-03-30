import { useMutation, useQueryClient } from "@tanstack/react-query";

import { standService } from "@/domain/services";

export function useAssignOperator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      standId,
      userId,
    }: {
      standId: string;
      userId: string;
    }) => standService.assignOperator(standId, userId),
    onSuccess: (_, { standId }) => {
      queryClient.invalidateQueries({ queryKey: ["stands"] });
      queryClient.invalidateQueries({ queryKey: ["stands", standId] });
    },
  });
}
