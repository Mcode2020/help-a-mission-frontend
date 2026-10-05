import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Input, Select } from '../../components/ui';
import { CheckCircle2, Heart } from 'lucide-react';
import { api } from '../../services/api';

export const CtaBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jind');
  const [skills, setSkills] = useState('Blood Donation Camps');
  const [availability, setAvailability] = useState('Weekends');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await api.submitVolunteer({ fullName, email, phone, city, skills, availability });
    setIsLoading(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFullName('');
      setEmail('');
      setPhone('');
    }, 3000);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 p-8 sm:p-12 lg:p-16 text-white shadow-xl">
          {/* Subtle watermark background motif */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-10 translate-y-10">
            <svg className="w-96 h-96 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-teal-100 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-200"></span>
              <span>BECOME A VOLUNTEER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Be a Vital Part of Our Mission
            </h2>

            <p className="text-teal-50 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Join hands with hundreds of active volunteers across Jind. Together we can save lives, support students, and build a resilient society.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="bg-white text-teal-800 hover:bg-teal-50 border-0 shadow-lg font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Join as Volunteer
              </Button>

              <Link to="/donate">
                <Button variant="primary" className="bg-teal-950/40 hover:bg-teal-950/60 border border-white/20 text-white font-bold">
                  <Heart className="w-4 h-4 mr-2 fill-current" />
                  Make a Donation
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Volunteer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Apply as a Volunteer"
      >
        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-xs text-slate-500">
              Thank you for stepping forward. Our volunteer lead will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Suman Devi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Email Address"
                type="email"
                placeholder="suman@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98123 45678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="City / Area"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <Select
                label="Availability"
                options={[
                  { value: 'Weekends', label: 'Weekends' },
                  { value: 'Flexible', label: 'Flexible' },
                ]}
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>

            <Select
              label="Preferred Area of Contribution"
              options={[
                { value: 'Blood Donation Camps', label: 'Blood Donation Drives' },
                { value: 'Child Education & Tutoring', label: 'Child Education & Tutoring' },
                { value: 'Community Relief & Distribution', label: 'Community Relief & Blankets' },
              ]}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
              Submit Application
            </Button>
          </form>
        )}
      </Modal>
    </section>
  );
};

export default CtaBanner;
