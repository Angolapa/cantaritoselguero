"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Globe, Menu, ShoppingCart, X } from "lucide-react";

import { getCartItemCount,useAuthStore, useCartStore, useLocaleStore, useTranslation } from "@/domain/stores";

import { OgCartSheet } from "../og-cart-sheet";

const NAV_LINK_KEYS = [
  { href: "/nosotros", key: "nav.about" },
  { href: "/planea-tu-visita", key: "nav.planVisit" },
  { href: "/reservaciones", key: "nav.reservations" },
  { href: "/products", key: "nav.shop" },
  { href: "/directorio", key: "nav.directory" },
  { href: "/login", key: "nav.login" },
];

export function OgNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = getCartItemCount(cartItems);
  const { translate } = useTranslation();
  const toggleLocale = useLocaleStore((state) => state.toggleLocale);

  const allLinks = [
    ...NAV_LINK_KEYS.map((link) => ({ href: link.href, label: translate(link.key) })),
    ...(user?.role === "ADMIN" || user?.role === "CATALOG_MANAGER" || user?.role === "STAND_OPERATOR"
      ? [{ href: "/admin", label: translate("nav.adminPanel") }]
      : []),
  ];

  return (
    <header className="bg-primary relative z-50">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10 xl:px-[208px] h-[112px] md:h-[154px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <Image
            src="/images/Logo.png"
            alt="Cantaritos El Güero #1"
            width={245}
            height={95}
            className="w-[111px] h-[43px] md:w-[245px] md:h-[95px]"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
          {/* Fallback text when image fails to load */}
          <div className="hidden relative flex-col items-start leading-none">
            <span className="font-heading text-brand-yellow text-[11px] -mb-0.5 ml-0.5 uppercase tracking-wider">
              Cantaritos
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-heading text-white text-3xl tracking-normal">
                El Güero
              </span>
              <span className="font-heading text-white text-xs ml-0.5">
                #1
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-brand-yellow"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons + mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            aria-label={translate("nav.cart")}
            className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-yellow text-gray-900 text-xs font-body font-bold h-5 min-w-5 flex items-center justify-center rounded-full px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            aria-label={translate("nav.changeLanguage")}
            className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            onClick={toggleLocale}
          >
            <Globe className="h-6 w-6" />
          </button>

          <button
            aria-label={isMenuOpen ? translate("nav.closeMenu") : translate("nav.openMenu")}
            className="md:hidden text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-white/20 bg-primary">
          <div className="px-4 py-3 space-y-1">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-white/20 text-brand-yellow"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
      <OgCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
