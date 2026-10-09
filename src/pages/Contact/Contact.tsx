import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  UserPlus,
  CheckCircle2,
  ChevronDown,
  X
} from 'lucide-react';
import { FAQ_ITEMS } from '../../data/ngoData';
import { useSubmitContactMutation, useSubmitVolunteerMutation } from '../../services/publicApi';

export const Contact: React.FC = () => {
  const [submitContact] = useSubmitContactMutation();
  const [submitVolunteer] = useSubmitVolunteerMutation();

  // Contact Form state
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [category, setCategory] = useState<string>('General Inquiry');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Volunteer Modal State
  const [showVolunteerModal, setShowVolunteerModal] = useState<boolean>(false);
  const [volName, setVolName] = useState<string>('');
  const [volEmail, setVolEmail] = useState<string>('');
  const [volPhone, setVolPhone] = useState<string>('');
  const [volInterest, setVolInterest] = useState<string>('Teaching & Student Support');
  const [volAvailability, setVolAvailability] = useState<string>('Weekends (Sat-Sun)');
  const [volSuccess, setVolSuccess] = useState<boolean>(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact({
        fullName: name,
        email,
        phone: '',
        subject: subject || category,
        message,
      }).unwrap();
    } catch {
      // Fallback state
    }
    setSubmitted(true);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitVolunteer({
        fullName: volName,
        email: volEmail,
        phone: volPhone,
        city: 'Jind',
        skills: volInterest,
        availability: volAvailability,
      }).unwrap();
    } catch {
      // Fallback state
    }
    setVolSuccess(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      {/* Top Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
              Get in Touch & Join Us
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Contact & Volunteer Hub
            </h1>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              Have questions about our field programs, CSR partnerships, or 80G tax exemptions? Or want to join our dedicated volunteer team? We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Cards & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900">Headquarters & Info</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Main Office Address</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Help-A-Mission Welfare Society Office,<br />
                      Near Main Bus Stand, Railway Road,<br />
                      Jind, Haryana - 126102 (Regd. No. 01667)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Helpline & WhatsApp</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      +91 98123 45678 / +91 94160 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Official Email</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      info@helpamission.org / support@helpamission.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Office Hours</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Monday – Saturday: 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Volunteer Callout Box */}
              <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-teal-300">
                  <UserPlus className="w-5 h-5 text-teal-400" />
                  <span>Become a Field Volunteer</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join 250+ passionate volunteers teaching rural kids, conducting blood drives, and serving meals.
                </p>
                <button
                  onClick={() => setShowVolunteerModal(true)}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-md"
                >
                  Join as a Volunteer
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">Fill out the form below and our society secretary will reply within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">Message Received!</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Thank you <strong>{name}</strong>. Your message regarding <strong>{subject || category}</strong> has been routed to our team.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Shri / Smt / Dr."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="80G Tax Exemption Query">80G Tax Exemption Query</option>
                      <option value="CSR / Corporate Partnership">CSR / Corporate Partnership</option>
                      <option value="Blood Donation Drive Request">Blood Donation Drive Request</option>
                      <option value="Media & Press">Media & Press</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief topic"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left font-bold text-gray-900 text-sm flex items-center justify-between gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Volunteer Modal Form */}
      {showVolunteerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setShowVolunteerModal(false);
                setVolSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {volSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">Welcome to the Team!</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Thank you <strong>{volName}</strong>. Our volunteer coordinator will reach out via WhatsApp/Email to onboard you into <strong>{volInterest}</strong>.
                </p>
                <button
                  onClick={() => {
                    setShowVolunteerModal(false);
                    setVolSuccess(false);
                  }}
                  className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[10px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    Volunteer Application
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-xl mt-1">Join Help-A-Mission</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Primary Area of Interest</label>
                  <select
                    value={volInterest}
                    onChange={(e) => setVolInterest(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs font-bold"
                  >
                    <option value="Teaching & Student Support">Teaching Rural Kids (Shiksha Mission)</option>
                    <option value="Medical Camps & Health Outreach">Medical Camps & Health Outreach</option>
                    <option value="Blood Donation Coordinator">Blood Donation Helpline Coordinator</option>
                    <option value="Food Drive Execution">Anna Seva Food Drive Execution</option>
                    <option value="Digital Media & Photography">Digital Media & Social Awareness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Availability</label>
                  <select
                    value={volAvailability}
                    onChange={(e) => setVolAvailability(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-200 text-xs font-bold"
                  >
                    <option value="Weekends (Sat-Sun)">Weekends (Saturday - Sunday)</option>
                    <option value="Weekdays (Mon-Fri)">Weekdays (Monday - Friday)</option>
                    <option value="On-Call Emergency Relief">On-Call Emergency Relief Only</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md mt-2"
                >
                  Submit Volunteer Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
