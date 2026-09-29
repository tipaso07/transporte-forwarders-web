import Image from "next/image";
import logo from "./logo.png";
import Assistant from "./assistant";
import HeroSlider from "./hero-slider";
import SiteHeader from "./site-header";

const servicios = [
  { number: "01", title: "Transporte de carga", text: "Planificación y traslado de carga según volumen, ruta y condiciones operativas." },
  { number: "02", title: "Contenedores", text: "Coordinación de unidades y ventanas para operaciones portuarias y logísticas." },
  { number: "03", title: "Distribución", text: "Rutas urbanas e interprovinciales organizadas para cada punto de entrega." },
  { number: "04", title: "Soluciones a medida", text: "Una operación diseñada alrededor de los requerimientos de cada empresa." },
];

export default function Home() {
  return <main>
    <SiteHeader />

    <HeroSlider />

    <section className="about" id="nosotros">
      <div className="sectionIntro"><p className="tag">QUIÉNES SOMOS</p><h2>Un socio operativo para<br/><em>relaciones de largo plazo.</em></h2><p>Transporte Forwarders acompaña a empresas que necesitan movilizar su carga con planificación, visibilidad y responsabilidad.</p></div>
      <div className="aboutPrinciples"><article><span>01</span><h3>Compromiso</h3><p>Cada operación se gestiona con comunicación clara y atención a los detalles.</p></article><article><span>02</span><h3>Control</h3><p>Planificamos rutas, recursos e hitos para mantener el orden en cada servicio.</p></article><article><span>03</span><h3>Confianza</h3><p>Construimos relaciones empresariales sostenidas por el cumplimiento.</p></article></div>
      <p className="temporaryNote">Contenido institucional temporal. Se reemplazará con la historia, experiencia y certificaciones validadas por la empresa.</p>
    </section>

    <section className="services" id="servicios">
      <div className="servicesHeading"><div><p className="tag">NUESTROS SERVICIOS</p><h2>Soluciones que se adaptan<br/>a cada operación.</h2></div><p>Desde un traslado puntual hasta una operación recurrente, evaluamos las condiciones de la carga para proponer el servicio adecuado.</p></div>
      <div className="cards">{servicios.map((service) => <article key={service.number}><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><a href="#cotiza" aria-label={`Consultar por ${service.title}`}>Consultar <b>↗</b></a></article>)}</div>
    </section>

    <section className="operation" id="operacion">
      <div className="operationHeading"><p className="tag">CÓMO TRABAJAMOS</p><h2>Una operación clara,<br/><em>de inicio a fin.</em></h2><p>La información de flota, capacidades, rutas, monitoreo y evidencias será publicada cuando sea confirmada por el cliente.</p></div>
      <div className="process"><article><b>01</b><h3>Evaluamos</h3><p>Revisamos la carga, el origen, el destino y las condiciones del servicio.</p></article><article><b>02</b><h3>Planificamos</h3><p>Definimos recursos, ruta, tiempos e hitos de comunicación.</p></article><article><b>03</b><h3>Ejecutamos</h3><p>Coordinamos el traslado y mantenemos informado al cliente.</p></article><article><b>04</b><h3>Confirmamos</h3><p>Cerramos la operación con la evidencia acordada.</p></article></div>
      <div className="operationVisual">
        <Image src="/images/centro-operaciones-panoramica.png" alt="Centro de operaciones logísticas con flota de transporte de carga" fill sizes="100vw" />
        <div className="operationCaption"><span>OPERACIÓN PLANIFICADA</span><strong>Recursos y rutas coordinados para cada servicio.</strong></div>
      </div>
    </section>

    <section className="quote" id="cotiza">
      <div><p className="tag">COTIZACIONES</p><h2>Cuéntanos sobre tu<br/><em>próximo envío.</em></h2><p>Completa la información inicial y el equipo comercial podrá evaluar tu requerimiento.</p></div>
      <form><label>Nombre o empresa<input name="name" placeholder="Ej. Empresa S.A.C." /></label><label>Correo o teléfono<input name="contact" placeholder="Datos de contacto" /></label><label>Origen y destino<input name="route" placeholder="Ej. Callao — Arequipa" /></label><label>Detalles del servicio<textarea name="details" rows={3} placeholder="Tipo de carga, peso, fecha y requisitos" /></label><button type="button">Enviar solicitud <span>→</span></button><small>Formulario demostrativo. Se conectará al canal comercial oficial de la empresa.</small></form>
    </section>

    <footer id="contacto"><div><Image src={logo} alt="Transporte Forwarders" /><p>Soluciones de transporte y logística para empresas en Perú.</p></div><div className="footerLinks"><a href="#nosotros">Nosotros</a><a href="#servicios">Servicios</a><a href="#cotiza">Cotizaciones</a></div><small>© {new Date().getFullYear()} Transporte Forwarders S.A.C. Todos los derechos reservados.</small></footer>
    <Assistant />
  </main>;
}
