"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealVariant = "up" | "blur" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Entrance distance (px). */
  y?: number;
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Gentle, restrained entrance animation on scroll, with a few variants.
 * Respects prefers-reduced-motion by rendering static content, so the page
 * looks complete with animation disabled.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  variant = "up",
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const hidden: Record<RevealVariant, Record<string, number | string>> = {
    up: { opacity: 0, y },
    blur: { opacity: 0, y: y * 0.6, filter: "blur(10px)" },
    scale: { opacity: 0, scale: 0.9 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
  };
  const shown: Record<RevealVariant, Record<string, number | string>> = {
    up: { opacity: 1, y: 0 },
    blur: { opacity: 1, y: 0, filter: "blur(0px)" },
    scale: { opacity: 1, scale: 1 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
  };

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : hidden[variant],
    visible: {
      ...(reduce ? { opacity: 1 } : shown[variant]),
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its Reveal children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduce ? 0 : stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
