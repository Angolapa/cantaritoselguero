import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "@/domain/services";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
    },
  });
}
