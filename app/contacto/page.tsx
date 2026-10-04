import type { Metadata } from "next";
import Link from "next/link";
import QuoteSection from "../quote-section";

export const metadata: Metadata = {
  title: "Contacto y cotizaciones | Transporte Forwarders",
  description: "Solicita una cotización de transporte y logística con Transporte Forwarders en Perú.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  return (
    <main className="contactPage">
      <section className="contactHero">
        <div>
          <p className="tag">CONTACTO</p>
          <h1>Conversemos sobre<br/><em>tu operación.</em></h1>
          <p>Comparte los datos iniciales de tu requerimiento. Nuestro equipo podrá revisar la ruta, la carga y las condiciones del servicio.</p>
          <Link href="#cotiza">Solicitar cotización <span>↓</span></Link>
        </div>
      </section>
      <QuoteSection page />
    </main>
  );
}
