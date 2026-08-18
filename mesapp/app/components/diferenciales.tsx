import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const puntos = [
  {
    disco: "bg-azul",
    titulo: "Una gestión, varias entidades",
    texto:
      "En vez de golpear puerta por puerta, presentás la operación una sola vez y nosotros la llevamos a las entidades que corresponden.",
  },
  {
    disco: "bg-naranja",
    titulo: "Especialistas, no generalistas",
    texto:
      "Trabajamos solo con financiamiento productivo, lo que nos permite estructurar operaciones con precisión técnica.",
  },
  {
    disco: "bg-amarillo",
    titulo: "Alta tasa de aprobación",
    texto:
      "Presentamos operaciones prefiltradas y bien armadas. Llegan a la entidad listas para analizar, no para corregir.",
  },
  {
    disco: "bg-azul",
    titulo: "Nichos que la banca no atiende",
    texto:
      "Enfocamos segmentos que la banca tradicional deja afuera por tamaño, estacionalidad o complejidad del activo.",
  },
  {
    disco: "bg-naranja",
    titulo: "Presencia territorial",
    texto:
      "Catorce productores distribuidos en el país. El que analiza tu operación conoce la zona y la actividad.",
  },
  {
    disco: "bg-amarillo",
    titulo: "Acompañamiento hasta el final",
    texto:
      "El seguimiento no termina con la aprobación: gestionamos requisitos, contratos y la puesta en marcha.",
  },
];

/* Divisores del grid: línea arriba al saltar de fila, línea a la izquierda
   entre columnas. Los quiebres de columna dependen del breakpoint (1/2/3
   por fila), así que cada eje se resuelve por separado según el índice.
   La línea horizontal se dibuja con un pseudo-elemento (no con border-t)
   para poder extenderla sobre el gap-x-10 y que no quede cortada entre
   columnas; solo se extiende hacia adentro, nunca más allá del borde
   exterior del grid. */
/* Clases antes:left/antes:right completas y literales (no armadas por
   concatenación): Tailwind extrae clases escaneando el archivo en busca de
   substrings exactos, así que un `before:${cond ? "-left-5" : "left-0"}`
   nunca se detecta y la clase se pierde en build. */
const ANTES_SM_IZQ_EXT = "sm:before:-left-5";
const ANTES_SM_IZQ_0 = "sm:before:left-0";
const ANTES_SM_DER_EXT = "sm:before:-right-5";
const ANTES_SM_DER_0 = "sm:before:right-0";
const ANTES_LG_IZQ_EXT = "lg:before:-left-5";
const ANTES_LG_IZQ_0 = "lg:before:left-0";
const ANTES_LG_DER_EXT = "lg:before:-right-5";
const ANTES_LG_DER_0 = "lg:before:right-0";

function bordes(i: number) {
  const filaSm = i >= 2;
  const filaLg = i >= 3;
  const colSm = i % 2 !== 0;
  const colLg = i % 3 !== 0;
  const derSm = i % 2 === 0;
  const derLg = i % 3 !== 2;

  return [
    "relative pb-10",
    i > 0 &&
      "pt-10 before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-linea before:content-['']",
    filaSm
      ? [
          "sm:pt-10 sm:before:block",
          colSm ? ANTES_SM_IZQ_EXT : ANTES_SM_IZQ_0,
          derSm ? ANTES_SM_DER_EXT : ANTES_SM_DER_0,
        ].join(" ")
      : "sm:pt-0 sm:before:hidden",
    colSm ? "sm:border-l sm:border-linea sm:pl-8" : "sm:border-l-0 sm:pl-0",
    filaLg
      ? [
          "lg:pt-12 lg:before:block",
          colLg ? ANTES_LG_IZQ_EXT : ANTES_LG_IZQ_0,
          derLg ? ANTES_LG_DER_EXT : ANTES_LG_DER_0,
        ].join(" ")
      : "lg:pt-0 lg:before:hidden",
    colLg ? "lg:border-l lg:border-linea lg:pl-9" : "lg:border-l-0 lg:pl-0",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Diferenciales() {
  return (
    <section className="border-y border-linea bg-niebla">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Por qué Més"
          title="Un bróker cambia el resultado, no solo el trámite"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {puntos.map((p, i) => (
            <Reveal key={p.titulo} delay={(i % 3) * 90} className={bordes(i)}>
              <span
                className={`num flex h-9 w-9 items-center justify-center rounded-full text-[0.8125rem] font-bold text-white ${p.disco}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
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
