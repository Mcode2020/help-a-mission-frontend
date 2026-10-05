import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">

          {/* Brand Info & Address */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Help-A-Mission Logo"
                className="w-12 h-12 rounded-full border border-teal-500/40 bg-white"
              />
              <div>
                <h3 className="font-extrabold text-white text-base tracking-wide">
                  Help-A-Mission
                </h3>
                <p className="text-xs text-teal-400 font-bold uppercase tracking-wider">
                  Welfare Society JIND
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
              Help-A-Mission Welfare Society JIND (Regd. No. 01667) is dedicated to the welfare and upliftment of society, focusing on healthcare, education, and social aid.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-gray-300 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+919812345678" className="hover:text-white transition-colors">+91 98123 45678</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:info@helpamission.org" className="hover:text-white transition-colors">info@helpamission.org</a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-teal-400 transition-colors">Our Work</Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-teal-400 transition-colors">Campaigns</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Initiatives */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">
              Our Initiatives
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/campaigns" className="hover:text-teal-400 transition-colors">Blood Donation Camps</Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-teal-400 transition-colors">Health Awareness Programs</Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-teal-400 transition-colors">Financial Help to Needy Individuals</Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-teal-400 transition-colors">Child Education Support</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Help-A-Mission Welfare Society. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a> */}
          </div>
        </div>

      </div>
    </footer>
  );
};
