import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Impresos Americana - Material POP & Gran Formato",
    default: "Impresos Americana | Fabricantes de Material POP, Gran Formato y Litografía",
  },
  description:
    "Soluciones industriales de impresión comercial en Colombia: Fabricación directa de exhibidores POP de piso y mostrador, impresión de gran formato UV, litografía publicitaria y merchandising corporativo con cobertura nacional.",
  keywords: [
    "Material POP Colombia",
    "Exhibidores de cartón corrugado Cali",
    "Impresión Gran Formato",
    "Litografía comercial",
    "Branding corporativo",
    "Stands acrílicos",
    "Impresos Americana",
    "Publicidad en punto de venta",
    "Cajas y empaques personalizados",
    "Banners y vallas Cali",
  ],
  authors: [{ name: "Impresos Americana S.A.S." }],
  creator: "Impresos Americana S.A.S.",
  publisher: "Impresos Americana S.A.S.",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL("https://impresosamericana.com"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://impresosamericana.com",
    title: "Impresos Americana | Material POP, Gran Formato & Litografía",
    description:
      "Transformamos marcas con impacto visual tangible. Fabricantes de exhibidores POP, stands, gran formato UV y acabados litográficos de alta gama en Colombia.",
    siteName: "Impresos Americana",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Impresos Americana - Fabricantes de Material POP y Gran Formato",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impresos Americana | Material POP & Impresión Gran Formato",
    description: "Líderes en fabricación de exhibidores para punto de venta y litografía en Colombia.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://impresosamericana.com",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://impresosamericana.com/#organization",
      name: "Impresos Americana S.A.S.",
      alternateName: "Impresos Americana",
      url: "https://impresosamericana.com",
      logo: "https://impresosamericana.com/logo.png",
      image: "https://impresosamericana.com/og-image.jpg",
      description:
        "Planta industrial de producción gráfica, material POP, exhibidores de piso y mostrador, impresión de gran formato UV, litografía comercial y merchandising corporativo en Colombia.",
      telephone: "+57-602-8854000",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+57-316-3200181",
        contactType: "sales",
        areaServed: "CO",
        availableLanguage: ["Spanish"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle 25 # 4-38, Barrio San Nicolás",
        addressLocality: "Cali",
        addressRegion: "Valle del Cauca",
        postalCode: "760010",
        addressCountry: "CO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 3.4475,
        longitude: -76.5284,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:30",
          closes: "17:30",
        },
      ],
      sameAs: ["https://wa.me/573163200181"],
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Impresión Industrial y Material POP",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Exhibidores y Material POP",
              description:
                "Diseño y fabricación de exhibidores de piso en cartón corrugado estructural y acrílico.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Impresión de Gran Formato UV",
              description:
                "Lonas banner 13oz, vinilos adhesivos con laminación UV y cama plana sobre rígidos.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Litografía Comercial & Editorial",
              description:
                "Catálogos corporativos, carpetas ejecutivas y empaques con acabados especiales y brillo UV.",
            },
          },
        ],
      },
    },
  ],
};

import { PublicLayoutWrapper } from "@/components/PublicLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#121212] text-white font-sans antialiased selection:bg-[#E30613] selection:text-white pb-16 lg:pb-0 flex flex-col justify-between">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
