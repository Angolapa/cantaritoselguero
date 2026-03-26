// --- Tag ---

export interface Tag {
  id: string;
  name: string;
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
