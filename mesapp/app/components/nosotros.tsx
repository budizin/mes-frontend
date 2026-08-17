import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Nosotros() {
  return (
    <section id="nosotros" className="scroll-mt-24">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Quiénes somos"
          title="Un equipo que ya estuvo del otro lado"
          lead="Més Capital nació de la experiencia de tres socios con más de veinte años en el sector financiero. Conocen cómo se evalúa una operación por dentro, y eso es exactamente lo que aplican al armar la tuya."
        />

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
      </div>
    </section>
  );
}
