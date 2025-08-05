import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
