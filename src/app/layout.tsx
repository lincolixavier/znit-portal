import "@/styles/scss/main.scss";

import { Geist, Geist_Mono } from "next/font/google";
import SplashScreen from "@/app/components/splash-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
