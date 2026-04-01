import { useMutation, useQueryClient } from "@tanstack/react-query";

import { standService } from "@/domain/services";

export function useAddProductToStand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      standId,
      productId,
      sortOrder,
    }: {
      standId: string;
      productId: string;
      sortOrder?: number;
    }) => standService.addProductToCatalog(standId, productId, sortOrder),
    onSuccess: (_, { standId }) => {
      queryClient.invalidateQueries({ queryKey: ["stands", standId] });
    },
  });
}
