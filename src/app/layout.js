import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigations from "@/components/Navigations/Navigations";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Order Gifts In Qatar | Online Gift Shop - Qiftly QA",
  description: "Buy gifts online. Explore the Qiftly online gift shop in Qatar for unique and trending gifts options with midnight and same day delivery options. Shop Now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>

      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigations />
        {children}
        <Footer />
      </body>
    </html>
  );
}
