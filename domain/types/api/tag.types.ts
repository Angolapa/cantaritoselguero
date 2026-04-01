// --- Tag ---

export interface Tag {
  id: string;
  name: string;
  nameEs: string;
  nameEn: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagRequest {
  nameEs: string;
  nameEn: string;
  isActive?: boolean;
}

export interface UpdateTagRequest {
  nameEs?: string;
  nameEn?: string;
  isActive?: boolean;
}
