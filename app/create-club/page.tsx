
import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";
import { InputForm } from "@/components/new-club-form";

export default async function CreateClubPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  
  return (
      <div className="flex flex-col p-6 items-center justify-center">
          <h1 className="pb-4 text-3xl font-bold text-shadow-gray-50">Create A New Club</h1>
          <InputForm user={user}></InputForm>
      </div>
    );
}
