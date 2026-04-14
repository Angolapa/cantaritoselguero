import {
  CreateModifierGroupRequest,
  CreateModifierRequest,
  CreateProductRequest,
  CreateSizeRequest,
  Modifier,
  ModifierGroup,
  Product,
  ProductSize,
  UpdateModifierGroupRequest,
  UpdateModifierRequest,
  UpdateModifierSizePricesRequest,
  UpdateProductRequest,
  UpdateSizeRequest,
} from "@/domain/types";
import { authFetcher, fetcher } from "@/shared/utils/fetch";

export const productService = {
  // --- Products ---

  getAll: (): Promise<Product[]> =>
    fetcher<Product[]>("/products"),

  getById: (id: string): Promise<Product> =>
    fetcher<Product>(`/products/${id}`),

  create: (data: CreateProductRequest): Promise<Product> =>
    authFetcher<Product>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateProductRequest): Promise<Product> =>
    authFetcher<Product>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    authFetcher<void>(`/products/${id}`, {
      method: "DELETE",
    }),

  uploadImage: (id: string, file: File): Promise<Product> => {
    const formData = new FormData();
    formData.append("file", file);
    return authFetcher<Product>(`/products/${id}/image`, {
      method: "POST",
      body: formData,
    });
  },

  // --- Tags ---

  assignTags: (productId: string, tagIds: string[]): Promise<Product> =>
    authFetcher<Product>(`/products/${productId}/tags`, {
      method: "POST",
      body: JSON.stringify({ tagIds }),
    }),

  removeTag: (productId: string, tagId: string): Promise<void> =>
    authFetcher<void>(`/products/${productId}/tags/${tagId}`, {
      method: "DELETE",
    }),

  // --- Sizes ---

  getSizes: (productId: string): Promise<ProductSize[]> =>
    fetcher<ProductSize[]>(`/products/${productId}/sizes`),

  createSize: (productId: string, data: CreateSizeRequest): Promise<ProductSize> =>
    authFetcher<ProductSize>(`/products/${productId}/sizes`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateSize: (
    productId: string,
    id: string,
    data: UpdateSizeRequest,
  ): Promise<ProductSize> =>
    authFetcher<ProductSize>(`/products/${productId}/sizes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteSize: (productId: string, id: string): Promise<void> =>
    authFetcher<void>(`/products/${productId}/sizes/${id}`, {
      method: "DELETE",
    }),

  // --- Modifier Groups ---

  getModifierGroups: (productId: string): Promise<ModifierGroup[]> =>
    fetcher<ModifierGroup[]>(`/products/${productId}/modifier-groups`),

  createModifierGroup: (
    productId: string,
    data: CreateModifierGroupRequest,
  ): Promise<ModifierGroup> =>
    authFetcher<ModifierGroup>(`/products/${productId}/modifier-groups`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateModifierGroup: (
    productId: string,
    id: string,
    data: UpdateModifierGroupRequest,
  ): Promise<ModifierGroup> =>
    authFetcher<ModifierGroup>(`/products/${productId}/modifier-groups/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteModifierGroup: (productId: string, id: string): Promise<void> =>
    authFetcher<void>(`/products/${productId}/modifier-groups/${id}`, {
      method: "DELETE",
    }),

  // --- Modifiers ---

  getModifiers: (productId: string, groupId: string): Promise<Modifier[]> =>
    fetcher<Modifier[]>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers`,
    ),

  createModifier: (
    productId: string,
    groupId: string,
    data: CreateModifierRequest,
  ): Promise<Modifier> =>
    authFetcher<Modifier>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),

  updateModifier: (
    productId: string,
    groupId: string,
    id: string,
    data: UpdateModifierRequest,
  ): Promise<Modifier> =>
    authFetcher<Modifier>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    ),

  deleteModifier: (
    productId: string,
    groupId: string,
    id: string,
  ): Promise<void> =>
    authFetcher<void>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers/${id}`,
      {
        method: "DELETE",
      },
    ),

  // --- Modifier Size Prices ---

  updateModifierSizePrices: (
    productId: string,
    groupId: string,
    modifierId: string,
    data: UpdateModifierSizePricesRequest,
  ): Promise<void> =>
    authFetcher<void>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers/${modifierId}/size-prices`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    ),

  // --- Modifier Tags ---

  assignModifierTags: (
    productId: string,
    groupId: string,
    modifierId: string,
    tagIds: string[],
  ): Promise<Modifier> =>
    authFetcher<Modifier>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers/${modifierId}/tags`,
      {
        method: "POST",
        body: JSON.stringify({ tagIds }),
      },
    ),

  removeModifierTag: (
    productId: string,
    groupId: string,
    modifierId: string,
    tagId: string,
  ): Promise<void> =>
    authFetcher<void>(
      `/products/${productId}/modifier-groups/${groupId}/modifiers/${modifierId}/tags/${tagId}`,
      {
        method: "DELETE",
      },
    ),
};
