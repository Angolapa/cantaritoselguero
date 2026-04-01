import { Modifier, ModifierGroup, ProductSize } from "@/domain/types";

export interface MlModifierGroupCardProps {
  productId: string;
  group: ModifierGroup;
  sizes: ProductSize[];
  onEdit: (group: ModifierGroup) => void;
  onRemove?: (group: ModifierGroup) => void;
  onDelete?: (group: ModifierGroup) => void;
  onEditModifier?: (groupId: string, modifier: Modifier) => void;
  onDeleteModifier?: (groupId: string, modifierId: string) => void;
}
