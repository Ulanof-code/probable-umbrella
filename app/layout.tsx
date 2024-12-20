import { Metadata } from 'next';
import ClientLayout from '../components/clientLayout/ClientLayout';
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Telegram Mini App",
  description: "Using Telegram Mini App with Next.js 14v",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js?56" strategy="beforeInteractive" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}