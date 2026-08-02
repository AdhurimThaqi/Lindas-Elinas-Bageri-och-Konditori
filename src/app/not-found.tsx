import Link from "next/link";
import { Home, Cake } from "lucide-react";
import { WheatMark } from "@/components/decor";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <WheatMark className="h-14 w-14 text-[color:var(--color-gold)]" />
      <p className="eyebrow mt-6">Hoppsan</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Sidan kunde inte hittas</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
        Sidan du letar efter finns inte längre – men det gör vårt nybakade. Kom
        tillbaka till start eller titta på vårt sortiment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          <Home className="h-4 w-4" aria-hidden="true" />
          Till startsidan
        </Link>
        <Link href="/sortiment" className="btn btn-secondary">
          <Cake className="h-4 w-4" aria-hidden="true" />
          Se vårt utbud
        </Link>
      </div>
    </section>
  );
}
