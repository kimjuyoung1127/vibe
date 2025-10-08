// app/profile/[id]/page.tsx
// This page displays a specific user's profile based on the user ID in the URL

import React from 'react';
import { notFound } from 'next/navigation';
import UserProfile from '@/app/profile/UserProfile';
import { supabase } from '@/app/lib/supabaseClient';

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

// Server-side function to check if user exists
async function validateUser(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error validating user:', error);
    return false;
  }

  return !!data;
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const userId = params.id;

  // Validate that the user exists
  const userExists = await validateUser(userId);
  
  if (!userExists) {
    // If the user doesn't exist, show a 404 page
    notFound();
  }

  return (
    <div className="w-full pt-12 pb-16 bg-background-light dark:bg-background-dark">
      <UserProfile userId={userId} />
    </div>
  );
};

export default UserProfilePage;