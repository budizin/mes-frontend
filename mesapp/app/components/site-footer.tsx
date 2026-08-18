import { Wordmark } from "./brand";
import { nav, site } from "../site-config";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="white" />
            <p className="mt-6 max-w-[30ch] text-[0.9375rem] leading-relaxed text-white/55">
              Bróker de soluciones financieras para empresas y personas con
              actividad comercial en Argentina.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Secciones">
            <p className="eyebrow text-white/40">Navegación</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  className="text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-white/40">Contacto</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-5 pt-2">
                <a
                  href={site.linkedin}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href={site.instagram}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/12 pt-8 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <p>
              © {new Date().getFullYear()} {site.name}. Todos los derechos
              reservados.
            </p>
            <p>
              Més Capital intermedia operaciones. El otorgamiento del
              crédito queda sujeto a la evaluación de cada entidad
              financiera.
            </p>
          </div>

          <a
            href="https://nuba.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2.5 text-white/45 transition-colors hover:text-white"
          >
            Desarrollado por
            {/* Isotipo apilado: "nuba" y "studio" pesan igual (DM Sans
                bold), leídos como una sola marca en dos renglones. */}
            <span className="font-dm flex flex-col text-[0.6875rem] leading-[1.15] font-bold tracking-[0.01em] text-white/70 transition-colors group-hover:text-white">
              <span>nuba</span>
              <span>studio</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
