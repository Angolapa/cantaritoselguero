import { ModifierGroup } from "@/domain/types";

export interface MlModifierGroupCardProps {
  productId: string;
  group: ModifierGroup;
  onEdit: (group: ModifierGroup) => void;
  onRemove?: (group: ModifierGroup) => void;
  onDeleteModifier?: (groupId: string, modifierId: string) => void;
}
