"use server";

import { z } from "zod";
import { getResendClient, emailFrom, contactTo } from "@/lib/resend";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export interface NewsletterFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please enter a valid email address." };
  }

  const resend = getResendClient();

  if (!resend) {
    console.error("RESEND_API_KEY is not configured — newsletter signup was not recorded.", parsed.data);
    return { status: "error", message: "Signup is unavailable right now. Please try again later." };
  }

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: contactTo,
    subject: "New newsletter signup",
    text: `New newsletter subscriber: ${parsed.data.email}`,
  });

  if (error) {
    console.error("Resend newsletter signup failed:", error);
    return { status: "error", message: "Signup is unavailable right now. Please try again later." };
  }

  return { status: "success", message: "You're subscribed — thanks for joining." };
}
