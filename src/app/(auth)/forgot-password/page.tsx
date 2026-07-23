import { forgotPasswordAction } from "@/app/auth-actions";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm, AuthLink } from "@/components/auth/auth-form";

export default function ForgotPasswordPage() {
  return <AuthCard title="Passwort zurücksetzen" description="Wir senden dir einen sicheren Link zum Festlegen eines neuen Passworts.">
    <AuthForm action={forgotPasswordAction} submitLabel="Reset-Link senden" fields={[
      { name: "email", label: "E-Mail", type: "email", autoComplete: "email" },
    ]} footer={<p className="pt-2 text-center text-sm"><AuthLink href="/login">Zurück zur Anmeldung</AuthLink></p>} />
  </AuthCard>;
}
