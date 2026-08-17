import { Reveal } from "./reveal";

const beneficios = [
  {
    titulo: "Operaciones prefiltradas",
    texto:
      "Un flujo constante de carpetas ya evaluadas, que reduce el tiempo de análisis de tu equipo de riesgo.",
  },
  {
    titulo: "Originación más barata",
    texto:
      "Volumen incremental sin sumar costo de captación ni fuerza comercial propia.",
  },
  {
    titulo: "Alcance sin sucursales",
    texto:
      "Presencia en provincias donde no tenés estructura física, a través de nuestra red de productores.",
  },
  {
    titulo: "Acuerdos de vendoring",
    texto:
      "Financiamos a los clientes de proveedores de bienes de capital, con el vendor como canal.",
  },
];

export function Aliados() {
  return (
    <section className="bg-azul text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-white/60">
                Entidades financieras y vendors
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-[16ch] font-display text-title font-bold text-balance">
                Sumá volumen sin sumar estructura
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-[44ch] text-lead text-white/80">
                Para el otro lado del mostrador, Més es un canal de captación
                eficiente y de bajo costo.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a
                href="#contacto"
                className="mt-9 inline-block rounded-full bg-white px-7 py-4 font-semibold text-azul transition-colors hover:bg-ink hover:text-white"
              >
                Conversemos como aliados
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
              {beneficios.map((b, i) => (
                <Reveal key={b.titulo} delay={(i % 2) * 90}>
                  <div className="border-t border-white/25 py-7">
                    <dt className="text-lg font-semibold tracking-[-0.02em]">
                      {b.titulo}
                    </dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/75">
                      {b.texto}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
