"use client";

import { useMemo, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { saveSetup } from "@/app/(app)/setup/actions";
import { DEFAULT_RHYTHM, DEFAULT_SHIFTS, SPECIAL_RULES } from "./config";
import type { SetupDraft } from "./types";

const steps = ["Start", "Dienst", "Vorlagen", "Regeln", "Konten", "Rhythmus", "Fertig"];

const initialDraft: SetupDraft = {
  profession: "police",
  region: "SN",
  weeklyHours: 40,
  payGrade: "A9",
  payStep: 5,
  shifts: DEFAULT_SHIFTS,
  enabledRules: ["rb", "training", "education", "sick", "child_sick"],
  balances: { vmMinutes: 0, rbMinutes: 0, remainingLeaveDays: 30, savedLeaveDays: 0, nightMinutes: 0 },
  rhythmStartDate: new Date().toISOString().slice(0, 10),
  rhythm: DEFAULT_RHYTHM,
};

export function SetupWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<SetupDraft>(initialDraft);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const progress = useMemo(() => Math.round((step / (steps.length - 1)) * 100), [step]);

  const next = () => { setError(null); setStep((value) => Math.min(value + 1, steps.length - 1)); };
  const back = () => { setError(null); setStep((value) => Math.max(value - 1, 0)); };

  const finish = () => startTransition(async () => {
    setError(null);
    const result = await saveSetup(draft);
    if (!result.ok) setError(result.message);
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[.14em] text-[var(--muted)]">
          <span>Einrichtung</span><span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white shadow-sm"><div className="h-full rounded-full bg-[var(--primary)] transition-all" style={{ width: `${progress}%` }} /></div>
        <div className="mt-3 hidden grid-cols-7 gap-2 text-center text-[11px] font-bold text-[var(--muted)] md:grid">{steps.map((label, index) => <span className={index === step ? "text-[var(--primary)]" : ""} key={label}>{label}</span>)}</div>
      </div>

      <section className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_24px_70px_rgba(31,43,84,.08)] md:p-10">
        {step === 0 && <Intro />}
        {step === 1 && <ServiceStep draft={draft} setDraft={setDraft} />}
        {step === 2 && <ShiftStep draft={draft} setDraft={setDraft} />}
        {step === 3 && <RulesStep draft={draft} setDraft={setDraft} />}
        {step === 4 && <BalancesStep draft={draft} setDraft={setDraft} />}
        {step === 5 && <RhythmStep draft={draft} setDraft={setDraft} />}
        {step === 6 && <Finish draft={draft} />}

        {error && <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-[var(--danger)]">{error}</p>}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-6">
          <button type="button" onClick={back} disabled={step === 0 || isPending} className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-bold text-[var(--muted)] disabled:opacity-30"><ArrowLeft size={18} /> Zurück</button>
          {step < steps.length - 1 ? <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-5 py-3 font-black text-white shadow-lg shadow-indigo-200">Weiter <ArrowRight size={18} /></button> : <button type="button" onClick={finish} disabled={isPending} className="inline-flex items-center gap-2 rounded-2xl bg-[var(--success)] px-5 py-3 font-black text-white disabled:opacity-60">{isPending ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Einrichtung abschließen</button>}
        </div>
      </section>
    </div>
  );
}

function Intro() { return <div className="py-8 text-center"><div className="mx-auto grid size-20 place-items-center rounded-[24px] bg-indigo-50 text-[var(--primary)]"><ShieldCheck size={38} /></div><p className="mt-7 text-xs font-black uppercase tracking-[.18em] text-[var(--primary)]">Willkommen bei Certihora</p><h1 className="mx-auto mt-3 max-w-2xl text-4xl font-black tracking-[-.05em] md:text-5xl">Dein Dienstmodell in wenigen Minuten.</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">Wir richten Polizei Sachsen, Dienstzeiten, Sonderregeln, Startkonten und deinen 10-Tage-Rhythmus gemeinsam ein.</p></div>; }

function ServiceStep({ draft, setDraft }: WizardProps) { return <div><Eyebrow text="Grunddaten" /><Title title="Wie arbeitest du?" text="Zum Marktstart ist Polizei Sachsen vollständig aktiviert." /><div className="grid gap-4 md:grid-cols-2"><Choice active title="Polizei" text="Aktiv" /><Choice active title="Sachsen" text="Regelpaket SN" /></div><div className="mt-6 grid gap-4 md:grid-cols-3"><Field label="Wochenstunden"><input type="number" value={draft.weeklyHours} onChange={(event) => setDraft({ ...draft, weeklyHours: Number(event.target.value) })} /></Field><Field label="Besoldung"><select value={draft.payGrade} onChange={(event) => setDraft({ ...draft, payGrade: event.target.value })}>{Array.from({ length: 10 }, (_, index) => <option key={index} value={`A${index + 7}`}>A{index + 7}</option>)}</select></Field><Field label="Stufe"><input type="number" min="1" max="12" value={draft.payStep} onChange={(event) => setDraft({ ...draft, payStep: Number(event.target.value) })} /></Field></div></div>; }

function ShiftStep({ draft, setDraft }: WizardProps) { const update = (index: number, key: keyof SetupDraft["shifts"][number], value: string | number) => setDraft({ ...draft, shifts: draft.shifts.map((shift, i) => i === index ? { ...shift, [key]: value } : shift) }); return <div><Eyebrow text="Dienstvorlagen" /><Title title="Passen deine Standarddienste?" text="Die bekannten Dienstzeiten sind bereits vorbelegt und jederzeit anpassbar." /><div className="space-y-3">{draft.shifts.map((shift, index) => <div key={shift.code} className="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 md:grid-cols-[80px_1fr_130px_130px]"><input aria-label="Kürzel" value={shift.code} onChange={(e) => update(index, "code", e.target.value.toUpperCase())} /><input aria-label="Name" value={shift.name} onChange={(e) => update(index, "name", e.target.value)} /><input aria-label="Beginn" type="time" value={shift.start} onChange={(e) => update(index, "start", e.target.value)} /><input aria-label="Ende" type="time" value={shift.end} onChange={(e) => update(index, "end", e.target.value)} /></div>)}</div></div>; }

function RulesStep({ draft, setDraft }: WizardProps) { const toggle = (id: string) => setDraft({ ...draft, enabledRules: draft.enabledRules.includes(id) ? draft.enabledRules.filter((value) => value !== id) : [...draft.enabledRules, id] }); return <div><Eyebrow text="Sonderregeln" /><Title title="Welche Bausteine brauchst du?" text="Aktiviere nur, was in deinem Dienstalltag vorkommt." /><div className="grid gap-3 md:grid-cols-2">{SPECIAL_RULES.map((rule) => { const active = draft.enabledRules.includes(rule.id); return <button type="button" key={rule.id} onClick={() => toggle(rule.id)} className={`rounded-2xl border p-4 text-left transition ${active ? "border-indigo-300 bg-indigo-50" : "border-[var(--border)] bg-white"}`}><div className="flex items-center gap-3"><span className={`grid size-6 place-items-center rounded-full ${active ? "bg-[var(--primary)] text-white" : "border border-[var(--border)]"}`}>{active && <Check size={15} />}</span><strong>{rule.label}</strong></div><p className="mt-2 pl-9 text-sm leading-6 text-[var(--muted)]">{rule.description}</p></button>})}</div></div>; }

function BalancesStep({ draft, setDraft }: WizardProps) { const update = (key: keyof SetupDraft["balances"], value: number) => setDraft({ ...draft, balances: { ...draft.balances, [key]: value } }); return <div><Eyebrow text="Startkonten" /><Title title="Mit welchen Werten startest du?" text="Unbekannte Werte können zunächst auf null bleiben und später korrigiert werden." /><div className="grid gap-4 md:grid-cols-2"><Field label="VM in Minuten"><input type="number" value={draft.balances.vmMinutes} onChange={(e) => update("vmMinutes", Number(e.target.value))} /></Field><Field label="RB in Minuten"><input type="number" value={draft.balances.rbMinutes} onChange={(e) => update("rbMinutes", Number(e.target.value))} /></Field><Field label="Resturlaub in Tagen"><input type="number" value={draft.balances.remainingLeaveDays} onChange={(e) => update("remainingLeaveDays", Number(e.target.value))} /></Field><Field label="Ansparurlaub in Tagen"><input type="number" value={draft.balances.savedLeaveDays} onChange={(e) => update("savedLeaveDays", Number(e.target.value))} /></Field><Field label="Bisherige Nachtstunden"><input type="number" value={Math.round(draft.balances.nightMinutes / 60)} onChange={(e) => update("nightMinutes", Number(e.target.value) * 60)} /></Field></div></div>; }

function RhythmStep({ draft, setDraft }: WizardProps) { const update = (index: number, value: string) => setDraft({ ...draft, rhythm: draft.rhythm.map((day, i) => i === index ? value : day) }); return <div><Eyebrow text="Dienstzyklus" /><Title title="Dein 10-Tage-Rhythmus" text="Der Rhythmus wird ab dem gewählten Datum fortlaufend in den Kalender übertragen." /><Field label="Startdatum"><input type="date" value={draft.rhythmStartDate} onChange={(e) => setDraft({ ...draft, rhythmStartDate: e.target.value })} /></Field><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">{draft.rhythm.map((day, index) => <label key={index} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-3"><span className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">Tag {index + 1}</span><input className="mt-2 w-full" value={day} onChange={(e) => update(index, e.target.value.toUpperCase())} /></label>)}</div></div>; }

function Finish({ draft }: { draft: SetupDraft }) { return <div className="py-4 text-center"><div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-50 text-[var(--success)]"><Check size={40} /></div><h1 className="mt-6 text-4xl font-black tracking-[-.05em]">Bereit für Certihora.</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-[var(--muted)]">Wir speichern {draft.shifts.length} Dienstvorlagen, {draft.enabledRules.length} Sonderregeln und deinen {draft.rhythm.length}-Tage-Zyklus. Danach öffnet sich dein Dashboard.</p></div>; }

type WizardProps = { draft: SetupDraft; setDraft: (draft: SetupDraft) => void };
function Eyebrow({ text }: { text: string }) { return <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--primary)]">{text}</p>; }
function Title({ title, text }: { title: string; text: string }) { return <div className="mb-7"><h1 className="mt-2 text-3xl font-black tracking-[-.04em] md:text-4xl">{title}</h1><p className="mt-3 leading-7 text-[var(--muted)]">{text}</p></div>; }
function Choice({ active, title, text }: { active: boolean; title: string; text: string }) { return <div className={`rounded-2xl border p-5 ${active ? "border-indigo-300 bg-indigo-50" : "border-[var(--border)]"}`}><strong className="text-lg">{title}</strong><p className="mt-1 text-sm text-[var(--muted)]">{text}</p></div>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-black">{label}</span><div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-white [&_input]:px-4 [&_input]:py-3 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-[var(--border)] [&_select]:bg-white [&_select]:px-4 [&_select]:py-3">{children}</div></label>; }
