import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useRemoveModifierTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      groupId,
      modifierId,
      tagId,
    }: {
      productId: string;
      groupId: string;
      modifierId: string;
      tagId: string;
    }) => productService.removeModifierTag(productId, groupId, modifierId, tagId),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
        exact: true,
      });
    },
  });
}
