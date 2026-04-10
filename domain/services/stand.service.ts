import {
  CreateStandRequest,
  Stand,
  StandCatalog,
  UpdateStandRequest,
} from "@/domain/types";
import { authFetcher } from "@/shared/utils/fetch";

export const standService = {
  getAll: (): Promise<Stand[]> =>
    authFetcher<Stand[]>("/stands"),

  getById: (id: string): Promise<Stand> =>
    authFetcher<Stand>(`/stands/${id}`),

  create: (data: CreateStandRequest): Promise<Stand> =>
    authFetcher<Stand>("/stands", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateStandRequest): Promise<Stand> =>
    authFetcher<Stand>(`/stands/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/stands/${id}`, {
      method: "DELETE",
    }),

  assignOperator: (standId: string, userId: string): Promise<Stand> =>
    authFetcher<Stand>(`/stands/${standId}/operators/${userId}`, {
      method: "POST",
    }),

  removeOperator: (standId: string, userId: string): Promise<Stand> =>
    authFetcher<Stand>(`/stands/${standId}/operators/${userId}`, {
      method: "DELETE",
    }),

  getCatalog: (
    standId: string,
    options?: { active?: boolean; lang?: "es" | "en" },
  ): Promise<StandCatalog> => {
    const params = new URLSearchParams();
    if (options?.active !== undefined) {
      params.set("active", String(options.active));
    }
    if (options?.lang) {
      params.set("lang", options.lang);
    }
    const queryString = params.toString();
    return authFetcher<StandCatalog>(
      `/stands/${standId}/catalog${queryString ? `?${queryString}` : ""}`,
    );
  },

  addProductToCatalog: (
    standId: string,
    productId: string,
    sortOrder?: number
  ): Promise<void> =>
    authFetcher<void>(`/stands/${standId}/catalog/${productId}`, {
      method: "POST",
      body: JSON.stringify({ sortOrder }),
    }),

  removeProductFromCatalog: (
    standId: string,
    productId: string
  ): Promise<void> =>
    authFetcher<void>(`/stands/${standId}/catalog/${productId}`, {
      method: "DELETE",
    }),
};
