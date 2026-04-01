import {
  Combo,
  CreateComboRequest,
  UpdateComboRequest,
} from "@/domain/types";
import { authFetcher } from "@/shared/utils/fetch";

export const comboService = {
  getAll: (lang?: string): Promise<Combo[]> =>
    authFetcher<Combo[]>(`/combos${lang ? `?lang=${lang}` : ""}`),

  getById: (id: string, lang?: string): Promise<Combo> =>
    authFetcher<Combo>(`/combos/${id}${lang ? `?lang=${lang}` : ""}`),

  create: (data: CreateComboRequest): Promise<Combo> =>
    authFetcher<Combo>("/combos", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateComboRequest): Promise<Combo> =>
    authFetcher<Combo>(`/combos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/combos/${id}`, {
      method: "DELETE",
    }),

  uploadImage: (id: string, file: File): Promise<Combo> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<Combo>(`/combos/${id}/image`, {
      method: "POST",
      body: formData,
    });
  },
};
