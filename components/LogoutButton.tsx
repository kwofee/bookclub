"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react";
import { resolve } from "path";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogOut = async () => {
        setLoading(true);
        console.log("log out");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const errorMessage = 1;
        if(!errorMessage){
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