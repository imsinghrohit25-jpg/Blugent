"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/ui/glass-card";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle" };

const budgetOptions = [
  { value: "under-50k", label: "Under $50K" },
  { value: "50k-150k", label: "$50K – $150K" },
  { value: "150k-500k", label: "$150K – $500K" },
  { value: "500k-plus", label: "$500K+" },
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <GlassCard strong className="flex h-full flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="size-12 text-emerald-400" />
        <h3 className="mt-5 text-xl font-semibold text-white">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-400">{state.message}</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard strong hover={false}>
      <form action={formAction} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Jordan Lee" className="border-white/10 bg-white/5" />
            {state.fieldErrors?.name ? <p className="text-xs text-red-400">{state.fieldErrors.name}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" name="email" type="email" placeholder="jordan@company.com" className="border-white/10 bg-white/5" />
            {state.fieldErrors?.email ? <p className="text-xs text-red-400">{state.fieldErrors.email}</p> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" placeholder="Acme Corporation" className="border-white/10 bg-white/5" />
            {state.fieldErrors?.company ? <p className="text-xs text-red-400">{state.fieldErrors.company}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Estimated budget</Label>
            <Select name="budget">
              <SelectTrigger id="budget" className="w-full border-white/10 bg-white/5">
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">How can we help?</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your use case, timeline, and current systems..."
            className="border-white/10 bg-white/5"
          />
          {state.fieldErrors?.message ? <p className="text-xs text-red-400">{state.fieldErrors.message}</p> : null}
        </div>

        {state.status === "error" && !state.fieldErrors ? (
          <p className="text-sm text-red-400">{state.message}</p>
        ) : null}

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 text-base font-semibold text-white glow-magenta-sm transition-all duration-300 hover:from-fuchsia-500 hover:to-violet-500 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4" />
            </>
          )}
        </Button>
      </form>
    </GlassCard>
  );
}
