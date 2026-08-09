import type { Metadata } from "next";
import "./globals.css";
import { Baloo_Da_2, Noto_Sans_Bengali } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import { Toaster } from "sonner";

const balooDa = Baloo_Da_2({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
});

export const metadata: Metadata = {
  title: "ইট ভাটা সফটওয়্যার",
  description: "ইট ভাটা সফটওয়্যার - ইট ভাটার সকল কার্যক্রম পরিচালনার জন্য একটি সফটওয়্যার।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body
        cz-shortcut-listen="true"
        className={`${balooDa.variable} ${notoBengali.variable} ${notoBengali.className} antialiased no-scrollbar`}
      >
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}