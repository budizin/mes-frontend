"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "./brand";
import {
  IconAgro,
  IconLogistica,
  IconMetal,
  IconVino,
} from "./sector-icons";

/** Rota cada 10s. La primera es la que carga con la página —la única
 * sincronizada con la animación de entrada del hero—; el resto de las
 * palabras a encender son las que más "prenden" en cada frase.
 *
 * El corte entre `lineas[0]` y `lineas[1]` es manual: con títulos de largo
 * tan distinto, dejar que el navegador balancee el salto de línea da a
 * veces 2 renglones y a veces 3. Partiendo la frase a mano garantiza
 * siempre dos, sin importar el ancho de pantalla.
 *
 * `ajustePx` achica el tamaño de esa frase puntual: "Financiamiento para
 * hacer..." quedaba justa en el ancho del renglón más largo. */
type Titulo = { lineas: [string, string]; enciende: string[]; ajustePx?: number };

const TITULOS: Titulo[] = [
  {
    lineas: ["Impulsamos lo que", "tu empresa construye."],
    enciende: ["Impulsamos", "empresa"],
  },
  {
    lineas: ["Financiamiento para hacer", "crecer tu producción."],
    enciende: ["Financiamiento", "producción"],
    ajustePx: 2,
  },
  {
    lineas: ["Hacemos posible", "tu próxima inversión."],
    enciende: ["posible", "inversión"],
  },
  {
    lineas: ["Capital para mover", "tu empresa."],
    enciende: ["Capital", "empresa"],
  },
  {
    lineas: ["Tu producción, con el", "respaldo que necesita."],
    enciende: ["producción", "respaldo"],
  },
];

const DURACION_MS = 10000;
const CROSSFADE_MS = 600;

/** Recorrido máximo (px) del tilt magnético del racimo al mover el mouse.
 * Los círculos grandes —más al fondo visualmente— se mueven menos que los
 * badges chicos: la diferencia de recorrido es lo que vende profundidad. */
const CIRCLE_TILT = 1;
const BADGE_TILT = 2;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Burbujas del CTA: al hover, sueltan el isotipo en miniatura sobre celeste
 * —dos arriba a la derecha, tres abajo a la izquierda—, como si el botón las
 * despidiera. `dx`/`dy` es el desplazamiento final desde la esquina del
 * botón; el delay escalona la salida para que no "exploten" todas juntas. */
type Burbuja = {
  lado: "tr" | "bl";
  size: number;
  iconSize: number;
  /** Separación en reposo respecto al borde del botón (antes de dx/dy). */
  gap: number;
  dx: number;
  dy: number;
  /** Rotación final, en grados: rompe la grilla para que no queden todas
   * "paradas" igual, más orgánico. */
  rot: number;
  delay: number;
};

const BURBUJAS: Burbuja[] = [
  { lado: "tr", size: 20, iconSize: 10, gap: 2, dx: -9, dy: -21, rot: -10, delay: 0 },
  { lado: "tr", size: 13, iconSize: 6, gap: 2, dx: 5, dy: -7, rot: 14, delay: 90 },
  { lado: "bl", size: 18, iconSize: 9, gap: 2, dx: -8, dy: 8, rot: 9, delay: 40 },
  { lado: "bl", size: 13, iconSize: 6, gap: 0, dx: -16, dy: -10, rot: -12, delay: 130 },
  { lado: "bl", size: 12, iconSize: 6, gap: 2, dx: 12, dy: 12, rot: 8, delay: 200 },
];

function renderLinea(
  texto: string,
  enciende: string[],
  delayBase: number,
  nInicial: number,
  prefijo: string,
) {
  const patron = new RegExp(`(${enciende.join("|")})`, "g");
  const partes = texto.split(patron);
  let n = nInicial;

  const nodos = partes.map((parte, i) => {
    if (enciende.includes(parte)) {
      const delay = delayBase + n * 280;
      n += 1;
      return (
        <span key={`${prefijo}-${i}`} className="enciende" style={{ animationDelay: `${delay}ms` }}>
          {parte}
        </span>
      );
    }
    return <span key={`${prefijo}-${i}`}>{parte}</span>;
  });

  return { nodos, n };
}

function renderTitulo(titulo: Titulo, indice: number, delayBase: number) {
  // Prefijo con el índice del título: fuerza a React a montar spans nuevos
  // en cada rotación, así la animación "enciende" siempre arranca en tinta
  // (000) en vez de heredar el amarillo con el que terminó la vez anterior.
  const linea1 = renderLinea(titulo.lineas[0], titulo.enciende, delayBase, 0, `${indice}-l1`);
  const linea2 = renderLinea(titulo.lineas[1], titulo.enciende, delayBase, linea1.n, `${indice}-l2`);

  return (
    <>
      {/* Cada mitad va sin wrap propio desde lg —donde hay ancho de sobra—
          para que sea exactamente el renglón que definimos arriba y el
          navegador no la envuelva de nuevo. En mobile, sin ese ancho, se
          deja balancear con text-balance en vez de desbordar. */}
      <span className="block lg:whitespace-nowrap">{linea1.nodos}</span>
      <span className="block lg:whitespace-nowrap">{linea2.nodos}</span>
    </>
  );
}

/**
 * Hero sobre blanco: arranca detrás del header —de ahí el padding superior en
 * lugar de un margen— para que el fondo llegue hasta el borde de la pantalla.
 *
 * Sin bloque de color que sostenga la página, el peso lo llevan la tipografía y
 * un único objeto saturado: el CTA naranja.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [ctaHover, setCtaHover] = useState(false);
  const [parallax, setParallax] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Normaliza la posición del mouse contra el centro del racimo (-1..1 por
    // eje) en vez de contra el viewport: así el tilt responde al mismo
    // aunque el racimo esté corrido por el parallax de scroll.
    let ticking = false;
    let lastEvent: MouseEvent | null = null;

    function aplicar() {
      ticking = false;
      if (!lastEvent || !clusterRef.current) return;
      const rect = clusterRef.current.getBoundingClientRect();
      const nx = clamp((lastEvent.clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
      const ny = clamp((lastEvent.clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1);
      setTilt({ x: nx, y: ny });
    }

    function onMove(e: MouseEvent) {
      lastEvent = e;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(aplicar);
      }
    }

    function onLeave() {
      setTilt({ x: 0, y: 0 });
    }

    const section = sectionRef.current;
    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("mouseleave", onLeave);
    return () => {
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const rota = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % TITULOS.length);
        setVisible(true);
      }, CROSSFADE_MS);
    }, DURACION_MS);
    return () => clearInterval(rota);
  }, []);

  useEffect(() => {
    // El racimo se mueve más lento que el resto del contenido —efecto
    // clásico de profundidad—: se tope a los 70px para que no siga
    // corriendo hacia abajo una vez que Entidades ya lo tapó por completo.
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setParallax(Math.min(window.scrollY * 0.15, 70));
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const titulo = TITULOS[index];

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero-claro relative isolate overflow-x-clip"
    >
      {/* Racimo de badges: la misma paleta que separa los tres productos.
          Vive acá —antes que Entidades en el documento— para que esa
          sección, opaca, lo tape de verdad al pintarse encima; sólo asoman
          los bordes que exceden su alto. Los tres chicos con pictograma no
          repiten la M: son los rubros que más se financian —camiones,
          maquinaria, obra— así que suman variedad sin perder el sistema. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full -z-10 -translate-x-[25px] -translate-y-[180px] scale-[0.6] sm:translate-x-0 sm:-translate-y-[196px] sm:scale-[0.82] lg:-translate-y-[196px] lg:scale-100"
      >
        <div
          ref={clusterRef}
          className="relative mx-auto flex w-fit items-center justify-center gap-1 lg:gap-2"
          style={{ transform: `translateY(${parallax}px) rotate(${parallax * 0.05}deg)` }}
        >
          {/* Cada pieza es dos spans: el de afuera guarda posición/tamaño/
              rotación (clases Tailwind, sin tocar); el de adentro es el que
              se corre con el tilt del mouse vía style inline, así los dos
              transforms no se pisan. */}
          <span className="flex h-36 w-36 -rotate-6 items-center justify-center lg:h-48 lg:w-48">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-naranja transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * CIRCLE_TILT}px, ${tilt.y * CIRCLE_TILT}px, 0)` }}
            >
              <Mark className="h-16 w-auto text-white lg:h-[5.5rem]" />
            </span>
          </span>
          <span className="flex h-56 w-56 rotate-3 items-center justify-center lg:h-80 lg:w-80">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-azul transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * CIRCLE_TILT}px, ${tilt.y * CIRCLE_TILT}px, 0)` }}
            >
              <Mark className="h-24 w-auto text-white lg:h-32" />
            </span>
          </span>
          <span className="flex h-36 w-36 rotate-12 items-center justify-center lg:h-48 lg:w-48">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-amarillo transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * CIRCLE_TILT}px, ${tilt.y * CIRCLE_TILT}px, 0)` }}
            >
              <Mark className="h-16 w-auto text-white lg:h-[5.5rem]" />
            </span>
          </span>

          <span className="absolute top-1/2 left-[112px] h-12 w-12 -translate-y-[calc(50%+100px)] -rotate-12 lg:left-[154px] lg:h-16 lg:w-16">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-azul transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * BADGE_TILT}px, ${tilt.y * BADGE_TILT}px, 0)` }}
            >
              <IconLogistica className="h-6 w-6 text-white lg:h-8 lg:w-8" />
            </span>
          </span>
          <span className="absolute top-1/2 left-[364px] h-10 w-10 -translate-y-[calc(50%+100px)] rotate-6 lg:left-[506px] lg:h-14 lg:w-14">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-azul transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * BADGE_TILT}px, ${tilt.y * BADGE_TILT}px, 0)` }}
            >
              <IconMetal className="h-5 w-5 text-white lg:h-7 lg:w-7" />
            </span>
          </span>
          {/* Par de remates celestes: cierran el racimo por afuera, a la
              altura de naranja y amarillo, sin sumar un cuarto color. */}
          <span className="absolute top-1/2 left-[-60px] h-11 w-11 -translate-y-1/2 -rotate-6 lg:left-[-68px] lg:h-14 lg:w-14">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-azul transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * BADGE_TILT}px, ${tilt.y * BADGE_TILT}px, 0)` }}
            >
              <IconAgro className="h-5 w-5 text-white lg:h-7 lg:w-7" />
            </span>
          </span>
          <span className="absolute top-1/2 right-[-60px] h-11 w-11 -translate-y-1/2 rotate-6 lg:right-[-68px] lg:h-14 lg:w-14">
            <span
              className="flex h-full w-full items-center justify-center rounded-full bg-azul transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(${tilt.x * BADGE_TILT}px, ${tilt.y * BADGE_TILT}px, 0)` }}
            >
              <IconVino className="h-5 w-5 text-white lg:h-7 lg:w-7" />
            </span>
          </span>
        </div>
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-[80rem] -translate-y-[132px] flex-col items-center justify-center px-6 pt-[7rem] pb-12 text-center lg:px-10 lg:pt-[8rem] lg:pb-6">
        <p className="entra eyebrow text-azul">
          Financiación para empresas productivas
        </p>

        <h1
          className="entra mt-6 max-w-[22ch] font-display leading-[0.92] font-bold tracking-[-0.035em] text-ink text-balance transition-[opacity,filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:max-w-none"
          style={{
            animationDelay: "80ms",
            opacity: visible ? 1 : 0,
            filter: visible ? "blur(0px)" : "blur(6px)",
            transform: visible ? "scale(1)" : "scale(0.985)",
            fontSize: `calc(clamp(2.25rem, 6.4vw, 5.375rem) - ${titulo.ajustePx ?? 0}px)`,
          }}
        >
          {renderTitulo(titulo, index, index === 0 ? 950 : 250)}
        </h1>

        <p
          className="entra mt-7 max-w-[52ch] text-[clamp(0.875rem,1.5vw,1.125rem)] leading-[1.5] text-ink-soft"
          style={{ animationDelay: "160ms" }}
        >
          Leasing, préstamos prendarios y seguros de caución para empresas de
          sectores productivos.
        </p>

        {/* Los dos comparten alto (56px) y eje: leen como un par de piezas con
            distinto peso, no como un botón con una nota al pie. */}
        <div
          className="entra mt-10 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2"
          style={{ animationDelay: "240ms" }}
        >
          {/* El único objeto saturado del hero: al pasar el mouse crece
              levemente en vez de cambiar de color, para no competir con el
              barrido cian del fondo. */}
          <a
            href="#contacto"
            className="relative rounded-full bg-azul px-6 py-3 font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            Solicitar financiamiento

            {/* Cada burbuja son dos spans anidados en vez de un fade in plano:
                el de afuera sólo mueve el eje X, el de adentro mueve el eje Y
                (con más duración) y hace el pop de escala con un easing que
                pasa de largo antes de asentarse. Al no llegar juntos, el
                recorrido se lee curvo en vez de una línea recta —y el
                rebote de escala vende que es algo que "brota", no que
                aparece—. */}
            {BURBUJAS.map((b, i) => {
              /* Al retirarse van en orden inverso al que salieron: la última
                 en aparecer es la primera en volver, como si el botón las
                 succionara de nuevo —no un simple "todas a la vez". La curva
                 de salida acelera (ease-in) en vez de desacelerar, para que
                 se sienta como succión y no como un rebote más. */
              const delaySalida = (200 - b.delay) * 0.35;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{
                    width: b.size,
                    height: b.size,
                    top: b.lado === "tr" ? -b.gap : undefined,
                    right: b.lado === "tr" ? -b.gap : undefined,
                    bottom: b.lado === "bl" ? -b.gap : undefined,
                    left: b.lado === "bl" ? -b.gap : undefined,
                    opacity: ctaHover ? 1 : 0,
                    translate: ctaHover ? `${b.dx}px 0px` : "0px 0px",
                    transition: ctaHover
                      ? `translate 600ms cubic-bezier(0.16,1,0.3,1) ${b.delay}ms, opacity 500ms ease-out ${b.delay}ms`
                      : `translate 340ms cubic-bezier(0.55,0,1,0.45) ${delaySalida}ms, opacity 260ms ease-in ${delaySalida}ms`,
                  }}
                >
                  <span
                    className="flex h-full w-full items-center justify-center rounded-full bg-azul shadow-sm"
                    style={{
                      translate: ctaHover ? `0px ${b.dy}px` : "0px 0px",
                      scale: ctaHover ? 1 : 0,
                      rotate: ctaHover ? `${b.rot}deg` : "0deg",
                      transition: ctaHover
                        ? `translate 780ms cubic-bezier(0.16,1,0.3,1) ${b.delay}ms, scale 640ms cubic-bezier(0.34,1.56,0.64,1) ${b.delay}ms, rotate 700ms cubic-bezier(0.16,1,0.3,1) ${b.delay}ms`
                        : `translate 300ms cubic-bezier(0.55,0,1,0.45) ${delaySalida}ms, scale 320ms cubic-bezier(0.55,0,1,0.45) ${delaySalida}ms, rotate 320ms cubic-bezier(0.55,0,1,0.45) ${delaySalida}ms`,
                    }}
                  >
                    <Mark className="text-white" style={{ width: b.iconSize, height: b.iconSize }} />
                  </span>
                </span>
              );
            })}
          </a>

          {/* Mismo alto y radio que el primario: con borde propio, forma un
              segundo pill del mismo peso visual en vez de quedar como texto
              suelto al lado de un botón. */}
          <a
            href="#productos"
            className="group hidden items-center gap-2.5 rounded-full border border-ink/15 px-4 py-3 font-normal text-ink-soft transition-[color,border-color,font-weight] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:font-medium hover:text-ink lg:inline-flex"
          >
            Ver productos
            {/* SVG y no "→": el carácter viene en un peso hairline que no
                acompaña al semibold del texto. Círculo propio para que
                funcione como ícono, no como apéndice del texto. En tinta,
                no en celeste: hace contraste con el primario en vez de
                repetirlo. */}
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-ink opacity-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.36] group-hover:opacity-100"
              />
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="relative h-4 w-4 text-white transition-[height,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-[22px] group-hover:w-[22px]"
              >
                <path
                  d="M2.5 8h11M9.5 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
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
