import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  combineSchemas,
} from "@/lib/schema";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });

const SITE_URL = "https://www.architect-kindt.be";
const COMPANY_NAME = "Architectenbureau Paul Kindt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_NAME} | Moderne Architectuur & Design`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Architectenbureau Paul Kindt - Gespecialiseerd in hedendaagse residentiële, industriële en interieurontwerpen. Over 25 jaar expertise in innovatieve, duurzame architectuur in Nederland en België.",
  generator: "v0.app",
  keywords: [
    "architectenbureau",
    "architectuur",
    "ontwerp",
    "residentiële architectuur",
    "interieurontwerp",
    "duurzame architectuur",
    "moderne bouwkunst",
    "Nederland",
    "België",
  ],
  authors: [
    {
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  ],
  creator: COMPANY_NAME,
  category: "Architecture",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} | Moderne Architectuur & Design`,
    description:
      "Architectenbureau Paul Kindt - Gespecialiseerd in hedendaagse residentiële, industriële en interieurontwerpen.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: COMPANY_NAME,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Moderne Architectuur & Design`,
    description:
      "Architectenbureau Paul Kindt - Gespecialiseerd in hedendaagse residentiële, industriële en interieurontwerpen.",
    creator: "@architectkindt",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "", // Add Google Search Console verification code
    yandex: "", // Add if needed for Russian market
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate root-level JSON-LD schemas
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();
  const combinedSchema = combineSchemas([
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
  ]);

  return (
    <html lang="nl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: combinedSchema }}
        />
      </head>
      <body className={`${_geist.className} antialiased bg-white text-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
