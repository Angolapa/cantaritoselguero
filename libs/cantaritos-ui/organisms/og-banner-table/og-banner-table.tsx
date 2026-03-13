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
import { Banner } from "@/domain/types";

import { OgBannerTableProps } from "./og-banner-table.types";

function StatusChip({ banner }: { banner: Banner }) {
  if (!banner.isActive) {
    return (
      <AtChip size="sm" variant="flat" color="default">
        Inactivo
      </AtChip>
    );
  }

  const now = new Date();
  if (banner.startDate && new Date(banner.startDate) > now) {
    return (
      <AtChip size="sm" variant="flat" color="warning">
        Programado
      </AtChip>
    );
  }
  if (banner.endDate && new Date(banner.endDate) < now) {
    return (
      <AtChip size="sm" variant="flat" color="default">
        Expirado
      </AtChip>
    );
  }

  return (
    <AtChip size="sm" variant="flat" color="success">
      Activo
    </AtChip>
  );
}

export function OgBannerTable({
  banners,
  onEdit,
  onDelete,
  isLoading = false,
}: OgBannerTableProps) {
  return (
    <Table aria-label="Tabla de banners" shadow="sm">
      <TableHeader>
        <TableColumn>Banner</TableColumn>
        <TableColumn>Sección</TableColumn>
        <TableColumn>Orden</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn width={120}>Acciones</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando banners..." />}
        emptyContent="No se encontraron banners."
      >
        {banners.map((banner: Banner) => (
          <TableRow key={banner.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {banner.imageUrl ? (
                  <img
                    src={banner.imageUrl}
                    alt={banner.altText}
                    className="h-10 w-20 rounded-lg object-cover"
                    width={80}
                    height={40}
                  />
                ) : (
                  <div className="flex h-10 w-20 items-center justify-center rounded-lg bg-gray-100">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <span className="font-medium">
                    {banner.title || banner.altText}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <AtChip size="sm" variant="flat">
                {banner.section}
              </AtChip>
            </TableCell>
            <TableCell>{banner.order}</TableCell>
            <TableCell>
              <StatusChip banner={banner} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => onEdit(banner)}
                  aria-label="Editar banner"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {onDelete && (
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(banner)}
                    aria-label="Eliminar banner"
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
