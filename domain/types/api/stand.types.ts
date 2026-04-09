// --- Stand ---

export interface StandOperator {
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

export interface Stand {
  id: string;
  name: string;
  description?: string;
  image?: string;
  location?: string;
  isActive: boolean;
  operators: StandOperator[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateStandRequest {
  name: string;
  description?: string;
  image?: string;
  location?: string;
  isActive?: boolean;
}

export interface UpdateStandRequest {
  name?: string;
  description?: string;
  image?: string;
  location?: string;
  isActive?: boolean;
}

export interface StandCatalogItem {
  productId: string;
  name: string;
  nameEs: string | null;
  nameEn: string | null;
  description: string | null;
  basePrice: number;
  image: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface StandCatalog {
  standId: string;
  standName: string;
  items: StandCatalogItem[];
}
