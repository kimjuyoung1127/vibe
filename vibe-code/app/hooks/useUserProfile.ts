import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

export interface UserProfileData {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  website_url: string;
}

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user profile using the correct foreign key 'user_id'
          const { data, error } = await supabase
            .from('user_profiles')
            .select('id, user_id, username, display_name, avatar_url, bio, github_url, linkedin_url, website_url')
            .eq('user_id', session.user.id)
            .single();
            
          if (!error && data) {
            setUserProfile(data);
          } else {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Set loading to true when fetching user profile after auth state change
        setLoading(true);
        // Fetch user profile using the correct foreign key 'user_id'
        // Create a separate function to handle the profile fetch with proper loading state management
        const fetchProfile = async () => {
          try {
            const { data, error } = await supabase
              .from('user_profiles')
              .select('id, user_id, username, display_name, avatar_url, bio, github_url, linkedin_url, website_url')
              .eq('user_id', session.user.id)
              .single();
            
            if (!error && data) {
              setUserProfile(data);
            } else {
              console.error('Error fetching user profile on auth change:', error);
              setUserProfile(null);
            }
          } catch (error) {
            console.error('Error in profile fetch:', error);
            setUserProfile(null);
          } finally {
            setLoading(false);
          }
        };
        
        fetchProfile();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { userProfile, loading };
};

export default useUserProfile;