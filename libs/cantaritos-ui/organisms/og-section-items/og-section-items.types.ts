import { Combo, Product, SectionItem } from "@/domain/types";

export interface OgSectionItemsProps {
  sectionId: string;
  items: SectionItem[];
  products: Product[];
  combos: Combo[];
  onAddProduct: (productId: string, order: number) => void;
  onAddCombo: (comboId: string, order: number) => void;
  onRemoveItem: (itemId: string) => void;
  isLoading?: boolean;
}
