import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <footer 
      className="bg-white py-6 border-t border-gray-200"
      role="contentinfo"
      aria-label="Website footer with legal links"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Link href="/" className="flex items-center gap-3 text-primary">
              <img 
                src="/images/200.svg" 
                alt="Vibe Hub Logo"
                className="h-6 w-6 object-contain"
                width={24}
                height={24}
              />
              <h2 className="text-lg font-bold tracking-tighter text-black dark:text-white">Vibe Hub</h2>
            </Link>
            <p className="text-sm text-gray-600 mt-1 text-center">A community for vibe coders</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a 
              href="/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-of-service" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="/cookie-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <a 
              href="/content-guidelines" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Content Guidelines
            </a>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentDate} Vibe Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;