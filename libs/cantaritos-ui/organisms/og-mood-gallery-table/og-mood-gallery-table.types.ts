import { MoodGallery } from "@/domain/types";

export interface OgMoodGalleryTableProps {
  items: MoodGallery[];
  onEdit: (item: MoodGallery) => void;
  onDelete?: (item: MoodGallery) => void;
  isLoading?: boolean;
}
