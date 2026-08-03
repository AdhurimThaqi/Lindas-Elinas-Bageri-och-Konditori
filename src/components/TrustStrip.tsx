import { Croissant, Clock, Cake, Coffee, Wheat, Heart } from "lucide-react";
import { Marquee } from "./motion";

const items = [
  { icon: Croissant, label: "Bakat på plats" },
  { icon: Clock, label: "Öppet från 06 på vardagar" },
  { icon: Cake, label: "Tårtor för livets firanden" },
  { icon: Coffee, label: "Fika, frukost och lunch" },
  { icon: Wheat, label: "Nygräddat varje dag" },
  { icon: Heart, label: "Serverat med hjärta" },
];

export function TrustStrip() {
  return (
    <section
      className="border-y border-line bg-white py-5"
      aria-label="Det här står vi för"
    >
      <Marquee speed={34}>
        {items.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-charcoal"
          >
            <Icon
              className="h-5 w-5 shrink-0 text-[color:var(--color-berry)]"
              aria-hidden="true"
            />
            {label}
            <span
              className="ml-6 h-1.5 w-1.5 rounded-full bg-[color:var(--color-raspberry)]"
              aria-hidden="true"
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
