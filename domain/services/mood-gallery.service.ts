import {
  MoodGallery,
  CreateMoodGalleryRequest,
  UpdateMoodGalleryRequest,
} from "@/domain/types";
import { authFetcher, fetcher } from "@/shared/utils/fetch";

export const moodGalleryService = {
  getAll: (params?: { section?: string; active?: boolean }): Promise<MoodGallery[]> => {
    const searchParams = new URLSearchParams();
    if (params?.section) searchParams.set("section", params.section);
    if (params?.active !== undefined) searchParams.set("active", String(params.active));
    const query = searchParams.toString();
    return fetcher<MoodGallery[]>(`/mood-gallery${query ? `?${query}` : ""}`);
  },

  getById: (id: string): Promise<MoodGallery> =>
    authFetcher<MoodGallery>(`/mood-gallery/${id}`),

  create: (data: CreateMoodGalleryRequest): Promise<MoodGallery> =>
    authFetcher<MoodGallery>("/mood-gallery", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateMoodGalleryRequest): Promise<MoodGallery> =>
    authFetcher<MoodGallery>(`/mood-gallery/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/mood-gallery/${id}`, {
      method: "DELETE",
    }),

  uploadImage: (id: string, file: File): Promise<MoodGallery> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<MoodGallery>(`/mood-gallery/${id}/image`, {
      method: "POST",
      body: formData,
    });
  },

  uploadMobileImage: (id: string, file: File): Promise<MoodGallery> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<MoodGallery>(`/mood-gallery/${id}/image-mobile`, {
      method: "POST",
      body: formData,
    });
  },

  deleteImage: (id: string): Promise<MoodGallery> =>
    authFetcher<MoodGallery>(`/mood-gallery/${id}/image`, {
      method: "DELETE",
    }),

  deleteMobileImage: (id: string): Promise<MoodGallery> =>
    authFetcher<MoodGallery>(`/mood-gallery/${id}/image-mobile`, {
      method: "DELETE",
    }),
};
