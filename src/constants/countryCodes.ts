export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  formatPlaceholder: string;
  minLength: number;
  maxLength: number;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', formatPlaceholder: '98123 45678', minLength: 10, maxLength: 10 },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', formatPlaceholder: '202 555 0123', minLength: 10, maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', formatPlaceholder: '7911 123456', minLength: 10, maxLength: 11 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', formatPlaceholder: '416 555 0147', minLength: 10, maxLength: 10 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', formatPlaceholder: '50 123 4567', minLength: 9, maxLength: 9 },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', formatPlaceholder: '412 345 678', minLength: 9, maxLength: 9 },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', formatPlaceholder: '151 23456789', minLength: 10, maxLength: 11 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', formatPlaceholder: '8123 4567', minLength: 8, maxLength: 8 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', formatPlaceholder: '51 234 5678', minLength: 9, maxLength: 9 },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', formatPlaceholder: '981 2345678', minLength: 10, maxLength: 10 },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', formatPlaceholder: '1712 345678', minLength: 10, maxLength: 10 },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', formatPlaceholder: '300 1234567', minLength: 10, maxLength: 10 },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', formatPlaceholder: '12 345 6789', minLength: 9, maxLength: 10 },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', formatPlaceholder: '9123 4567', minLength: 8, maxLength: 8 },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', formatPlaceholder: '3312 3456', minLength: 8, maxLength: 8 },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', formatPlaceholder: '9123 4567', minLength: 8, maxLength: 8 },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', formatPlaceholder: '3612 3456', minLength: 8, maxLength: 8 },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', formatPlaceholder: '71 234 5678', minLength: 9, maxLength: 9 },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', formatPlaceholder: '21 123 4567', minLength: 8, maxLength: 10 },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', formatPlaceholder: '6 12 34 56 78', minLength: 9, maxLength: 9 },
];

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0]; // India +91

/**
 * Validate phone digits for a selected country code
 */
export function validatePhoneForCountry(digitsOnly: string, country: CountryCode = DEFAULT_COUNTRY_CODE): { isValid: boolean; error?: string } {
  const cleanDigits = digitsOnly.replace(/\D/g, '');
  if (!cleanDigits) {
    return { isValid: false, error: 'Mobile phone number is required.' };
  }
  if (cleanDigits.length < country.minLength) {
    return {
      isValid: false,
      error: `Mobile number for ${country.name} (${country.dialCode}) must be at least ${country.minLength} digits.`
    };
  }
  if (cleanDigits.length > country.maxLength) {
    return {
      isValid: false,
      error: `Mobile number for ${country.name} (${country.dialCode}) cannot exceed ${country.maxLength} digits.`
    };
  }
  return { isValid: true };
}
