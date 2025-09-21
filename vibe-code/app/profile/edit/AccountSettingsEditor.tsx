// AccountSettingsEditor.tsx
// This component handles account settings
"use client";

import React, { useState } from 'react';

const AccountSettingsEditor = () => {
  const [email, setEmail] = useState('sophia.carter@example.com');
  const [notifications, setNotifications] = useState({
    comments: true,
    vibeChecks: true,
    newsletter: false
  });
  const [language, setLanguage] = useState('en');

  const handleNotificationChange = (notification: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [notification]: !notifications[notification]
    });
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
            <div className="flex items-center justify-between p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">account_circle</span>
                <span className="text-[#161118] dark:text-[#f5f7f8]">Google</span>
              </div>
              <span className="text-green-500 text-sm font-medium">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">code</span>
                <span className="text-[#161118] dark:text-[#f5f7f8]">GitHub</span>
              </div>
              <span className="text-green-500 text-sm font-medium">Connected</span>
            </div>
          </div>
        </div>
        
        {/* Notification preferences */}
        <div>
          <label className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-2">
            Notification Preferences
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg">
              <span className="text-[#161118] dark:text-[#f5f7f8]">Comments on my posts</span>
              <button
                type="button"
                onClick={() => handleNotificationChange('comments')}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.comments ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.comments ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg">
              <span className="text-[#161118] dark:text-[#f5f7f8]">Vibe Checks on my projects</span>
              <button
                type="button"
                onClick={() => handleNotificationChange('vibeChecks')}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.vibeChecks ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.vibeChecks ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#f5f7f8] dark:bg-[#0f0f1a] rounded-lg">
              <span className="text-[#161118] dark:text-[#f5f7f8]">Newsletter</span>
              <button
                type="button"
                onClick={() => handleNotificationChange('newsletter')}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.newsletter ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.newsletter ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
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
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-[#e2dbe6] dark:border-[#1a1a2e] rounded-lg text-[#161118] dark:text-[#f5f7f8] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="ja">日本語</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsEditor;