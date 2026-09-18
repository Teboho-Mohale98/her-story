import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

const siteUrl = siteConfig.metadata.siteUrl
  ? siteConfig.metadata.siteUrl.replace(/\/$/, "")
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl
    ? new URL(siteUrl)
    : new URL("https://her-story.example.com"),
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  applicationName: siteConfig.girlfriendName,
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    type: "website",
    siteName: siteConfig.girlfriendName,
    images: [
      {
        url: siteConfig.metadata.image,
        width: 1200,
        height: 630,
        alt: siteConfig.girlfriendName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: [siteConfig.metadata.image],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-noir-950 font-sans text-ivory-100">
        {children}
      </body>
    </html>
  );
}