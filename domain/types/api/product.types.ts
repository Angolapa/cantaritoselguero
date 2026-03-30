import { Tag } from "./tag.types";

// --- Product ---


export interface Product {
  id: string;
  name: string;
  nameEs?: string;
  nameEn?: string;
  description?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  basePrice: number;
  image?: string;
  stock?: number;
  isActive: boolean;
  standId?: string;
  createdAt: string;
  updatedAt: string;
  sizes: ProductSize[];
  modifierGroups: ModifierGroup[];
  tags?: Tag[];
}

export interface CreateProductRequest {
  nameEs: string;
  nameEn: string;
  descriptionEs?: string;
  descriptionEn?: string;
  basePrice: number;
  image?: string;
  stock?: number;
  isActive?: boolean;
  standId?: string;
}

export interface UpdateProductRequest {
  nameEs?: string;
  nameEn?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  basePrice?: number;
  image?: string;
  stock?: number | null;
  isActive?: boolean;
  standId?: string;
}

// --- Product Size ---

export interface ProductSize {
  id: string;
  productId: string;
  name: string;
  nameEs?: string;
  nameEn?: string;
  price: number;
  stock?: number | null;
  sortOrder: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface CreateSizeRequest {
  nameEs: string;
  nameEn: string;
  price: number;
  stock?: number | null;
  sortOrder?: number;
  isDefault?: boolean;
  isActive?: boolean;
}

export interface UpdateSizeRequest {
  nameEs?: string;
  nameEn?: string;
  price?: number;
  stock?: number | null;
  sortOrder?: number;
  isDefault?: boolean;
  isActive?: boolean;
}

// --- Modifier Group ---

export interface ModifierGroup {
  id: string;
  productId: string;
  name: string;
  nameEs?: string;
  nameEn?: string;
  description?: string;
  minSelect: number;
  maxSelect: number;
  sortOrder: number;
  isRequired: boolean;
  modifiers: Modifier[];
}

export interface CreateModifierGroupRequest {
  nameEs: string;
  nameEn: string;
  description?: string;
  minSelect?: number;
  maxSelect?: number;
  sortOrder?: number;
}

export interface UpdateModifierGroupRequest {
  nameEs?: string;
  nameEn?: string;
  description?: string;
  minSelect?: number;
  maxSelect?: number;
  sortOrder?: number;
}

// --- Modifier ---

export interface Modifier {
  id: string;
  groupId: string;
  name: string;
  nameEs?: string;
  nameEn?: string;
  priceAdjustment: number;
  isDefault: boolean;
  isActive: boolean;
  sortOrder: number;
  tags?: Tag[];
}

export interface CreateModifierRequest {
  nameEs: string;
  nameEn: string;
  priceAdjustment?: number;
  isDefault?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateModifierRequest {
  nameEs?: string;
  nameEn?: string;
  priceAdjustment?: number;
  isDefault?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}
