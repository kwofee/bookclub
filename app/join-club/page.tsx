
import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";

import { InputForm } from "@/components/club-form";

export default async function CreateClubPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  
  return (
    <div className="p-6">
        <InputForm user={user}></InputForm>
    </div>
  );
}
