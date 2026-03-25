import {
  AddSectionItemRequest,
  CreateSectionRequest,
  ReorderSectionItemsRequest,
  Section,
  UpdateSectionRequest,
} from "@/domain/types";
import { authFetcher } from "@/shared/utils/fetch";

export const sectionService = {
  getAll: (lang?: string): Promise<Section[]> =>
    authFetcher<Section[]>(`/sections${lang ? `?lang=${lang}` : ""}`),

  getById: (id: string, lang?: string): Promise<Section> =>
    authFetcher<Section>(`/sections/${id}${lang ? `?lang=${lang}` : ""}`),

  getBySlug: (slug: string, lang?: string): Promise<Section> =>
    authFetcher<Section>(`/sections/${slug}${lang ? `?lang=${lang}` : ""}`),

  create: (data: CreateSectionRequest): Promise<Section> =>
    authFetcher<Section>("/sections", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateSectionRequest): Promise<Section> =>
    authFetcher<Section>(`/sections/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/sections/${id}`, {
      method: "DELETE",
    }),

  // --- Section Items ---

  addItem: (sectionId: string, data: AddSectionItemRequest): Promise<Section> =>
    authFetcher<Section>(`/sections/${sectionId}/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  removeItem: (sectionId: string, itemId: string): Promise<void> =>
    authFetcher<void>(`/sections/${sectionId}/items/${itemId}`, {
      method: "DELETE",
    }),

  reorderItems: (sectionId: string, data: ReorderSectionItemsRequest): Promise<Section> =>
    authFetcher<Section>(`/sections/${sectionId}/items/reorder`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
