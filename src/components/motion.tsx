"use client";

/**
 * A small toolkit of tasteful motion primitives used across the site.
 * Everything respects prefers-reduced-motion: when reduced motion is requested
 * the effects degrade to static markup so the site stays fully usable.
 */
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---- Scroll progress bar --------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[color:var(--color-raspberry)] via-[color:var(--color-gold)] to-[color:var(--color-berry)]"
    />
  );
}

/* ---- Scroll to top ---------------------------------------------------- */
export function ScrollTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Till toppen"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={false}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{ scale: 1.1, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "fixed bottom-24 right-4 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-charcoal text-cream shadow-lift md:bottom-8 md:flex",
        !show && "pointer-events-none",
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </motion.button>
  );
}

/* ---- 3D tilt on hover -------------------------------------------------- */
export function Tilt({
  children,
  className,
  max = 9,
  glare = false,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
    gx.set((px + 0.5) * 100);
    gy.set((py + 0.5) * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare ? <Glare gx={gx} gy={gy} /> : null}
    </motion.div>
  );
}

function Glare({ gx, gy }: { gx: MotionValue<number>; gy: MotionValue<number> }) {
  const background = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35), transparent 45%)`,
  );
  return (
    <motion.span
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
    />
  );
}

/* ---- Magnetic hover ---------------------------------------------------- */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---- Infinite marquee -------------------------------------------------- */
export function Marquee({
  children,
  speed = 32,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={cn("flex flex-wrap justify-center gap-x-10 gap-y-3", className)}>
        {children}
      </div>
    );
  }
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-[marquee_linear_infinite] gap-10 pr-10 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 gap-10">{children}</div>
        <div className="flex shrink-0 gap-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---- Scroll parallax --------------------------------------------------- */
export function Parallax({
  children,
  className,
  offset = 60,
}: {
  children: ReactNode;
  className?: string;
  /** How far (px) the element drifts across the scroll range. */
  offset?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---- Floating decorative bits ----------------------------------------- */
export function Floating({
  children,
  className,
  duration = 6,
  y = 14,
  rotate = 6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  y?: number;
  rotate?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      animate={{ y: [0, -y, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}

/* ---- Animated heading (word-by-word reveal) --------------------------- */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  highlight,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Optional word (or phrase) to accent in berry. */
  highlight?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  const isHi = (w: string) =>
    highlight ? highlight.toLowerCase().includes(w.toLowerCase().replace(/[.,]/g, "")) : false;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden="true"
            className={cn("inline-block", isHi(w) && "text-[color:var(--color-berry)]")}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
