import type { Metadata } from "next";
import "./globals.css";

import { META } from "@/app/shared/constants/meta";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,

  openGraph: {
    title: META.title,
    description: META.description,
    url: META.siteUrl,
    siteName: META.siteName,
    type: "website",
    images: [
      {
        url: `${META.siteUrl}${META.ogImage}`,
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: [`${META.siteUrl}${META.ogImage}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}