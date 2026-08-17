import { Aliados } from "./components/aliados";
import { Cobertura } from "./components/cobertura";
import { Contacto } from "./components/contacto";
import { Diferenciales } from "./components/diferenciales";
import { Entidades } from "./components/entidades";
import { Faq } from "./components/faq";
import { Hero } from "./components/hero";
import { Nosotros } from "./components/nosotros";
import { Proceso } from "./components/proceso";
import { Productos } from "./components/productos";
import { Sectores } from "./components/sectores";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Entidades />
        <Productos />
        <Sectores />
        <Proceso />
        <Diferenciales />
        <Cobertura />
        <Aliados />
        <Nosotros />
        <Faq />
        <Contacto />
      </main>
      <SiteFooter />
    </>
  );
}
