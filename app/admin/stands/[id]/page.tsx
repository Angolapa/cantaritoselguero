"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Button,
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@heroui/react";
import { ArrowLeft, Check, X } from "lucide-react";

import {
  AtButton,
  AtInput,
  AtTextarea,
  MlAvailabilityCard,
  MlSearchBar,
} from "@/libs/cantaritos-ui";
import { useProducts } from "@/domain/hooks/products";
import {
  useAddProductToStand,
  useAssignOperator,
  useRemoveOperator,
  useRemoveProductFromStand,
  useStand,
  useStandCatalog,
  useUpdateStand,
} from "@/domain/hooks/stands";
import { useUsers } from "@/domain/hooks/users";

export default function EditStandPage() {
  const params = useParams();
  const standId = params.id as string;

  const { data: stand, isLoading: isLoadingStand } = useStand(standId);
  const { data: standCatalog, isLoading: isLoadingCatalog } = useStandCatalog(
    standId,
    { active: false },
  );
  const updateStand = useUpdateStand(standId);
  const assignOperator = useAssignOperator();
  const removeOperator = useRemoveOperator();
  const addProductToStand = useAddProductToStand();
  const removeProductFromStand = useRemoveProductFromStand();

  const { data: users = [] } = useUsers();
  const { data: products = [] } = useProducts();

  const [lastSyncedStandId, setLastSyncedStandId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: stand?.name || "",
    description: stand?.description || "",
    location: stand?.location || "",
    image: stand?.image || "",
  });
  const [isActive, setIsActive] = useState(stand?.isActive ?? true);

  if (stand && stand.id !== lastSyncedStandId) {
    setFormData({
      name: stand.name || "",
      description: stand.description || "",
      location: stand.location || "",
      image: stand.image || "",
    });
    setIsActive(stand.isActive ?? true);
    setLastSyncedStandId(stand.id);
  }
  const [searchOperators, setSearchOperators] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [selectedOperatorIds, setSelectedOperatorIds] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const isLoading =
    isLoadingStand ||
    isLoadingCatalog ||
    updateStand.isPending ||
    assignOperator.isPending ||
    removeOperator.isPending ||
    addProductToStand.isPending ||
    removeProductFromStand.isPending;

  const handleInputChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = changeEvent.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (!formData.name.trim()) {
      alert("El nombre del stand es requerido");
      return;
    }

    updateStand.mutate({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      location: formData.location.trim() || undefined,
      image: formData.image.trim() || undefined,
      isActive,
    });
  };

  const toggleOperatorSelection = (userId: string) => {
    setSelectedOperatorIds((previousIds) =>
      previousIds.includes(userId)
        ? previousIds.filter((id) => id !== userId)
        : [...previousIds, userId],
    );
  };

  const handleAssignSelectedOperators = async () => {
    if (selectedOperatorIds.length === 0) return;

    try {
      await Promise.all(
        selectedOperatorIds.map((userId) =>
          assignOperator.mutateAsync({ standId, userId }),
        ),
      );
      setSelectedOperatorIds([]);
      setSearchOperators("");
    } catch {
      // errors are surfaced by mutation error state below
    }
  };

  const handleRemoveOperator = (userId: string) => {
    removeOperator.mutate({ standId, userId });
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((previousIds) =>
      previousIds.includes(productId)
        ? previousIds.filter((id) => id !== productId)
        : [...previousIds, productId],
    );
  };

  const handleAddSelectedProducts = async () => {
    if (selectedProductIds.length === 0) return;

    try {
      await Promise.all(
        selectedProductIds.map((productId) =>
          addProductToStand.mutateAsync({ standId, productId }),
        ),
      );
      setSelectedProductIds([]);
      setSearchProducts("");
    } catch {
      // errors are surfaced by mutation error state below
    }
  };

  // Filtrar usuarios que no están asignados al stand y que sean operadores
  const availableOperators = useMemo(() => {
    if (!users || !stand) return [];
    const assignedIds =
      stand.operators?.map((assignedOperator) => assignedOperator.userId) || [];
    return users.filter(
      (user) =>
        !assignedIds.includes(user.id) &&
        (user.name.toLowerCase().includes(searchOperators.toLowerCase()) ||
          user.email.toLowerCase().includes(searchOperators.toLowerCase())),
    );
  }, [users, stand, searchOperators]);

  // Productos ya en el catálogo del stand
  const catalogItems = standCatalog?.items ?? [];
  const catalogProductIds = useMemo(
    () => new Set(catalogItems.map((item) => item.productId)),
    [catalogItems],
  );

  // Filtrar productos disponibles (excluyendo los ya agregados)
  const availableProducts = useMemo(() => {
    if (!products) return [];
    const searchTerm = searchProducts.trim().toLowerCase();
    return products.filter(
      (product) =>
        !catalogProductIds.has(product.id) &&
        (!searchTerm ||
          product.name.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm)),
    );
  }, [products, searchProducts, catalogProductIds]);

  const handleRemoveProduct = (productId: string) => {
    removeProductFromStand.mutate({ standId, productId });
  };

  if (isLoadingStand) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  if (!stand) {
    return <div className="text-center py-10">Stand no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AtButton
            as={Link}
            href="/admin/stands"
            isIconOnly
            variant="light"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </AtButton>
          <div>
            <nav className="mb-1 flex text-xs text-gray-500">
              <Link href="/admin/stands" className="hover:text-primary">
                Stands
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">{stand.name}</span>
            </nav>
            <h1 className="text-xl font-bold">Editar Stand</h1>
          </div>
        </div>
        <AtButton
          color="primary"
          type="submit"
          form="stand-form"
          isLoading={isLoading}
        >
          Guardar Cambios
        </AtButton>
      </div>

      {/* Tabs */}
      <Tabs color="primary" variant="bordered">
        {/* Información */}
        <Tab key="info" title="Información">
          <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card shadow="sm">
                <CardBody className="p-6">
                  <form
                    id="stand-form"
                    onSubmit={handleUpdate}
                    className="space-y-8"
                  >
                    <div>
                      <AtInput
                        label="Nombre del Stand"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isRequired
                      />
                    </div>

                    <div className="mb-1">
                      <AtTextarea
                        label="Descripción"
                        labelPlacement="outside"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        minRows={3}
                      />
                    </div>

                    <div className="pt-1">
                      <AtInput
                        label="Ubicación"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <AtInput
                        label="Imagen (URL, opcional)"
                        name="image"
                        placeholder="https://..."
                        value={formData.image}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>

            <div>
              <MlAvailabilityCard
                isActive={isActive}
                onActiveChange={setIsActive}
              />
            </div>
          </div>
        </Tab>

        {/* Operadores */}
        <Tab key="operators" title="Operadores">
          <div className="py-6 space-y-6">
            {/* Agregar Operador */}
            <Card shadow="sm">
              <CardBody className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Asignar Operador</h3>
                  <AtButton
                    color="primary"
                    onPress={handleAssignSelectedOperators}
                    isDisabled={
                      selectedOperatorIds.length === 0 || assignOperator.isPending
                    }
                    isLoading={assignOperator.isPending}
                  >
                    Asignar seleccionados ({selectedOperatorIds.length})
                  </AtButton>
                </div>

                <div className="mb-4">
                  <MlSearchBar
                    placeholder="Buscar operador..."
                    value={searchOperators}
                    onValueChange={setSearchOperators}
                  />
                </div>

                {availableOperators.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-400">
                    No se encontraron operadores para mostrar
                  </p>
                ) : (
                  <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                    {availableOperators.slice(0, 20).map((user) => {
                      const isSelected = selectedOperatorIds.includes(user.id);
                      return (
                        <button
                          key={user.id}
                          type="button"
                          className={`w-full rounded-lg border p-3 text-left transition-colors ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => toggleOperatorSelection(user.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-gray-100 text-xs font-medium text-gray-600 flex items-center justify-center">
                              {user.name?.slice(0, 1).toUpperCase() || "U"}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {user.name}
                              </p>
                              <p className="truncate text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>

                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-primary bg-primary text-white"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="h-3.5 w-3.5" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Lista de Operadores */}
            <Card shadow="sm">
              <CardBody className="p-6">
                <h3 className="font-semibold mb-4">
                  Operadores Asignados ({stand.operators?.length || 0})
                </h3>
                {stand.operators && stand.operators.length > 0 ? (
                  <div className="space-y-2">
                    {stand.operators.map((operator) => (
                      <div
                        key={operator.userId}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{operator.userName}</p>
                          <p className="text-sm text-gray-600">
                            {operator.userEmail}
                          </p>
                        </div>
                        <Button
                          isIconOnly
                          variant="light"
                          className="text-red-600 hover:bg-red-50"
                          onPress={() => handleRemoveOperator(operator.userId)}
                          isDisabled={removeOperator.isPending}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No hay operadores asignados a este stand
                  </p>
                )}
              </CardBody>
            </Card>
          </div>
        </Tab>

        {/* Productos del Catálogo */}
        <Tab key="catalog" title="Catálogo de Productos">
          <div className="py-6 space-y-6">
            {/* Agregar Producto */}
            <Card shadow="sm">
              <CardBody className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Agregar Producto</h3>
                  <AtButton
                    color="primary"
                    onPress={handleAddSelectedProducts}
                    isDisabled={
                      selectedProductIds.length === 0 || addProductToStand.isPending
                    }
                    isLoading={addProductToStand.isPending}
                  >
                    Agregar seleccionados ({selectedProductIds.length})
                  </AtButton>
                </div>

                <div className="mb-4">
                  <AtInput
                    placeholder="Buscar producto por nombre..."
                    value={searchProducts}
                    onValueChange={setSearchProducts}
                  />
                </div>

                {availableProducts.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-400">
                    No se encontraron productos para mostrar
                  </p>
                ) : (
                  <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
                    {availableProducts.slice(0, 20).map((product) => {
                      const isSelected = selectedProductIds.includes(product.id);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          className={`w-full rounded-lg border p-3 text-left transition-colors ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => toggleProductSelection(product.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                  IMG
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {product.name}
                                {!product.isActive && (
                                  <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-600">
                                    Inactivo
                                  </span>
                                )}
                              </p>
                              <p className="line-clamp-2 text-xs text-gray-500">
                                {product.description || "Sin descripción"}
                              </p>
                            </div>

                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-primary bg-primary text-white"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="h-3.5 w-3.5" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Productos en el catálogo */}
            <Card shadow="sm">
              <CardBody className="p-6">
                <h3 className="font-semibold mb-4">
                  Productos en el catálogo ({catalogItems.length})
                </h3>
                {isLoadingCatalog ? (
                  <p className="py-4 text-center text-sm text-gray-400">
                    Cargando catálogo...
                  </p>
                ) : catalogItems.length > 0 ? (
                  <div className="space-y-2">
                    {catalogItems.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                IMG
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {item.name}
                              {!item.isActive && (
                                <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-600">
                                  Inactivo
                                </span>
                              )}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              ${item.basePrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Button
                          isIconOnly
                          variant="light"
                          className="text-red-600 hover:bg-red-50"
                          onPress={() => handleRemoveProduct(item.productId)}
                          isDisabled={removeProductFromStand.isPending}
                          aria-label={`Quitar ${item.name}`}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No hay productos en el catálogo de este stand
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Nota sobre el catálogo */}
            <Card shadow="sm" className="bg-blue-50 border border-blue-200">
              <CardBody className="p-6">
                <p className="text-sm text-blue-900">
                  💡 Este es el listado de productos que se retiran en este
                  stand. Cuando un cliente hace una compra, debe pasar por cada
                  stand asignado a retirar sus productos. A medida que se
                  entregan, la orden cambia automáticamente a{" "}
                  <strong>parcialmente entregada</strong> y, al completarse
                  todos los stands, a <strong>entregada</strong>.
                </p>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* Error */}
      {(updateStand.error ||
        assignOperator.error ||
        removeOperator.error ||
        addProductToStand.error ||
        removeProductFromStand.error) && (
        <p className="text-sm text-red-500">
          {updateStand.error?.message ||
            assignOperator.error?.message ||
            removeOperator.error?.message ||
            addProductToStand.error?.message ||
            removeProductFromStand.error?.message ||
            "Error al actualizar"}
        </p>
      )}
    </div>
  );
}
