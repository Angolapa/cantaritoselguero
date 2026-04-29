"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Building2, CheckCircle, ImageIcon, Plus } from "lucide-react";

import { AtButton, MlSearchBar, MlStatCard } from "@/libs/cantaritos-ui";
import {
  useAgencyCards,
  useDeleteAgencyCard,
} from "@/domain/hooks/agency-cards";
import { AgencyCard } from "@/domain/types";

export default function AgencyCardsPage() {
  const router = useRouter();
  const { data: agencyCards = [], isLoading } = useAgencyCards();
  const deleteAgencyCard = useDeleteAgencyCard();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (card: AgencyCard) => {
    const confirmed = window.confirm(
      `¿Eliminar "${card.title}"? Esta acción no es reversible.`,
    );
    if (confirmed) {
      deleteAgencyCard.mutate(card.id);
    }
  };

  const filteredCards = useMemo(() => {
    if (!searchTerm.trim()) return agencyCards;
    const term = searchTerm.toLowerCase();
    return agencyCards.filter(
      (card: AgencyCard) =>
        card.title.toLowerCase().includes(term) ||
        card.location.toLowerCase().includes(term) ||
        card.lodgingType.toLowerCase().includes(term) ||
        card.socialHandle?.toLowerCase().includes(term),
    );
  }, [agencyCards, searchTerm]);

  const stats = useMemo(() => {
    const total = agencyCards.length;
    const active = agencyCards.filter((card: AgencyCard) => card.isActive).length;
    return { total, active };
  }, [agencyCards]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agencias</h1>
        <AtButton
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={() => router.push("/admin/agency-cards/new")}
        >
          Crear Agencia
        </AtButton>
      </div>

      <MlSearchBar
        placeholder="Buscar agencias..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MlStatCard
          title="Total"
          value={stats.total}
          icon={<Building2 className="h-6 w-6" />}
        />
        <MlStatCard
          title="Activas"
          value={stats.active}
          subtitle={`${stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% del total`}
          subtitleColor="success"
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      <div className="overflow-x-auto">
        <Table
          isStriped
          removeWrapper
          className="min-w-225"
          classNames={{ wrapper: "shadow-md rounded-lg" }}
        >
          <TableHeader>
            <TableColumn>Imagen</TableColumn>
            <TableColumn className="min-w-55">Nombre</TableColumn>
            <TableColumn className="min-w-45">Ubicación</TableColumn>
            <TableColumn className="min-w-45">Tipo de Hospedaje</TableColumn>
            <TableColumn>Orden</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn className="text-right">Acciones</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent="No hay agencias registradas"
          >
            {filteredCards.map((card: AgencyCard) => (
              <TableRow key={card.id}>
                <TableCell>
                  <div className="h-10 w-14 overflow-hidden rounded bg-gray-200">
                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium whitespace-normal wrap-break-word">
                  {card.title}
                </TableCell>
                <TableCell className="whitespace-normal wrap-break-word">
                  {card.location}
                </TableCell>
                <TableCell className="whitespace-normal wrap-break-word">
                  {card.lodgingType}
                </TableCell>
                <TableCell>{card.order}</TableCell>
                <TableCell>
                  {card.isActive ? (
                    <span className="font-medium text-green-600">Activa</span>
                  ) : (
                    <span className="font-medium text-red-600">Inactiva</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() =>
                        router.push(`/admin/agency-cards/${card.id}`)
                      }
                    >
                      ✏️
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-red-600 hover:bg-red-50"
                      onPress={() => handleDelete(card)}
                    >
                      🗑️
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
