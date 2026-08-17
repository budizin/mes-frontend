import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const puntos = [
  {
    titulo: "Una gestión, varias entidades",
    texto:
      "En vez de golpear puerta por puerta, presentás la operación una sola vez y nosotros la llevamos a las entidades que corresponden.",
  },
  {
    titulo: "Especialistas, no generalistas",
    texto:
      "Trabajamos solo con financiamiento productivo. Esa concentración es lo que nos permite estructurar operaciones con precisión técnica.",
  },
  {
    titulo: "Alta tasa de aprobación",
    texto:
      "Presentamos operaciones prefiltradas y bien armadas. Llegan a la entidad listas para analizar, no para corregir.",
  },
  {
    titulo: "Nichos que la banca no atiende",
    texto:
      "Enfocamos segmentos que la banca tradicional deja afuera por tamaño, estacionalidad o complejidad del activo.",
  },
  {
    titulo: "Presencia territorial",
    texto:
      "Catorce productores distribuidos en el país. El que analiza tu operación conoce la zona y la actividad.",
  },
  {
    titulo: "Acompañamiento hasta el final",
    texto:
      "El seguimiento no termina con la aprobación: gestionamos requisitos, contratos y la puesta en marcha.",
  },
];

export function Diferenciales() {
  return (
    <section className="border-y border-linea bg-niebla">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Por qué Més"
          title="Un bróker cambia el resultado, no solo el trámite"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {puntos.map((p, i) => (
            <Reveal key={p.titulo} delay={(i % 3) * 90}>
              <h3 className="text-lg font-semibold tracking-[-0.02em]">
                {p.titulo}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {p.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
