import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const activas = [
  "Salta",
  "Mendoza",
  "Santa Fe",
  "Entre Ríos",
  "Córdoba",
  "CABA",
  "Buenos Aires",
];

const proximas = ["Río Negro", "Jujuy", "Corrientes", "San Juan"];

export function Cobertura() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Cobertura"
          title="Donde ya operamos"
          lead="La red comercial se apoya en productores con conocimiento territorial. No es una casilla de correo central: es gente que trabaja en la provincia."
        />

        <Reveal delay={120}>
          <ul className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 lg:mt-16">
            {activas.map((p) => (
              <li
                key={p}
                className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.035em]"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 border-t border-linea pt-8">
            <p className="eyebrow text-ink-faint">Próxima expansión</p>
            <ul className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              {proximas.map((p) => (
                <li
                  key={p}
                  className="text-[clamp(1.25rem,2.4vw,2rem)] font-bold leading-[1.2] tracking-[-0.03em] text-ink-faint"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
