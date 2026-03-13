import { useQuery } from "@tanstack/react-query";

import { bannerService } from "@/domain/services";

export function useBanners(params?: { section?: string; active?: boolean }) {
  return useQuery({
    queryKey: ["banners", params],
    queryFn: () => bannerService.getAll(params),
  });
}
