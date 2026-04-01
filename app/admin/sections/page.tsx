"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle, LayoutList, Plus } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard } from "@/libs/cantaritos-ui";
import { OgSectionTable } from "@/libs/cantaritos-ui/organisms/og-section-table";
import { useDeleteSection, useSections } from "@/domain/hooks/sections";
import { Section } from "@/domain/types";

export default function SectionsPage() {
  const router = useRouter();
  const { data: sections = [], isLoading } = useSections();
  const deleteSection = useDeleteSection();
  const [search, setSearch] = useState("");

  const handleDelete = (section: Section) => {
    const confirmed = window.confirm(
      `¿Eliminar la sección "${section.name}"? Los items asociados se desvinculan. Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteSection.mutate(section.id);
    }
  };

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const term = search.toLowerCase();
    return sections.filter((section: Section) =>
      section.name.toLowerCase().includes(term),
    );
  }, [sections, search]);

  const stats = useMemo(() => {
    const total = sections.length;
    const active = sections.filter((section: Section) => section.isActive).length;
    return { total, active };
  }, [sections]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Secciones</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/sections/new")}
        >
          Crear Sección
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar secciones..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<LayoutList className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activas"
          value={stats.active}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgSectionTable
        sections={filteredSections}
        isLoading={isLoading}
        onEdit={(section) => router.push(`/admin/sections/${section.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
