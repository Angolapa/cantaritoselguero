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
import { Package, Pencil, Trash2 } from "lucide-react";

import { AtChip } from "@/libs/cantaritos-ui/atoms";
import { Combo } from "@/domain/types";

import { OgComboTableProps } from "./og-combo-table.types";

function StatusChip({ isActive }: { isActive: boolean }) {
  return (
    <AtChip size="sm" variant="flat" color={isActive ? "success" : "default"}>
      {isActive ? "Activo" : "Inactivo"}
    </AtChip>
  );
}

export function OgComboTable({
  combos,
  onEdit,
  onDelete,
  isLoading = false,
}: OgComboTableProps) {
  return (
    <Table aria-label="Tabla de combos" shadow="sm">
      <TableHeader>
        <TableColumn>Combo</TableColumn>
        <TableColumn>Precio</TableColumn>
        <TableColumn>Productos</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn width={120}>Acciones</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando combos..." />}
        emptyContent="No se encontraron combos."
      >
        {combos.map((combo: Combo) => (
          <TableRow key={combo.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {combo.image ? (
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="h-10 w-10 rounded-lg object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <span className="font-medium">{combo.name}</span>
                  {combo.description && (
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {combo.description}
                    </p>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>${combo.price.toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {combo.items.map((item) => (
                  <AtChip key={item.productId} size="sm" variant="flat">
                    {item.productName} x{item.quantity}
                  </AtChip>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <StatusChip isActive={combo.isActive} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => onEdit(combo)}
                  aria-label="Editar combo"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {onDelete && (
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(combo)}
                    aria-label="Eliminar combo"
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
