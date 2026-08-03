import { Croissant, Clock, Cake, Coffee } from "lucide-react";
import { WheatMark } from "./decor";
import { Reveal, RevealGroup } from "./Reveal";

const items = [
  { icon: Croissant, line1: "Bakat på plats", line2: "Med kärlek varje dag" },
  { icon: Clock, line1: "Öppet från 06", line2: "På vardagar" },
  { icon: Cake, line1: "Tårtor för livets", line2: "firanden" },
  { icon: Coffee, line1: "Fika, frukost", line2: "och lunch" },
];

export function TrustStrip() {
  return (
    <section
      className="relative border-y border-line bg-white"
      aria-label="Det här står vi för"
    >
      {/* Delicate decoration on the far left */}
      <WheatMark
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 text-[color:var(--color-gold)] opacity-40 lg:block"
      />
      <div className="container-page">
        <RevealGroup className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {items.map(({ icon: Icon, line1, line2 }, i) => (
            <Reveal
              as="div"
              key={line1}
              className={cnRow(i)}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-paper)] text-[color:var(--color-berry)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold leading-snug text-charcoal">
                {line1}
                <br />
                <span className="font-normal text-[color:var(--color-ink-muted)]">
                  {line2}
                </span>
              </span>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function cnRow(i: number): string {
  return [
    "flex items-center gap-3 py-6 md:justify-center md:px-4",
    i < 2 ? "border-b border-line md:border-b-0" : "",
    i % 2 === 0 ? "border-r border-line md:border-r-0" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
