import { resetPasswordAction } from "@/app/auth-actions";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";

export default function ResetPasswordPage() {
  return <AuthCard title="Neues Passwort" description="Lege jetzt ein neues, sicheres Passwort für dein Certihora-Konto fest.">
    <AuthForm action={resetPasswordAction} submitLabel="Passwort speichern" fields={[
      { name: "password", label: "Neues Passwort", type: "password", autoComplete: "new-password" },
      { name: "confirmPassword", label: "Passwort wiederholen", type: "password", autoComplete: "new-password" },
    ]} />
  </AuthCard>;
}
