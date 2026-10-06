import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  Download,
  Building,
  ShieldAlert,
  GraduationCap,
  HeartPulse,
  Globe,
  FileText,
  ChevronRight
} from 'lucide-react';
import { TEAM_MEMBERS, MILESTONES } from '../../data/ngoData';
import aboutImg from '../../assets/about_img.png';

const milestoneIcons: Record<string, React.ReactNode> = {
  Building: <Building className="w-6 h-6 text-teal-600" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-amber-600" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-blue-600" />,
  HeartPulse: <HeartPulse className="w-6 h-6 text-rose-600" />,
  Globe: <Globe className="w-6 h-6 text-indigo-600" />
};

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'governance' | 'transparency'>('mission');
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      {/* Top Banner Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-14 shadow-2xl">
          <div className="absolute inset-0 bg-radial from-teal-500/10 via-transparent to-transparent opacity-60" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Government Registered NGO • Regd. No. 01667</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Empowering Communities,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                Transforming Lives in Haryana
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed font-normal">
              Help-A-Mission Welfare Society JIND is a non-profit organization dedicated to breaking cycles of poverty through quality rural education, emergency health assistance, women empowerment, and disaster relief.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-98"
              >
                <span>Support Our Mission</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowCertModal(true)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-xs border border-white/20 transition-all"
              >
                <FileText className="w-5 h-5 text-teal-300" />
                <span>View 80G Tax Exemption Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={aboutImg}
                alt="Help-A-Mission Society Volunteers"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-600/90 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>80G & 12A Certified NGO</span>
                </div>
                <p className="text-sm text-slate-200">
                  Operated with strict financial audits, transparent donor reporting, and 100% grassroots field involvement.
                </p>
              </div>
            </div>
            {/* Floating Quick Stat Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                15+
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Years of Service</p>
                <p className="text-sm font-extrabold text-gray-900">Grassroots Impact</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex border-b border-gray-200 mb-6 space-x-6">
              <button
                onClick={() => setActiveTab('mission')}
                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === 'mission' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Our Mission & Vision
                {activeTab === 'mission' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('governance')}
                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === 'governance' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Governance & Ethics
                {activeTab === 'governance' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('transparency')}
                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === 'transparency' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Financial Transparency
                {activeTab === 'transparency' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                )}
              </button>
            </div>

            {activeTab === 'mission' && (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Our Mission</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      To empower underprivileged children, women, and elderly citizens in rural Haryana by providing free education, medical healthcare, food security, and self-reliance vocational training.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Our Vision</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      A self-sustaining society where no child drops out of school due to poverty, no patient suffers due to lack of blood/medicine, and every individual lives with dignity and opportunity.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {['100% Tax Exempt (80G)', 'Zero Administrative Waste', 'Direct Field Execution', 'Annual Public Audits'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-teal-50/70 p-2.5 rounded-lg border border-teal-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'governance' && (
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Help-A-Mission Welfare Society is governed by a democratically elected Board of Trustees under Society Registration Act. Every project proposal passes through rigorous community needs assessment before allocation.
                </p>
                <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
                  <div className="flex justify-between font-semibold text-gray-900 text-xs uppercase tracking-wider">
                    <span>Registration No:</span>
                    <span className="text-teal-700">01667 (Haryana Govt)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 text-xs uppercase tracking-wider">
                    <span>NITI Aayog Darpan ID:</span>
                    <span className="text-teal-700">HR/2021/0284910</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 text-xs uppercase tracking-wider">
                    <span>Income Tax 80G Status:</span>
                    <span className="text-teal-700">Valid & Active</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transparency' && (
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  We believe complete transparency builds lasting donor trust. 92% of all donated funds directly fund student kits, food drives, and medical supplies.
                </p>
                <div className="bg-teal-900 text-white p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Program Field Execution</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-teal-950 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                  <div className="flex justify-between text-xs text-teal-200">
                    <span>Admin & Operational Audit</span>
                    <span>8%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full">
            Our Growth Journey
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Key Milestones & Achievements</h2>
          <p className="text-gray-600 text-sm mt-2">
            Tracing our journey from a small group of village volunteers to a recognized state-wide welfare society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {milestoneIcons[m.iconName] || <Globe className="w-6 h-6 text-teal-600" />}
              </div>
              <span className="text-2xl font-black text-teal-700 block mb-1">{m.year}</span>
              <h3 className="font-bold text-gray-900 text-base leading-snug">{m.title}</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full">
            Leadership & Governance
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Board of Trustees & Leadership</h2>
          <p className="text-gray-600 text-sm mt-2">
            Meet the dedicated visionaries guiding Help-A-Mission Welfare Society JIND with integrity and passion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500 text-slate-950 px-2 py-0.5 rounded">
                    {member.qualification}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-teal-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-teal-700 font-bold text-xs uppercase tracking-wide mt-0.5">
                  {member.role}
                </p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Certificate Preview Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900">80G Tax Exemption Certificate</h3>
              <p className="text-xs text-gray-500 mt-1">Help-A-Mission Welfare Society JIND (Regd. No. 01667)</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2 mb-6 font-mono text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Certificate No:</span>
                <span className="font-bold text-gray-900">CIT(E)/80G/2024-25/A-1029</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">PAN Number:</span>
                <span className="font-bold text-gray-900">AAATH7781F</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Tax Exemption Deduction:</span>
                <span className="font-bold text-emerald-700">50% under Sec 80G(5)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Validity:</span>
                <span className="font-bold text-gray-900">Perpetual / Ongoing</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('Downloading official 80G Certificate PDF copy...');
                  setShowCertModal(false);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setShowCertModal(false)}
                className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
