import React, { useState } from 'react';
import { TIMETABLE_SLOTS } from '../data/gymData';
import { Clock, MapPin, User, Search, Plus, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TimetableGrid() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const { bookClass, bookedClasses } = useAuth();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['All', 'Jiu-jitsu', 'Karate', 'Judo', 'Muay Thai', 'Kids', 'Private', 'Open Mat'];

  const CATEGORY_COLORS = {
    'Jiu-jitsu': 'from-blue-700/60 to-blue-900/40 border-blue-600/40',
    'Karate':    'from-amber-700/60 to-amber-900/40 border-amber-600/40',
    'Judo':      'from-green-700/60 to-green-900/40 border-green-600/40',
    'Muay Thai': 'from-orange-700/60 to-orange-900/40 border-orange-600/40',
    'Kids':      'from-pink-700/60 to-pink-900/40 border-pink-600/40',
    'Private':   'from-purple-700/60 to-purple-900/40 border-purple-600/40',
    'Open Mat':  'from-teal-700/60 to-teal-900/40 border-teal-600/40',
    'default':   'from-gray-800/80 to-gray-900/60 border-gray-700/40',
  };

  const handleBook = (session, day, time) => {
    const res = bookClass(session, day, time);
    setNotification(res);
    setTimeout(() => setNotification(null), 4000);
  };

  const isBooked = (session, day, time) => {
    const id = `${day}-${time}-${session.title}`.replace(/\s+/g, '-').toLowerCase();
    return bookedClasses.some(b => b.id === id);
  };

  const visibleSlots = TIMETABLE_SLOTS.filter((slot) => {
    const session = slot.sessions[selectedDay];
    if (!session) return false;
    if (selectedCategory !== 'All' && session.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !session.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !session.instructor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !session.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notification && (
        <div className={`p-4 rounded-xl border font-semibold flex items-center justify-between text-sm shadow-xl transition-all ${
          notification.success
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
            : 'bg-amber-950/90 border-amber-500/50 text-amber-300'
        }`}>
          <div className="flex items-center gap-3">
            {notification.success
              ? <Check className="w-5 h-5 text-emerald-400" />
              : <AlertCircle className="w-5 h-5 text-amber-400" />
            }
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs underline hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-4 lg:p-6 space-y-4 backdrop-blur-md">
        {/* Day Tabs */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Day of Week</label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shrink-0 ${
                  selectedDay === day
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-105 border border-gray-700/50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Category & Search */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-gray-800/60">
          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Session Type</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-gray-100 text-gray-950 shadow scale-105'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Coach, discipline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-gray-500 font-medium">
          Showing <span className="text-white font-bold">{visibleSlots.length}</span> sessions on <span className="text-red-400">{selectedDay}</span>
        </span>
      </div>

      {/* Session Cards */}
      <div className="space-y-3">
        {visibleSlots.length === 0 && (
          <div className="p-12 rounded-2xl border border-gray-800 text-center text-gray-400 text-sm">
            No sessions found. Try a different day or category.
          </div>
        )}
        {visibleSlots.map((slot, idx) => {
          const session = slot.sessions[selectedDay];
          const booked = isBooked(session, selectedDay, slot.time);
          const colorClass = CATEGORY_COLORS[session.category] || CATEGORY_COLORS['default'];

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border bg-gradient-to-r ${colorClass} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Time badge */}
                <div className="w-16 h-16 rounded-xl bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Clock className="w-4 h-4 text-red-400 mb-0.5" />
                  <span className="text-[10px] font-bold text-gray-200 text-center leading-tight px-1">{slot.time.split(' - ')[0]}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/30 text-white border border-white/20">
                      {session.category}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-black/20 text-gray-300 border border-white/10">
                      {session.level}
                    </span>
                    <span className="text-xs text-gray-300/70 font-mono hidden sm:block">{slot.time}</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-white group-hover:text-red-200 transition-colors">{session.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-300/80 mt-1.5">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-red-400" />{session.instructor}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400/60" />{session.location}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleBook(session, selectedDay, slot.time)}
                className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shrink-0 ${
                  booked
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/80'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 hover:scale-105 hover:shadow-red-500/40'
                }`}
              >
                {booked ? <><Check className="w-4 h-4" /><span>In My Schedule</span></> : <><Plus className="w-4 h-4" /><span>Add to Schedule</span></>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
