import { Card } from "@/components/ui/card";
import { formatMinutes } from "@/engine/time";

const metrics = [
  ["VM-Konto", formatMinutes(560), "+2:45 h im März"],
  ["Bis Zusatzurlaub", "43 h", "Nächste Schwelle: 275 h"],
  ["Resturlaub", "17 Tage", "1 Tag im März geplant"],
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <header><p className="text-xs font-black uppercase tracking-[.16em] text-[var(--muted)]">Certihora Alpha</p><h1 className="mt-1 text-4xl font-black tracking-[-.05em]">Guten Morgen.</h1><p className="mt-2 text-[var(--muted)]">Die echte App-Codebasis läuft.</p></header>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <Card className="overflow-hidden bg-gradient-to-br from-white to-[#f4f6ff]">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.14em] text-[var(--muted)]">Heute</p><h2 className="mt-5 text-4xl font-black tracking-[-.05em]">Frei</h2><p className="mt-2 text-[var(--muted)]">Neuer Zyklus · Tag 3</p></div><span className="rounded-full bg-[#eaf8f2] px-3 py-2 text-xs font-black text-[#157454]">Alles im Plan</span></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2"><Info label="Nächster Dienst" value="F1 · Mittwoch"/><Info label="Ruhezeit" value="46:30 h"/><Info label="VM-Prognose" value="+9:20 h"/><Info label="Nachtstunden" value="232 h"/></div>
        </Card>
        <Card><h2 className="text-xl font-black tracking-[-.03em]">Nächster Dienst</h2><p className="mt-2 text-sm text-[var(--muted)]">Mittwoch · 05:45–15:15</p><div className="mt-6 space-y-4"><Timeline time="05:45" title="F1 beginnt" text="Langer Frühdienst · ohne Pause"/><Timeline time="15:15" title="Dienstende" text="9:30 h Anrechnung"/><Timeline time="danach" title="Ruhezeit" text="36 Stunden bis zum Folgedienst"/></div></Card>
      </div>
      <div className="grid gap-5 md:grid-cols-3">{metrics.map(([label,value,foot]) => <Card key={label}><p className="text-xs font-black uppercase tracking-[.12em] text-[var(--muted)]">{label}</p><p className="my-3 text-3xl font-black tracking-[-.04em]">{value}</p><p className="text-sm text-[var(--muted)]">{foot}</p></Card>)}</div>
      <Card><h2 className="text-xl font-black tracking-[-.03em]">Sprint 1 Status</h2><p className="mt-2 text-[var(--muted)]">Projektstruktur, Navigation, Design-Tokens, Smart-Engine und Supabase-Grundlage sind vorbereitet.</p></Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[var(--border)] bg-white p-4"><span className="text-[10px] font-black uppercase tracking-[.1em] text-[var(--muted)]">{label}</span><strong className="mt-2 block">{value}</strong></div>; }
function Timeline({ time, title, text }: { time: string; title: string; text: string }) { return <div className="grid grid-cols-[55px_1fr] gap-2"><span className="text-xs font-bold text-[var(--muted)]">{time}</span><div className="border-b border-[var(--border)] pb-4"><strong>{title}</strong><p className="mt-1 text-xs text-[var(--muted)]">{text}</p></div></div>; }
