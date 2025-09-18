'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const EditProfilePage = () => {
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    name: 'Alex Ryder',
    bio: 'Software Engineer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL8BPUR0o8U7msmzlxt0WJUDeSoGlswvEjCIovJfuGedi4XGbkVWgSTr4XxGzZoNLKtU2Zkgg02av0cf5Ss4CaxkSAa37HyBbM1GxJpaCuL3zuEpG51PZ3MUKa56w5VjjoLoDNFJZbjzcXKvSlMcNhYCJVnjLuH828ylwXL-ep2WbuiHcEs-KKti4VXDyvljlCuN8lstrCRfp5NDg-DTAuaYffdfsIoIgp6ZJccdpgh2plDEIus7EEuCaQtyA7GZjB0flIdVXhCtI',
    background: 'default'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to update the user's profile
    console.log('Profile updated:', userData);
    // Redirect back to profile page
    router.push('/profile');
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 flex flex-1 justify-center pt-0 pb-6 sm:pb-8 md:pb-10">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-6 sm:gap-8">
        <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4 cyber-heading">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 bg-[#11091a] rounded-lg border border-[var(--primary-900)] shadow-lg shadow-black/30">
          {/* Avatar Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium leading-normal">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-16 w-16 border-2 border-[var(--primary-700)] neon-glow"
                style={{ backgroundImage: `url("${userData.avatar}")` }}
              ></div>
              <button 
                type="button"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[var(--primary-600)] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[var(--primary-500)] transition-all duration-300 neon-glow"
              >
                <span className="truncate">Change</span>
              </button>
            </div>
          </div>
          
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white text-sm font-medium leading-normal">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleInputChange}
              className="bg-[#1a1122] border border-[var(--primary-900)] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent"
            />
          </div>
          
          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-white text-sm font-medium leading-normal">Bio</label>
            <input
              id="bio"
              name="bio"
              type="text"
              value={userData.bio}
              onChange={handleInputChange}
              className="bg-[#1a1122] border border-[var(--primary-900)] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent"
            />
          </div>
          
          {/* Background Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium leading-normal">Profile Background</label>
            <div className="grid grid-cols-3 gap-4">
              {['default', 'grid', 'glitch'].map((bg) => (
                <div 
                  key={bg}
                  className={`h-20 rounded-md cursor-pointer border-2 ${
                    userData.background === bg 
                      ? 'border-[var(--primary-500)] neon-glow' 
                      : 'border-[var(--primary-900)]'
                  }`}
                  onClick={() => setUserData(prev => ({ ...prev, background: bg }))}
                >
                  {bg === 'default' && (
                    <div className="w-full h-full bg-[#11091a] rounded-md flex items-center justify-center">
                      <span className="text-[var(--primary-300)] text-xs">Default</span>
                    </div>
                  )}
                  {bg === 'grid' && (
                    <div className="w-full h-full bg-grid-pattern rounded-md flex items-center justify-center">
                      <span className="text-[var(--primary-300)] text-xs">Grid</span>
                    </div>
                  )}
                  {bg === 'glitch' && (
                    <div className="w-full h-full bg-[#11091a] rounded-md flex items-center justify-center relative overflow-hidden">
                      <span className="text-[var(--primary-300)] text-xs z-10">Glitch</span>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(138,43,226,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-glitch-move"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-6 bg-[#362348] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#4a315e] transition-all duration-300"
            >
              <span className="truncate">Cancel</span>
            </button>
            <button
              type="submit"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-6 bg-[var(--primary-600)] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[var(--primary-500)] transition-all duration-300 neon-glow"
            >
              <span className="truncate">Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;