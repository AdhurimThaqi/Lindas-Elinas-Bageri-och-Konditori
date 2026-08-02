import {
  openingHours,
  specialHours,
  weekdayLabels,
  type OpeningInterval,
  type WeekdayKey,
} from "@/content/site";

const TIME_ZONE = "Europe/Stockholm";

const WEEKDAY_ORDER: WeekdayKey[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

export interface StockholmNow {
  /** Weekday key in Stockholm time. */
  weekday: WeekdayKey;
  /** ISO date "YYYY-MM-DD" in Stockholm time. */
  isoDate: string;
  /** Minutes since local midnight in Stockholm. */
  minutes: number;
}

/**
 * Derive the current Stockholm-local weekday, date and minutes-since-midnight
 * from any Date, independent of the visitor's own time zone. This is the
 * cornerstone that prevents "open" being shown based on a foreign local time.
 */
export function getStockholmNow(now: Date = new Date()): StockholmNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekdayMap: Record<string, WeekdayKey> = {
    Sun: "sun",
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
  };

  const weekday = weekdayMap[get("weekday")] ?? "mon";
  const year = get("year");
  const month = get("month");
  const day = get("day");
  // Intl can emit "24" for midnight in some runtimes; normalise to 0.
  const rawHour = parseInt(get("hour"), 10);
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = parseInt(get("minute"), 10);

  return {
    weekday,
    isoDate: `${year}-${month}-${day}`,
    minutes: hour * 60 + minute,
  };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return (h ?? 0) * 60 + (m ?? 0);
}

function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Intervals that apply on a given Stockholm moment (special dates win). */
function intervalsForDate(snap: StockholmNow): {
  intervals: OpeningInterval[];
  specialLabel: string | null;
} {
  const special = specialHours.find((s) => s.date === snap.isoDate);
  if (special) {
    return { intervals: special.intervals, specialLabel: special.label };
  }
  return { intervals: openingHours[snap.weekday], specialLabel: null };
}

export type OpenState = "open" | "closed";

export interface OpeningStatus {
  state: OpenState;
  /** True in the final 60 minutes before closing. */
  closingSoon: boolean;
  /** True when closed but opening later the same day within 60 minutes. */
  openingSoon: boolean;
  /** Short human message in Swedish. */
  message: string;
  /** Optional special-date label (e.g. holiday name) that applied. */
  specialLabel: string | null;
}

/**
 * Compute the human-facing open/closed status for a Stockholm moment.
 * Pure and deterministic given the input Date — safe to unit test.
 */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const snap = getStockholmNow(now);
  const { intervals, specialLabel } = intervalsForDate(snap);

  // Find an interval covering the current minute.
  const current = intervals.find(
    (iv) => snap.minutes >= toMinutes(iv.open) && snap.minutes < toMinutes(iv.close),
  );

  if (current) {
    const closeM = toMinutes(current.close);
    const closingSoon = closeM - snap.minutes <= 60;
    return {
      state: "open",
      closingSoon,
      openingSoon: false,
      specialLabel,
      message: closingSoon
        ? `Öppet nu · stänger ${formatMinutes(closeM)}`
        : `Öppet nu · till ${formatMinutes(closeM)}`,
    };
  }

  // Closed now — is there a later opening today?
  const laterToday = intervals
    .map((iv) => toMinutes(iv.open))
    .filter((openM) => openM > snap.minutes)
    .sort((a, b) => a - b)[0];

  if (laterToday !== undefined) {
    const openingSoon = laterToday - snap.minutes <= 60;
    return {
      state: "closed",
      closingSoon: false,
      openingSoon,
      specialLabel,
      message: openingSoon
        ? `Öppnar snart · kl. ${formatMinutes(laterToday)}`
        : `Stängt nu · öppnar ${formatMinutes(laterToday)}`,
    };
  }

  // Closed for the rest of the day — find the next open day.
  const next = findNextOpening(snap);
  return {
    state: "closed",
    closingSoon: false,
    openingSoon: false,
    specialLabel,
    message: next
      ? `Stängt nu · öppnar ${next}`
      : "Stängt nu",
  };
}

/** Look ahead up to 7 days for the next opening, respecting special dates. */
function findNextOpening(snap: StockholmNow): string | null {
  const startIndex = WEEKDAY_ORDER.indexOf(snap.weekday);
  const base = new Date(`${snap.isoDate}T00:00:00`);

  for (let offset = 1; offset <= 7; offset++) {
    const dayDate = new Date(base);
    dayDate.setDate(base.getDate() + offset);
    const iso = `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2, "0")}-${String(dayDate.getDate()).padStart(2, "0")}`;

    const special = specialHours.find((s) => s.date === iso);
    const weekdayKey = WEEKDAY_ORDER[(startIndex + offset) % 7]!;
    const intervals = special ? special.intervals : openingHours[weekdayKey];

    if (intervals.length > 0) {
      const first = intervals[0]!;
      const label =
        offset === 1 ? "imorgon" : weekdayLabels[weekdayKey].toLowerCase();
      return `${label} ${first.open}`;
    }
  }
  return null;
}
