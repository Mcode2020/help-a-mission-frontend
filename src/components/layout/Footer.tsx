import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import facebookIcon from '../../assets/facebook.png';
import twitterIcon from '../../assets/twitter.png';
import instagramIcon from '../../assets/instagram.png';
import linkedinIcon from '../../assets/linkedin.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 pt-12 sm:pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-10">

          {/* Column 1: Brand Info & Contact */}
          <div className="lg:col-span-6 space-y-6">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3.5">
              <img
                src={logoImg}
                alt="Help-A Mission Welfare Society"
                className="w-12 h-12 rounded-full object-cover bg-white shrink-0"
              />
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg tracking-wider uppercase leading-tight">
                  HELP-A MISSION
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium leading-tight">
                  Welfare Society
                </p>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg leading-relaxed">
              Help-A Mission Welfare Society is a registered non-profit organization dedicated to community medical aid, health wellness, and social upliftment.
            </p>

            {/* Get in Touch Section */}
            <div className="pt-1">
              <h4 className="text-white text-sm sm:text-base font-semibold mb-3">
                Get in Touch
              </h4>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm">
                {/* Email */}
                <a
                  href="mailto:admin@lease-liaison.com"
                  className="inline-flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-teal-400 shrink-0 group-hover:text-teal-300" />
                  <span>admin@lease-liaison.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:7194274439"
                  className="inline-flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-teal-400 shrink-0 group-hover:text-teal-300" />
                  <span>(719) 427-4439</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm sm:text-base font-semibold tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-white transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Welfare Work */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm sm:text-base font-semibold tracking-wide">
              Welfare Work
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link to="/campaigns" className="hover:text-white transition-colors">
                  Blood Donations
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-white transition-colors">
                  Health Camps
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-white transition-colors">
                  Support Needy
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-white transition-colors">
                  Social Development
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <div className="border-t border-gray-800/80 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-400 gap-4">
            {/* Copyright Text */}
            <p>
              © 2026 Help-A Mission Welfare Society. All Rights Reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-5 sm:gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-opacity opacity-80 hover:opacity-100"
                aria-label="Facebook"
              >
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="w-5 h-5 object-contain brightness-0 invert"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-opacity opacity-80 hover:opacity-100"
                aria-label="Twitter"
              >
                <img
                  src={twitterIcon}
                  alt="Twitter"
                  className="w-5 h-5 object-contain brightness-0 invert"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-opacity opacity-80 hover:opacity-100"
                aria-label="Instagram"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="w-5 h-5 object-contain brightness-0 invert"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-opacity opacity-80 hover:opacity-100"
                aria-label="LinkedIn"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="w-5 h-5 object-contain brightness-0 invert"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


