"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import logo from "./logo.png";
import logoAlt from "./logo-alt.png";
import TrackingModal from "./tracking-modal";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const closeTracking = useCallback(() => setTrackingOpen(false), []);

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
      <button className="trackingNav" type="button" onClick={() => setTrackingOpen(true)}>Seguimiento</button>
    </nav>
    <div className="headerActions">
      <button className="trackingMobile" type="button" onClick={() => setTrackingOpen(true)} aria-label="Abrir seguimiento de pedidos">Seguimiento</button>
      <a className="portal" href="https://portal.transportefwd.pe">Acceso extranet <span>↗</span></a>
    </div>
  </header>{trackingOpen && <TrackingModal open onClose={closeTracking} />}</>;
}
