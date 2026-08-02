"use client";

import { useRef, useState, type FormEvent } from "react";
import { Phone, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { orderSchema, type OrderFieldErrors } from "@/lib/order-schema";
import { orderFormOptions, orderLeadTimeNote, business } from "@/content/site";
import { telHref, mailtoHref } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Status = "idle" | "sent";

const initialValues = {
  orderType: "",
  occasion: "",
  date: "",
  people: "",
  details: "",
  allergies: "",
  reference: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
  company: "", // honeypot
};

type Values = typeof initialValues;

function buildMailtoBody(v: Values): string {
  const typeLabel =
    orderFormOptions.orderTypes.find((t) => t.value === v.orderType)?.label ??
    v.orderType;
  return [
    `Typ: ${typeLabel}`,
    v.occasion && `Tillfälle: ${v.occasion}`,
    v.date && `Önskat datum: ${v.date}`,
    v.people && `Antal personer: ${v.people}`,
    v.details && `Smak/stil: ${v.details}`,
    v.allergies && `Allergier/kost: ${v.allergies}`,
    v.reference && `Inspiration/referens: ${v.reference}`,
    "",
    `Namn: ${v.name}`,
    `Telefon: ${v.phone}`,
    v.email && `E-post: ${v.email}`,
    v.message && `Meddelande: ${v.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function OrderForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<OrderFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof OrderFieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = { ...values, consent: values.consent ? "on" : "" };
    const result = orderSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: OrderFieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in fieldErrors)) {
          fieldErrors[key as keyof OrderFieldErrors] = issue.message;
        }
      }
      setErrors(fieldErrors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});

    // Honeypot: silently accept bots without opening a mail client.
    if (values.company) {
      setStatus("sent");
      return;
    }

    // Static-host friendly: open a prefilled email so the enquiry reaches the
    // bakery reliably without a backend. Never claims a confirmed order.
    const href = mailtoHref(
      `Tårtförfrågan – ${values.name}`,
      buildMailtoBody(values),
    );
    window.location.href = href;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="surface-card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[color:var(--color-sage)]" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl text-charcoal">
          Nästan klart – skicka mejlet
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[color:var(--color-ink-soft)]">
          Vi har öppnat ett förifyllt e-postmeddelande med din förfrågan. Skicka
          det så återkommer vi. Beställningen är inte bekräftad förrän du har
          fått svar från oss.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--color-ink-muted)]">
          Öppnades inget mejl?{" "}
          <a
            href={mailtoHref(`Tårtförfrågan – ${values.name}`, buildMailtoBody(values))}
            className="link-underline font-semibold text-charcoal"
          >
            Klicka här för att mejla
          </a>{" "}
          eller ring oss.
        </p>
        <a href={telHref()} className="btn btn-primary mt-6">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Ring {business.phone.display}
        </a>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, v]) => Boolean(v));

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Error summary */}
      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-[color:var(--color-raspberry)]/40 bg-[color:var(--color-raspberry)]/10 p-4"
        >
          <p className="flex items-center gap-2 font-semibold text-[color:var(--color-berry)]">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            Kontrollera formuläret
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-[color:var(--color-berry)]">
            {errorEntries.map(([key, msg]) => (
              <li key={key}>
                <a href={`#field-${key}`} className="underline">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Honeypot (visually hidden, off-screen, not a display:none which some bots skip) */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Lämna tomt</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <fieldset className="space-y-4">
        <legend className="font-serif text-xl text-charcoal">Din beställning</legend>

        {/* Order type */}
        <div id="field-orderType">
          <span className="mb-2 block text-sm font-semibold text-charcoal">
            Vad gäller förfrågan? <Req />
          </span>
          <div className="flex flex-wrap gap-2">
            {orderFormOptions.orderTypes.map((t) => (
              <label
                key={t.value}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  values.orderType === t.value
                    ? "border-transparent bg-[color:var(--color-raspberry)] text-white"
                    : "border-line bg-white text-charcoal hover:border-charcoal",
                )}
              >
                <input
                  type="radio"
                  name="orderType"
                  value={t.value}
                  checked={values.orderType === t.value}
                  onChange={(e) => set("orderType", e.target.value)}
                  className="sr-only"
                />
                {t.label}
              </label>
            ))}
          </div>
          <FieldError id="orderType" error={errors.orderType} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="occasion" label="Tillfälle">
            <select
              id="field-occasion"
              value={values.occasion}
              onChange={(e) => set("occasion", e.target.value)}
              className="form-input"
            >
              <option value="">Välj tillfälle (valfritt)</option>
              {orderFormOptions.occasions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          <Field id="date" label="Önskat datum">
            <input
              id="field-date"
              type="date"
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              className="form-input"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="people" label="Antal personer (ca)">
            <input
              id="field-people"
              type="text"
              inputMode="numeric"
              placeholder="t.ex. 10–12"
              value={values.people}
              onChange={(e) => set("people", e.target.value)}
              className="form-input"
            />
          </Field>
          <Field id="reference" label="Inspiration / referens">
            <input
              id="field-reference"
              type="text"
              placeholder="Länk eller beskrivning (valfritt)"
              value={values.reference}
              onChange={(e) => set("reference", e.target.value)}
              className="form-input"
            />
          </Field>
        </div>

        <Field id="details" label="Smak- eller stilönskemål">
          <textarea
            id="field-details"
            rows={3}
            placeholder="Berätta om smaker, färger, tema eller annat du önskar."
            value={values.details}
            onChange={(e) => set("details", e.target.value)}
            className="form-input"
          />
        </Field>

        <Field
          id="allergies"
          label="Allergier eller kostönskemål"
          hint="Berätta om allergier så tar vi hänsyn till det i möjligaste mån."
        >
          <textarea
            id="field-allergies"
            rows={2}
            value={values.allergies}
            onChange={(e) => set("allergies", e.target.value)}
            className="form-input"
          />
        </Field>

        <p className="text-sm text-[color:var(--color-ink-muted)]">
          Vill du skicka en bild som inspiration? Bifoga den gärna när du mejlar
          eller visa oss i butiken.
        </p>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-serif text-xl text-charcoal">Dina uppgifter</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Namn" required>
            <input
              id="field-name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!errors.name}
              className={cn("form-input", errors.name && "form-input-error")}
            />
            <FieldError id="name" error={errors.name} />
          </Field>

          <Field id="phone" label="Telefon" required>
            <input
              id="field-phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              className={cn("form-input", errors.phone && "form-input-error")}
            />
            <FieldError id="phone" error={errors.phone} />
          </Field>
        </div>

        <Field id="email" label="E-post">
          <input
            id="field-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={cn("form-input", errors.email && "form-input-error")}
          />
          <FieldError id="email" error={errors.email} />
        </Field>

        <Field id="message" label="Övrigt meddelande">
          <textarea
            id="field-message"
            rows={3}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className="form-input"
          />
        </Field>

        <div id="field-consent">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-[color:var(--color-ink-soft)]">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[color:var(--color-raspberry)]"
            />
            <span>
              Jag godkänner att Lindas &amp; Elinas kontaktar mig angående min
              förfrågan. <Req />
            </span>
          </label>
          <FieldError id="consent" error={errors.consent} />
        </div>
      </fieldset>

      <div className="rounded-lg bg-paper p-4 text-sm text-[color:var(--color-ink-soft)]">
        <strong className="text-charcoal">Observera:</strong> Det här är en
        förfrågan, inte en bekräftad beställning. Beställningen är klar först när
        du har fått svar från oss. {orderLeadTimeNote}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-primary">
          Skicka tårtförfrågan
        </button>
        <a href={telHref()} className="btn btn-ghost">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Ring {business.phone.display}
        </a>
        <a href={mailtoHref("Tårtförfrågan")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal link-underline">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Mejla oss
        </a>
      </div>
    </form>
  );
}

/* ---- Small field primitives ------------------------------------------ */

function Req() {
  return (
    <span className="text-[color:var(--color-raspberry)]" aria-hidden="true">
      *
    </span>
  );
}

function Field({
  id,
  label,
  children,
  hint,
  required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label} {required ? <Req /> : null}
      </label>
      {hint ? (
        <p className="mb-1.5 text-xs text-[color:var(--color-ink-muted)]">{hint}</p>
      ) : null}
      {children}
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`error-${id}`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[color:var(--color-berry)]">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {error}
    </p>
  );
}
