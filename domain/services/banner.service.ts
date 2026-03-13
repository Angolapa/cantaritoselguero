import {
  Banner,
  CreateBannerRequest,
  UpdateBannerRequest,
} from "@/domain/types";
import { authFetcher, fetcher } from "@/shared/utils/fetch";

export const bannerService = {
  getAll: (params?: { section?: string; active?: boolean }): Promise<Banner[]> => {
    const searchParams = new URLSearchParams();
    if (params?.section) searchParams.set("section", params.section);
    if (params?.active !== undefined) searchParams.set("active", String(params.active));
    const query = searchParams.toString();
    return fetcher<Banner[]>(`/banners${query ? `?${query}` : ""}`);
  },

  getById: (id: string): Promise<Banner> =>
    authFetcher<Banner>(`/banners/${id}`),

  create: (data: CreateBannerRequest): Promise<Banner> =>
    authFetcher<Banner>("/banners", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateBannerRequest): Promise<Banner> =>
    authFetcher<Banner>(`/banners/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/banners/${id}`, {
      method: "DELETE",
    }),

  uploadImage: (id: string, file: File): Promise<Banner> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<Banner>(`/banners/${id}/image`, {
      method: "POST",
      body: formData,
    });
  },

  uploadMobileImage: (id: string, file: File): Promise<Banner> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<Banner>(`/banners/${id}/image-mobile`, {
      method: "POST",
      body: formData,
    });
  },

  deleteImage: (id: string): Promise<Banner> =>
    authFetcher<Banner>(`/banners/${id}/image`, {
      method: "DELETE",
    }),

  deleteMobileImage: (id: string): Promise<Banner> =>
    authFetcher<Banner>(`/banners/${id}/image-mobile`, {
      method: "DELETE",
    }),
};
