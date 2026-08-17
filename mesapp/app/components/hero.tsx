import { Mark } from "./brand";

/**
 * Hero sobre blanco: arranca detrás del header —de ahí el padding superior en
 * lugar de un margen— para que el fondo llegue hasta el borde de la pantalla.
 *
 * Sin bloque de color que sostenga la página, el peso lo llevan la tipografía y
 * un único objeto saturado: el CTA naranja. El isotipo es el resto del color, y
 * va bajo para que ese botón siga siendo lo primero que se ve.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="hero-claro relative isolate overflow-hidden"
    >
      {/* El isotipo a escala de página: recortado por el borde, es textura, no
          logo. En espectro recorre los tres colores del sistema, tan bajo que
          se lee como variación de temperatura antes que como color.

          En móvil va mucho más chico: a 128% de alto sobre un viewport angosto
          sólo entran fragmentos de sus bordes, que sobre blanco se leen como
          cortes diagonales sueltos en vez de como la marca. */}
      <Mark
        espectro
        className="pointer-events-none absolute -top-[3%] -right-[24%] -z-10 h-[46%] w-auto opacity-[0.07] lg:-top-[18%] lg:-right-[6%] lg:h-[132%]"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-[80rem] flex-col justify-center px-6 pt-[7rem] pb-12 lg:px-10 lg:pt-[8rem] lg:pb-6">
        <p className="entra eyebrow text-azul">
          Bróker de soluciones financieras
        </p>

        <h1
          className="entra mt-6 max-w-[17ch] font-display text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.035em] text-ink text-balance"
          style={{ animationDelay: "80ms" }}
        >
          Financiamos lo que tu empresa produce.
        </h1>

        <p
          className="entra mt-7 max-w-[52ch] text-lead text-ink-soft"
          style={{ animationDelay: "160ms" }}
        >
          Analizamos tu operación y la presentamos a la entidad con más chances
          de aprobarla. Leasing, préstamos prendarios y seguros de caución para
          empresas de sectores productivos.
        </p>

        {/* Los dos comparten alto (56px) y eje: leen como un par de piezas con
            distinto peso, no como un botón con una nota al pie. */}
        <div
          className="entra mt-10 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2"
          style={{ animationDelay: "240ms" }}
        >
          {/* El único objeto saturado del hero. Blanco sobre #0d99ff da ~3:1 y
              sobre #0061ad da >7:1, así que el texto se mantiene legible
              mientras el fondo barre desde la izquierda. */}
          <a
            href="#contacto"
            className="group relative isolate overflow-hidden rounded-full bg-azul px-7 py-4 font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-azul-deep transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
            Solicitar financiamiento
          </a>

          {/* Mismo alto y radio que el primario: con borde propio, forma un
              segundo pill del mismo peso visual en vez de quedar como texto
              suelto al lado de un botón. */}
          <a
            href="#productos"
            className="group inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-5 py-4 font-semibold text-ink"
          >
            Ver productos
            {/* SVG y no "→": el carácter viene en un peso hairline que no
                acompaña al semibold del texto. Círculo propio para que
                funcione como ícono, no como apéndice del texto. En tinta,
                no en celeste: hace contraste con el primario en vez de
                repetirlo. */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink transition-transform duration-200 group-hover:translate-x-1">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 text-white"
              >
                <path
                  d="M2.5 8h11M9.5 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
