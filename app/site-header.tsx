"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "./logo.png";
import logoAlt from "./logo-alt.png";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return <header className={scrolled ? "siteHeader isScrolled" : "siteHeader"}>
    <a className="brand" href="#inicio" aria-label="Ir al inicio">
      <Image className="brandLogo brandLogoLight" src={logoAlt} alt="Transporte Forwarders" priority />
      <Image className="brandLogo brandLogoColor" src={logo} alt="" aria-hidden="true" priority />
    </a>
    <nav aria-label="Navegación principal"><a href="#nosotros">Nosotros</a><a href="#servicios">Servicios</a><a href="#operacion">Operación</a><a href="#cotiza">Contacto</a></nav>
    <a className="portal" href="https://portal.transportefwd.pe">Acceso extranet <span>↗</span></a>
  </header>;
}
