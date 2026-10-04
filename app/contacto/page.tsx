import type { Metadata } from "next";
import QuoteSection from "../quote-section";

export const metadata: Metadata = {
  title: "Contacto y cotizaciones | Transporte Forwarders",
  description: "Solicita una cotización de transporte y logística con Transporte Forwarders en Perú.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  return (
    <main className="contactPage">
      <QuoteSection page />
    </main>
  );
}
