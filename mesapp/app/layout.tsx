import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { site } from "./site-config";

/**
 * Texto, interfaz y datos. El eje óptico (`opsz`) ajusta las formas al tamaño:
 * los eyebrows piden el grado pequeño, más abierto.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

/** Titulación. Display de anchos irregulares, solo para h1 y h2. */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Més Capital · Financiamiento para empresas productivas",
    template: "%s · Més Capital",
  },
  description:
    "Bróker de soluciones financieras. Leasing, préstamos prendarios y seguros de caución para agro, vitivinicultura, metalmecánica, construcción y logística.",
  keywords: [
    "leasing",
    "préstamos prendarios",
    "seguros de caución",
    "financiamiento pymes",
    "bróker financiero",
    "Argentina",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site.url,
    siteName: site.name,
    title: "Més Capital · Impulsamos proyectos, potenciamos empresas",
    description:
      "Conectamos a empresas de sectores productivos con la entidad financiera que mejor responde a su operación.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d99ff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
