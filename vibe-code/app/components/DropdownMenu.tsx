"use client";

// components/DropdownMenu.tsx
// A reusable dropdown menu component with 3-dot icon
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DropdownMenuProps } from '@/app/types/components';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  children, 
  contentId,
  contentType,
  targetId,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Close dropdown when clicking outside (both button and menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !dropdownRef.current?.contains(target) &&
        !menuContainerRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateMenuPosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    // 기본 메뉴 폭(w-48 = 12rem = 192px)을 고려하여 오른쪽 정렬
    const width = 192;
    const top = rect.bottom + window.scrollY + 8; // mt-2 보정(약 8px)
    const left = rect.right + window.scrollX - width;
    setMenuPos({ top, left });
  };

  const toggleDropdown = () => {
    const next = !isOpen;
    setIsOpen(next);
    console.log('Dropdown toggled:', next, { contentType, targetId, contentId });
    if (next) {
      // 열릴 때 위치 갱신
      updateMenuPosition();
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div>
        <button
          type="button"
          ref={buttonRef}
          className="flex items-center justify-center rounded-full p-2 text-sm text-[#7c608a] dark:text-[#c5b3d1] hover:text-[#161118] dark:hover:text-[#f5f7f8] hover:bg-primary/10 dark:hover:bg-primary/20"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* 메뉴를 Portal로 렌더링하여 부모 overflow의 영향을 받지 않도록 처리 */}
      {isOpen && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div
          ref={menuContainerRef}
          className="fixed z-[1000] origin-top-right w-48 rounded-md shadow-lg bg-background-light dark:bg-background-dark ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{ top: menuPos.top, left: menuPos.left }}
          onClick={(e) => e.stopPropagation()} // 메뉴 내부 클릭 시 닫히지 않도록
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DropdownMenu;