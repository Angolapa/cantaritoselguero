"use client";

import { useEffect } from "react";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { getCartTotal,useCartStore } from "@/domain/stores";

interface OgCartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OgCartSheet({ isOpen, onClose }: OgCartSheetProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = getCartTotal(items);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] flex flex-col md:max-w-lg md:mx-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <h2 className="font-heading text-xl text-gray-900 dark:text-white">
            Mi Carrito
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-5">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="font-body text-gray-500 text-center">
              Tu carrito está vacío
            </p>
            <p className="font-body text-sm text-gray-400 text-center mt-1">
              Agrega productos desde el catálogo
            </p>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                >
                  {/* Thumbnail */}
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {item.productImage ? (
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-bold text-sm text-gray-900 dark:text-white truncate">
                      {item.productName}
                    </h3>
                    <p className="font-body text-xs text-gray-500">
                      {item.selectedSize.name}
                      {item.selectedModifiers.length > 0 && (
                        <> · {item.selectedModifiers.map((m) => m.name).join(", ")}</>
                      )}
                    </p>
                    <p className="font-body text-sm font-bold text-primary mt-1">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="h-7 w-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 disabled:opacity-30 hover:border-primary hover:text-primary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-body text-sm font-bold min-w-[1.5ch] text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 dark:border-gray-800 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-body font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="font-body font-bold text-xl text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 font-body font-medium text-gray-600 dark:text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
