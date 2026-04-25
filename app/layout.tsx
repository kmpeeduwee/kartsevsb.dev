import "../global.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "./components/analytics";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "kartsev.dev",
    template: "%s | kartsev.dev",
  },
  description: "Sergei Kartsev — full-stack engineer. Backend in Rust.",
  openGraph: {
    title: "kartsev.dev",
    description: "Sergei Kartsev — full-stack engineer. Backend in Rust.",
    url: "https://kartsev.dev",
    siteName: "kartsev.dev",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "kartsev.dev",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <head>
        <Analytics />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  );
}
