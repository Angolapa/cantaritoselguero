"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  MlAvailabilityCard,
  OgCouponForm,
} from "@/libs/cantaritos-ui";
import { CouponFormValues } from "@/libs/cantaritos-ui/organisms/og-coupon-form";
import { useCoupon, useUpdateCoupon } from "@/domain/hooks/coupons";

function toLocalDatetime(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export default function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: coupon, isLoading: isLoadingCoupon } = useCoupon(id);
  const updateCoupon = useUpdateCoupon();

  const [isActiveOverride, setIsActiveOverride] = useState<boolean | null>(null);
  const isActive = isActiveOverride ?? coupon?.isActive ?? true;

  const isSaving = updateCoupon.isPending;

  const handleSubmit = (values: CouponFormValues) => {
    if (!values.nameEs.trim()) return;

    updateCoupon.mutate(
      {
        id,
        data: {
          nameEs: values.nameEs.trim(),
          nameEn: values.nameEn.trim() || undefined,
          discountPercent: Number(values.discountPercent),
          maxDiscount: Number(values.maxDiscount),
          totalQuantity: Number(values.totalQuantity),
          expiresAt: values.expiresAt
            ? new Date(values.expiresAt).toISOString()
            : undefined,
          isActive,
        },
      },
      {
        onSuccess: () => router.push("/admin/coupons"),
      },
    );
  };

  if (isLoadingCoupon) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner label="Cargando cupón..." />
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Cupón no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AtButton
            as={Link}
            href="/admin/coupons"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/coupons" className="hover:text-primary">
                Cupones
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Editar</span>
            </nav>
            <h1 className="text-xl font-bold">{coupon.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AtButton
            variant="bordered"
            onPress={() => router.push("/admin/coupons")}
          >
            Cancelar
          </AtButton>
          <AtButton
            color="primary"
            type="submit"
            form="coupon-form"
            isLoading={isSaving}
          >
            Guardar Cambios
          </AtButton>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgCouponForm
            defaultValues={{
              type: coupon.type,
              nameEs: coupon.nameEs,
              nameEn: coupon.nameEn ?? "",
              discountPercent: String(coupon.discountPercent),
              maxDiscount: String(coupon.maxDiscount),
              totalQuantity: String(coupon.totalQuantity),
              expiresAt: toLocalDatetime(coupon.expiresAt),
            }}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isEdit
          />
        </div>
        <div className="space-y-6">
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActiveOverride}
          />
          {/* Usage summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-2">
            <h3 className="font-semibold text-sm">Resumen de uso</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Usos realizados</span>
              <span className="font-medium">{coupon.usedQuantity} / {coupon.totalQuantity}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min((coupon.usedQuantity / coupon.totalQuantity) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {updateCoupon.error && (
        <p className="text-sm text-red-500">
          {updateCoupon.error?.message || "Error al actualizar cupón"}
        </p>
      )}
    </div>
  );
}
