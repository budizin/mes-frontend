import { Mark } from "./brand";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const productos = [
  {
    disco: "bg-azul",
    nombre: "Leasing",
    resumen:
      "Usás el bien desde el primer día y decidís al final si lo comprás. La cuota es gasto deducible y el IVA se computa a lo largo del contrato, en lugar de pagarlo todo al inicio.",
    paraLabel: "Se financia",
    para: [
      "Maquinaria agrícola y viales",
      "Camiones, acoplados y utilitarios",
      "Equipamiento industrial",
      "Tecnología y equipos de trabajo",
    ],
  },
  {
    disco: "bg-naranja",
    nombre: "Préstamos prendarios",
    resumen:
      "El bien que comprás queda en garantía y eso baja el costo del crédito. Plazo y cuota definidos desde el arranque, con una estructura simple de aprobar.",
    paraLabel: "Se financia",
    para: [
      "Unidades 0 km y usadas",
      "Vehículos utilitarios de flota",
      "Maquinaria con inscripción prendaria",
      "Renovación de activos productivos",
    ],
  },
  {
    disco: "bg-amarillo",
    nombre: "Seguros de caución",
    resumen:
      "Garantizás el cumplimiento de un contrato sin inmovilizar capital ni consumir tus líneas de crédito bancarias. Trabajamos con Afianzadora como aliado estratégico.",
    paraLabel: "Se garantiza",
    para: [
      "Licitaciones y adjudicaciones",
      "Obra pública y privada",
      "Anticipos de contrato",
      "Alquileres comerciales",
    ],
  },
];

export function Productos() {
  return (
    <section id="productos" className="scroll-mt-24">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Productos"
          title="Tres formas de financiar tu próxima inversión"
          lead="No vendemos un producto: analizamos la operación y proponemos el instrumento que mejor le sirve a tu flujo de caja."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-12 lg:mt-20 lg:grid-cols-3 lg:gap-x-0">
          {productos.map((p, i) => (
            <Reveal
              key={p.nombre}
              delay={i * 110}
              className={`lg:px-9 lg:first:pl-0 lg:last:pr-0 ${
                i > 0 ? "border-t border-linea pt-12 lg:border-t-0 lg:border-l lg:pt-0" : ""
              }`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full ${p.disco}`}
              >
                <Mark className="h-[1.1rem] w-auto text-white" />
              </span>

              <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em]">
                {p.nombre}
              </h3>

              <p className="mt-4 text-ink-soft">{p.resumen}</p>

              <p className="eyebrow mt-9 text-ink-faint">{p.paraLabel}</p>
              <ul className="mt-4 space-y-2.5">
                {p.para.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3.5 shrink-0 bg-azul"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
