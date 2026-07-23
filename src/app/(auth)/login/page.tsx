import { loginAction } from "@/app/auth-actions";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm, AuthLink } from "@/components/auth/auth-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <AuthCard title="Willkommen zurück" description="Melde dich an und öffne deinen persönlichen Certihora-Bereich.">
    <AuthForm action={loginAction} hiddenNext={next} submitLabel="Anmelden" fields={[
      { name: "email", label: "E-Mail", type: "email", autoComplete: "email", placeholder: "name@beispiel.de" },
      { name: "password", label: "Passwort", type: "password", autoComplete: "current-password" },
    ]} footer={<div className="flex flex-wrap justify-between gap-3 pt-2 text-sm"><AuthLink href="/register">Konto erstellen</AuthLink><AuthLink href="/forgot-password">Passwort vergessen?</AuthLink></div>} />
  </AuthCard>;
}
