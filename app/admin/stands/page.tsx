"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CheckCircle, MapPin, Plus, StoreIcon } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard } from "@/libs/cantaritos-ui";
import { useDeleteStand, useStands } from "@/domain/hooks/stands";
import { Stand } from "@/domain/types";

export default function StandsPage() {
  const router = useRouter();
  const { data: stands = [], isLoading } = useStands();
  const deleteStand = useDeleteStand();
  const [search, setSearch] = useState("");

  const handleDelete = (stand: Stand) => {
    const confirmed = window.confirm(
      `¿Eliminar "${stand.name}"? Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteStand.mutate(stand.id);
    }
  };

  const filteredStands = useMemo(() => {
    if (!search.trim()) return stands;
    const term = search.toLowerCase();
    return stands.filter(
      (stand: Stand) =>
        stand.name.toLowerCase().includes(term) ||
        stand.description?.toLowerCase().includes(term),
    );
  }, [stands, search]);

  const stats = useMemo(() => {
    const total = stands.length;
    const active = stands.filter((stand: Stand) => stand.isActive).length;
    return { total, active };
  }, [stands]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stands</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/stands/new")}
        >
          Crear Stand
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar stands..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<StoreIcon className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activos"
          value={stats.active}
          subtitle={`${stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% del total`}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          isStriped
          removeWrapper
          className="min-w-225"
          classNames={{
            wrapper: "shadow-md rounded-lg",
          }}
        >
          <TableHeader>
            <TableColumn className="min-w-55">Nombre</TableColumn>
            <TableColumn className="min-w-70">Descripción</TableColumn>
            <TableColumn className="min-w-55">Ubicación</TableColumn>
            <TableColumn>Operadores</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn className="text-right">Acciones</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent="No hay stands registrados"
          >
            {filteredStands.map((stand: Stand) => (
              <TableRow key={stand.id}>
                <TableCell className="font-medium whitespace-normal wrap-break-word">
                  {stand.name}
                </TableCell>
                <TableCell className="whitespace-normal wrap-break-word text-gray-700">
                  {stand.description || "-"}
                </TableCell>
                <TableCell className="whitespace-normal wrap-break-word">
                  {stand.location ? (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                      <span>{stand.location}</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{stand.operators?.length || 0}</TableCell>
                <TableCell>
                  {stand.isActive ? (
                    <span className="text-green-600 font-medium">Activo</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactivo</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() =>
                        router.push(`/admin/stands/${stand.id}`)
                      }
                    >
                      ✏️
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-red-600 hover:bg-red-50"
                      onPress={() => handleDelete(stand)}
                    >
                      🗑️
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
