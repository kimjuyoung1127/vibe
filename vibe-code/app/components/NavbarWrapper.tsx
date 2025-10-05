"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the actual Navbar component with no SSR
const DynamicNavbar = dynamic(() => import('./navbar'), {
  ssr: false,
  // 로딩 중 UI: 초기 렌더링 시 레이아웃이 흔들리지 않도록 너비를 지정합니다.
  loading: () => (
    <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-72 flex-col justify-between border-r border-primary/20 bg-background-light p-4 dark:bg-background-dark lg:flex" />
  ),
});

// This wrapper now manages the state and passes it down to the Navbar
const NavbarWrapper = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load saved state from localStorage on initial client-side render
  useEffect(() => {
    const savedState = localStorage.getItem('isSidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isSidebarCollapsed', String(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
  };

  return <DynamicNavbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />;
};

export default NavbarWrapper;
