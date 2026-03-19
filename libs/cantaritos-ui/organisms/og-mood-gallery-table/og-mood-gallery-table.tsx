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
import { ImageIcon, Pencil, Trash2 } from "lucide-react";

import { AtChip } from "@/libs/cantaritos-ui/atoms";
import { MoodGallery } from "@/domain/types";

import { OgMoodGalleryTableProps } from "./og-mood-gallery-table.types";

export function OgMoodGalleryTable({
  items,
  onEdit,
  onDelete,
  isLoading = false,
}: OgMoodGalleryTableProps) {
  return (
    <Table aria-label="Tabla de mood gallery" shadow="sm">
      <TableHeader>
        <TableColumn>Imagen</TableColumn>
        <TableColumn>Alt (ES)</TableColumn>
        <TableColumn>Alt (EN)</TableColumn>
        <TableColumn>Sección</TableColumn>
        <TableColumn>Orden</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn width={120}>Acciones</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando galería..." />}
        emptyContent="No se encontraron imágenes."
      >
        {items.map((item: MoodGallery) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.altEs}
                    className="h-12 w-12 rounded-lg object-cover"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                {item.title && (
                  <span className="font-medium text-sm">{item.title}</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-gray-600 line-clamp-2">{item.altEs}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm text-gray-600 line-clamp-2">{item.altEn}</span>
            </TableCell>
            <TableCell>
              <AtChip size="sm" variant="flat">
                {item.section}
              </AtChip>
            </TableCell>
            <TableCell>{item.order}</TableCell>
            <TableCell>
              <AtChip
                size="sm"
                variant="flat"
                color={item.isActive ? "success" : "default"}
              >
                {item.isActive ? "Activo" : "Inactivo"}
              </AtChip>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => onEdit(item)}
                  aria-label="Editar imagen"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {onDelete && (
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(item)}
                    aria-label="Eliminar imagen"
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
