import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Assistant from "./assistant";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://transportefwd.pe"),
  title: "Transporte Forwarders | Logística y transporte de carga",
  description: "Soluciones de transporte y logística para empresas en Perú.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Assistant />
      </body>
    </html>
  );
}
