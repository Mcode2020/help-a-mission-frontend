import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRY_CODES, type CountryCode, DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { cn } from '../../lib/utils';


export interface PhoneInputProps {
  label?: string;
  selectedCountry?: CountryCode;
  onCountryChange?: (country: CountryCode) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  selectedCountry = DEFAULT_COUNTRY_CODE,
  onCountryChange,
  value,
  onChange,
  error,
  id,
  placeholder,
  required,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputId = id || 'phone-input';

  return (
    <div className="w-full space-y-1.5 text-left relative" ref={dropdownRef}>
      {label && (
        <label htmlFor={inputId} className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center w-full rounded-xl border bg-white dark:bg-slate-900 transition-all duration-200 shadow-xs focus-within:ring-2',
          error
            ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/20'
            : 'border-slate-200 dark:border-slate-800 focus-within:border-teal-500 focus-within:ring-teal-500/20',
          className
        )}
      >
        {/* Country Code Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2.5 sm:py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-l-xl border-r border-slate-200 dark:border-slate-800 shrink-0 cursor-pointer select-none"
          title="Select Country Code"
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">{selectedCountry.dialCode}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Number Input */}
        <div className="relative flex-1 flex items-center">
          <input
            id={inputId}
            type="tel"
            value={value}
            onChange={onChange}
            placeholder={placeholder || selectedCountry.formatPlaceholder}
            required={required}
            className="w-full bg-transparent px-3.5 py-2.5 sm:py-3 text-slate-900 dark:text-slate-100 text-sm outline-none placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Country Selection Dropdown Popup */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search country or dial code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 text-xs rounded-xl pl-8 pr-3 py-2 outline-none border border-slate-200/60 dark:border-slate-700"
              autoFocus
            />
          </div>

          <div className="max-h-56 overflow-y-auto p-1 space-y-0.5 custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={`${country.code}-${country.dialCode}`}
                  type="button"
                  onClick={() => {
                    if (onCountryChange) onCountryChange(country);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                    selectedCountry.code === country.code
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-base">{country.flag}</span>
                    <span className="truncate">{country.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 font-semibold shrink-0 ml-2">{country.dialCode}</span>
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">No matching countries</p>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
};
