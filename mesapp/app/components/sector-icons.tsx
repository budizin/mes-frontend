/**
 * Pictogramas de sectores, dibujados a medida: cada uno es el objeto que
 * efectivamente se financia en ese rubro, no un símbolo abstracto.
 */

const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Espiga: agro. */
export function IconAgro({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M16 29V13" />
      <path d="M16 13c0-3 1.4-5.6 4-7-1 3.2-1.6 5.6-4 7Z" />
      <path d="M16 13c0-3-1.4-5.6-4-7 1 3.2 1.6 5.6 4 7Z" />
      <path d="M16 19c0-3 1.4-5.6 4-7-1 3.2-1.6 5.6-4 7Z" />
      <path d="M16 19c0-3-1.4-5.6-4-7 1 3.2 1.6 5.6 4 7Z" />
      <path d="M16 25c0-3 1.4-5.6 4-7-1 3.2-1.6 5.6-4 7Z" />
      <path d="M16 25c0-3-1.4-5.6-4-7 1 3.2 1.6 5.6 4 7Z" />
    </svg>
  );
}

/** Racimo: vitivinícola y olivícola. */
export function IconVino({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M16 9V4" />
      <path d="M16 4c2.4-.6 4.2.4 5 2.4-2.3.7-4.1-.2-5-2.4Z" />
      <circle cx="16" cy="12" r="3" />
      <circle cx="11.6" cy="18" r="3" />
      <circle cx="20.4" cy="18" r="3" />
      <circle cx="16" cy="24" r="3" />
    </svg>
  );
}

/** Engranaje: metalmecánica. */
export function IconMetal({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="16" cy="16" r="5.2" />
      <circle cx="16" cy="16" r="1.6" />
      <path d="M16 3.4v3.6M16 25v3.6M28.6 16H25M7 16H3.4" />
      <path d="m24.9 7.1-2.5 2.5M9.6 22.4l-2.5 2.5M24.9 24.9l-2.5-2.5M9.6 9.6 7.1 7.1" />
    </svg>
  );
}

/** Grúa torre: construcción. */
export function IconConstruccion({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 29V8" />
      <path d="M4 8h24" />
      <path d="M12 8 4 8l8-4Z" />
      <path d="M22 8v6" />
      <path d="M19 14h6l-1.4 6h-3.2L19 14Z" />
      <path d="M8 29h8" />
      <path d="M12 12.5 8.5 17M12 17.5 8.5 22M12 22.5 8.5 27" />
    </svg>
  );
}

/** Camión: logística. */
export function IconLogistica({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8h15v14H3z" />
      <path d="M18 13h5.5l4.5 4.5V22h-10z" />
      <circle cx="9" cy="24" r="2.6" />
      <circle cx="22" cy="24" r="2.6" />
      <path d="M11.6 24h7.8M3 22h3.4M24.6 22H29" />
    </svg>
  );
}
