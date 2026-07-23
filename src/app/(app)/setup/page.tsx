import { redirect } from "next/navigation";
import { SetupWizard } from "@/features/setup/setup-wizard";
import { createClient } from "@/lib/supabase/server";

export default async function SetupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("onboarding_completed").eq("id", user.id).maybeSingle();
  if (profile?.onboarding_completed) redirect("/dashboard");

  return <SetupWizard />;
}
