// --- MoodGallery ---

export interface MoodGallery {
  id: string;
  title: string | null;
  imageUrl: string | null;
  imageMobileUrl: string | null;
  altEs: string;
  altEn: string;
  section: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMoodGalleryRequest {
  altEs: string;
  altEn: string;
  title?: string;
  imageUrl?: string;
  imageMobileUrl?: string;
  section?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateMoodGalleryRequest {
  title?: string;
  altEs?: string;
  altEn?: string;
  imageUrl?: string;
  imageMobileUrl?: string;
  section?: string;
  order?: number;
  isActive?: boolean;
}
