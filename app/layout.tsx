import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Studio Architecten | Modern Architecture & Design",
  description:
    "Award-winning architecture studio specializing in contemporary residential, industrial, and interior design. Over 25 years of expertise in creating innovative, sustainable spaces.",
  generator: "v0.app",
  keywords: [
    "architecture",
    "design",
    "residential design",
    "industrial architecture",
    "interior design",
    "sustainable design",
    "Netherlands",
  ],
  authors: [
    {
      name: "Studio Architecten",
      url: "https://studioarchitecten.nl",
    },
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://studioarchitecten.nl",
    siteName: "Studio Architecten",
    title: "Studio Architecten | Modern Architecture & Design",
    description:
      "Award-winning architecture studio specializing in contemporary residential, industrial, and interior design.",
    images: [
      {
        url: "/placeholder.svg?key=og-image",
        width: 1200,
        height: 630,
        alt: "Studio Architecten",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Architecten | Modern Architecture & Design",
    description: "Award-winning architecture studio specializing in contemporary design.",
    creator: "@studioarchitecten",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${_geist.className} antialiased bg-white text-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
