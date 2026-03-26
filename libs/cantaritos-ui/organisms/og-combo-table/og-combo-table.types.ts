import { Combo } from "@/domain/types";

export interface OgComboTableProps {
  combos: Combo[];
  onEdit: (combo: Combo) => void;
  onDelete?: (combo: Combo) => void;
  isLoading?: boolean;
}
