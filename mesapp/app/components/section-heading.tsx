import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "ink" | "white";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "ink",
  className = "",
}: Props) {
  const onDark = tone === "white";

  return (
    <div className={className}>
      <Reveal>
        <p className={`eyebrow ${onDark ? "text-white/60" : "text-azul"}`}>
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`mt-5 max-w-[20ch] font-display text-title font-bold text-balance ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={150}>
          <p
            className={`mt-6 max-w-[52ch] text-lead ${
              onDark ? "text-white/75" : "text-ink-soft"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
