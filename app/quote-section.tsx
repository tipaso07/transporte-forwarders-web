type QuoteSectionProps = {
  page?: boolean;
};

export default function QuoteSection({ page = false }: QuoteSectionProps) {
  return (
    <section className={`quote${page ? " quotePage" : ""}`} id="cotiza">
      <div>
        <p className="tag">COTIZACIONES</p>
        <h2>{page ? <>Hablemos de tu<br/><em>próxima operación.</em></> : <>Cuéntanos sobre tu<br/><em>próximo envío.</em></>}</h2>
        <p>Completa la información inicial y el equipo comercial podrá evaluar tu requerimiento.</p>
      </div>
      <form>
        <label>Nombre o empresa<input name="name" placeholder="Ej. Empresa S.A.C." /></label>
        <label>Correo o teléfono<input name="contact" placeholder="Datos de contacto" /></label>
        <label>Origen y destino<input name="route" placeholder="Ej. Callao — Arequipa" /></label>
        <label>Detalles del servicio<textarea name="details" rows={3} placeholder="Tipo de carga, peso, fecha y requisitos" /></label>
        <button type="button">Enviar solicitud <span>→</span></button>
        <small>Formulario demostrativo. Se conectará al canal comercial oficial de la empresa.</small>
      </form>
    </section>
  );
}
