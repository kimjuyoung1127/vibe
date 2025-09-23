// AccountSettingsEditor.tsx
// This component handles account settings
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface AccountSettingsEditorProps {
  formData: any;
  setFormData: (data: any) => void;
}

const AccountSettingsEditor = ({ formData, setFormData }: AccountSettingsEditorProps) => {
  const [email, setEmail] = useState('');
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState({
    comments: true,
    vibeChecks: true,
    newsletter: false
  });
  const [language, setLanguage] = useState('en');

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Set email from session
          setEmail(session.user.email || '');
          
          // Get connected providers from user metadata
          const providers = session.user.app_metadata?.providers || [];
          const connectedProviders = providers.map((provider: string) => {
            let name = provider;
            let icon = 'account_circle';
            
            switch (provider) {
              case 'google':
                name = 'Google';
                icon = 'account_circle';
                break;
              case 'github':
                name = 'GitHub';
                icon = 'code';
                break;
              default:
                name = provider.charAt(0).toUpperCase() + provider.slice(1);
            }
            
            return { name, icon, provider };
          });
          
          setConnectedAccounts(connectedProviders);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNotificationChange = (notification: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [notification]: !notifications[notification]
    });
    
    // In a future implementation, we would save these preferences to the database
    // For now, we'll just update the UI state
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    // In a future implementation with i18n, we would:
    // 1. Update the user's language preference in the database
    // 2. Change the app's language dynamically
    // setFormData({ ...formData, language: newLanguage });
  };

  const handleChangeEmail = () => {
    // In a real implementation, this would trigger an email change flow
    alert('Email change functionality would be implemented here');
  };

  return (
    <div className="p-4">
      <h2 className="text-[#161118] dark:text-[#f5f7f8] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
        Account Settings
      </h2>
      
      <div className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Email Address
          </label>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              readOnly
              className="flex-1 px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={handleChangeEmail}
              className="px-4 py-2 bg-[#f5f7f8] dark:bg-[#0f0f1a] text-[#161118] dark:text-[#f5f7f8] rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              Change Email
            </button>
          </div>
        </div>
        
        {/* Connected accounts */}
        <div>
          <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Connected Social Accounts
          </label>
          <div className="space-y-3">
            {connectedAccounts.length > 0 ? (
              connectedAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{account.icon}</span>
                    <span className="text-[#161118] dark:text-[#f5f7f8]">{account.name}</span>
                  </div>
                  <span className="text-green-500 text-sm font-medium">Connected</span>
                </div>
              ))
            ) : (
              <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">No connected accounts found</p>
            )}
          </div>
        </div>
        
        {/* Notification preferences - Simplified for now */}
        <div>
          <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Notification Preferences
          </label>
          <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg p-4">
            <p className="text-[#7c608a] dark:text-[#c5b3d1] text-sm">
              Notification settings will be implemented when backend notification services are available.
            </p>
          </div>
        </div>
        
        {/* Language preference */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Language Preference
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="ja">日本語</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          <p className="text-[#7c608a] dark:text-[#c5b3d1] text-xs mt-1">
            Multi-language support will be implemented in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsEditor;