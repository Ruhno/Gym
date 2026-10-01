import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MEMBERSHIP_PLANS } from '../data/gymData';
import CommunityFeed from '../components/CommunityFeed';
import { User, Shield, Calendar, LogOut, CheckCircle, Sparkles, Trash2, ArrowRight, Lock, Mail, UserCheck } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, login, register, logout, bookedClasses, cancelBooking, updateActivePlan } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'community' | 'schedule'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(location.state?.initialPlan || 'intermediate');
  const [errorMsg, setErrorMsg] = useState('');

  const customPackage = location.state?.customCalculatedPlan;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegister) {
      if (!name || !email || !password) {
        setErrorMsg('Please fill in all registration fields.');
        return;
      }
      register(name, email, password, selectedPlan);
    } else {
      if (!email || !password) {
        setErrorMsg('Please provide your email and password.');
        return;
      }
      login(email, password);
    }
  };

  const fillDemoAccount = () => {
    setEmail('jordan.smith@example.com');
    setPassword('password123');
  };

  const activePlanDetails = MEMBERSHIP_PLANS.find(p => p.id === (user?.activePlan || 'basic')) || MEMBERSHIP_PLANS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-extrabold uppercase tracking-widest">
          <User className="w-4 h-4" />
          <span>DoBu Member Portal</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          {user ? `Welcome Back, ${user.name.split(' ')[0]}` : 'Member Account Sign In'}
        </h1>
        <p className="text-gray-300 text-sm">
          {user
            ? 'Manage your active membership, view your saved training schedule, and connect with fellow practitioners.'
            : 'Access your DoBu member portal or register a new membership package.'}
        </p>
      </div>

      {!user ? (
        /* AUTH FORM SCREEN */
        <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
          {/* Toggle */}
          <div className="flex bg-gray-950 p-1 rounded-2xl border border-gray-800">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                !isRegister ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                isRegister ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Register New Member
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Initial Membership Plan</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                >
                  {MEMBERSHIP_PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (£{p.price.toFixed(2)}/mo)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all"
            >
              {isRegister ? 'Complete Registration' : 'Sign In To Account'}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-4 border-t border-gray-800 text-center space-y-2">
            <span className="text-[11px] text-gray-500 block">Want to test with a pre-configured member account?</span>
            <button
              onClick={fillDemoAccount}
              className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold border border-gray-700 transition-colors"
            >
              Auto-fill Demo Credentials
            </button>
          </div>
        </div>
      ) : (
        /* LOGGED IN MEMBER DASHBOARD */
        <div className="space-y-8">
          {/* Member Profile Overview Bar */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-red-600 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">{user.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600/20 text-red-400 border border-red-600/30">
                    Active Member
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{user.email} • Member since {user.memberSince}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={logout}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs flex items-center justify-center gap-2 border border-gray-700 transition-all w-full md:w-auto"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-800 space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === 'dashboard' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Membership Overview
              {activeTab === 'dashboard' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-2 ${
                activeTab === 'schedule' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>My Enrolled Schedule</span>
              <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold">
                {bookedClasses.length}
              </span>
              {activeTab === 'schedule' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === 'community' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Member Community Feed
              {activeTab === 'community' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
            </button>
          </div>

          {/* TAB 1: MEMBERSHIP OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Active Plan Card */}
              <div className="lg:col-span-6 bg-gray-900 border border-gray-800 rounded-3xl p-6 lg:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-white">Active Plan Status</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-2xl font-black text-white">{activePlanDetails.name}</h4>
                    <span className="text-xl font-black text-red-500">£{activePlanDetails.price.toFixed(2)}/mo</span>
                  </div>
                  <p className="text-xs text-gray-400">{activePlanDetails.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plan Features Included:</h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {activePlanDetails.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/pricing"
                  className="block w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-center font-bold text-xs text-white border border-gray-700 transition-all"
                >
                  Change / Upgrade Membership
                </Link>
              </div>

              {/* Custom Package Calculation (if passed) */}
              <div className="lg:col-span-6 space-y-6">
                {customPackage ? (
                  <div className="bg-gray-900 border border-red-600/40 rounded-3xl p-6 lg:p-8 space-y-4 glow-red">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>Saved Calculated Custom Package</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">Your Tailored Training Regimen</h3>

                    <div className="space-y-2 text-xs text-gray-300 border-y border-gray-800 py-3">
                      <div className="flex justify-between">
                        <span>Base Tier:</span>
                        <span className="font-bold text-white">{customPackage.plan.name} (£{customPackage.plan.price}/mo)</span>
                      </div>
                      {customPackage.privateHours > 0 && (
                        <div className="flex justify-between">
                          <span>Private Tuition:</span>
                          <span className="font-bold text-white">{customPackage.privateHours} hrs/mo</span>
                        </div>
                      )}
                      {customPackage.personalFitnessHours > 0 && (
                        <div className="flex justify-between">
                          <span>Personal Fitness:</span>
                          <span className="font-bold text-white">{customPackage.personalFitnessHours} hrs/mo</span>
                        </div>
                      )}
                      {customPackage.includeSelfDefence && (
                        <div className="flex justify-between text-red-400">
                          <span>Specialist Course:</span>
                          <span className="font-bold">6-Wk Self Defence (£180)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-xs text-gray-400">Calculated Monthly Total:</span>
                      <span className="text-2xl font-black text-red-500">£{customPackage.totalMonthlyCost.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => updateActivePlan(customPackage.plan.id)}
                      className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase"
                    >
                      Confirm Package Upgrade
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 lg:p-8 space-y-4">
                    <h3 className="text-lg font-bold text-white">Enrolled Schedule Summary</h3>
                    <p className="text-xs text-gray-400">
                      You currently have {bookedClasses.length} saved class slots in your active timetable.
                    </p>

                    <div className="space-y-3">
                      {bookedClasses.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex justify-between items-center text-xs">
                          <div>
                            <span className="text-red-400 font-bold block">{item.day} ({item.time})</span>
                            <span className="text-white font-semibold">{item.title}</span>
                          </div>
                          <span className="text-gray-400">{item.instructor}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-white border border-gray-700"
                    >
                      View Full Schedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MY ENROLLED SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span>My Saved Class Timetable ({bookedClasses.length})</span>
                </h3>
                <Link to="/classes" className="text-xs font-bold text-red-400 hover:underline">
                  + Add More Classes
                </Link>
              </div>

              {bookedClasses.length === 0 ? (
                <div className="p-8 text-center bg-gray-950 rounded-2xl border border-gray-800">
                  <p className="text-sm text-gray-400 mb-4">You have no saved classes in your schedule.</p>
                  <Link to="/classes" className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase">
                    Browse Timetable
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookedClasses.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 text-[10px] font-bold">
                            {booking.day}
                          </span>
                          <span className="text-xs font-mono text-gray-400">{booking.time}</span>
                        </div>
                        <h4 className="text-base font-bold text-white">{booking.title}</h4>
                        <span className="text-xs text-gray-400">Coach: {booking.instructor} • {booking.location}</span>
                      </div>

                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-red-400 hover:bg-gray-800 border border-gray-800 transition-colors"
                        title="Remove from schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEMBER COMMUNITY FEED */}
          {activeTab === 'community' && (
            <CommunityFeed />
          )}
        </div>
      )}
    </div>
  );
}
