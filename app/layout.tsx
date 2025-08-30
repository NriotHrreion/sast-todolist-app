import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "代办事项",
  description: "SAST - Web研发组免试题 待办事项App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-[100vw] h-[100vh]`}>
        {children}
      </body>
    </html>
  );
}
