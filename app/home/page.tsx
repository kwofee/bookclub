import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        console.log("No user");
        redirect("/login");
    }

    return (
        <div className="flex flex-col">Home Page</div>
    );
}