"use client";

import { Pencil, Trash2, Unlink } from "lucide-react";

import { AtButton, AtChip } from "@/libs/cantaritos-ui/atoms";
import {
  useAssignModifierTags,
  useRemoveModifierTag,
} from "@/domain/hooks/products";
import { useTags } from "@/domain/hooks/tags";
import { Modifier, Tag } from "@/domain/types";

import { MlModifierGroupCardProps } from "./ml-modifier-group-card.types";

export function MlModifierGroupCard({
  productId,
  group,
  onEdit,
  onRemove,
  onDeleteModifier,
}: MlModifierGroupCardProps) {
  const selectType = group.maxSelect === 1 ? "Selección única" : "Multi-selección";
  const requiredLabel = group.isRequired ? "Requerido" : "Opcional";

  const { data: allTags = [] } = useTags();
  const assignTags = useAssignModifierTags();
  const removeTag = useRemoveModifierTag();

  const handleToggleTag = (modifier: Modifier, tag: Tag) => {
    const assignedTagIds = new Set((modifier.tags ?? []).map((assignedTag) => assignedTag.id));

    if (assignedTagIds.has(tag.id)) {
      removeTag.mutate({
        productId,
        groupId: group.id,
        modifierId: modifier.id,
        tagId: tag.id,
      });
    } else {
      assignTags.mutate({
        productId,
        groupId: group.id,
        modifierId: modifier.id,
        tagIds: [tag.id],
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col">
          <span className="font-semibold">{group.name}</span>
          <span className="text-xs text-gray-500">
            {requiredLabel} · {selectType} · {group.modifiers.length} items
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AtButton
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => onEdit(group)}
            aria-label="Editar grupo"
          >
            <Pencil className="h-4 w-4" />
          </AtButton>
          {onRemove && (
            <AtButton
              isIconOnly
              variant="light"
              size="sm"
              color="danger"
              onPress={() => onRemove(group)}
              aria-label="Desvincular grupo"
            >
              <Unlink className="h-4 w-4" />
            </AtButton>
          )}
        </div>
      </div>

      {/* Modifiers list */}
      {group.modifiers.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {group.modifiers.map((modifier: Modifier) => {
            const modifierTagIds = new Set(
              (modifier.tags ?? []).map((tag) => tag.id),
            );

            return (
              <div key={modifier.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{modifier.name}</span>
                  <div className="flex items-center gap-2">
                    <span>
                      {modifier.priceAdjustment > 0
                        ? `+$${modifier.priceAdjustment.toFixed(2)}`
                        : modifier.priceAdjustment < 0
                          ? `-$${Math.abs(modifier.priceAdjustment).toFixed(2)}`
                          : ""}
                    </span>
                    {onDeleteModifier && (
                      <AtButton
                        isIconOnly
                        variant="light"
                        size="sm"
                        color="danger"
                        onPress={() => onDeleteModifier(group.id, modifier.id)}
                        aria-label="Eliminar modificador"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </AtButton>
                    )}
                  </div>
                </div>

                {allTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {allTags.map((tag: Tag) => {
                      const isAssigned = modifierTagIds.has(tag.id);
                      return (
                        <AtChip
                          key={tag.id}
                          size="sm"
                          variant={isAssigned ? "solid" : "bordered"}
                          color={isAssigned ? "primary" : "default"}
                          className="cursor-pointer select-none"
                          onClick={() => handleToggleTag(modifier, tag)}
                        >
                          {tag.name}
                        </AtChip>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 text-sm italic text-gray-500">
          Sin modificadores configurados
        </div>
      )}
    </div>
  );
}
