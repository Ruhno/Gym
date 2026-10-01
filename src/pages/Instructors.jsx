import React, { useState, useRef, useEffect } from 'react';
import { INSTRUCTORS } from '../data/gymData';
import InstructorCard from '../components/InstructorCard';
import { Users } from 'lucide-react';
import { useScrollReveal } from '../hooks/animations';

// Single scroll-reveal observer for multiple items — no hook-per-card
function useStaggerReveal(count) {
  const refs = useRef([]);
  const [visibles, setVisibles] = useState(() => Array(count).fill(false));

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibles(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.disconnect();
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [count]);

  const setRef = (i) => (el) => { refs.current[i] = el; };
  return [setRef, visibles];
}

export default function Instructors() {
  const [filter, setFilter] = useState('All');
  const [headRef, headVisible] = useScrollReveal();

  const filteredInstructors = INSTRUCTORS.filter((ins) => {
    if (filter === 'All') return true;
    if (filter === 'Martial Arts')   return ins.disciplines.some(d => ['Jiu-jitsu','Karate','Judo','Muay Thai'].includes(d));
    if (filter === 'Fitness & Rehab') return ins.disciplines.some(d => ['Strength & Conditioning','Physiotherapy','Personal Training'].includes(d));
    return true;
  });

  const [setCardRef, cardVisibles] = useStaggerReveal(filteredInstructors.length);
  const [setStatRef, statVisibles] = useStaggerReveal(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div ref={headRef} className={`text-center max-w-3xl mx-auto space-y-4 reveal ${headVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-extrabold uppercase tracking-widest">
          <Users className="w-4 h-4" /><span>Elite Coaching Staff</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Our <span className="shimmer-text">Instructors</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Learn from world-class martial artists, national champion competitors, and university-accredited sports science specialists.
        </p>
      </div>

      {/* Filter */}
      <div className={`flex justify-center reveal ${headVisible ? 'visible' : ''}`} style={{ transitionDelay: '120ms' }}>
        <div className="bg-gray-900/80 border border-gray-800 p-1.5 rounded-2xl inline-flex gap-2 backdrop-blur-md">
          {['All', 'Martial Arts', 'Fitness & Rehab'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                filter === cat ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — stagger reveal via single observer, no hook-per-card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInstructors.map((instructor, i) => (
          <div
            key={instructor.id}
            ref={setCardRef(i)}
            className={`reveal ${cardVisibles[i] ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <InstructorCard instructor={instructor} />
          </div>
        ))}
      </div>

      {/* Coaching Standards */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 lg:p-10 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            { stat: '100%', title: 'Accredited Ranks',   desc: 'All coaches hold verified black belts or certified university degrees.' },
            { stat: '1-on-1', title: 'Private Mentorship', desc: 'Private instruction available across all disciplines from £15/hr.' },
            { stat: 'Safe',  title: 'Safety & First Aid', desc: 'Full DBS checked, first-aid qualified, and insured coaching environment.' },
          ].map((item, i) => (
            <div
              key={item.stat}
              ref={setStatRef(i)}
              className={`space-y-2 reveal ${statVisibles[i] ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/30 text-red-500 flex items-center justify-center font-black text-xs mx-auto md:mx-0 hover:scale-110 hover:bg-red-600/40 transition-all duration-300 cursor-default">
                {item.stat}
              </div>
              <h4 className="text-white font-bold text-base">{item.title}</h4>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
