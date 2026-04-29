import {
  AgencyCard,
  CreateAgencyCardRequest,
  UpdateAgencyCardRequest,
} from "@/domain/types";
import { authFetcher, fetcher } from "@/shared/utils/fetch";

export const agencyCardService = {
  getAll: (params?: { active?: boolean }): Promise<AgencyCard[]> => {
    const searchParams = new URLSearchParams();
    if (params?.active !== undefined) {
      searchParams.set("active", String(params.active));
    }
    const query = searchParams.toString();
    return fetcher<AgencyCard[]>(`/agency-cards${query ? `?${query}` : ""}`);
  },

  getById: (id: string): Promise<AgencyCard> =>
    authFetcher<AgencyCard>(`/agency-cards/${id}`),

  create: (data: CreateAgencyCardRequest): Promise<AgencyCard> =>
    authFetcher<AgencyCard>("/agency-cards", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateAgencyCardRequest): Promise<AgencyCard> =>
    authFetcher<AgencyCard>(`/agency-cards/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/agency-cards/${id}`, {
      method: "DELETE",
    }),

  uploadImage: (id: string, file: File): Promise<AgencyCard> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<AgencyCard>(`/agency-cards/${id}/image`, {
      method: "POST",
      body: formData,
    });
  },

  deleteImage: (id: string): Promise<AgencyCard> =>
    authFetcher<AgencyCard>(`/agency-cards/${id}/image`, {
      method: "DELETE",
    }),
};
