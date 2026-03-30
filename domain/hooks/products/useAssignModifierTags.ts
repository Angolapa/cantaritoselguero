import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useAssignModifierTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      groupId,
      modifierId,
      tagIds,
    }: {
      productId: string;
      groupId: string;
      modifierId: string;
      tagIds: string[];
    }) => productService.assignModifierTags(productId, groupId, modifierId, tagIds),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
        exact: true,
      });
    },
  });
}
