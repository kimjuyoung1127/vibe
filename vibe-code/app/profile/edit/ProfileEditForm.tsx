// ProfileEditForm.tsx
// This component contains the form for editing user profile information
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import useUserProfile, { UserProfileData } from '@/app/hooks/useUserProfile';
import BasicInfoEditor from './BasicInfoEditor';
import SocialLinksEditor from './SocialLinksEditor';
import AccountSettingsEditor from './AccountSettingsEditor';

const ProfileEditForm = () => {
  const { userProfile, loading } = useUserProfile();
  const [formData, setFormData] = useState<Partial<UserProfileData>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Initialize form data when user profile is loaded
  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('No user session found');
      }

      // Update user profile in the database
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          github_url: formData.github_url,
          linkedin_url: formData.linkedin_url,
          website_url: formData.website_url,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id)
        .select()
        .single();

      if (error) throw error;

      setSaveSuccess(true);
      // Keep success message for 3 seconds before resetting button text
      setTimeout(() => {
        setSaveSuccess(false);
        // Reset form data to reflect saved state
        if (data) {
          setFormData(data);
        }
      }, 3000);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setSaveError(error.message || 'Failed to save profile changes. Please try again.');
      // Clear error message after 5 seconds
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.'
    );
    
    if (!confirmed) return;

    try {
      setSaving(true);
      setSaveError(null);

      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('No user session found');
      }

      // Delete user profile from database first
      const { error: profileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', session.user.id);

      if (profileError) throw profileError;

      // Delete user from auth (this will trigger cascading deletes)
      const { error: authError } = await supabase.auth.admin.deleteUser(
        session.user.id
      );

      if (authError) throw authError;

      // Sign out the user
      await supabase.auth.signOut();

      // Redirect to home page after successful deletion
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setSaveError(error.message || 'Failed to delete account. Please try again.');
      // Clear error message after 5 seconds
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Back button */}
        <div className="px-4 py-6">
          <Link 
            href="/profile" 
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Profile</span>
          </Link>
        </div>
        
        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 px-4 py-4 border-b border-primary/10 dark:border-primary/20">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] dark:text-[#f5f7f8] tracking-light text-[32px] font-bold leading-tight">
              Edit My Profile
            </p>
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm font-normal leading-normal">
              Update your profile information and preferences
            </p>
          </div>
        </div>
        
        {/* Status messages */}
        {saveSuccess && (
          <div className="px-4 py-2">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">Profile updated successfully.</span>
            </div>
          </div>
        )}
        
        {saveError && (
          <div className="px-4 py-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{saveError}</span>
            </div>
          </div>
        )}
        
        {/* Basic information section */}
        <BasicInfoEditor formData={formData} setFormData={setFormData} />
        
        {/* Social links section */}
        <SocialLinksEditor formData={formData} setFormData={setFormData} />
        
        {/* Account settings section */}
        <AccountSettingsEditor formData={formData} setFormData={setFormData} />
        
        {/* Action buttons */}
        <div className="px-4 py-6 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : saveSuccess ? 'Saved' : 'Save Changes'}
          </button>
          
          <Link
            href="/profile"
            className="px-6 py-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Cancel
          </Link>
          
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={saving}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-auto disabled:opacity-50"
          >
            {saving ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditForm;