import { useMutation, useQueryClient } from "@tanstack/react-query";

import { standService } from "@/domain/services";

export function useRemoveProductFromStand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      standId,
      productId,
    }: {
      standId: string;
      productId: string;
    }) => standService.removeProductFromCatalog(standId, productId),
    onSuccess: (_, { standId }) => {
      queryClient.invalidateQueries({ queryKey: ["stands", standId] });
      queryClient.invalidateQueries({
        queryKey: ["stands", standId, "catalog"],
      });
    },
  });
}
