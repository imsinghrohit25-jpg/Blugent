import { Resend } from "resend";

let client: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  client ??= new Resend(apiKey);
  return client;
}

export const emailFrom = process.env.CONTACT_FROM_EMAIL ?? "Blugent <onboarding@resend.dev>";
export const contactTo = process.env.CONTACT_TO_EMAIL ?? "Imsinghrohit25@gmail.com";
