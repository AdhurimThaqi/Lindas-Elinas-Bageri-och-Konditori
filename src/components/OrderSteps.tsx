import { Reveal, RevealGroup } from "./Reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "1",
    title: "Berätta vad du firar",
    text: "Tillfälle, smak och eventuella allergier – ju mer du berättar, desto bättre kan vi hjälpa till.",
  },
  {
    n: "2",
    title: "Välj önskat datum och storlek",
    text: "Ange när tårtan behövs och ungefär hur många ni är, så ser vi vad som passar.",
  },
  {
    n: "3",
    title: "Vi återkommer och bekräftar",
    text: "Vi hör av oss med förslag och detaljer. Beställningen är klar först när du fått svar.",
  },
];

export function OrderSteps({ className }: { className?: string }) {
  return (
    <RevealGroup className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {steps.map((step) => (
        <Reveal as="div" key={step.n} className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-raspberry)] font-serif text-xl font-semibold text-white">
            {step.n}
          </div>
          <h3 className="mt-4 font-serif text-xl text-charcoal">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {step.text}
          </p>
        </Reveal>
      ))}
    </RevealGroup>
  );
}
