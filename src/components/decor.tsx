/**
 * Lightweight decorative SVGs — delicate line illustrations inspired by
 * wheat, cake piping and flour swirls. All are decorative and hidden from
 * assistive technology.
 */
import type { SVGProps } from "react";

export function WheatMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 46V16" />
      <path d="M12 16c0-4 3-7 6-8-1 4-2 7-6 8Z" />
      <path d="M12 16c0-4-3-7-6-8 1 4 2 7 6 8Z" />
      <path d="M12 24c0-3 2.5-5.5 5-6.5-.8 3-1.6 5.5-5 6.5Z" />
      <path d="M12 24c0-3-2.5-5.5-5-6.5.8 3 1.6 5.5 5 6.5Z" />
      <path d="M12 32c0-3 2.5-5.5 5-6.5-.8 3-1.6 5.5-5 6.5Z" />
      <path d="M12 32c0-3-2.5-5.5-5-6.5.8 3 1.6 5.5 5 6.5Z" />
    </svg>
  );
}

/** A small berry / petal-like mark used as a delicate accent. */
export function BerryMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M12 3c1.6 2.2 1.6 4.4 0 6.6C10.4 7.4 10.4 5.2 12 3Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="8.5" cy="14" r="3.2" fill="currentColor" opacity="0.85" />
      <circle cx="15.5" cy="14" r="3.2" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="18.5" r="3.2" fill="currentColor" opacity="0.95" />
    </svg>
  );
}

/** A soft hand-drawn curved stroke used as a hero flourish. */
export function CurveStroke(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 92C60 30 140 16 214 40c40 13 70 6 102-24" opacity="0.8" />
    </svg>
  );
}

/** Facebook glyph (lucide dropped brand icons; small inline mark instead). */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3H14c-2.2 0-3.5 1.3-3.5 3.6v1.9H8v3h2.5V21h3.5v-9.5h2.4l.4-3H14Z" />
    </svg>
  );
}

/** Instagram glyph. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Piping-inspired swirl used near the cake-order section. */
export function PipingSwirl(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 24c8-14 20-14 28 0s20 14 28 0 20-14 28 0 20 14 28 0" />
    </svg>
  );
}
