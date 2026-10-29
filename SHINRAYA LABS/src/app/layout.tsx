import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShinrayaConsole } from "@/components/interactive/ShinrayaConsole";
import { HyperframeSeekbar } from "@/components/hyperframes/HyperframeSeekbar";
import { siteUrl, siteDescription } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Shinraya Tech Labs - Research Beyond Assumptions.",
    template: "%s | Shinraya Tech Labs",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shinraya Tech Labs",
    title: "Shinraya Tech Labs",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shinraya Tech Labs - Research Beyond Assumptions.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinraya Tech Labs",
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HyperframeSeekbar />
        <Header />
        <main id="main" tabIndex={-1} className="overflow-x-hidden w-full max-w-full">
          {children}
        </main>
        <Footer />
        <ShinrayaConsole />
      </body>
    </html>
  );
}
