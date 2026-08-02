import { z } from "zod";

/**
 * Shared validation schema for the cake / sandwich-cake enquiry form.
 * Used both client-side (inline errors) and server-side (route handler).
 */
export const orderSchema = z.object({
  orderType: z.enum(["tarta", "smorgastarta", "annat"], {
    message: "Välj vad förfrågan gäller.",
  }),
  occasion: z.string().trim().max(120).optional().or(z.literal("")),
  date: z.string().trim().max(40).optional().or(z.literal("")),
  people: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
  allergies: z.string().trim().max(1000).optional().or(z.literal("")),
  reference: z.string().trim().max(500).optional().or(z.literal("")),
  name: z
    .string({ message: "Ange ditt namn." })
    .trim()
    .min(2, "Ange ditt namn.")
    .max(120),
  phone: z
    .string({ message: "Ange ett telefonnummer." })
    .trim()
    .min(6, "Ange ett telefonnummer vi kan nå dig på.")
    .max(40),
  email: z
    .string()
    .trim()
    .max(160)
    .email("Ange en giltig e-postadress.")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z
    .unknown()
    .refine((v) => v === "on" || v === true || v === "true", {
      message: "Du behöver godkänna att vi får kontakta dig.",
    }),
  // Honeypot — must stay empty. Bots tend to fill every field. We accept any
  // value at the schema level (so bots get no validation hint) and silently
  // drop filled submissions in the route handler instead.
  company: z.string().optional().or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;

export type OrderFieldErrors = Partial<
  Record<keyof OrderInput, string>
>;
