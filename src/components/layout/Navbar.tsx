import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { navItems } from '../../constants/navigation';
import { Button } from '../ui';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
      {/* Brand Logo */}
      <Link
        to="/"
        className="flex items-center focus:outline-none rounded-lg p-1"
        aria-label="Help-A-Mission Welfare Society Home"
      >
        <div className="relative h-16 w-auto flex items-center">
          <img
            src={logoImg}
            alt="Help-A-Mission Welfare Society JIND Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`text-base font-semibold transition-colors duration-200 ${
                isActive
                  ? 'text-[#08A49C]'
                  : 'text-[#4B5563] hover:text-[#08A49C]'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* CTA Button & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <Link to="/donate">
          <Button
            variant="primary"
            className="rounded-full px-7 py-3 text-base font-semibold transition-all duration-200"
          >
            Donate Now
          </Button>
        </Link>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          type="button"
          className="md:hidden p-2.5 rounded-xl text-[#4B5563] hover:text-[#08A49C] hover:bg-teal-50/50 focus:outline-none transition-colors"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-[#08A49C]" />
          ) : (
            <Menu className="w-6 h-6 text-[#4B5563]" />
          )}
        </button>
      </div>
    </nav>
  );
};
