"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero-puerto.png",
    eyebrow: "TRANSPORTE Y LOGÍSTICA EMPRESARIAL",
    title: "Movemos carga.",
    accent: "Impulsamos negocios.",
    description: "Conectamos rutas, carga y empresas mediante operaciones seguras, puntuales y diseñadas para cada necesidad.",
  },
  {
    image: "/images/hero-ruta.png",
    eyebrow: "COBERTURA Y PLANIFICACIÓN",
    title: "Cada ruta cuenta.",
    accent: "Cada entrega también.",
    description: "Coordinamos recursos, tiempos y recorridos para que tu operación avance con orden y visibilidad.",
  },
  {
    image: "/images/hero-centro.png",
    eyebrow: "OPERACIONES EMPRESARIALES",
    title: "Logística preparada.",
    accent: "Respuesta oportuna.",
    description: "Una atención cercana y una operación pensada para acompañar las exigencias de cada empresa.",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return <section className="hero" id="inicio" aria-roledescription="carrusel" aria-label="Servicios de Transporte Forwarders">
    <div className="slides">
      {slides.map((slide, index) => <div className={`heroSlide ${index === active ? "isActive" : ""}`} key={slide.image} aria-hidden={index !== active}>
        <Image src={slide.image} alt="" fill priority={index === 0} sizes="100vw" />
        <div className="heroShade" />
      </div>)}
    </div>

    <div className="heroContent" key={active}>
      <p className="tag">{slides[active].eyebrow}</p>
      <h1>{slides[active].title}<br/><em>{slides[active].accent}</em></h1>
      <p className="lead">{slides[active].description}</p>
      <div className="heroActions"><a className="cta" href="#cotiza">Solicitar cotización <span>→</span></a><a className="textLink" href="#servicios">Conocer servicios</a></div>
    </div>

    <div className="heroRail">
      <div className="slideCount"><span>0{active + 1}</span><i/><span>0{slides.length}</span></div>
      <div className="slideDots">{slides.map((slide, index) => <button className={index === active ? "active" : ""} onClick={() => goTo(index)} key={slide.image} aria-label={`Mostrar imagen ${index + 1}`}><span /></button>)}</div>
      <div className="slideArrows"><button onClick={() => goTo(active - 1)} aria-label="Imagen anterior">←</button><button onClick={() => goTo(active + 1)} aria-label="Imagen siguiente">→</button></div>
    </div>

    <div className="heroScroll"><span>DESPLÁZATE</span><i /></div>
  </section>;
}
