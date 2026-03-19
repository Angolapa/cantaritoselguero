"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

import { AtChip } from "@/libs/cantaritos-ui/atoms";

import { OgCouponUsageModalProps } from "./og-coupon-usage-modal.types";

export function OgCouponUsageModal({
  coupon,
  isOpen,
  onClose,
}: OgCouponUsageModalProps) {
  if (!coupon) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <span>Usos del cupón: {coupon.name}</span>
          <div className="flex items-center gap-2 text-sm font-normal text-gray-500">
            <AtChip size="sm" variant="flat" color={coupon.type === "GLOBAL" ? "primary" : "secondary"}>
              {coupon.type}
            </AtChip>
            <span>
              {coupon.usedQuantity} / {coupon.totalQuantity} usos
            </span>
          </div>
        </ModalHeader>
        <ModalBody className="pb-6">
          {coupon.usages.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              Este cupón aún no ha sido utilizado.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coupon.usages.map((usage, index) => (
                <div
                  key={usage.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex flex-col gap-2"
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
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Usuario:</span>
                      <span className="font-mono text-xs text-gray-700">{usage.userId.slice(0, 8)}...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Orden:</span>
                      <span className="font-mono text-xs text-gray-700">{usage.orderId.slice(0, 8)}...</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
