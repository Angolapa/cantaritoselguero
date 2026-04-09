import { useQuery } from "@tanstack/react-query";

import { standService } from "@/domain/services";

interface UseStandCatalogOptions {
  active?: boolean;
  lang?: "es" | "en";
}

export function useStandCatalog(
  standId: string,
  options?: UseStandCatalogOptions,
) {
  return useQuery({
    queryKey: ["stands", standId, "catalog", options],
    queryFn: () => standService.getCatalog(standId, options),
    enabled: !!standId,
  });
}
