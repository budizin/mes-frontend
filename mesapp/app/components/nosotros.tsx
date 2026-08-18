import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const numeros = [
  { valor: "+20", label: "años de experiencia en el sector financiero" },
  { valor: "14", label: "productores distribuidos en todo el país" },
  { valor: "100%", label: "enfocados en financiamiento productivo" },
];

const socios = [
  {
    nombre: "Martín Ibarra",
    rol: "Socio fundador",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    nombre: "Lucía Fernández",
    rol: "Socia · Riesgo y estructuración",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop",
  },
  {
    nombre: "Diego Alonso",
    rol: "Socio · Relación con entidades",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop",
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="scroll-mt-24">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Quiénes somos"
          title="Un equipo que ya estuvo del otro lado"
          lead="Més Capital nació de la experiencia de tres socios con más de veinte años en el sector financiero. Conocen cómo se evalúa una operación por dentro, y eso es exactamente lo que aplican al armar la tuya."
        />

        {/* Barra de números: refuerza en cifras lo que dice el lead de arriba */}
        <Reveal delay={90}>
          <dl className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 border-y border-linea py-8 sm:grid-cols-3 lg:mt-16">
            {numeros.map((n, i) => (
              <div
                key={n.label}
                className={
                  i > 0
                    ? "sm:border-l sm:border-linea sm:pl-8"
                    : undefined
                }
              >
                <dt className="sr-only">{n.label}</dt>
                <dd className="font-sans text-4xl font-bold tracking-[-0.03em] text-azul">
                  {n.valor}
                </dd>
                <p className="mt-2 max-w-[24ch] text-[0.9375rem] text-ink-soft">
                  {n.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* El divisor vertical azul, tal como aparece en el brand book */}
        <div className="relative mt-16 grid grid-cols-1 gap-x-16 gap-y-12 lg:mt-20 lg:grid-cols-2">
          <span
            aria-hidden="true"
            className="spine absolute inset-y-0 left-1/2 hidden w-[2px] lg:block"
          />

          <Reveal>
            <h3 className="text-2xl font-bold tracking-[-0.03em]">
              Nuestra misión
            </h3>
            <p className="mt-5 max-w-[46ch] text-ink-soft">
              Brindar acceso ágil, transparente y eficiente a soluciones
              financieras que impulsen el crecimiento empresarial, acompañando a
              cada cliente con asesoramiento especializado y herramientas que
              fortalezcan su desarrollo, su competitividad y su capacidad de
              inversión en el largo plazo.
            </p>
          </Reveal>

          <Reveal delay={110} className="lg:pl-4">
            <h3 className="text-2xl font-bold tracking-[-0.03em]">
              Nuestra visión
            </h3>
            <p className="mt-5 max-w-[46ch] text-ink-soft">
              Consolidarnos como el bróker financiero de referencia en
              soluciones integrales para empresas, destacándonos por nuestra
              innovación, calidad de servicio y capacidad para generar
              oportunidades de crecimiento sostenible en todos los sectores
              productivos.
            </p>
          </Reveal>
        </div>

        {/* Socios: cierra la sección poniendo cara a los "tres socios" del lead */}
        <div className="mt-20 lg:mt-24">
          <Reveal>
            <h3 className="text-2xl font-bold tracking-[-0.03em]">
              Los socios
            </h3>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
            {socios.map((s, i) => (
              <Reveal
                key={s.nombre}
                as="li"
                delay={i * 90}
                className="border-t border-linea pt-5"
              >
                <Image
                  src={s.foto}
                  alt=""
                  aria-hidden="true"
                  width={256}
                  height={256}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="mt-4 font-semibold tracking-[-0.01em]">
                  {s.nombre}
                </p>
                <p className="mt-1 text-[0.9375rem] text-ink-faint">
                  {s.rol}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
