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
import { Tag } from "@/domain/types";

import { OgTagTableProps } from "./og-tag-table.types";

function StatusChip({ isActive }: { isActive: boolean }) {
  return (
    <AtChip size="sm" variant="flat" color={isActive ? "success" : "default"}>
      {isActive ? "Activo" : "Inactivo"}
    </AtChip>
  );
}

export function OgTagTable({
  tags,
  onEdit,
  onDelete,
  isLoading = false,
}: OgTagTableProps) {
  return (
    <Table aria-label="Tabla de etiquetas" shadow="sm">
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn width={120}>Acciones</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando etiquetas..." />}
        emptyContent="No se encontraron etiquetas."
      >
        {tags.map((tag: Tag) => (
          <TableRow key={tag.id}>
            <TableCell>
              <span className="font-medium">{tag.name}</span>
            </TableCell>
            <TableCell>
              <StatusChip isActive={tag.isActive} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => onEdit(tag)}
                  aria-label="Editar etiqueta"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {onDelete && (
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(tag)}
                    aria-label="Eliminar etiqueta"
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
