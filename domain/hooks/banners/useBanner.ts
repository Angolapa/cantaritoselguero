import { useQuery } from "@tanstack/react-query";

import { bannerService } from "@/domain/services";

export function useBanner(id: string) {
  return useQuery({
    queryKey: ["banners", id],
    queryFn: () => bannerService.getById(id),
    enabled: !!id,
  });
}
