// --- Banner ---

export interface Banner {
  id: string;
  title: string | null;
  imageUrl: string | null;
  imageMobileUrl: string | null;
  altText: string;
  linkUrl: string | null;
  section: string;
  order: number;
  backgroundColor: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerRequest {
  imageUrl: string;
  altText: string;
  title?: string;
  imageMobileUrl?: string;
  linkUrl?: string;
  section?: string;
  order?: number;
  backgroundColor?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export interface UpdateBannerRequest {
  title?: string;
  imageUrl?: string;
  imageMobileUrl?: string;
  altText?: string;
  linkUrl?: string;
  section?: string;
  order?: number;
  backgroundColor?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}
