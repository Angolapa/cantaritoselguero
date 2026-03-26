"use client";

import { Card, CardBody } from "@heroui/react";
import { Tag as TagIcon } from "lucide-react";

import { AtChip } from "@/libs/cantaritos-ui/atoms";
import { useAssignProductTags, useRemoveProductTag } from "@/domain/hooks/products";
import { useTags } from "@/domain/hooks/tags";
import { Tag } from "@/domain/types";

import { OgProductTagsSectionProps } from "./og-product-tags-section.types";

export function OgProductTagsSection({
  productId,
  currentTags,
}: OgProductTagsSectionProps) {
  const { data: allTags = [] } = useTags();
  const assignTags = useAssignProductTags();
  const removeTag = useRemoveProductTag();

  const assignedTagIds = new Set(currentTags.map((tag) => tag.id));
  const isMutating = assignTags.isPending || removeTag.isPending;

  const handleToggleTag = (tag: Tag) => {
    if (isMutating) return;

    if (assignedTagIds.has(tag.id)) {
      removeTag.mutate({ productId, tagId: tag.id });
    } else {
      assignTags.mutate({ productId, tagIds: [tag.id] });
    }
  };

  return (
    <Card shadow="sm">
      <CardBody className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Etiquetas</h2>
        </div>

        {allTags.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No hay etiquetas. Créalas en Admin &rsaquo; Etiquetas.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag: Tag) => {
              const isAssigned = assignedTagIds.has(tag.id);
              return (
                <AtChip
                  key={tag.id}
                  variant={isAssigned ? "solid" : "bordered"}
                  color={isAssigned ? "primary" : "default"}
                  className="cursor-pointer select-none"
                  onClick={() => handleToggleTag(tag)}
                >
                  {tag.name}
                </AtChip>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
