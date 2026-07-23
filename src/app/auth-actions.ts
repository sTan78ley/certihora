"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; success?: string };

const credentialsSchema = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(8, "Das Passwort muss mindestens 8 Zeichen enthalten."),
});

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Anmeldung fehlgeschlagen. Prüfe E-Mail und Passwort." };

  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/") ? next : "/dashboard");
}

export async function registerAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentialsSchema.extend({
    displayName: z.string().trim().min(2, "Bitte gib deinen Namen ein.").max(80),
  }).safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/setup`,
      data: { display_name: parsed.data.displayName },
    },
  });

  if (error) return { error: "Registrierung fehlgeschlagen. Die E-Mail könnte bereits verwendet werden." };
  if (data.session) redirect("/setup");
  return { success: "Fast geschafft: Bitte bestätige deine E-Mail-Adresse." };
}

export async function forgotPasswordAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = z.string().email("Bitte gib eine gültige E-Mail-Adresse ein.").safeParse(formData.get("email"));
  if (!email.success) return { error: email.error.issues[0]?.message };

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });
  if (error) return { error: "Die Reset-E-Mail konnte nicht versendet werden." };
  return { success: "Falls ein Konto existiert, wurde eine Reset-E-Mail versendet." };
}

export async function resetPasswordAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = z.object({
    password: z.string().min(8, "Das Passwort muss mindestens 8 Zeichen enthalten."),
    confirmPassword: z.string(),
  }).refine((value) => value.password === value.confirmPassword, {
    message: "Die Passwörter stimmen nicht überein.",
  }).safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { error: "Das Passwort konnte nicht geändert werden. Öffne den Link erneut." };
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
