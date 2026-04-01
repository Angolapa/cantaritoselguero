import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";
import { UpdateModifierSizePricesRequest } from "@/domain/types";

export function useUpdateModifierSizePrices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      groupId,
      modifierId,
      data,
    }: {
      productId: string;
      groupId: string;
      modifierId: string;
      data: UpdateModifierSizePricesRequest;
    }) =>
      productService.updateModifierSizePrices(
        productId,
        groupId,
        modifierId,
        data,
      ),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "products",
          variables.productId,
          "modifier-groups",
          variables.groupId,
          "modifiers",
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId, "modifier-groups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", variables.productId],
      });
    },
  });
}
