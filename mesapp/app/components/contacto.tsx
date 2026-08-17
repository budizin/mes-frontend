"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./reveal";
import { provincias, site } from "../site-config";

type Estado = "idle" | "enviando" | "enviado";

const campoBase =
  "w-full rounded-xl border border-linea bg-white px-4 py-3.5 text-[0.9375rem] text-ink transition-colors placeholder:text-ink-faint focus:border-azul focus:outline-none";

export function Contacto() {
  const [estado, setEstado] = useState<Estado>("idle");

  // TODO(backend): el formulario todavía no envía nada. Conectar a un Route
  // Handler (app/api/contacto/route.ts) o a un proveedor de email.
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEstado("enviando");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setEstado("enviado");
  }

  return (
    <section id="contacto" className="scroll-mt-24">
      <div className="mx-auto max-w-[80rem] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-azul">Contacto</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-[14ch] font-display text-title font-bold text-balance">
                Contanos qué querés financiar
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-[42ch] text-lead text-ink-soft">
                Respondemos con una primera lectura de la operación: qué
                producto conviene y qué información vamos a necesitar.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <dl className="mt-10 space-y-5 border-t border-linea pt-8">
                <div>
                  <dt className="eyebrow text-ink-faint">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium underline-offset-4 hover:text-azul hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-faint">WhatsApp</dt>
                  <dd className="mt-1.5">
                    <a
                      href={site.whatsappHref}
                      className="font-medium underline-offset-4 hover:text-azul hover:underline"
                    >
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              {estado === "enviado" ? (
                <div className="flex min-h-[26rem] flex-col items-start justify-center rounded-2xl border border-linea bg-niebla p-10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-azul">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="m4 12.5 5 5L20 6.5" />
                    </svg>
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em]">
                    Recibimos tu consulta
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-ink-soft">
                    Un asesor te va a contactar para avanzar con el análisis de
                    la operación.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEstado("idle")}
                    className="mt-8 text-[0.9375rem] font-semibold text-azul underline-offset-4 hover:underline"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-2xl border border-linea bg-niebla p-6 sm:p-10"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Campo id="nombre" label="Nombre y apellido">
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        autoComplete="name"
                        className={campoBase}
                      />
                    </Campo>

                    <Campo id="empresa" label="Empresa">
                      <input
                        id="empresa"
                        name="empresa"
                        type="text"
                        required
                        autoComplete="organization"
                        className={campoBase}
                      />
                    </Campo>

                    <Campo id="email" label="Email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={campoBase}
                      />
                    </Campo>

                    <Campo id="telefono" label="Teléfono">
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        autoComplete="tel"
                        className={campoBase}
                      />
                    </Campo>

                    <Campo id="provincia" label="Provincia">
                      <select
                        id="provincia"
                        name="provincia"
                        required
                        defaultValue=""
                        className={campoBase}
                      >
                        <option value="" disabled>
                          Elegí una opción
                        </option>
                        {provincias.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </Campo>

                    <Campo id="producto" label="Producto de interés">
                      <select
                        id="producto"
                        name="producto"
                        required
                        defaultValue=""
                        className={campoBase}
                      >
                        <option value="" disabled>
                          Elegí una opción
                        </option>
                        <option value="leasing">Leasing</option>
                        <option value="prendario">Préstamo prendario</option>
                        <option value="caucion">Seguro de caución</option>
                        <option value="aliado">
                          Soy entidad financiera o vendor
                        </option>
                        <option value="no-se">Todavía no lo sé</option>
                      </select>
                    </Campo>

                    <div className="sm:col-span-2">
                      <Campo id="mensaje" label="Qué necesitás financiar">
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          rows={4}
                          required
                          placeholder="Por ejemplo: una cosechadora usada, un camión 0 km, la caución de una licitación…"
                          className={`${campoBase} resize-y`}
                        />
                      </Campo>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={estado === "enviando"}
                      className="rounded-full bg-azul px-8 py-4 font-semibold text-white transition-colors hover:bg-azul-deep disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {estado === "enviando" ? "Enviando…" : "Enviar consulta"}
                    </button>
                    <p className="text-[0.8125rem] text-ink-faint">
                      Usamos tus datos solo para responder esta consulta.
                    </p>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Campo({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] font-semibold text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
