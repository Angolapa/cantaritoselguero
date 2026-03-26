// --- Combo ---

export interface ComboItem {
  productId: string;
  productName: string;
  quantity: number;
}

export interface Combo {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isActive: boolean;
  items: ComboItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateComboRequest {
  nameEs: string;
  nameEn: string;
  descriptionEs?: string;
  descriptionEn?: string;
  price: number;
  isActive?: boolean;
  items: { productId: string; quantity: number }[];
}

export interface UpdateComboRequest {
  nameEs?: string;
  nameEn?: string;
  descriptionEs?: string;
  descriptionEn?: string;
  price?: number;
  isActive?: boolean;
  items?: { productId: string; quantity: number }[];
}
