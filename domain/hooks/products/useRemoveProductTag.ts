import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useRemoveProductTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      tagId,
    }: {
      productId: string;
      tagId: string;
    }) => productService.removeTag(productId, tagId),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["products"], exact: true });
    },
  });
}
