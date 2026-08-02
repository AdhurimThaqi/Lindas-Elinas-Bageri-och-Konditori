import { Leaf, ExternalLink } from "lucide-react";
import { externalLinks } from "@/content/site";
import { Reveal } from "./Reveal";

export function Sustainability() {
  return (
    <section className="container-page pb-20 md:pb-28">
      <Reveal>
        <div className="flex flex-col gap-6 rounded-2xl bg-[color:var(--color-sage)]/15 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-sage)]/25 text-[color:var(--color-berry)]">
              <Leaf className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl text-charcoal">
                Gott även för planeten
              </h2>
              <p className="mt-2 leading-relaxed text-[color:var(--color-ink-soft)]">
                När det finns gott kvar i slutet av dagen kan det ibland räddas
                genom Too Good To Go. Aktuella kassar och tider visas i appen.
              </p>
            </div>
          </div>
          <a
            href={externalLinks.tooGoodToGo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary shrink-0 self-start sm:self-center"
          >
            Se aktuella kassar
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
