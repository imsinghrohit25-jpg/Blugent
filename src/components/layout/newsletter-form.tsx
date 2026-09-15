"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeToNewsletter, type NewsletterFormState } from "@/app/actions/newsletter";

const initialState: NewsletterFormState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);

  if (state.status === "success") {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-emerald-400/90">
        <CheckCircle2 className="size-4 shrink-0" />
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-4">
      <div className="flex overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] focus-within:border-magenta/25 transition-colors duration-200">
        <input
          type="email"
          name="email"
          required
          placeholder="your@company.com"
          aria-label="Email address for newsletter"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 px-4 text-xs font-semibold text-magenta-soft/70 transition-colors hover:text-magenta-soft disabled:opacity-50"
          aria-label="Subscribe"
        >
          {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <>Subscribe <ArrowRight className="size-3.5" /></>}
        </button>
      </div>
      {state.status === "error" ? <p className="mt-2 text-xs text-red-400">{state.message}</p> : null}
    </form>
  );
}
