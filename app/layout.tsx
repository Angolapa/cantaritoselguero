import type { Metadata } from "next";
import { Barriecito, Roboto, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";

import { Providers } from "./providers";

import "./globals.css";

const barrio = localFont({
  src: "../public/fuente/Barrio-Regular.ttf",
  variable: "--font-barrio",
  display: "swap",
});

const barriecito = Barriecito({
  variable: "--font-barriecito",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cantaritos El Güero",
  description: "Tradición de Jalisco — Authentic Mexican experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${barrio.variable} ${barriecito.variable} ${roboto.variable} ${robotoCondensed.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
