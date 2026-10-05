import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Badge, Button } from '../../components/ui';
import { ShieldCheck, Heart, Award, Users, Target, CheckCircle2 } from 'lucide-react';
import aboutImg from '../../assets/about_img.jpg';
import heroBg from '../../assets/hero_bg.jpg';

export const AboutPage: React.FC = () => {
  const leadership = [
    {
      name: 'Executive Committee',
      role: 'Governing Council',
      description: 'Guiding transparent operations, regulatory compliance, and community outreach in Jind district.',
    },
    {
      name: 'Medical & Blood Wing',
      role: 'Healthcare Coordinators',
      description: 'Supervising voluntary blood donation drives, health screenings, and hospital partnerships.',
    },
    {
      name: 'Youth & Relief Volunteers',
      role: 'Grassroots Team',
      description: 'Leading field distributions, disaster relief kits, and education tutoring workshops.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-teal-950/80" />

        <Container className="relative z-10 text-center space-y-4">
          <Badge variant="teal">WHO WE ARE</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            About <span className="text-teal-400">Help-A-Mission</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Registered Non-Profit Welfare Society JIND (Regd. No. 01667) dedicated to uplifting underprivileged families, expanding healthcare access, and empowering youth.
          </p>
        </Container>
      </section>

      {/* Origin & Mission */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
              <img
                src={aboutImg}
                alt="Help-A-Mission Society Community Gathering"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Official Registration</p>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">Regd. No. 01667</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Badge variant="teal">OUR ROOTS & VALUES</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Compassionate Action, Measurable Community Impact
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              Founded in Jind, Haryana, Help-A-Mission Welfare Society was formed with a singular objective: to ensure that no individual is denied basic healthcare, child education, or emergency financial relief during life’s most difficult moments.
            </p>
            <ul className="space-y-3 pt-2 text-slate-700 dark:text-slate-200">
              <li className="flex items-center gap-3 text-sm sm:text-base font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                <span>100% Volunteer-driven with zero administrative deduction from direct aids</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                <span>Regular blood donation drives ensuring rapid regional medical access</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                <span>Transparent public ledger and verified 80G tax benefit eligibility</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Mission & Vision Cards */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center space-y-4 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              To eliminate health and economic despair by mobilizing youth, medical camps, educational scholarships, and winter community relief.
            </p>
          </Card>

          <Card className="p-8 text-center space-y-4 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              A dignified, healthy, and self-sufficient society where every child learns and every patient receives timely care.
            </p>
          </Card>

          <Card className="p-8 text-center space-y-4 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Values</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Uncompromising integrity, empathetic community service, non-discriminatory assistance, and absolute fiscal transparency.
            </p>
          </Card>
        </div>
      </Container>

      {/* Leadership & Teams */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <Container className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="teal">TEAM</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Dedicated Leadership & Volunteers
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              The compassionate individuals working selflessly behind the scenes across Jind and neighboring districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((item, idx) => (
              <Card key={idx} className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">{item.role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link to="/contact">
              <Button size="lg" variant="primary">
                Join Us as a Volunteer
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
