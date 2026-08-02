import { Croissant, Clock, Cake, Coffee } from "lucide-react";

const items = [
  { icon: Croissant, label: "Bakat på plats" },
  { icon: Clock, label: "Öppet från 06 på vardagar" },
  { icon: Cake, label: "Tårtor för livets firanden" },
  { icon: Coffee, label: "Fika, frukost och lunch" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-white" aria-label="Det här står vi för">
      <div className="container-page">
        <ul className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {items.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className={`flex items-center gap-3 py-5 md:justify-center md:px-4 ${
                i < 2 ? "border-b border-line md:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r border-line md:border-r-0" : ""}`}
            >
              <Icon
                className="h-5 w-5 shrink-0 text-[color:var(--color-berry)]"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-charcoal">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
