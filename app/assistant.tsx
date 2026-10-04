"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import whatsappLogo from "./whatsappLogo.webp";

type Message = { id: number; author: "bot" | "user"; text: string };
type BranchKey = "start" | "services" | "quote" | "coverage" | "tracking" | "fleet" | "hours";
type Choice = { label: string; reply: string; next: BranchKey };

const welcome = "Hola, soy el asistente virtual de Transporte Forwarders. Puedo orientarte sobre nuestros servicios y el proceso de atención. ¿Qué deseas consultar?";

const branches: Record<BranchKey, Choice[]> = {
  start: [
    { label: "Servicios de transporte", reply: "Coordinamos soluciones de transporte terrestre y distribución según el tipo de carga, la ruta y los requerimientos de cada operación.", next: "services" },
    { label: "Solicitar una cotización", reply: "Para preparar una cotización necesitamos conocer el origen, destino, tipo de carga, peso o dimensiones y la fecha estimada de recojo.", next: "quote" },
    { label: "Cobertura y rutas", reply: "Atendemos operaciones urbanas e interprovinciales. La disponibilidad se confirma de acuerdo con la ruta, el vehículo y la fecha solicitada.", next: "coverage" },
    { label: "Seguimiento de carga", reply: "El seguimiento se coordina durante la operación y la evidencia de entrega se comparte por los canales definidos con el cliente.", next: "tracking" },
    { label: "Flota y capacidades", reply: "Asignamos la unidad de acuerdo con las características de la carga. La información oficial de la flota se añadirá cuando sea validada por la empresa.", next: "fleet" },
    { label: "Horarios de atención", reply: "El horario comercial y los canales oficiales están pendientes de confirmación. Las operaciones en curso cuentan con coordinación directa.", next: "hours" },
  ],
  services: [
    { label: "Carga general", reply: "La carga general se planifica considerando volumen, peso, puntos de recojo y entrega, restricciones de acceso y fecha requerida.", next: "services" },
    { label: "Contenedores", reply: "Coordinamos el traslado de contenedores según tipo de unidad, terminal, almacén, ventanas de atención y documentación disponible.", next: "services" },
    { label: "Distribución", reply: "Las operaciones de distribución pueden organizarse por rutas, puntos de entrega y frecuencia. El alcance final se define con cada cliente.", next: "services" },
    { label: "Volver al menú principal", reply: "Claro. ¿Sobre qué otro tema deseas información?", next: "start" },
  ],
  quote: [
    { label: "¿Qué datos debo enviar?", reply: "Comparte: empresa y contacto, origen, destino, descripción de la carga, peso, dimensiones, fecha de recojo y cualquier condición especial.", next: "quote" },
    { label: "¿Cómo continúa el proceso?", reply: "El equipo comercial revisa los datos, valida disponibilidad operativa y responde con el alcance y las condiciones de la propuesta.", next: "quote" },
    { label: "Volver al menú principal", reply: "Perfecto. También puedo ayudarte con estos temas:", next: "start" },
  ],
  coverage: [
    { label: "Rutas nacionales", reply: "La atención interprovincial se valida para cada origen y destino. Próximamente publicaremos el mapa de cobertura confirmado.", next: "coverage" },
    { label: "Operación urbana", reply: "La distribución urbana se programa de acuerdo con ventanas horarias, accesos, número de puntos y tipo de unidad requerida.", next: "coverage" },
    { label: "Volver al menú principal", reply: "¿Qué otra consulta deseas realizar?", next: "start" },
  ],
  tracking: [
    { label: "¿Cómo funciona?", reply: "Durante el servicio, el responsable de la operación comunica los hitos acordados: recojo, tránsito, llegada y entrega.", next: "tracking" },
    { label: "Tengo una operación en curso", reply: "La consulta de una operación real requerirá el código de servicio y un canal oficial. Esta función se habilitará con la futura extranet.", next: "tracking" },
    { label: "Volver al menú principal", reply: "Entendido. Puedes elegir otra categoría:", next: "start" },
  ],
  fleet: [
    { label: "¿Cómo asignan una unidad?", reply: "Se evalúan peso, volumen, tipo de carga, ruta, restricciones de acceso y condiciones de seguridad antes de confirmar la unidad.", next: "fleet" },
    { label: "Volver al menú principal", reply: "¿Deseas consultar otro tema?", next: "start" },
  ],
  hours: [{ label: "Volver al menú principal", reply: "Con gusto. Estas son las consultas disponibles:", next: "start" }],
};

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState<BranchKey>("start");
  const [messages, setMessages] = useState<Message[]>([{ id: 1, author: "bot", text: welcome }]);
  const endRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(2);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function choose(choice: Choice) {
    const userId = messageId.current++;
    const botId = messageId.current++;
    setMessages((current) => [...current, { id: userId, author: "user", text: choice.label }, { id: botId, author: "bot", text: choice.reply }]);
    setBranch(choice.next);
  }

  return <>
    <button className="chatFab" onClick={() => setOpen(true)} aria-label="Abrir asistente virtual" aria-expanded={open}>
      <Image src={whatsappLogo} alt="" aria-hidden="true" />
    </button>
    {open && <aside className="chat" aria-label="Asistente virtual">
      <div className="chatHead"><span className="assistantMark">TF</span><div><strong>Asistente Forwarders</strong><small><i/> Disponible</small></div><button onClick={() => setOpen(false)} aria-label="Cerrar asistente">×</button></div>
      <div className="chatBody" aria-live="polite">
        <div className="conversation">{messages.map((message) => <div className={`chatMessage ${message.author}`} key={message.id}>{message.text}</div>)}</div>
        <div className="options" aria-label="Opciones de consulta">{branches[branch].map((choice) => <button key={choice.label} onClick={() => choose(choice)}>{choice.label}<span>›</span></button>)}</div>
        <div ref={endRef}/>
      </div>
      <div className="chatFoot">Asistente virtual de Transporte Forwarders</div>
    </aside>}
  </>;
}
