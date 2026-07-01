import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "2026 Portfolio",
  icons: {
    icon: '/Icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <link href='https://cdn.boxicons.com/3.0.7/fonts/basic/boxicons.min.css' rel='stylesheet' />
        <link href='https://cdn.boxicons.com/3.0.7/fonts/brands/boxicons-brands.min.css' rel='stylesheet' />
        <link href="https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css" rel="stylesheet" />
        <link href='https://cdn.boxicons.com/3.0.4/fonts/animations.min.css' rel='stylesheet'></link>
      </head>
      <body className={` min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
