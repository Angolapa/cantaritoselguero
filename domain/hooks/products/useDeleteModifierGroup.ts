import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useDeleteModifierGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      id,
    }: {
      productId: string;
      id: string;
    }) => productService.deleteModifierGroup(productId, id),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId, "modifier-groups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
      });
    },
  });
}
