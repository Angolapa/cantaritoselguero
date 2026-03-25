import { Section } from "@/domain/types";

export interface OgSectionTableProps {
  sections: Section[];
  onEdit: (section: Section) => void;
  onDelete?: (section: Section) => void;
  isLoading?: boolean;
}
