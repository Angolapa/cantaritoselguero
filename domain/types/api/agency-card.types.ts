// --- Agency Card ---

export interface AgencyCard {
  id: string;
  title: string;
  imageUrl: string | null;
  location: string;
  lodgingType: string;
  distance: string | null;
  email: string | null;
  phone: string | null;
  socialHandle: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgencyCardRequest {
  title: string;
  location: string;
  lodgingType: string;
  distance?: string | null;
  email?: string | null;
  phone?: string | null;
  socialHandle?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  order?: number;
  isActive?: boolean;
}

export interface UpdateAgencyCardRequest {
  title?: string;
  location?: string;
  lodgingType?: string;
  distance?: string | null;
  email?: string | null;
  phone?: string | null;
  socialHandle?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  order?: number;
  isActive?: boolean;
}
