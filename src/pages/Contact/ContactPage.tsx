import React, { useState } from 'react';
import { Container, Card, Badge, Button, Input, Textarea, Select } from '../../components/ui';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../services/api';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'volunteer'>('contact');

  // Contact Form State
  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);

  // Volunteer Form State
  const [volunteerData, setVolunteerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Jind',
    skills: 'Blood Donation Drives',
    availability: 'Weekends',
  });
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [isVolunteerLoading, setIsVolunteerLoading] = useState(false);

  const skillOptions = [
    { value: 'Blood Donation Drives', label: 'Blood Donation Camp Organizing' },
    { value: 'Child Education & Tutoring', label: 'Child Education & Tutoring' },
    { value: 'Medical & Healthcare Support', label: 'Medical & Healthcare Support' },
    { value: 'Community Relief & Food Distribution', label: 'Community Relief & Food Distribution' },
    { value: 'Social Media & Photography', label: 'Social Media & Photography' },
  ];

  const availabilityOptions = [
    { value: 'Weekends', label: 'Weekends Only' },
    { value: 'Flexible', label: 'Flexible (Whenever Needed)' },
    { value: 'Full Time', label: 'Full Time Active Volunteer' },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);
    await api.submitContact(contactData);
    setIsContactLoading(false);
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVolunteerLoading(true);
    await api.submitVolunteer(volunteerData);
    setIsVolunteerLoading(false);
    setVolunteerSubmitted(true);
    setTimeout(() => {
      setVolunteerSubmitted(false);
      setVolunteerData({ fullName: '', email: '', phone: '', city: 'Jind', skills: 'Blood Donation Drives', availability: 'Weekends' });
    }, 4000);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-teal-50/80 to-white dark:from-slate-900 dark:to-slate-950 py-12 sm:py-16 border-b border-slate-100 dark:border-slate-800">
        <Container className="text-center space-y-4 max-w-3xl">
          <Badge variant="teal">GET IN TOUCH</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect With Our Team
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Have questions about our welfare projects, blood donation schedules, or want to join as a volunteer? We’d love to hear from you.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl mx-auto mt-4">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Send an Inquiry
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                activeTab === 'volunteer'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Apply as Volunteer
            </button>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Section */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-10 shadow-xl border-teal-500/20">
              {activeTab === 'contact' ? (
                contactSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      Thank you for contacting Help-A-Mission Society. A representative will reach out to your email shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send Us a Message</h3>
                      <p className="text-xs text-slate-500 mt-1">Our team typically replies within 24 hours.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Full Name"
                        placeholder="e.g. Rahul Gupta"
                        value={contactData.fullName}
                        onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Phone (Optional)"
                        type="tel"
                        placeholder="+91 98123 45678"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      />
                      <Input
                        label="Subject"
                        placeholder="e.g. Blood donation camp partnership"
                        value={contactData.subject}
                        onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                        required
                      />
                    </div>

                    <Textarea
                      label="Your Message"
                      placeholder="Write your query or feedback here..."
                      rows={5}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      required
                    />

                    <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isContactLoading}>
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                )
              ) : volunteerSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Application Received!</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Welcome to the mission! Our volunteer coordinator will contact you for the upcoming orientation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Become a Volunteer</h3>
                    <p className="text-xs text-slate-500 mt-1">Dedicate your skills and time to empower vulnerable families.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Deepak Kumar"
                      value={volunteerData.fullName}
                      onChange={(e) => setVolunteerData({ ...volunteerData, fullName: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="e.g. deepak@example.com"
                      value={volunteerData.email}
                      onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98123 45678"
                      value={volunteerData.phone}
                      onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })}
                      required
                    />
                    <Input
                      label="City / Town"
                      placeholder="e.g. Jind / Rohtak"
                      value={volunteerData.city}
                      onChange={(e) => setVolunteerData({ ...volunteerData, city: e.target.value })}
                      required
                    />
                  </div>

                  <Select
                    label="Primary Interest / Skills"
                    options={skillOptions}
                    value={volunteerData.skills}
                    onChange={(e) => setVolunteerData({ ...volunteerData, skills: e.target.value })}
                  />

                  <Select
                    label="Availability"
                    options={availabilityOptions}
                    value={volunteerData.availability}
                    onChange={(e) => setVolunteerData({ ...volunteerData, availability: e.target.value })}
                  />

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isVolunteerLoading}>
                    Submit Volunteer Application
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 space-y-6 bg-slate-900 text-white shadow-xl border-0">
              <h3 className="text-xl font-bold">Society Headquarters</h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Registered Office:</strong>
                    <span>Help-A-Mission Welfare Society JIND (Regd. No. 01667)</span>
                    <p className="text-xs text-slate-400 mt-0.5">District Jind, Haryana - 126102, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Helpline & WhatsApp:</strong>
                    <a href="tel:+919812345678" className="hover:text-teal-400 transition">
                      +91 98123 45678
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Official Email:</strong>
                    <a href="mailto:info@helpamission.org" className="hover:text-teal-400 transition">
                      info@helpamission.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Office Hours:</strong>
                    <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Google Map Box */}
            <Card className="p-2 overflow-hidden shadow-md">
              <iframe
                title="Help-A-Mission Society Jind Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111053.47277258356!2d76.24277717462089!3d29.317582522770213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391216d557f369f7%3A0xe54e32d56a297e59!2sJind%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-64 rounded-xl border-0"
                loading="lazy"
              />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
