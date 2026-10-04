"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "./logo.png";
import logoAlt from "./logo-alt.png";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(!isHome || window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [isHome]);

  return <><header className={scrolled ? "siteHeader isScrolled" : "siteHeader"}>
    <Link className="brand" href="/" aria-label="Ir al inicio">
      <Image className="brandLogo brandLogoLight" src={logoAlt} alt="Transporte Forwarders" priority />
      <Image className="brandLogo brandLogoColor" src={logo} alt="" aria-hidden="true" priority />
    </Link>
    <nav aria-label="Navegación principal">
      <Link href="/#nosotros">Nosotros</Link><Link href="/#servicios">Servicios</Link><Link href="/#operacion">Operación</Link><Link href="/contacto">Contacto</Link>
      <Link className="trackingNav" href="/seguimiento">Seguimiento</Link>
    </nav>
    <div className="headerActions">
      <Link className="trackingMobile" href="/seguimiento">Seguimiento</Link>
      <a className="portal" href="https://portal.transportefwd.pe">Acceso extranet <span>↗</span></a>
    </div>
  </header></>;
}
