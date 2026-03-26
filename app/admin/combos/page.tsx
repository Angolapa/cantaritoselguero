"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle, Layers, Plus } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard } from "@/libs/cantaritos-ui";
import { OgComboTable } from "@/libs/cantaritos-ui/organisms/og-combo-table";
import { useCombos, useDeleteCombo } from "@/domain/hooks/combos";
import { Combo } from "@/domain/types";

export default function CombosPage() {
  const router = useRouter();
  const { data: combos = [], isLoading } = useCombos();
  const deleteCombo = useDeleteCombo();
  const [search, setSearch] = useState("");

  const handleDelete = (combo: Combo) => {
    const confirmed = window.confirm(
      `¿Eliminar "${combo.name}"? Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteCombo.mutate(combo.id);
    }
  };

  const filteredCombos = useMemo(() => {
    if (!search.trim()) return combos;
    const term = search.toLowerCase();
    return combos.filter((combo: Combo) =>
      combo.name.toLowerCase().includes(term),
    );
  }, [combos, search]);

  const stats = useMemo(() => {
    const total = combos.length;
    const active = combos.filter((combo: Combo) => combo.isActive).length;
    return { total, active };
  }, [combos]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Combos</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/combos/new")}
        >
          Crear Combo
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar combos..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<Layers className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activos"
          value={stats.active}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgComboTable
        combos={filteredCombos}
        isLoading={isLoading}
        onEdit={(combo) => router.push(`/admin/combos/${combo.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
