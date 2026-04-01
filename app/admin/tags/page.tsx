"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle, Plus, Tag as TagIcon } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard } from "@/libs/cantaritos-ui";
import { OgTagTable } from "@/libs/cantaritos-ui/organisms/og-tag-table";
import { useDeleteTag, useTags } from "@/domain/hooks/tags";
import { Tag } from "@/domain/types";

export default function TagsPage() {
  const router = useRouter();
  const { data: tags = [], isLoading } = useTags();
  const deleteTag = useDeleteTag();
  const [search, setSearch] = useState("");

  const handleDelete = (tag: Tag) => {
    const confirmed = window.confirm(
      `¿Eliminar "${tag.name}"? Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteTag.mutate(tag.id);
    }
  };

  const filteredTags = useMemo(() => {
    if (!search.trim()) return tags;
    const term = search.toLowerCase();
    return tags.filter((tag: Tag) =>
      tag.name.toLowerCase().includes(term),
    );
  }, [tags, search]);

  const stats = useMemo(() => {
    const total = tags.length;
    const active = tags.filter((tag: Tag) => tag.isActive).length;
    return { total, active };
  }, [tags]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Etiquetas</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/tags/new")}
        >
          Crear Etiqueta
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar etiquetas..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<TagIcon className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activas"
          value={stats.active}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgTagTable
        tags={filteredTags}
        isLoading={isLoading}
        onEdit={(tag) => router.push(`/admin/tags/${tag.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
