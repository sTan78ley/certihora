import { registerAction } from "@/app/auth-actions";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm, AuthLink } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return <AuthCard title="Certihora starten" description="Erstelle dein Konto. Danach richten wir dein Arbeitszeitmodell gemeinsam ein.">
    <AuthForm action={registerAction} submitLabel="Kostenlos registrieren" fields={[
      { name: "displayName", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "E-Mail", type: "email", autoComplete: "email" },
      { name: "password", label: "Passwort", type: "password", autoComplete: "new-password", placeholder: "Mindestens 8 Zeichen" },
    ]} footer={<p className="pt-2 text-center text-sm text-[var(--muted)]">Bereits registriert? <AuthLink href="/login">Anmelden</AuthLink></p>} />
  </AuthCard>;
}
