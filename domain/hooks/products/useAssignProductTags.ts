import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useAssignProductTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      tagIds,
    }: {
      productId: string;
      tagIds: string[];
    }) => productService.assignTags(productId, tagIds),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["products"], exact: true });
    },
  });
}
