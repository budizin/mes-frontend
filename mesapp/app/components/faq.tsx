"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * TODO(contenido): las respuestas se derivan del brand book. Revisar con
 * comercial antes de publicar, sobre todo plazos y política de honorarios.
 */
const preguntas = [
  {
    q: "¿Qué hace exactamente un bróker de soluciones financieras?",
    a: "Trabajamos como intermediarios entre tu empresa y una red de entidades financieras. Analizamos qué necesitás, estructuramos la operación y la presentamos a las entidades con más probabilidad de aprobarla. Vos hacés una sola gestión en lugar de negociar con cada banco por separado.",
  },
  {
    q: "¿Con qué entidades trabajan?",
    a: "Tenemos convenio vigente con TCC (The Capita Corporation, del Banco Comafi), GST Capital (del Banco de Servicios y Transacciones) y Banco Julio para leasing y prendarios. En seguros de caución operamos con Afianzadora como aliado estratégico.",
  },
  {
    q: "¿Hay un monto mínimo para operar?",
    a: "No manejamos un piso rígido: depende del producto, del activo y de la entidad. Si tenés una inversión en carpeta, contanos de qué se trata y te decimos rápido si es viable y por qué camino conviene ir.",
  },
  {
    q: "¿Cuánto tarda una operación en aprobarse?",
    a: "El plazo lo define la entidad, pero presentamos la carpeta ya armada y prefiltrada, con el análisis técnico y financiero hecho. Eso acorta el ida y vuelta y es la razón por la que sostenemos una alta tasa de aprobación.",
  },
  {
    q: "¿Atienden en todo el país?",
    a: "Tenemos productores con presencia en Salta, Mendoza, Santa Fe, Entre Ríos, Córdoba, CABA y provincia de Buenos Aires, y estamos expandiéndonos a Río Negro, Jujuy, Corrientes y San Juan. Si estás en otra provincia, escribinos igual: la red se maneja a distancia sin problema.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-linea first:border-t">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left text-lg font-semibold tracking-[-0.02em]"
      >
        {q}
        <span
          aria-hidden="true"
          className={`relative mt-2 block h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-in-out ${
            open ? "rotate-45" : ""
          }`}
        >
          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-azul" />
          <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-azul" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pb-7 text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="border-y border-linea bg-niebla">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Preguntas" title="Antes de escribirnos" />
          </div>

          <div className="lg:col-span-8">
            {preguntas.map((p, i) => (
              <Reveal key={p.q} delay={i * 60}>
                <FaqItem q={p.q} a={p.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
