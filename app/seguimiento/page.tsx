import type { Metadata } from "next";
import TrackingForm from "../tracking-form";

export const metadata: Metadata = {
  title: "Seguimiento de pedidos | Transporte Forwarders",
  description: "Consulta el estado de tu pedido con tu código de seguimiento y contraseña.",
  alternates: { canonical: "/seguimiento" },
};

export default function TrackingPage() {
  return (
    <main className="trackingPage">
      <section className="trackingSection">
        <div className="trackingCopy">
          <p className="tag">CONSULTA DE PEDIDOS</p>
          <h1>Seguimiento<br/><em>de carga.</em></h1>
          <p>Ingresa los datos asignados a tu pedido para consultar su estado.</p>
        </div>
        <div className="trackingPanel">
          <h2>Consulta tu pedido</h2>
          <p>Utiliza el código y la contraseña proporcionados al registrar la operación.</p>
          <TrackingForm />
        </div>
      </section>
    </main>
  );
}
