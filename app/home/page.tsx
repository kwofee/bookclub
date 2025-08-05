import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";



export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        console.log("No user");
        redirect("/login");
    }

    const { data: profileData, error } = await supabase.from("profiles").select("*").eq("user_id", user.id)
      // console.log("Profile data", profileData)
      if(!profileData || profileData?.length == 0 ){
        redirect("/first-time-user")
      }

    return (
        <div className="flex flex-col">Home Page</div>
    );
}