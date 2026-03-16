"use client";

import { useState } from "react";

import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChevronDown, Pencil } from "lucide-react";

import { AtChip } from "@/libs/cantaritos-ui/atoms";
import { Coupon } from "@/domain/types";

import { OgCouponTableProps } from "./og-coupon-table.types";

function TypeChip({ type }: { type: Coupon["type"] }) {
  return (
    <AtChip size="sm" variant="flat" color={type === "GLOBAL" ? "primary" : "secondary"}>
      {type}
    </AtChip>
  );
}

function StatusChip({ coupon }: { coupon: Coupon }) {
  if (!coupon.isActive) {
    return (
      <AtChip size="sm" variant="flat" color="default">
        Inactivo
      </AtChip>
    );
  }

  const now = new Date();
  if (new Date(coupon.expiresAt) < now) {
    return (
      <AtChip size="sm" variant="flat" color="warning">
        Expirado
      </AtChip>
    );
  }

  if (coupon.usedQuantity >= coupon.totalQuantity) {
    return (
      <AtChip size="sm" variant="flat" color="warning">
        Agotado
      </AtChip>
    );
  }

  return (
    <AtChip size="sm" variant="flat" color="success">
      Activo
    </AtChip>
  );
}

function UsagePanel({ coupon }: { coupon: Coupon }) {
  if (coupon.usages.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-gray-400">
        Este cupón aún no ha sido utilizado.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {coupon.usages.map((usage, index) => (
        <div
          key={usage.id}
          className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">#{index + 1}</span>
            <span className="text-xs text-gray-500">
              {new Date(usage.usedAt).toLocaleString("es-MX", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Usuario:</span>
            <span className="font-mono text-xs text-gray-700">{usage.userId.slice(0, 8)}...</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Orden:</span>
            <span className="font-mono text-xs text-gray-700">{usage.orderId.slice(0, 8)}...</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OgCouponTable({
  coupons,
  onEdit,
  isLoading = false,
}: OgCouponTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Table aria-label="Tabla de cupones" shadow="sm">
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Descuento</TableColumn>
        <TableColumn>Desc. Máximo</TableColumn>
        <TableColumn>Usos</TableColumn>
        <TableColumn>Expiración</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn width={120}>Acciones</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando cupones..." />}
        emptyContent="No se encontraron cupones."
      >
        {coupons.flatMap((coupon: Coupon) => {
          const isExpanded = expandedId === coupon.id;
          const rows = [
            <TableRow key={coupon.id} className="cursor-pointer">
              <TableCell>
                <span className="font-medium">{coupon.name}</span>
              </TableCell>
              <TableCell>
                <TypeChip type={coupon.type} />
              </TableCell>
              <TableCell>{coupon.discountPercent}%</TableCell>
              <TableCell>${coupon.maxDiscount.toFixed(2)}</TableCell>
              <TableCell>
                {coupon.usedQuantity} / {coupon.totalQuantity}
              </TableCell>
              <TableCell>
                {new Date(coupon.expiresAt).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <StatusChip coupon={coupon} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <button
                    className={`inline-flex items-center justify-center p-1.5 rounded-lg transition-colors ${
                      isExpanded
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleExpand(coupon.id)}
                    aria-label="Ver usos del cupón"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  <button
                    className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => onEdit(coupon)}
                    aria-label="Editar cupón"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>,
          ];

          if (isExpanded) {
            rows.push(
              <TableRow key={`${coupon.id}-usage`} className="bg-gray-50">
                <TableCell colSpan={8}>
                  <div className="py-2">
                    <p className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Historial de usos — {coupon.name}
                    </p>
                    <UsagePanel coupon={coupon} />
                  </div>
                </TableCell>
              </TableRow>,
            );
          }

          return rows;
        })}
      </TableBody>
    </Table>
  );
}
