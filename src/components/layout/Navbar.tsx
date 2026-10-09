import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { navItems } from '../../constants/navigation';
import { Button } from '../ui';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
      {/* Brand Logo */}
      <Link
        to={`/${language}/`}
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
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {navItems.map((item) => {
          const itemLocalizedPath = `/${language}${item.path === '/' ? '' : item.path}`;
          const currentPath = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
          const targetPath = itemLocalizedPath.endsWith('/') ? itemLocalizedPath : itemLocalizedPath + '/';

          const isActive =
            currentPath === targetPath ||
            (item.path !== '/' && location.pathname.startsWith(`/${language}${item.path}`));

          const label = item.key ? t(`nav.${item.key}`, item.name) : item.name;

          return (
            <Link
              key={item.name}
              to={itemLocalizedPath}
              className={`text-base font-semibold transition-colors duration-200 ${isActive
                ? 'text-[#08A49C]'
                : 'text-[#4B5563] hover:text-[#08A49C]'
                }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* CTA Button, Language Switcher & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        {/* Language Switcher Badge (EN | HI) */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200 shrink-0">
          <Globe className="w-4 h-4 text-teal-600 ml-1.5" />
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-full cursor-pointer text-xs font-bold transition-all ${language === 'en'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 rounded-full cursor-pointer text-xs font-bold transition-all ${language === 'hi'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            HI
          </button>
        </div>

        <Link to={`/${language}/donate`}>
          <Button
            variant="primary"
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200"
          >
            {t('nav.donateNow', 'Donate Now')}
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
