import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(request: NextRequest) {
  try {
    // For Supabase authentication in middleware without @supabase/ssr,
    // we'll use a simple approach that redirects based on path
    // Actual authentication will be handled on the client-side in protected components
    
    // Define routes that require authentication
    const protectedPaths = ['/profile', '/dashboard', '/settings'];
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );
    
    // In a real implementation without @supabase/ssr, we'd need to verify
    // the session token from cookies, but that's complex without the SSR package
    // For now, we'll let the page components handle the authentication
    
    // If user is on login and they're already authenticated, redirect to home
    if (request.nextUrl.pathname.startsWith('/login')) {
      // Note: We can't easily check authentication status without @supabase/ssr
      // so we'll handle this on the client-side
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

// Specify the paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};