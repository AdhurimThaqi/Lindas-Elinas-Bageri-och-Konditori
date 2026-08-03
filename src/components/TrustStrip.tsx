import { Croissant, Clock, Cake, Coffee } from "lucide-react";
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
      className="border-y border-line bg-white"
      aria-label="Det här står vi för"
    >
      <div className="container-page">
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4">
          {items.map(({ icon: Icon, line1, line2 }) => (
            <Reveal
              as="div"
              key={line1}
              className="flex items-center gap-3 md:justify-center md:px-4"
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
