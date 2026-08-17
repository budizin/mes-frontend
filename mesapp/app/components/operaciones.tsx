"use client";

import { useEffect, useState } from "react";

/**
 * Ejemplos de operación, no un historial: son casos tipo que ilustran qué
 * financia cada instrumento. Por eso van sin entidad ni monto — nombrarlos
 * sería afirmar una operación concreta que no existe.
 *
 * `acento` no es decoración: es el mismo color con que la sección Productos
 * identifica a cada instrumento. Leyendo el hero ya se aprende el código.
 */
const operaciones = [
  {
    sector: "Agro",
    bien: "Cosechadora autopropulsada",
    instrumento: "Leasing",
    plazo: "48 meses",
    acento: "bg-azul",
  },
  {
    sector: "Logística",
    bien: "Flota de utilitarios 0 km",
    instrumento: "Préstamo prendario",
    plazo: "36 meses",
    acento: "bg-naranja",
  },
  {
    sector: "Construcción",
    bien: "Garantía de licitación",
    instrumento: "Seguro de caución",
    plazo: "Obra pública",
    acento: "bg-amarillo",
  },
  {
    sector: "Vitivinicultura",
    bien: "Línea de embotellado",
    instrumento: "Leasing",
    plazo: "60 meses",
    acento: "bg-azul",
  },
];

const CICLO = 4200;

/** Remate del hero: una operación por vez, rotando. */
export function Operaciones() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % operaciones.length), CICLO);
    return () => clearInterval(id);
  }, []);

  const op = operaciones[i];

  return (
    <div className="py-7 lg:py-8">
      {/* La regla que cierra el hero es también el indicador del ciclo: un solo
          elemento hace de borde, de progreso y de leyenda de color. */}
      <div className="relative h-[3px] w-full overflow-hidden bg-linea">
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 block transition-[transform,background-color] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${op.acento}`}
          style={{
            width: `${100 / operaciones.length}%`,
            transform: `translateX(${i * 100}%)`,
          }}
        />
      </div>

      <p className="eyebrow mt-7 text-ink-faint">Ejemplos de operación</p>

      {/* `key` reinicia el fundido en cada cambio; la altura mínima evita el salto */}
      <div
        key={op.bien}
        className="entra mt-5 grid min-h-[3.5rem] grid-cols-2 gap-x-6 gap-y-5 lg:flex lg:min-h-0 lg:items-baseline lg:gap-16"
        style={{ animationDuration: "0.6s" }}
        aria-live="polite"
      >
        <Dato etiqueta="Bien" valor={op.bien} />
        <Dato
          etiqueta="Instrumento"
          valor={`${op.instrumento} · ${op.plazo}`}
          disco={op.acento}
        />
        <Dato etiqueta="Sector" valor={op.sector} />
      </div>
    </div>
  );
}

function Dato({
  etiqueta,
  valor,
  disco,
}: {
  etiqueta: string;
  valor: string;
  /** El disco de color, igual que en Productos, sólo marca el instrumento. */
  disco?: string;
}) {
  return (
    <div className="lg:min-w-[13rem]">
      <p className="eyebrow text-ink-faint">{etiqueta}</p>
      <p className="num mt-2 flex items-start gap-2.5 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink lg:text-base">
        {disco && (
          /* `items-start` + margen: en móvil el valor envuelve a dos líneas y
             centrarlo dejaría el disco flotando entre ambas. */
          <span
            aria-hidden="true"
            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${disco}`}
          />
        )}
        {valor}
      </p>
    </div>
  );
}
