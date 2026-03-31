"use client";

import { useState } from "react";

import { Check, ChevronDown, ChevronUp, Lock, Pencil, Save, Trash2, Unlock, Unlink } from "lucide-react";

import { AtButton, AtChip, AtInput } from "@/libs/cantaritos-ui/atoms";
import {
  useAssignModifierTags,
  useRemoveModifierTag,
  useUpdateModifier,
  useUpdateModifierSizePrices,
} from "@/domain/hooks/products";
import { useTags } from "@/domain/hooks/tags";
import { Modifier, ModifierSizePrice, Tag } from "@/domain/types";

import { MlModifierGroupCardProps } from "./ml-modifier-group-card.types";

export function MlModifierGroupCard({
  productId,
  group,
  sizes,
  onEdit,
  onRemove,
  onDeleteModifier,
}: MlModifierGroupCardProps) {
  const selectType = group.maxSelect === 1 ? "Seleccion unica" : "Multi-seleccion";
  const requiredLabel = group.isRequired ? "Requerido" : "Opcional";

  const { data: allTags = [] } = useTags();
  const assignTags = useAssignModifierTags();
  const removeTag = useRemoveModifierTag();
  const updateModifier = useUpdateModifier();
  const updateSizePrices = useUpdateModifierSizePrices();

  const [expandedModifierId, setExpandedModifierId] = useState<string | null>(null);
  const [sizePriceInputs, setSizePriceInputs] = useState<Record<string, string>>({});
  const [enabledSizes, setEnabledSizes] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleToggleSizePrices = (modifier: Modifier) => {
    if (expandedModifierId === modifier.id) {
      setExpandedModifierId(null);
      setSizePriceInputs({});
      setEnabledSizes({});
      setSavedSuccess(false);
      return;
    }

    setExpandedModifierId(modifier.id);
    setSavedSuccess(false);

    const inputs: Record<string, string> = {};
    const enabled: Record<string, boolean> = {};
    for (const size of sizes) {
      const existing = modifier.sizePrices?.find(
        (sizePrice) => sizePrice.productSizeId === size.id,
      );
      if (existing) {
        inputs[size.id] = existing.priceAdjustment.toString();
        enabled[size.id] = true;
      } else {
        inputs[size.id] = modifier.priceAdjustment.toString();
        enabled[size.id] = false;
      }
    }
    setSizePriceInputs(inputs);
    setEnabledSizes(enabled);
  };

  const handleToggleSizeEnabled = (sizeId: string, modifier: Modifier) => {
    const wasEnabled = enabledSizes[sizeId] ?? false;

    if (!wasEnabled) {
      const existing = modifier.sizePrices?.find(
        (sizePrice) => sizePrice.productSizeId === sizeId,
      );
      setSizePriceInputs((prevInputs) => ({
        ...prevInputs,
        [sizeId]: existing
          ? existing.priceAdjustment.toString()
          : modifier.priceAdjustment.toString(),
      }));
    }

    setEnabledSizes((prev) => ({ ...prev, [sizeId]: !wasEnabled }));
    setSavedSuccess(false);
  };

  const handleToggleSizeRestricted = (modifier: Modifier) => {
    updateModifier.mutate({
      productId,
      groupId: group.id,
      id: modifier.id,
      data: { sizeRestricted: !modifier.sizeRestricted },
    });
  };

  const handleSaveSizePrices = (modifierId: string) => {
    const sizePrices: ModifierSizePrice[] = [];

    for (const size of sizes) {
      if (!enabledSizes[size.id]) continue;
      const value = sizePriceInputs[size.id]?.trim();
      if (value !== "" && value !== undefined) {
        const parsed = parseFloat(value);
        if (Number.isFinite(parsed)) {
          sizePrices.push({ productSizeId: size.id, priceAdjustment: parsed });
        }
      }
    }

    if (sizePrices.length === 0) return;

    updateSizePrices.mutate(
      {
        productId,
        groupId: group.id,
        modifierId,
        data: { sizePrices },
      },
      {
        onSuccess: () => {
          setSavedSuccess(true);
        },
      },
    );
  };

  const enabledCount = Object.values(enabledSizes).filter(Boolean).length;

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
            const isExpanded = expandedModifierId === modifier.id;
            const hasSizePrices = (modifier.sizePrices ?? []).length > 0;

            return (
              <div key={modifier.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{modifier.name}</span>
                    {modifier.sizeRestricted && (
                      <AtChip size="sm" variant="flat" color="warning">
                        Restringido
                      </AtChip>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {modifier.priceAdjustment > 0
                        ? `+$${modifier.priceAdjustment.toFixed(2)}`
                        : modifier.priceAdjustment < 0
                          ? `-$${Math.abs(modifier.priceAdjustment).toFixed(2)}`
                          : ""}
                    </span>
                    {sizes.length > 0 && (
                      <AtButton
                        isIconOnly
                        variant="light"
                        size="sm"
                        color={hasSizePrices ? "primary" : "default"}
                        onPress={() => handleToggleSizePrices(modifier)}
                        aria-label="Precios por tamano"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </AtButton>
                    )}
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

                {/* Size prices section */}
                {isExpanded && sizes.length > 0 && (
                  <div className="ml-2 rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Marca los tamanos y asigna un precio por cada uno
                      </span>
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          modifier.sizeRestricted
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                        onClick={() => handleToggleSizeRestricted(modifier)}
                        disabled={updateModifier.isPending}
                      >
                        {modifier.sizeRestricted ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          <Unlock className="h-3 w-3" />
                        )}
                        {modifier.sizeRestricted
                          ? "Restringido a marcados"
                          : "Disponible en todos"}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {sizes.map((size) => {
                        const isEnabled = enabledSizes[size.id] ?? false;
                        return (
                          <div key={size.id} className="space-y-1">
                            <button
                              type="button"
                              onClick={() => handleToggleSizeEnabled(size.id, modifier)}
                              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                                isEnabled
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              <div
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                                  isEnabled
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {isEnabled && (
                                  <Check className="h-2.5 w-2.5 text-white" />
                                )}
                              </div>
                              {size.name}
                            </button>
                            <AtInput
                              size="sm"
                              type="number"
                              step="0.01"
                              placeholder="Precio"
                              startContent={
                                <span className="text-sm text-gray-400">$</span>
                              }
                              value={isEnabled ? (sizePriceInputs[size.id] ?? "") : ""}
                              onValueChange={(inputValue) => {
                                setSizePriceInputs((prev) => ({
                                  ...prev,
                                  [size.id]: inputValue,
                                }));
                                setSavedSuccess(false);
                              }}
                              isDisabled={!isEnabled || updateSizePrices.isPending}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {enabledCount} de {sizes.length} tamanos seleccionados
                      </span>
                      <div className="flex items-center gap-2">
                        {savedSuccess && (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <Check className="h-3 w-3" />
                            Guardado
                          </span>
                        )}
                        <AtButton
                          size="sm"
                          variant="light"
                          onPress={() => handleToggleSizePrices(modifier)}
                          isDisabled={updateSizePrices.isPending}
                        >
                          Cancelar
                        </AtButton>
                        <AtButton
                          size="sm"
                          color="primary"
                          startContent={<Save className="h-3.5 w-3.5" />}
                          onPress={() => handleSaveSizePrices(modifier.id)}
                          isLoading={updateSizePrices.isPending}
                          isDisabled={enabledCount === 0}
                        >
                          Guardar precios
                        </AtButton>
                      </div>
                    </div>
                  </div>
                )}

                {/* Existing size prices display (when collapsed) */}
                {!isExpanded && hasSizePrices && (
                  <div className="flex flex-wrap gap-1 ml-2">
                    {modifier.sizePrices!.map((sizePrice) => {
                      const matchingSize = sizes.find(
                        (size) => size.id === sizePrice.productSizeId,
                      );
                      return (
                        <AtChip
                          key={sizePrice.productSizeId}
                          size="sm"
                          variant="flat"
                          color="secondary"
                        >
                          {matchingSize?.name ?? "?"}: ${sizePrice.priceAdjustment.toFixed(2)}
                        </AtChip>
                      );
                    })}
                  </div>
                )}

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
