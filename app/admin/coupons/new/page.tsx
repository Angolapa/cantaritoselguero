"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import {
  AtButton,
  MlAvailabilityCard,
  OgCouponForm,
} from "@/libs/cantaritos-ui";
import { CouponFormValues } from "@/libs/cantaritos-ui/organisms/og-coupon-form";
import { useCreateCoupon } from "@/domain/hooks/coupons";

export default function NewCouponPage() {
  const router = useRouter();
  const createCoupon = useCreateCoupon();

  const [isActive, setIsActive] = useState(true);

  const isLoading = createCoupon.isPending;

  const handleSubmit = (values: CouponFormValues) => {
    if (!values.nameEs.trim()) return;
    if (!values.discountPercent || 
      !values.maxDiscount || !values.totalQuantity || !values.expiresAt) return;

    createCoupon.mutate(
      {
        type: values.type as "GLOBAL" | "UNIQUE",
        nameEs: values.nameEs.trim(),
        nameEn: values.nameEn.trim() || undefined,
        discountPercent: Number(values.discountPercent),
        maxDiscount: Number(values.maxDiscount),
        totalQuantity: Number(values.totalQuantity),
        expiresAt: new Date(values.expiresAt).toISOString(),
        isActive,
      },
      {
        onSuccess: () => router.push("/admin/coupons"),
      },
    );
  };

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
              <span className="text-gray-400">Nuevo Cupón</span>
            </nav>
            <h1 className="text-xl font-bold">Crear Cupón</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="coupon-form"
          isLoading={isLoading}
        >
          Guardar
        </AtButton>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OgCouponForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <MlAvailabilityCard
            isActive={isActive}
            onActiveChange={setIsActive}
          />
        </div>
      </div>

      {/* Error */}
      {createCoupon.error && (
        <p className="text-sm text-red-500">
          {createCoupon.error?.message || "Error al crear cupón"}
        </p>
      )}
    </div>
  );
}
