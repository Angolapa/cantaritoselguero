"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangle, CheckCircle, Package, Plus,XCircle } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard, OgProductTable } from "@/libs/cantaritos-ui";
import { useProducts } from "@/domain/hooks/products";
import { Product } from "@/domain/types";

export default function ProductsPage() {
  const router = useRouter();
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const term = search.toLowerCase();
    return products.filter((p: Product) =>
      p.name.toLowerCase().includes(term),
    );
  }, [products, search]);

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p: Product) => p.isActive).length;
    const lowStock = products.filter(
      (p: Product) => p.stock !== undefined && p.stock > 0 && p.stock <= 10,
    ).length;
    const noStock = products.filter(
      (p: Product) => p.stock === 0,
    ).length;
    return { total, active, lowStock, noStock };
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catalogo de Productos</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/products/new")}
        >
          Crear Producto
        </AtButton>
      </div>

      {/* Search */}
      <MlSearchBar
        placeholder="Buscar productos..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<Package className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activos"
          value={stats.active}
          subtitle={`${stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% del total`}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <MlStatCard
          title="Stock Bajo"
          value={stats.lowStock}
          subtitle="Menos de 10 unidades"
          subtitleColor="warning"
          icon={<AlertTriangle className="h-6 w-6" />}
        />
        <MlStatCard
          title="Sin Stock"
          value={stats.noStock}
          subtitle="0 unidades"
          subtitleColor="danger"
          icon={<XCircle className="h-6 w-6" />}
        />
      </div>

      {/* Table */}
      <OgProductTable
        products={filteredProducts}
        isLoading={isLoading}
        onEdit={(product) => router.push(`/admin/products/${product.id}`)}
      />
    </div>
  );
}
