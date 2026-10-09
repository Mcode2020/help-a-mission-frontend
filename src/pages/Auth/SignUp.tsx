// @intent Sign Up page component with password strength indicator, React 19 form action, terms validation, and registration modal.
import React, { useState, useActionState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import heroBg from '../../assets/hero_bg.png';
import { Button, Input, PhoneInput } from '../../components/ui';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useSignUpUserMutation } from '../../services/publicApi';
import { DEFAULT_COUNTRY_CODE, type CountryCode, validatePhoneForCountry } from '../../constants/countryCodes';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SignUpActionState {
  errorMessage: string;
  isSuccess: boolean;
}

const initialSignUpState: SignUpActionState = {
  errorMessage: '',
  isSuccess: false,
};

export const SignUp: React.FC = () => {
  const { language, t } = useLanguage();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [signUpUser, { isLoading: isApiLoading }] = useSignUpUserMutation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>(DEFAULT_COUNTRY_CODE);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Compute simple password strength score (0 to 4)
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passwordScore = calculatePasswordStrength(password);

  const getStrengthColor = () => {
    if (passwordScore === 0) return 'bg-slate-200 dark:bg-slate-700';
    if (passwordScore <= 1) return 'bg-rose-500';
    if (passwordScore <= 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStrengthLabel = () => {
    if (password.length === 0) return '';
    if (passwordScore <= 1) return 'Weak password';
    if (passwordScore <= 3) return 'Medium password';
    return 'Strong password';
  };

  // React 19 useActionState for form action handling
  const [formState, formAction, isPending] = useActionState<SignUpActionState, FormData>(
    async () => {
      const cleanName = fullName.trim();
      if (!cleanName || cleanName.length < 2) {
        return {
          errorMessage: t('auth.fullName', 'Please enter your full name (at least 2 characters)'),
          isSuccess: false,
        };
      }

      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
        return {
          errorMessage: t('auth.email', 'Please enter a valid email address'),
          isSuccess: false,
        };
      }

      const phoneValidation = validatePhoneForCountry(phone, countryCode);
      if (!phoneValidation.isValid) {
        return {
          errorMessage: phoneValidation.error || t('auth.phone', 'Please enter a valid mobile phone number'),
          isSuccess: false,
        };
      }

      const formattedFullPhone = phone.startsWith('+')
        ? phone
        : `${countryCode.dialCode}${phone.replace(/\D/g, '')}`;

      if (!password || password.length < 6) {
        return {
          errorMessage: 'Password must be at least 6 characters long',
          isSuccess: false,
        };
      }

      if (password !== confirmPassword) {
        return {
          errorMessage: 'Passwords do not match',
          isSuccess: false,
        };
      }

      if (!agreeTerms) {
        return {
          errorMessage: t('auth.agreeTerms', 'You must agree to the Terms of Service & Privacy Policy'),
          isSuccess: false,
        };
      }

      try {
        const result = await signUpUser({
          fullName: cleanName,
          email: cleanEmail,
          phone: formattedFullPhone,
          password,
        });

        if ('data' in result && result.data?.success) {
          const { user, token } = result.data.data;
          setAuth(user, token);
          setIsSuccessModalOpen(true);
          return {
            errorMessage: '',
            isSuccess: true,
          };
        } else if ('error' in result) {
          const errObj = result.error as { error?: string; data?: { message?: string; error?: { message?: string } | string } };
          const msg =
            typeof errObj?.data?.error === 'object' && errObj?.data?.error?.message
              ? errObj.data.error.message
              : typeof errObj?.data?.error === 'string'
              ? errObj.data.error
              : errObj?.data?.message || errObj?.error || 'Registration failed. Please check your inputs.';
          return {
            errorMessage: msg,
            isSuccess: false,
          };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Registration failed. Please check your inputs and try again.';
        return {
          errorMessage: msg,
          isSuccess: false,
        };
      }

      return { errorMessage: '', isSuccess: false };
    },
    initialSignUpState
  );




  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-dm">
      <div className="max-w-5xl mx-auto w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        {/* Left Hero / Brand Banner Section */}
        <div className="lg:col-span-5 relative bg-gradient-to-br from-[#08A49C] via-[#068d86] to-slate-900 p-8 sm:p-10 flex flex-col justify-between text-white overflow-hidden">
          {/* Background overlay image */}
          <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${heroBg})` }} />
          
          <div className="relative z-10 space-y-6">
            <Link to={`/${language}/`} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              <img src={logoImg} alt="Help-A-Mission Logo" className="w-9 h-9 rounded-full bg-white p-0.5" />
              <div>
                <span className="font-bold text-sm tracking-wide block leading-tight">HELP-A-MISSION</span>
                <span className="text-[10px] text-teal-200 tracking-wider uppercase block">Welfare Society JIND</span>
              </div>
            </Link>

            <div className="pt-4 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-200 border border-teal-300/30">
                <Sparkles className="w-3.5 h-3.5" />
                Join 15,000+ Supporters
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Make a Meaningful Difference Today.
              </h1>
              <p className="text-sm text-teal-100/90 leading-relaxed">
                Create an account to receive official 80G tax exemption receipts, track your social contribution, and volunteer for community health camps.
              </p>
            </div>
          </div>

          {/* Key Trust Perks */}
          <div className="relative z-10 pt-8 border-t border-white/15 space-y-3 text-xs text-teal-100">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Instant 80G Tax Exemption Receipts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Direct Transparency & Itemized Impact Reports</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Volunteer Certificates & Community Recognition</span>
            </div>
          </div>
        </div>

        {/* Right Form Card Section */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
          
          <div className="max-w-md mx-auto w-full space-y-5">
            {/* Form Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('auth.createAccount', 'Create an Account')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('auth.signupSubtitle', 'Join Help-A-Mission Welfare Society to make a lasting impact in our community.')}
              </p>
            </div>

            {/* Error Message */}
            {formState.errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{formState.errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form action={formAction} className="space-y-3.5">
              <Input
                label={t('auth.fullName', 'Full Name')}
                type="text"
                placeholder="e.g. Rajesh Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
              />

              <Input
                label={t('auth.email', 'Email Address')}
                type="email"
                placeholder="rajesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <PhoneInput
                label={t('auth.phone', 'Mobile Number')}
                selectedCountry={countryCode}
                onCountryChange={(c) => setCountryCode(c)}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {/* Password with Strength Indicator */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('auth.password', 'Password')}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm pl-10 pr-10 py-2.5 sm:py-3 transition-all duration-200 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordScore / 4) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {getStrengthLabel()}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('auth.confirmPassword', 'Confirm Password')}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm pl-10 pr-10 py-2.5 sm:py-3 transition-all duration-200 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#08A49C] focus:ring-[#08A49C]"
                  />
                  <span className="leading-tight">
                    {t('auth.agreeTerms', 'I agree to the Terms of Service & Privacy Policy')}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                isLoading={isPending || isApiLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full py-3 rounded-xl font-semibold text-base shadow-md shadow-[#08A49C]/20 mt-2"
              >
                {t('auth.signUp', 'Create Account')}
              </Button>
            </form>


            {/* Login Link */}
            <div className="pt-2 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span>{t('auth.alreadyHaveAccount', 'Already have an account?')} </span>
              <Link
                to={`/${language}/login`}
                className="font-bold text-[#08A49C] hover:text-[#068d86] hover:underline"
              >
                {t('auth.signIn', 'Sign In')}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-5 relative">
            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/40 text-[#08A49C] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Account Created Successfully!</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Welcome to Help-A-Mission Welfare Society, <span className="font-semibold text-slate-800 dark:text-slate-200">{fullName}</span>!
              </p>
            </div>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-900/50 text-xs text-teal-800 dark:text-teal-200 text-left space-y-1">
              <p>Email: {email}</p>
              <p>Registration No: HAM-2026-{(Math.floor(Math.random() * 89999) + 10000)}</p>
            </div>

            <Button
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate(`/${language}/`);
              }}
              variant="primary"
              className="w-full py-3 rounded-xl font-semibold text-sm"
            >
              Proceed to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
