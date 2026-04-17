// --- Section ---

import { Combo } from "./combo.types";
import { Product } from "./product.types";

export interface SectionItem {
  id: string;
  type: "product" | "combo";
  order: number;
  product: Product | null;
  combo: Combo | null;
}

export interface Section {
  id: string;
  name: string;
  nameEs?: string;
  nameEn?: string;
  slug: string;
  order: number;
  isActive: boolean;
  items: SectionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionRequest {
  nameEs: string;
  nameEn: string;
  slug: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateSectionRequest {
  nameEs?: string;
  nameEn?: string;
  slug?: string;
  order?: number;
  isActive?: boolean;
}

export interface AddSectionItemRequest {
  productId?: string;
  comboId?: string;
  order: number;
}

export interface ReorderSectionItemsRequest {
  items: { itemId: string; order: number }[];
}
