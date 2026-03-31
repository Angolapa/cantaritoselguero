import { ModifierGroup, ProductSize } from "@/domain/types";

export interface MlModifierGroupCardProps {
  productId: string;
  group: ModifierGroup;
  sizes: ProductSize[];
  onEdit: (group: ModifierGroup) => void;
  onRemove?: (group: ModifierGroup) => void;
  onDeleteModifier?: (groupId: string, modifierId: string) => void;
}
