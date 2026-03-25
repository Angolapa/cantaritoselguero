import { Tag } from "@/domain/types";

export interface OgTagTableProps {
  tags: Tag[];
  onEdit: (tag: Tag) => void;
  onDelete?: (tag: Tag) => void;
  isLoading?: boolean;
}
