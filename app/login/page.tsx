"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

function LoginPage(){
  const supabase = createSupabaseBrowserClient();
  const handleLogin = async () => {
    const callbackUrl = `${window.location.origin}/auth/callback?next=/`;
    
    await supabase.auth.signInWithOAuth({
      provider:"google",
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        }
      },
    });
  };
  
  return (
    <div className="flex align-middle justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="justify-center">
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-3">
          <Button onClick={handleLogin}>
            Log In With Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginPage;