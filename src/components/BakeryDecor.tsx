"use client";

/**
 * Modest scattered bakery motifs (croissant, heart, flower, wheat, whisk,
 * cupcake) drawn as delicate line art. Each sprite idly floats, and reacts
 * to the cursor: as the pointer passes near it springs aside, tilts, warms
 * to raspberry and spins a full turn. Fully disabled for prefers-reduced-motion.
 */
import { useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
} from "motion/react";
import { cn } from "@/lib/utils";

export type DecorIcon =
  | "croissant"
  | "heart"
  | "flower"
  | "wheat"
  | "whisk"
  | "cupcake";

// Line-art drawn in a 0..48 box, stroked with currentColor.
const PATHS: Record<DecorIcon, string> = {
  croissant:
    "M8 32 C 6 22, 14 12, 24 12 C 34 12, 42 22, 40 32 C 36 28, 30 27, 24 27 C 18 27, 12 28, 8 32 Z M16 30 L14 21 M24 29 L24 20 M32 30 L34 21",
  heart:
    "M24 40 C 8 29, 6 18, 14 13 C 19 10, 24 14, 24 18 C 24 14, 29 10, 34 13 C 42 18, 40 29, 24 40 Z",
  flower:
    "M24 24 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M24 20 C 24 10, 34 12, 28 20 M28 24 C 38 24, 36 34, 28 28 M24 28 C 24 38, 14 36, 20 28 M20 24 C 10 24, 12 14, 20 20",
  wheat:
    "M24 42 V16 M24 16 C 32 13, 33 6, 33 6 C 26 7, 24 12, 24 16 M24 16 C 16 13, 15 6, 15 6 C 22 7, 24 12, 24 16 M24 26 C 31 23, 32 17, 32 17 C 26 18, 24 22, 24 26 M24 26 C 17 23, 16 17, 16 17 C 22 18, 24 22, 24 26",
  whisk:
    "M24 6 L24 20 M24 20 C 14 24, 12 34, 18 42 L30 42 C 36 34, 34 24, 24 20 Z M20 22 L26 40 M28 23 L23 41 M15 30 L33 30 M16 36 L32 36",
  cupcake:
    "M12 22 C 10 14, 16 8, 24 8 C 32 8, 38 14, 36 22 Z M12 24 L36 24 L32 40 C 32 41, 31 42, 30 42 L18 42 C 17 42, 16 41, 16 40 Z M20 24 L18 40 M28 24 L30 40 M24 8 L24 4 M24 4 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0",
};

interface DecorSpriteProps {
  icon: DecorIcon;
  /** Positioning + sizing utilities (absolute placement, w/h). */
  className?: string;
  /** Resting rotation in degrees. */
  rotate?: number;
  /** Idle float period in seconds. */
  float?: number;
  floatDelay?: number;
}

function DecorSprite({
  icon,
  className,
  rotate = 0,
  float = 7,
  floatDelay = 0,
}: DecorSpriteProps) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const near = useRef(false);

  // Pointer-reactive springs.
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  const scale = useSpring(1, { stiffness: 240, damping: 16 });
  const tilt = useSpring(rotate, { stiffness: 180, damping: 14 });
  const spin = useMotionValue(0);
  const glow = useSpring(0, { stiffness: 160, damping: 22 });

  const rotation = useTransform(() => tilt.get() + spin.get());
  const color = useTransform(glow, [0, 1], ["#CDBFAB", "#D85A78"]);
  const opacity = useTransform(glow, [0, 1], [0.4, 0.95]);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.hypot(dx, dy);
        const R = 150;
        const t = Math.max(0, 1 - dist / R);

        glow.set(t);
        scale.set(1 + t * 0.32);
        tilt.set(rotate + t * 26 * (dx < 0 ? 1 : -1));

        if (t > 0) {
          // Gently push away from the cursor — a playful dodge.
          const push = t * 22;
          const inv = dist === 0 ? 0 : push / dist;
          x.set(dx * inv);
          y.set(dy * inv);
        } else {
          x.set(0);
          y.set(0);
        }

        // Full spin the moment the cursor passes through it.
        if (t > 0.62 && !near.current) {
          near.current = true;
          animate(spin, spin.get() + 360, {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          });
        } else if (t < 0.35 && near.current) {
          near.current = false;
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, rotate, x, y, scale, tilt, spin, glow]);

  if (reduce) {
    return (
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={cn("pointer-events-none text-[color:var(--color-gold)] opacity-30", className)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={PATHS[icon]} />
      </svg>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={{ animation: `float-soft ${float}s ease-in-out ${floatDelay}s infinite` }}
    >
      <motion.svg
        ref={ref}
        viewBox="0 0 48 48"
        className="h-full w-full will-change-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ x, y, scale, rotate: rotation, color, opacity }}
      >
        <path d={PATHS[icon]} />
      </motion.svg>
    </div>
  );
}

interface DecorFieldProps {
  /** Sprites to place, each with position/size utility classes. */
  sprites: Array<DecorSpriteProps>;
  className?: string;
}

/**
 * A background field of cursor-reactive bakery motifs. Drop it as the first
 * child of a `relative` section; it sits behind the content and never blocks
 * interaction.
 */
export function DecorField({ sprites, className }: DecorFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {sprites.map((s, i) => (
        <DecorSprite key={i} {...s} />
      ))}
    </div>
  );
}
