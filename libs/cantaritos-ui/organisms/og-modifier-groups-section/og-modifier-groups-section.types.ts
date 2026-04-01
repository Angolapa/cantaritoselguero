import { ModifierGroup, ProductSize } from "@/domain/types";

export interface OgModifierGroupsSectionProps {
  productId: string;
  modifierGroups: ModifierGroup[];
  sizes: ProductSize[];
}
