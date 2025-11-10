import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import DarkModeProvider from "~/lib/contexts/dark-mode-provider";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "shadcn-ui admin dashboard",
  description: "ready to use Shadcn admin dashboard, using the latest technology, such as the next.js tailwind v4 shadcn UI component.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-geist-mono antialiased`}
      >
        <DarkModeProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
