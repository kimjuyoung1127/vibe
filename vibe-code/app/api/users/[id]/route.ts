// app/api/users/[id]/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get Supabase credentials from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a Supabase client with service role key (has admin privileges)
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    });

    // Get user by ID using the admin API
    const { data: user, error } = await supabase.auth.admin.getUserById(params.id);

    if (error) {
      console.error('Error fetching user:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch user' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return limited user information (only what's needed for display)
    return new Response(
      JSON.stringify({
        id: user.user.id,
        email: user.user.email,
        user_metadata: user.user.user_metadata
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error in API route:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}