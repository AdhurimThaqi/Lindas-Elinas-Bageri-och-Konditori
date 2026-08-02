import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/order-schema";
import { orderFormOptions } from "@/content/site";

export const runtime = "nodejs";

function labelFor(value: string): string {
  return (
    orderFormOptions.orderTypes.find((t) => t.value === value)?.label ?? value
  );
}

/** Build a readable plain-text summary of the enquiry for email/webhook. */
function summarise(data: Record<string, string>): string {
  const lines = [
    `Typ: ${labelFor(data.orderType ?? "")}`,
    data.occasion ? `Tillfälle: ${data.occasion}` : null,
    data.date ? `Önskat datum: ${data.date}` : null,
    data.people ? `Antal personer: ${data.people}` : null,
    data.details ? `Smak/stil: ${data.details}` : null,
    data.allergies ? `Allergier/kost: ${data.allergies}` : null,
    data.reference ? `Inspiration/referens: ${data.reference}` : null,
    "",
    `Namn: ${data.name}`,
    `Telefon: ${data.phone}`,
    data.email ? `E-post: ${data.email}` : null,
    data.message ? `Meddelande: ${data.message}` : null,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "validation", fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot silently accepted but not delivered (don't tip off bots).
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const data = parsed.data as unknown as Record<string, string>;
  const summary = summarise(data);
  const inbox = process.env.ORDER_INBOX_EMAIL;

  // --- Delivery option A: Resend --------------------------------------
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ORDER_FROM_EMAIL;
  if (resendKey && fromEmail && inbox) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [inbox],
          reply_to: data.email || undefined,
          subject: `Ny tårtförfrågan – ${data.name}`,
          text: summary,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "delivery_failed" },
        { status: 502 },
      );
    }
  }

  // --- Delivery option B: generic webhook -----------------------------
  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, summary }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "delivery_failed" },
        { status: 502 },
      );
    }
  }

  // --- No backend configured: tell the client to use the mailto fallback.
  return NextResponse.json({ ok: true, delivered: false, fallback: true });
}
