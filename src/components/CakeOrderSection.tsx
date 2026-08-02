import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/content/site";
import { telHref } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";
import { OrderSteps } from "./OrderSteps";
import { Reveal } from "./Reveal";
import { PipingSwirl } from "./decor";

export function CakeOrderSection() {
  return (
    <section className="bg-white">
      <div className="container-page grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Beställ tårta</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
              En tårta värd att fira med
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <PipingSwirl className="mt-4 h-6 w-40 text-[color:var(--color-gold)]" />
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Födelsedag, student, dop, jubileum eller fredagsfika? Berätta vad
              du planerar så hjälper vi dig att hitta rätt tårta.
            </p>
          </Reveal>

          <OrderSteps className="mt-10" />

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/bestall" className="btn btn-primary">
                Skicka en tårtförfrågan
              </Link>
              <a href={telHref()} className="btn btn-ghost">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ring {business.phone.display}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
              En förfrågan är inte en bekräftad beställning – vi återkommer och
              bekräftar med dig.
            </p>
          </Reveal>
        </div>

        <Reveal y={24}>
          <BakeryImage
            src="/images/cake-detail.svg"
            alt="Närbild på en tårta med dekorativ gräddspritsning."
            sizes="(min-width: 1024px) 46vw, 90vw"
            placeholderLabel="Festtårta"
            className="mask-blob aspect-square w-full shadow-lift"
          />
        </Reveal>
      </div>
    </section>
  );
}
