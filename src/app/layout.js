import "./globals.css";
import Navigations from "@/components/Navigations/Navigations";
import Footer from "@/components/Footer";
import BottomNav from "@/components/Navigations/BottomNav";
import { UIProvider } from "@/components/contexts/UIContext";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export async function generateMetadata() {
  return {
    title: "Order Gifts In Qatar | Online Gift Shop - Qiftly QA",
    description:
      "Buy gifts online. Explore the Qiftly online gift shop in Qatar for unique and trending gifts options with midnight and same day delivery options. Shop Now!",
  };
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.className} ${roboto.className} antialiased`}
      >
        <UIProvider>
          <Navigations />
          {children}
          <Footer />
          <BottomNav />
          <div id="modal-root"></div>
        </UIProvider>
      </body>
    </html>
  );
}
