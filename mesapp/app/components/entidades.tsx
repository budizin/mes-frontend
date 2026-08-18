import Image from "next/image";
import { Reveal } from "./reveal";

/* `alto` compensa las proporciones dispares: TCC es cuadrado y los demás
   apaisados, así que igualar la altura los dejaría ópticamente desbalanceados. */
const entidades = [
  {
    src: "/images/thecapitacorporation.png",
    alt: "The Capita Corporation",
    w: 248,
    h: 243,
    alto: "h-20",
  },
  { src: "/images/gstcapital.png", alt: "GST Capital", w: 254, h: 104, alto: "h-11" },
  { src: "/images/bancojulioleasing.png", alt: "Banco Julio", w: 296, h: 121, alto: "h-12" },
  { src: "/images/bind.png", alt: "Banco BIND", w: 302, h: 124, alto: "h-11" },
];

export function Entidades() {
  return (
    <section className="relative border-y border-linea bg-niebla">
      <div className="mx-auto max-w-[80rem] px-6 py-14 lg:px-10">
        <Reveal>
          <p className="eyebrow text-center text-ink-faint">
            Entidades con convenio vigente
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-9 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4">
            {entidades.map((e) => (
              <li key={e.alt} className="flex h-20 items-center justify-center">
                <Image
                  src={e.src}
                  alt={e.alt}
                  width={e.w}
                  height={e.h}
                  className={`${e.alto} w-auto grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100`}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
