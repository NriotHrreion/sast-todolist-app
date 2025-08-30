import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSansSC = localFont({
  src: [
    { path: "../assets/NotoSansSC-VariableFont_wght.ttf", style: "normal" },
    { path: "../assets/NotoSans-VariableFont_wdth,wght.ttf", style: "normal" },
  ]
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
      <body className={cn("antialiased w-[100vw] h-[100vh]", notoSansSC.className)}>
        {children}
      </body>
    </html>
  );
}
