import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Mail,
  Phone,
  Search,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useGetMembersQuery, useGetCmsPageQuery } from '../../services/publicApi';
import type { CmsHeroSectionContent, CmsMissionCTASectionContent } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const MembersPage: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    data: members = [],
    isLoading,
    isError,
    refetch,
  } = useGetMembersQuery({ language });
  const { data: cmsSections } = useGetCmsPageQuery({ slug: 'members', language });

  const heroContent = cmsSections?.hero as CmsHeroSectionContent | undefined;
  const ctaContent = cmsSections?.mission_cta as CmsMissionCTASectionContent | undefined;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter((member) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(term) ||
      member.title.toLowerCase().includes(term) ||
      (member.email && member.email.toLowerCase().includes(term)) ||
      (member.description && member.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-200">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-14 shadow-2xl">
          {heroContent?.heroMediaUrl && (
            <img
              src={heroContent.heroMediaUrl}
              alt="Members Hero Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-radial from-teal-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{heroContent?.eyebrow || t('members.registeredBadge', 'Registered Society Committee • Regd. No. 01667')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heroContent?.heading || t('members.title', 'Our Leadership & Society Members')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {heroContent?.body || t('members.subtitle', 'Meet the passionate officers, executive members, and community leaders who dedicate their time, energy, and vision to social welfare, blood donation drives, and educational empowerment across Haryana.')}
            </p>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">
                  {heroContent?.stat1Value || `${members.length}+`}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {heroContent?.stat1Label || t('members.activeMembers', 'Active Members')}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {heroContent?.stat2Value || '100%'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {heroContent?.stat2Label || t('members.voluntaryService', 'Voluntary Service')}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-300">
                  {heroContent?.stat3Value || '10+ Yrs'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {heroContent?.stat3Label || t('members.yearsImpact', 'Years of Impact')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-slate-800 text-[#08A49C] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {t('members.directoryTitle', 'Society Directory')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('members.showingCount', 'Showing {{count}} published members').replace('{{count}}', String(filteredMembers.length))}
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('members.searchPlaceholder', 'Search member name or title...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-800 focus:outline-none focus:border-[#08A49C] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 animate-pulse space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 mx-auto" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2 mx-auto" />
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-red-200/80 dark:border-red-900/40 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/50 text-red-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t('members.errorTitle', 'Unable to Load Members')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('members.errorDesc', 'There was an error loading society members from the backend server. Please check your connection and try again.')}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 bg-[#08A49C] hover:bg-[#06857e] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t('members.tryAgain', 'Try Again')}</span>
            </button>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-gray-200/80 dark:border-slate-800 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-slate-800 text-[#08A49C] flex items-center justify-center mx-auto">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t('members.noMembersFound', 'No Members Found')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('members.noMembersDesc', 'No members match search term or directory is empty.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Member Image Header */}
                  <div className="relative h-64 bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border-b border-gray-100 dark:border-slate-800">
                    {member.image_url || member.imageUrl || member.image ? (
                      <img
                        src={member.image_url || member.imageUrl || member.image || ''}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#08A49C] to-emerald-400 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Member Profile Details */}
                  <div className="p-6 space-y-3 text-center sm:text-left">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 dark:bg-teal-950/50 text-[#08A49C] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60 mb-2">
                        {member.title}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#08A49C] transition-colors">
                        {member.name}
                      </h3>
                    </div>

                    {member.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Member Contact Footer */}
                <div className="p-5 border-t border-gray-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 space-y-2 text-xs">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 hover:text-[#08A49C] transition-colors truncate"
                    >
                      <Mail className="w-4 h-4 text-[#08A49C] shrink-0" />
                      <span className="truncate font-medium">{member.email}</span>
                    </a>
                  )}

                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 hover:text-[#08A49C] transition-colors truncate"
                    >
                      <Phone className="w-4 h-4 text-[#08A49C] shrink-0" />
                      <span className="font-medium font-mono">{member.phone}</span>
                    </a>
                  )}

                  {!member.email && !member.phone && (
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t('members.verifiedMember', 'Verified NGO Committee Member')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Join / Donate Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {ctaContent?.heading || t('members.joinTitle', 'Want to Join Help-A-Mission as a Member or Volunteer?')}
            </h2>
            <p className="text-sm text-teal-100 leading-relaxed">
              {ctaContent?.subheading || t('members.joinDesc', 'We welcome individuals passionate about community service, health camps, and education. Together we can create lasting social impact.')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              to={ctaContent?.ctaUrl || `/${language}/contact`}
              className="w-full sm:w-auto text-center bg-white text-[#08A49C] hover:bg-teal-50 font-bold px-7 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-98"
            >
              {ctaContent?.ctaLabel || t('members.contactSociety', 'Contact Society')}
            </Link>
            <Link
              to={ctaContent?.secondaryCtaUrl || `/${language}/donate`}
              className="w-full sm:w-auto text-center bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-98"
            >
              {ctaContent?.secondaryCtaLabel || t('members.donateNow', 'Donate Now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembersPage;
