import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";

export default function SiteFooter() {
  return (
    <footer id="contacto">
      <div><Image src={logo} alt="Transporte Forwarders" /><p>Soluciones de transporte y logística para empresas en Perú.</p></div>
      <div className="footerLinks"><Link href="/#nosotros">Nosotros</Link><Link href="/#servicios">Servicios</Link><Link href="/contacto">Contacto</Link></div>
      <small>© {new Date().getFullYear()} Transporte Forwarders S.A.C. Todos los derechos reservados.</small>
    </footer>
  );
}
