import { RootProvider } from "fumadocs-ui/provider";

import "fumadocs-ui/twoslash.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Postiva API Client - Official Documentation",
    template: "%s - Postiva API Documentation",
  },
  description:
    "Explore detailed documentation for the Postiva API Client, including setup, integration, and usage examples.",
  openGraph: {
    title: "Postiva API Client - Complete Guide",
    type: "website",
    url: "https://docs.postiva.app/",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Explore Postiva API Client",
      },
    ],
    description:
      "Official documentation for the Postiva API Client, providing essential information on integration and usage.",
    siteName: "Postiva Documentation",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Postiva",
    title: "Postiva API Client - Enhance Your Content Strategy",
    description:
      "Unlock powerful content management capabilities with Postiva's API Client. Learn how to integrate and use it effectively.",
    images: ["/og_image.png"],
    creator: "@postivaapp",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.ico",
    },
  ],
  metadataBase: new URL("https://docs.postiva.app"),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
