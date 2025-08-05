import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '../server'


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  console.log("searhParams ", searchParams);
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }
  console.log("Code: ", code)
  if (code) {
    const supabase = await createClient()
    // const { error } = await supabase.auth.exchangeCodeForSession(code)
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.session) {
      // Extract Google tokens
      const googleAccessToken = data.session.provider_token;
      const googleRefreshToken = data.session.provider_refresh_token;
      // TODO: Save these tokens securely if needed

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
    }
  }
    console.log("Error", error);
  }
  
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}