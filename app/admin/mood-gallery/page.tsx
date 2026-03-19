"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle, ImageIcon, Plus, XCircle } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard } from "@/libs/cantaritos-ui";
import { OgMoodGalleryTable } from "@/libs/cantaritos-ui/organisms/og-mood-gallery-table";
import { useMoodGalleryItems, useDeleteMoodGallery } from "@/domain/hooks/mood-gallery";
import { MoodGallery } from "@/domain/types";

export default function MoodGalleryPage() {
  const router = useRouter();
  const { data: items = [], isLoading } = useMoodGalleryItems();
  const deleteMoodGallery = useDeleteMoodGallery();
  const [search, setSearch] = useState("");

  const handleDelete = (item: MoodGallery) => {
    const confirmed = window.confirm(
      `¿Eliminar la imagen "${item.title || item.altEs}"? Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteMoodGallery.mutate(item.id);
    }
  };

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const term = search.toLowerCase();
    return items.filter(
      (item: MoodGallery) =>
        item.title?.toLowerCase().includes(term) ||
        item.altEs.toLowerCase().includes(term) ||
        item.altEn.toLowerCase().includes(term) ||
        item.section.toLowerCase().includes(term),
    );
  }, [items, search]);

  const stats = useMemo(() => {
    const total = items.length;
    const active = items.filter((i: MoodGallery) => i.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [items]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mood Gallery</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/mood-gallery/new")}
        >
          Agregar Imagen
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar imágenes..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<ImageIcon className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activas"
          value={stats.active}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <MlStatCard
          title="Inactivas"
          value={stats.inactive}
          subtitleColor="danger"
          icon={<XCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgMoodGalleryTable
        items={filteredItems}
        isLoading={isLoading}
        onEdit={(item) => router.push(`/admin/mood-gallery/${item.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
