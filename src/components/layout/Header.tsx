import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full relative z-40">
      {/* Main Navbar Sticky Container */}
      <div
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100/80 py-0'
          : 'bg-white border-b border-gray-100'
          }`}
      >
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
