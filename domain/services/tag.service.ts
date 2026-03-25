import {
  CreateTagRequest,
  Tag,
  UpdateTagRequest,
} from "@/domain/types";
import { authFetcher } from "@/shared/utils/fetch";

export const tagService = {
  getAll: (lang?: string): Promise<Tag[]> =>
    authFetcher<Tag[]>(`/tags${lang ? `?lang=${lang}` : ""}`),

  getById: (id: string, lang?: string): Promise<Tag> =>
    authFetcher<Tag>(`/tags/${id}${lang ? `?lang=${lang}` : ""}`),

  create: (data: CreateTagRequest): Promise<Tag> =>
    authFetcher<Tag>("/tags", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateTagRequest): Promise<Tag> =>
    authFetcher<Tag>(`/tags/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/tags/${id}`, {
      method: "DELETE",
    }),
};
