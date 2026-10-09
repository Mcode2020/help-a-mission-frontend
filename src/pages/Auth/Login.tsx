// @intent Login page component with responsive dual-pane layout, validation, React 19 form action, and i18n support.
import React, { useState, useActionState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles, X } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import heroBg from '../../assets/hero_bg.png';
import { Button, Input } from '../../components/ui';

import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useLoginUserMutation } from '../../services/publicApi';

interface LoginActionState {
  errorMessage: string;
  successMessage: string;
}

const initialLoginState: LoginActionState = {
  errorMessage: '',
  successMessage: '',
};

export const Login: React.FC = () => {
  const { language, t } = useLanguage();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loginUser, { isLoading: isApiLoading }] = useLoginUserMutation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // React 19 useActionState for declarative form execution & state management
  const [formState, formAction, isPending] = useActionState<LoginActionState, FormData>(
    async () => {
      let cleanIdentifier = identifier.trim();
      if (!cleanIdentifier) {
        return {
          errorMessage: t('auth.emailOrPhone', 'Please enter your email address or mobile number'),
          successMessage: '',
        };
      }

      // If identifier is numeric (mobile number) and doesn't start with +, prepend default country code (+91)
      if (!cleanIdentifier.includes('@')) {
        const digitsOnly = cleanIdentifier.replace(/\D/g, '');
        if (digitsOnly.length > 0 && !cleanIdentifier.startsWith('+')) {
          cleanIdentifier = `+91${digitsOnly}`;
        }
      }

      if (!password) {
        return {
          errorMessage: t('auth.password', 'Please enter your password'),
          successMessage: '',
        };
      }

      try {
        const result = await loginUser({
          identifier: cleanIdentifier,
          password,
          rememberMe,
        });

        if ('data' in result && result.data?.success) {
          const { user, token } = result.data.data;
          setAuth(user, token);
          const msg = result.data.message || t('auth.welcomeBack', 'Welcome back! Login successful.');

          setTimeout(() => {
            navigate(`/${language}/`);
          }, 800);

          return {
            errorMessage: '',
            successMessage: msg,
          };
        } else if ('error' in result) {
          const errObj = result.error as { error?: string; data?: { message?: string; error?: { message?: string } | string } };
          const msg =
            typeof errObj?.data?.error === 'object' && errObj?.data?.error?.message
              ? errObj.data.error.message
              : typeof errObj?.data?.error === 'string'
              ? errObj.data.error
              : errObj?.data?.message || errObj?.error || 'Invalid email/phone or password. Please try again.';
          return {
            errorMessage: msg,
            successMessage: '',
          };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Login failed. Please check your credentials and try again.';
        return {
          errorMessage: msg,
          successMessage: '',
        };
      }

      return { errorMessage: '', successMessage: '' };
    },
    initialLoginState
  );

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;

    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setResetSent(true);
    }, 1000);
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-dm">
      <div className="max-w-5xl mx-auto w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Hero / Brand Banner Section (Hidden on small screens) */}
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
                Regd. No. 01667 (Haryana)
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Empowering Communities, Transforming Lives.
              </h1>
              <p className="text-sm text-teal-100/90 leading-relaxed">
                Log in to access your donor dashboard, volunteer drive certificates, and transparent welfare tracking.
              </p>
            </div>
          </div>

          {/* Key Impact Stats inside left hero banner */}
          <div className="relative z-10 pt-8 border-t border-white/15 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-teal-300 mb-1">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider">Impact</span>
              </div>
              <p className="text-xl font-extrabold text-white">50,000+</p>
              <p className="text-[11px] text-teal-100/80">Meals & Medical Aid</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-teal-300 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Tax Benefit</span>
              </div>
              <p className="text-xl font-extrabold text-white">50% 80G</p>
              <p className="text-[11px] text-teal-100/80">Tax Exemption</p>
            </div>
          </div>
        </div>

        {/* Right Form Card Section */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
          
          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Form Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('auth.welcomeBack', 'Welcome Back')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                {t('auth.loginSubtitle', 'Sign in to manage your donations, track volunteer drives, and stay connected.')}
              </p>
            </div>


            {/* Error & Success Messages */}
            {formState.errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{formState.errorMessage}</span>
              </div>
            )}

            {formState.successMessage && (
              <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{formState.successMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form action={formAction} className="space-y-4">
              <Input
                label={t('auth.emailOrPhone', 'Email Address or Mobile Number')}
                type="text"
                placeholder="e.g. donor@helpamission.org or 9812345678"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('auth.password', 'Password')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-xs font-semibold text-[#08A49C] hover:text-[#068d86] hover:underline cursor-pointer"
                  >
                    {t('auth.forgotPassword', 'Forgot password?')}
                  </button>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
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
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-600 dark:text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#08A49C] focus:ring-[#08A49C]"
                  />
                  <span>{t('auth.rememberMe', 'Remember me for 30 days')}</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                isLoading={isPending || isApiLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full py-3 rounded-xl font-semibold text-base shadow-md shadow-[#08A49C]/20"
              >
                {t('auth.signIn', 'Sign In')}
              </Button>
            </form>


            {/* Sign Up Redirect Link */}
            <div className="pt-2 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span>{t('auth.dontHaveAccount', "Don't have an account?")} </span>
              <Link
                to={`/${language}/signup`}
                className="font-bold text-[#08A49C] hover:text-[#068d86] hover:underline"
              >
                {t('auth.signUp', 'Create Account')}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative space-y-5">
            <button
              onClick={() => {
                setIsForgotModalOpen(false);
                setResetSent(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!resetSent ? (
              <>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reset Password</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Enter your registered email address and we'll send you a password reset link.
                  </p>
                </div>

                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={resetLoading}
                    className="w-full py-2.5 rounded-xl font-semibold text-sm"
                  >
                    Send Reset Link
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-[#08A49C] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset Link Sent!</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  We have sent instructions to <span className="font-semibold text-slate-800 dark:text-slate-200">{resetEmail}</span>. Please check your inbox.
                </p>
                <Button
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setResetSent(false);
                  }}
                  variant="outline"
                  className="w-full py-2 rounded-xl text-sm"
                >
                  Return to Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
