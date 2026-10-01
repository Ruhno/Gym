import React, { useRef, useEffect, useState } from 'react';
import TimetableGrid from '../components/TimetableGrid';
import { Calendar, BookOpen } from 'lucide-react';
import { useScrollReveal } from '../hooks/animations';

const TIME_SLOTS = [
  { time: '06:00 - 07:30', title: 'Morning Martial Arts Slots',          desc: 'Jiu-jitsu, Karate, Judo & Muay Thai early conditioning.' },
  { time: '08:00 - 10:00', title: 'Muay Thai & Private Tuition',          desc: 'Striking technique & 1-on-1 private coach slots.' },
  { time: '10:30 - 12:00', title: 'Private Tuition & Weekend Judo/Karate', desc: 'Specialist weekend sessions and technical private instruction.' },
  { time: '13:00 - 14:30', title: 'Open Mat / Personal Practice',         desc: 'Supervised mat access for personal drilling & sparring.' },
  { time: '15:00 - 17:00', title: 'Kids Jiu-jitsu, Judo & Karate',       desc: 'Youth martial arts discipline & belt progression classes.' },
  { time: '17:30 - 21:00', title: 'Evening Adult Combat Sessions',        desc: 'Prime adult classes, competition sparring & kata.' },
];

// Single shared observer for slot cards
function useSlotReveal() {
  const refs = useRef([]);
  const [visibles, setVisibles] = useState(() => Array(TIME_SLOTS.length).fill(false));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const i = parseInt(entry.target.dataset.idx, 10);
            setVisibles(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    );
    refs.current.forEach(el => el && obs.observe(el));

    const fallback = setTimeout(() => {
      setVisibles(Array(TIME_SLOTS.length).fill(true));
    }, 250);

    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const setRef = (i) => (el) => {
    refs.current[i] = el;
    if (el) el.dataset.idx = i;
  };
  return [setRef, visibles];
}

export default function Classes() {
  const [headRef, headVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.04 });
  const [slotsHeaderRef, slotsHeaderVisible] = useScrollReveal({ threshold: 0.04 });
  const [setSlotRef, slotVisibles] = useSlotReveal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Header */}
      <div ref={headRef} className={`text-center max-w-3xl mx-auto space-y-4 reveal ${headVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-extrabold uppercase tracking-widest">
          <Calendar className="w-4 h-4" /><span>Interactive Class Schedule</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Classes &amp; <span className="shimmer-text">Timetable</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Filter sessions by day of week or combat discipline. Click "Add to Schedule" to bookmark sessions to your member portal.
        </p>
      </div>

      {/* Timetable */}
      <div ref={gridRef} className={`reveal ${gridVisible ? 'visible' : ''}`} style={{ transitionDelay: '80ms' }}>
        <TimetableGrid />
      </div>

      {/* Slot Reference */}
      <div ref={slotsHeaderRef} className={`bg-gray-900/80 border border-gray-800 rounded-2xl p-6 lg:p-8 space-y-6 backdrop-blur-md reveal ${slotsHeaderVisible ? 'visible' : ''}`}>
        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
          <BookOpen className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="text-xl font-bold text-white">Daily Time Slots Reference</h3>
            <p className="text-xs text-gray-400">Structured daily timeframes across all training mats</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {TIME_SLOTS.map((slot, i) => (
            <div
              key={slot.time}
              ref={setSlotRef(i)}
              className={`p-4 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1 hover:border-red-600/40 hover:bg-gray-900 transition-all duration-300 group reveal ${slotVisibles[i] ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-red-400 font-mono font-bold block group-hover:text-red-300 transition-colors">{slot.time}</span>
              <h4 className="font-bold text-white group-hover:text-red-100 transition-colors">{slot.title}</h4>
              <p className="text-gray-400">{slot.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
