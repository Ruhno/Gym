import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Dumbbell, Shield, Menu, X, User, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/classes', label: 'Classes & Schedule' },
    { path: '/pricing', label: 'Memberships & Rates' },
    { path: '/instructors', label: 'Our Coaches' },
    { path: '/facilities', label: 'Facilities' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-xl border-b border-red-600/30 shadow-2xl py-3 shadow-red-600/10'
          : 'bg-gray-950/70 backdrop-blur-md border-b border-gray-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Shield className="w-6 h-6 text-white stroke-[2.5] animate-pulse-glow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white uppercase font-sans group-hover:text-red-400 transition-colors">
                DoBu <span className="text-red-600">Martial Arts</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 font-medium -mt-1 uppercase">
                Combat & Fitness Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                    isActive
                      ? 'text-white bg-red-600/20 border border-red-600/50 text-red-400 shadow-md shadow-red-600/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/80 hover:scale-105'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/account"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-600/50 hover:scale-105 transition-all shadow-md"
            >
              <User className="w-4 h-4 text-red-500" />
              <span>{user ? user.name.split(' ')[0] : 'Member Sign In'}</span>
            </Link>

            <Link
              to="/pricing"
              className="btn-shine-effect relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-xl shadow-red-600/40 hover:shadow-red-600/60 hover:-translate-y-0.5 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Join Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/account"
              className="p-2 rounded-xl bg-gray-900 text-gray-300 hover:text-white border border-gray-700"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-red-500" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gray-900 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-gray-950/98 backdrop-blur-2xl border-b border-red-600/30 px-4 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-red-600/20 border border-red-600/40'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </NavLink>
            ))}

            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
              <Link
                to="/account"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 text-white font-semibold border border-gray-700"
              >
                <User className="w-5 h-5 text-red-500" />
                <span>{user ? `Account (${user.name})` : 'Member Sign In'}</span>
              </Link>
              <Link
                to="/pricing"
                className="btn-shine-effect flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-600/40"
              >
                <Sparkles className="w-5 h-5" />
                <span>Join DoBu Today</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
