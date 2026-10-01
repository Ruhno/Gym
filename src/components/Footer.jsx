import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Phone, Mail, Clock, Award, Globe, Share2, MessageCircle, Video } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
                <Shield className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-wider uppercase">
                DoBu <span className="text-red-600">Martial Arts</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {GYM_INFO.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all" title="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all" title="Community">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all" title="Videos">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all" title="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-red-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/classes" className="hover:text-red-400 transition-colors">Classes & Timetable</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-red-400 transition-colors">Membership Pricing</Link>
              </li>
              <li>
                <Link to="/instructors" className="hover:text-red-400 transition-colors">Instructor Roster</Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-red-400 transition-colors">Gym Facilities</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-red-400 transition-colors">Member Portal</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Operational Hours */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Opening Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Mon - Fri:</span>
                  <span className="text-gray-400">{GYM_INFO.openingHours.weekdays}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Saturday:</span>
                  <span className="text-gray-400">{GYM_INFO.openingHours.saturday}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Sunday:</span>
                  <span className="text-gray-400">{GYM_INFO.openingHours.sunday}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Location & Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">{GYM_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <a href={`tel:${GYM_INFO.phone}`} className="text-gray-300 hover:text-white transition-colors">
                  {GYM_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a href={`mailto:${GYM_INFO.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {GYM_INFO.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-gray-900 border border-gray-800 flex items-center gap-3">
              <Award className="w-6 h-6 text-red-500 shrink-0" />
              <span className="text-xs text-gray-300 font-medium">
                Accredited Martial Arts & Fitness Centre
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} DoBu Martial Arts Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Pearson HNC Unit 13 Project</span>
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">WCAG AA Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
