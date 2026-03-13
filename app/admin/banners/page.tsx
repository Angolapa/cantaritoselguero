"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle, ImageIcon, Plus, XCircle } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard, OgBannerTable } from "@/libs/cantaritos-ui";
import { useBanners, useDeleteBanner } from "@/domain/hooks/banners";
import { Banner } from "@/domain/types";

export default function BannersPage() {
  const router = useRouter();
  const { data: banners = [], isLoading } = useBanners();
  const deleteBanner = useDeleteBanner();
  const [search, setSearch] = useState("");

  const handleDelete = (banner: Banner) => {
    const confirmed = window.confirm(
      `¿Eliminar el banner "${banner.title || banner.altText}"? Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteBanner.mutate(banner.id);
    }
  };

  const filteredBanners = useMemo(() => {
    if (!search.trim()) return banners;
    const term = search.toLowerCase();
    return banners.filter(
      (banner: Banner) =>
        (banner.title?.toLowerCase().includes(term)) ||
        banner.altText.toLowerCase().includes(term) ||
        banner.section.toLowerCase().includes(term),
    );
  }, [banners, search]);

  const stats = useMemo(() => {
    const total = banners.length;
    const active = banners.filter((b: Banner) => b.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [banners]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Banners</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/banners/new")}
        >
          Crear Banner
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar banners..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<ImageIcon className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activos"
          value={stats.active}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <MlStatCard
          title="Inactivos"
          value={stats.inactive}
          subtitleColor="danger"
          icon={<XCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgBannerTable
        banners={filteredBanners}
        isLoading={isLoading}
        onEdit={(banner) => router.push(`/admin/banners/${banner.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
