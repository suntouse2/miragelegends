import type { Metadata, Viewport } from "next";
import { Montserrat, Unbounded } from "next/font/google";
import "./globals.css";
import ToasterWrapper from "./ui/ToasterWrapper";
import { TgAuthProvider } from "./components/TgAuthProvider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  preload: true,
});

export const metadata: Metadata = {
  title: "MirageLegends — Магазин доната Mobile Legends",
  description: "Mobile Legends донат алмазы дешево и быстро",
};
export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable}`}>
      <body className="antialiased">
        <ToasterWrapper />
        <TgAuthProvider>
          {children}
          <div id="portal-root"></div>
        </TgAuthProvider>
      </body>
    </html>
  );
}
