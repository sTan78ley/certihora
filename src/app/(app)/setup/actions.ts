"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const shiftSchema = z.object({
  code: z.string().min(1).max(12),
  name: z.string().min(1).max(80),
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/),
  pauseMinutes: z.number().int().min(0).max(240),
});

const setupSchema = z.object({
  profession: z.literal("police"),
  region: z.literal("SN"),
  weeklyHours: z.number().min(1).max(80),
  payGrade: z.string().regex(/^A\d{1,2}$/),
  payStep: z.number().int().min(1).max(12),
  shifts: z.array(shiftSchema).min(1).max(20),
  enabledRules: z.array(z.string()).max(20),
  balances: z.object({
    vmMinutes: z.number().int(),
    rbMinutes: z.number().int(),
    remainingLeaveDays: z.number().min(0).max(365),
    savedLeaveDays: z.number().min(0).max(365),
    nightMinutes: z.number().int().min(0),
  }),
  rhythmStartDate: z.string().date(),
  rhythm: z.array(z.string().min(1).max(30)).min(1).max(60),
});

export type SaveSetupResult = { ok: false; message: string } | { ok: true };

export async function saveSetup(payload: unknown): Promise<SaveSetupResult> {
  const parsed = setupSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, message: "Bitte prüfe deine Eingaben." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an." };

  const data = parsed.data;
  const { error: profileError } = await supabase.from("profiles").update({
    profession: data.profession,
    region_code: data.region,
    weekly_hours: data.weeklyHours,
    pay_grade: data.payGrade,
    pay_step: data.payStep,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  }).eq("id", user.id);

  if (profileError) return { ok: false, message: `Profil konnte nicht gespeichert werden: ${profileError.message}` };

  const { error: shiftsDeleteError } = await supabase.from("shift_templates").delete().eq("user_id", user.id);
  if (shiftsDeleteError) return { ok: false, message: shiftsDeleteError.message };

  const { error: shiftsError } = await supabase.from("shift_templates").insert(data.shifts.map((shift) => ({
    user_id: user.id,
    code: shift.code,
    name: shift.name,
    segments: [{ start: shift.start, end: shift.end }],
    pause_mode: { type: shift.pauseMinutes > 0 ? "fixed" : "none", minutes: shift.pauseMinutes },
  })));
  if (shiftsError) return { ok: false, message: shiftsError.message };

  const { error: settingsError } = await supabase.from("user_work_settings").upsert({
    user_id: user.id,
    enabled_rules: data.enabledRules,
    balances: data.balances,
    rhythm_start_date: data.rhythmStartDate,
    rhythm_days: data.rhythm,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (settingsError) return { ok: false, message: settingsError.message };

  redirect("/dashboard");
}
