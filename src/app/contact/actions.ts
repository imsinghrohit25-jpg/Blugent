"use server";

import { z } from "zod";
import { getResendClient, emailFrom, contactTo } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid work email."),
  company: z.string().trim().min(2, "Please enter your company name."),
  budget: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a little more — at least 10 characters."),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof contactSchema>;
      fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const { name, email, company, budget, message } = parsed.data;
  const resend = getResendClient();

  if (!resend) {
    console.error("RESEND_API_KEY is not configured — contact form submission was not sent.", parsed.data);
    return {
      status: "error",
      message: "We couldn't send your message right now. Please email us directly at Imsinghrohit25@gmail.com.",
    };
  }

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: contactTo,
    replyTo: email,
    subject: `New project inquiry — ${company}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Budget: ${budget || "Not specified"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend contact form send failed:", error);
    return {
      status: "error",
      message: "We couldn't send your message right now. Please email us directly at Imsinghrohit25@gmail.com.",
    };
  }

  return {
    status: "success",
    message: "Thanks — a member of our solutions team will reach out within one business day.",
  };
}
