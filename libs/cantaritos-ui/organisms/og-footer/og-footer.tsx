"use client";

import Image from "next/image";
import Link from "next/link";

import { MapPin } from "lucide-react";

import { useTranslation } from "@/domain/stores";

const NAV_COL_1_KEYS = [
  { href: "/nosotros", key: "footer.about" },
  { href: "/planea-tu-visita", key: "footer.planVisit" },
  { href: "/directorio", key: "footer.directory" },
  { href: "/products", key: "footer.shopFooter" },
];

const NAV_COL_2_KEYS = [
  { href: "/faq", key: "footer.faq" },
  { href: "/terminos-y-condiciones", key: "footer.terms" },
  { href: "/aviso-de-privacidad", key: "footer.privacy" },
  { href: "/facturacion", key: "footer.invoicing" },
];

export function OgFooter() {
  const { translate } = useTranslation();

  return (
    <footer className="bg-[#E9DCB7] w-full">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[208px] py-10 md:py-14">
        <div className="flex flex-col items-center md:items-stretch md:flex-row gap-10 md:gap-8 xl:gap-0 md:justify-between">
          {/* Left — Logo + Info */}
          <div className="space-y-4 max-w-[207px] md:max-w-[320px] items-center md:items-start text-center md:text-left flex flex-col md:block">
            <Image
              src="/images/Logo.png"
              alt="Cantaritos El Güero #1"
              width={255}
              height={99}
              className="w-[207px] h-auto md:w-[255px] md:h-[99px]"
            />

            <div className="flex flex-row-reverse md:flex-row gap-2 text-xs md:text-base font-condensed font-medium text-primary leading-none">
              <MapPin className="h-8 w-8 shrink-0 text-[#137171]" />
              <p>
                {translate("footer.addressLine1")}<br />
                {translate("footer.addressLine2")}<br />
                {translate("footer.addressLine3")}
              </p>
            </div>

            <p className="font-condensed text-xs md:text-base text-[#E64927] md:text-primary font-medium leading-none">
              <span className="md:hidden">
                {translate("footer.hoursLine1")}<br />
                {translate("footer.hoursLine2")}<br />
                {translate("footer.hoursLine3")}
              </span>
              <span className="hidden md:inline">
                {translate("footer.hours")}<br />
                {translate("footer.noFranchise")}
              </span>
            </p>

            <p className="font-condensed text-xs md:text-base text-[#901F18] font-medium leading-none">
              {translate("footer.liveMusic")}
            </p>
          </div>

          {/* Center — Nav links */}
          <div className="flex gap-10 md:gap-16 items-start md:items-end">
            <nav className="flex flex-col gap-3 items-start">
              {NAV_COL_1_KEYS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-condensed text-xs md:text-base font-medium text-[#14222F] md:text-gray-800 leading-none hover:text-primary transition-colors"
                >
                  {translate(link.key)}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-3 items-start">
              {NAV_COL_2_KEYS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-condensed text-xs md:text-base font-medium text-[#14222F] md:text-gray-800 leading-none hover:text-primary transition-colors"
                >
                  {translate(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right — Social icons */}
          <div className="flex items-end justify-center gap-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#E64927] hover:text-[#E64927]/80 transition-colors"
            >
              <Image src="/images/Facebook.svg" alt="Facebook" width={39} height={38} className="w-[39px] h-[38px]" />
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#E64927] hover:text-[#E64927]/80 transition-colors"
            >
              <Image src="/images/Instagram.svg" alt="Instagram" width={39} height={39} className="w-[39px] h-[39px]" />
            </a>
            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-[#E64927] hover:text-[#E64927]/80 transition-colors"
            >
              <Image src="/images/Tik_Tok.svg" alt="TikTok" width={31} height={39} className="w-[31px] h-[39px]" />
            </a>
            {/* Spotify */}
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-[#E64927] hover:text-[#E64927]/80 transition-colors"
            >
              <Image src="/images/Spotify.svg" alt="Spotify" width={39} height={39} className="w-[39px] h-[39px]" />
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#E64927] hover:text-[#E64927]/80 transition-colors"
            >
              <Image src="/images/Youtube.svg" alt="YouTube" width={45} height={32} className="w-[45px] h-[32px]" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800/10 text-center">
          <p className="font-condensed text-xs md:text-base font-medium text-gray-600 leading-none">
            &copy; Copyright Cantaritos el Güero #1
          </p>
        </div>
      </div>
    </footer>
  );
}
