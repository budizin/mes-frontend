import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import {
  IconAgro,
  IconConstruccion,
  IconLogistica,
  IconMetal,
  IconVino,
} from "./sector-icons";

const sectores = [
  {
    Icon: IconAgro,
    nombre: "Agropecuario",
    detalle: "Productores, contratistas y empresas de servicios agrícolas.",
  },
  {
    Icon: IconVino,
    nombre: "Vitivinícola y olivícola",
    detalle: "Bodegas, productores y pymes especializadas.",
  },
  {
    Icon: IconMetal,
    nombre: "Metalmecánica",
    detalle: "Montajes industriales y fabricantes de maquinaria.",
  },
  {
    Icon: IconConstruccion,
    nombre: "Construcción",
    detalle: "Desarrolladoras, constructoras y empresas de infraestructura.",
  },
  {
    Icon: IconLogistica,
    nombre: "Logística",
    detalle: "Flotas y servicios de transporte y distribución.",
  },
];

export function Sectores() {
  return (
    <section id="sectores" className="scroll-mt-24 bg-ink text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Sectores"
          tone="white"
          title="Conocemos el negocio que vas a financiar"
          lead="Sabemos cuándo cobra un contratista rural, qué margen maneja una constructora y qué necesita una bodega antes de la cosecha. Esa lectura del sector es la que hace que una carpeta se apruebe."
        />

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {sectores.map((s, i) => (
            <Reveal
              key={s.nombre}
              as="li"
              delay={i * 80}
              className="bg-ink p-8 lg:p-10"
            >
              <s.Icon className="h-8 w-8 text-azul" />
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em]">
                {s.nombre}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                {s.detalle}
              </p>
            </Reveal>
          ))}

          <Reveal
            as="li"
            delay={sectores.length * 80}
            className="flex flex-col justify-between bg-ink p-8 lg:p-10"
          >
            <h3 className="text-xl font-semibold tracking-[-0.025em] text-white/50">
              ¿Tu rubro no está acá?
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
              Nuestra red comercial trabaja con segmentos muy diversos.{" "}
              <a
                href="#contacto"
                className="font-medium text-azul underline-offset-4 hover:underline"
              >
                Contanos qué necesitás financiar.
              </a>
            </p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
