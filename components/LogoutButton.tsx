"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react";
import { resolve } from "path";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

function LogoutButton(){

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const handleLogOut = async () => {
        setLoading(true);
        console.log("log out");
        
        const { error } = await supabase.auth.signOut({ scope: 'local' })

        if(!error){
            toast.success("Logged out");
            router.push('/');
        }else{
            toast.error("Error while logging out");
        }

        setLoading(false);
    }
    return (
        <Button
            variant="outline"
            onClick={handleLogOut}
            disabled={loading}
            className="w-24"
        >
            {(loading) ? <Loader2 className="animate-spin"/> : "Logout"}
        </Button>
    )
}

export default LogoutButton