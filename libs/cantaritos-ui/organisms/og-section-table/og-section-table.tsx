"use client";

import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";

import { AtChip } from "@/libs/cantaritos-ui/atoms";
import { Section } from "@/domain/types";

import { OgSectionTableProps } from "./og-section-table.types";

function StatusChip({ isActive }: { isActive: boolean }) {
  return (
    <AtChip size="sm" variant="flat" color={isActive ? "success" : "default"}>
      {isActive ? "Activo" : "Inactivo"}
    </AtChip>
  );
}

export function OgSectionTable({
  sections,
  onEdit,
  onDelete,
  isLoading = false,
}: OgSectionTableProps) {
  return (
    <Table aria-label="Tabla de secciones" shadow="sm">
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Slug</TableColumn>
        <TableColumn>Orden</TableColumn>
        <TableColumn>Items</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn width={120}>Acciones</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando secciones..." />}
        emptyContent="No se encontraron secciones."
      >
        {sections.map((section: Section) => (
          <TableRow key={section.id}>
            <TableCell>
              <span className="font-medium">{section.name}</span>
            </TableCell>
            <TableCell>
              <code className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                {section.slug}
              </code>
            </TableCell>
            <TableCell>{section.order}</TableCell>
            <TableCell>
              <AtChip size="sm" variant="flat">
                {section.items?.length ?? 0} items
              </AtChip>
            </TableCell>
            <TableCell>
              <StatusChip isActive={section.isActive} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => onEdit(section)}
                  aria-label="Editar sección"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {onDelete && (
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(section)}
                    aria-label="Eliminar sección"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
