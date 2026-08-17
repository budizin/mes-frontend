import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const pasos = [
  {
    titulo: "Recepción y análisis",
    texto:
      "Identificamos qué necesitás, juntamos la información y definimos cuál de los tres productos resuelve mejor la operación.",
  },
  {
    titulo: "Evaluación crediticia",
    texto:
      "Análisis técnico y financiero del cliente y del proyecto: capacidad de pago, garantías y riesgo asociado.",
  },
  {
    titulo: "Presentación a entidades",
    texto:
      "Armamos la propuesta completa y la estructuramos para presentarla a las entidades con más chances de aprobarla.",
  },
  {
    titulo: "Seguimiento y cierre",
    texto:
      "Coordinamos hasta la aprobación definitiva y gestionamos los requisitos administrativos y contractuales.",
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="scroll-mt-24">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Cómo trabajamos"
                title="De la consulta a la aprobación"
                lead="Vos hablás con una sola persona. Nosotros hablamos con todas las entidades."
              />
            </div>
          </div>

          <ol className="relative lg:col-span-7">
            {/* El eje del brand, acá haciendo de línea de tiempo */}
            <span
              aria-hidden="true"
              className="spine absolute left-[1.4375rem] top-0 bottom-0 w-px"
            />

            {pasos.map((paso, i) => (
              <Reveal
                key={paso.titulo}
                as="li"
                delay={i * 90}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                <span className="num relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-azul bg-white text-[0.9375rem] font-bold text-azul">
                  {i + 1}
                </span>
                <div className="pt-2.5">
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">
                    {paso.titulo}
                  </h3>
                  <p className="mt-2.5 max-w-[48ch] text-ink-soft">
                    {paso.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
