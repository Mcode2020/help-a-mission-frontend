import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Work', path: '/our-work' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      {/* Brand Logo & Name */}
      <Link
        to="/"
        className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 transition"
        aria-label="Help-A-Mission Welfare Society Home"
      >
        <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-teal-500/20 shadow-sm group-hover:border-teal-500 transition-colors">
          <img
            src={logoImg}
            alt="Help-A-Mission Welfare Society JIND Logo"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-base font-bold text-gray-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
            Help-A-Mission
          </span>
          <span className="text-xs font-semibold text-teal-700 tracking-wide uppercase">
            Welfare Society JIND
          </span>
          <span className="text-[10px] text-gray-500 leading-none mt-0.5">
            Regd. No. 01667
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                  ? 'text-teal-600 bg-teal-50/80 shadow-xs'
                  : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* CTA Button & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <Link
          to="/donate"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-600/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <Heart className="w-4 h-4 fill-white/20 animate-pulse" />
          <span>Donate Now</span>
        </Link>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          type="button"
          className="md:hidden p-2.5 rounded-xl text-gray-700 hover:text-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-teal-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>
    </nav>
  );
};
