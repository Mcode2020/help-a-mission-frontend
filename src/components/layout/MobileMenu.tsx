import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { navItems } from '../../constants/navigation';
import logoImg from '../../assets/logo.png';
import { Button } from '../ui';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Close on Escape key press & prevent scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over menu panel */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto transform transition-transform duration-300">
        {/* Header inside mobile menu */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-10 h-10 rounded-full border border-[#08A49C]/30 object-cover"
            />
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">Help-A-Mission</p>
              <p className="text-[10px] text-[#08A49C] font-semibold uppercase">Welfare Society JIND</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-[#4B5563]" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-base transition-all ${isActive
                  ? 'text-[#08A49C] bg-[#08A49C]/10 font-semibold border-l-4 border-[#08A49C]'
                  : 'text-[#4B5563] hover:text-[#08A49C] hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Action & Contact Info */}
        <div className="p-4 border-t border-gray-100 bg-slate-50 space-y-4">
          <Link to="/donate" className="w-full block">
            <Button variant="primary" className="w-full py-3 rounded-full font-semibold">
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
