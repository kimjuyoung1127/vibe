"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems: NavItem[] = [
    { icon: '', label: 'Home', href: '/' },
    { icon: '', label: 'Projects', href: '/projects' },
    { icon: ' ', label: 'Tool&tech', href: '/tech' },
    { icon: '', label: 'Community', href: '/community' },
    { icon: '', label: 'News', href: '/news' },
  ];

  return (
    <aside className={`sticky top-[61px] hidden h-[calc(100vh-61px)] flex-col justify-between border-r border-primary/20 bg-background-light p-4 dark:bg-background-dark lg:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9hObyn2gW7Bz7eMWI1H9ewEyue6S8iS83-Fzb5ePmp41f4i6tgyX-J1nO9Hl5zh3ta8XzBM4UbJ4523HCiuSyJ96y2PpwuXLnibaJmReZwqKenYrxdmMfnh5ZNsMU5ouTIJCsKOqfxWaMhsJHSb3MRGLuMjv_w11vz0poV4y6uKDZlfqSotWLrIr1z0Ru-Rty1XEIlPO180irzteXkV_cejqXBcxCYn77nMLMjN347eQ1REZ70u9-wJ7CfXKBCQYIcyT9bXuUTQ")' }}></div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-black dark:text-white">Sophia Carter</h1>
              <p className="text-sm text-black/60 dark:text-white/60">@sophia_carter</p>
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-black/80 transition-colors hover:bg-primary/5 dark:text-white/80 dark:hover:bg-primary/10 ${index === 0 ? 'bg-primary/10 text-primary dark:bg-primary/20' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {!isCollapsed && <p className="text-sm font-medium">{item.label}</p>}
            </Link>
          ))}
        </nav>
      </div>

    </aside>
  );
};

export default Navbar;