"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CheckCircle,
  Clock,
  Plus,
  Tag,
  Users,
} from "lucide-react";

import {
  AtButton,
  MlSearchBar,
  MlStatCard,
  OgCouponTable,
} from "@/libs/cantaritos-ui";
import { useCoupons } from "@/domain/hooks/coupons";
import { Coupon } from "@/domain/types";

export default function CouponsPage() {
  const router = useRouter();
  const { data: coupons = [], isLoading } = useCoupons();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const filteredCoupons = useMemo(() => {
    let result = coupons;

    if (typeFilter !== "ALL") {
      result = result.filter(
        (coupon: Coupon) => coupon.type === typeFilter,
      );
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((coupon: Coupon) =>
        coupon.name.toLowerCase().includes(term),
      );
    }

    return result;
  }, [coupons, search, typeFilter]);

  const stats = useMemo(() => {
    const total = coupons.length;
    const now = new Date();
    const active = coupons.filter(
      (coupon: Coupon) =>
        coupon.isActive &&
        new Date(coupon.expiresAt) > now &&
        coupon.usedQuantity < coupon.totalQuantity,
    ).length;
    const expired = coupons.filter(
      (coupon: Coupon) => new Date(coupon.expiresAt) < now,
    ).length;
    const totalUsages = coupons.reduce(
      (sum: number, coupon: Coupon) => sum + coupon.usedQuantity,
      0,
    );
    return { total, active, expired, totalUsages };
  }, [coupons]);

  const selectStyles = [
    "h-10 text-sm rounded-xl border border-gray-300",
    "bg-white px-3 text-gray-900 outline-none",
    "transition-colors focus:border-primary",
    "focus:ring-2 focus:ring-primary/20",
  ].join(" ");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cupones</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/coupons/new")}
        >
          Crear Cupón
        </AtButton>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <MlSearchBar
            placeholder="Buscar cupones por nombre..."
            value={search}
            onValueChange={setSearch}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className={selectStyles}
        >
          <option value="ALL">Todos los tipos</option>
          <option value="GLOBAL">Global</option>
          <option value="UNIQUE">Único</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<Tag className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activos"
          value={stats.active}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <MlStatCard
          title="Expirados"
          value={stats.expired}
          subtitleColor="warning"
          icon={<Clock className="h-6 w-6" />}
        />
        <MlStatCard
          title="Total de usos"
          value={stats.totalUsages}
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgCouponTable
        coupons={filteredCoupons}
        isLoading={isLoading}
        onEdit={(coupon) => router.push(`/admin/coupons/${coupon.id}`)}
      />
    </div>
  );
}
