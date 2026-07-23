import { Card } from "@/components/ui/card";

export function AuthCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <Card className="w-full max-w-md">
        <div className="mb-7 flex items-center gap-3 text-xl font-black"><span className="grid size-11 place-items-center rounded-2xl bg-[var(--primary)] text-white">C</span>Certihora</div>
        <h1 className="text-3xl font-black tracking-[-.04em]">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
        {children}
      </Card>
    </main>
  );
}
