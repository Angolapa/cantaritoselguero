import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useDeleteModifier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      groupId,
      modifierId,
    }: {
      productId: string;
      groupId: string;
      modifierId: string;
    }) => productService.deleteModifier(productId, groupId, modifierId),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
        exact: true,
      });
    },
  });
}
