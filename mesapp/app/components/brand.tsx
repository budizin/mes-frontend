type MarkProps = {
  className?: string;
  style?: React.CSSProperties;
  /**
   * Pinta el isotipo con los tres colores del sistema en lugar de un tono
   * plano. Sólo para el uso a escala de página en el hero: el id del gradiente
   * es fijo, así que no debe haber dos en el mismo documento.
   */
  espectro?: boolean;
};

const ESPECTRO_ID = "mes-mark-espectro";

/** La "M" del isotipo, tal cual el SVG del brand. */
export function Mark({ className, style, espectro = false }: MarkProps) {
  return (
    <svg
      viewBox="0 0 154 153"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {espectro && (
        <defs>
          {/* Diagonal: la M recorre azul → naranja → amarillo en el mismo orden
              en que la sección Productos presenta los tres instrumentos. */}
          <linearGradient id={ESPECTRO_ID} x1="0.2" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="var(--color-azul)" />
            <stop offset="50%" stopColor="var(--color-naranja)" />
            <stop offset="100%" stopColor="var(--color-amarillo)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M122.399 4.18557C129.046 -2.81327 150.376 -1.69489 153.056 12.5991C154.748 36.96 153.146 59.0544 153.056 83.6144C153.033 90.0118 156.393 149.603 112.818 150.905C112.613 150.903 111.153 151.011 111.156 150.806C111.221 145.996 109.982 91.3882 110.09 77.7235C110.121 75.4975 108.238 74.7042 106.058 75.0585C94.6949 76.9262 79.5179 98.9984 75.0107 99.2187C70.8877 99.4188 54.3093 75.1501 43.8877 75.5717C42.8123 75.6083 42.0059 76.5699 42.017 77.6449C41.9981 88.4701 41.5899 146.482 41.5678 151.882C41.565 152.086 41.3835 152.263 41.1791 152.235C22.7564 150.091 6.98763 135.699 3.74754 117.971C-1.06332 91.5202 -0.0219611 50.5871 0.380906 20.8803C0.381253 20.8547 0.381601 20.8291 0.381948 20.8035C-0.016982 -0.565275 23.3422 -1.98874 30.8571 6.06635C41.7876 15.2997 60.6446 32.5997 72.8334 41.5175C73.7203 42.1693 75.4847 42.27 76.5442 41.5166"
        fill={espectro ? `url(#${ESPECTRO_ID})` : "currentColor"}
      />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      {/* La transición acompaña al header cuando invierte de blanco a tinta:
          sin ella el logo saltaría de color mientras la barra funde. */}
      <Mark
        className={`h-6 w-6 transition-colors duration-300 ${
          tone === "white" ? "text-white" : "text-azul"
        }`}
      />
      <span
        className={`text-[20px] font-medium tracking-[-0.045em] transition-colors duration-300 ${
          tone === "white" ? "text-white" : "text-azul"
        }`}
      >
        Més{" "}
        <span
          className={`transition-colors duration-300 ${
            tone === "white" ? "text-white" : "text-azul"
          }`}
        >
          Capital
        </span>
      </span>
    </span>
  );
}
