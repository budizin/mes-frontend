"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./brand";
import { nav } from "../site-config";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Sección activa: una banda estrecha entre el 30% y el 40% del viewport hace
     de línea de lectura. Mientras se mira el hero ninguna sección la cruza y el
     nav queda sin marcar, que es lo correcto —el hero no está en el menú—. */
  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1));
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (secciones.length === 0) return;

    const visibles = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibles.add(entry.target.id);
          else visibles.delete(entry.target.id);
        }
        // Orden del documento: si dos cruzan la banda, gana la de arriba.
        setActiva(ids.find((id) => visibles.has(id)) ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    secciones.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    /* El panel es `lg:hidden`: al pasar a desktop desaparece de la vista pero el
       estado seguiría abierto, dejando el scroll del body bloqueado. */
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  /* Con el hero sobre blanco el header ya no invierte de color: arriba de todo
     flota sin fondo ni borde, y apenas hay scroll —o se abre el menú— apoya el
     blanco translúcido para despegarse del contenido que pasa por debajo. */
  const alTope = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        alTope
          ? "border-b border-transparent"
          : "border-b border-linea bg-white/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[80rem] items-center justify-between px-6 lg:px-10">
        <a
          href="#top"
          aria-label="Més Capital, inicio"
          className="rounded-sm"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-9 lg:flex"
        >
          {nav.map((item) => {
            const esActiva = activa === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={esActiva ? "true" : undefined}
                className={`group relative text-[0.9375rem] font-medium transition-colors duration-300 ${
                  esActiva ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                {/* Subrayado fino: el mismo gesto marca hover y sección activa,
                    así el menú no inventa un segundo lenguaje para lo mismo. */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 block h-px w-full origin-left bg-azul transition-transform duration-300 group-hover:scale-x-100 ${
                    esActiva ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#contacto"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-azul"
          >
            Solicitar financiamiento
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5 lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-[2px] w-6 bg-ink transition-transform duration-300 ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[2px] w-6 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-6 bg-ink transition-transform duration-300 ${
                open ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Montado sólo cuando abre: es lo que dispara `menu-abre` en cada
          apertura —con el nodo siempre presente la animación corre una vez y
          los toggles siguientes aparecerían de golpe—. */}
      {open && (
        <div
          id="menu-movil"
          className="menu-abre border-t border-linea bg-white lg:hidden"
        >
          <nav
            aria-label="Principal móvil"
            className="mx-auto flex max-h-[calc(100svh-4.5rem)] max-w-[80rem] flex-col overflow-y-auto px-6 py-4"
          >
            {nav.map((item) => {
              const esActiva = activa === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={esActiva ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-linea py-4 text-xl font-semibold tracking-[-0.02em] ${
                    esActiva ? "text-azul" : "text-ink"
                  }`}
                >
                  {item.label}
                  {/* En móvil no hay hover: la marca de activa tiene que ser visible
                    por sí sola, de ahí el punto además del color. */}
                  {esActiva && (
                    <span
                      aria-hidden="true"
                      className="block h-1.5 w-1.5 rounded-full bg-azul"
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-full bg-ink px-5 py-3.5 text-center font-semibold text-white"
            >
              Solicitar financiamiento
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
