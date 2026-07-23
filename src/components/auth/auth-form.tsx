"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/auth-actions";

type Field = { name: string; label: string; type: string; autoComplete?: string; placeholder?: string };

type Props = {
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  fields: Field[];
  submitLabel: string;
  hiddenNext?: string;
  footer?: React.ReactNode;
};

const initialState: AuthState = {};

export function AuthForm({ action, fields, submitLabel, hiddenNext, footer }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-7 space-y-4">
      {hiddenNext ? <input type="hidden" name="next" value={hiddenNext} /> : null}
      {fields.map((field) => (
        <label key={field.name} className="grid gap-2 text-sm font-bold">
          {field.label}
          <input
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            required
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[#4a63f31a]"
          />
        </label>
      ))}
      {state.error ? <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[var(--danger)]">{state.error}</p> : null}
      {state.success ? <p role="status" className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-[var(--success)]">{state.success}</p> : null}
      <button disabled={pending} className="w-full rounded-2xl bg-[var(--primary)] px-4 py-3 font-black text-white transition hover:bg-[var(--primary-strong)] disabled:cursor-wait disabled:opacity-60">
        {pending ? "Wird verarbeitet …" : submitLabel}
      </button>
      {footer}
    </form>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="font-bold text-[var(--primary)] hover:underline">{children}</Link>;
}
