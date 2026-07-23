import Link from "next/link";
import { CalendarDays, ChartNoAxesCombined, Clock3, LayoutDashboard, LogOut, Settings2, WandSparkles } from "lucide-react";
import { logoutAction } from "@/app/auth-actions";

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Kalender", "/calendar", CalendarDays],
  ["Erfassen", "/capture", Clock3],
  ["Zeitkonten", "/accounts", ChartNoAxesCombined],
  ["Dienst-Zwilling", "/duty-twin", WandSparkles],
  ["Einstellungen", "/settings", Settings2],
] as const;

export function AppShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  const initials = userName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <aside className="hidden min-h-screen border-r border-[var(--border)] bg-white/90 p-5 md:flex md:flex-col">
        <div className="mb-8 flex items-center gap-3 text-xl font-black"><span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-[var(--primary-strong)] to-[#7187f6] text-white">C</span>Certihora</div>
        <nav className="grid gap-2">
          {items.map(([label, href, Icon], index) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${index === 0 ? "bg-[#eef1ff] text-[var(--primary)]" : "text-[var(--muted)] hover:bg-[var(--surface-soft)]"}`}><Icon size={19}/>{label}</Link>)}
        </nav>
        <div className="mt-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
          <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-white text-xs font-black text-[var(--primary)]">{initials || "C"}</span><span className="min-w-0 flex-1 truncate text-sm font-bold">{userName}</span></div>
          <form action={logoutAction}><button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--danger)]"><LogOut size={16}/>Abmelden</button></form>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-[1450px] px-4 py-6 pb-24 md:px-8 md:py-8">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-20 flex justify-around rounded-3xl border border-[var(--border)] bg-white/95 p-2 shadow-2xl backdrop-blur md:hidden">
        {items.slice(0,5).map(([label,href,Icon],index)=><Link key={href} href={href} className={`grid min-w-14 place-items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold ${index===0?"bg-[#eef1ff] text-[var(--primary)]":"text-[var(--muted)]"}`}><Icon size={19}/><span>{label==="Dienst-Zwilling"?"Zwilling":label}</span></Link>)}
      </nav>
    </div>
  );
}
