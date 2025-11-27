import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdProvider from "@/components/providers/AntdProvider";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PharmCeutical ERP",
  description: "Pharmaceutical Enterprise Resource Planning System",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AntdProvider>
          <MainLayout>{children}</MainLayout>
        </AntdProvider>
      </body>
    </html>
  );
}
