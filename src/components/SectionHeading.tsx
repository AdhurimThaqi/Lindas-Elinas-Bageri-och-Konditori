import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <Tag className="text-3xl leading-[1.1] sm:text-4xl md:text-[2.75rem]">
          {title}
        </Tag>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
