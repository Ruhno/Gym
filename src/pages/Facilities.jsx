import React, { useRef, useEffect } from 'react';
import { FACILITIES, GYM_INFO } from '../data/gymData';
import { Dumbbell, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/animations';

// Attach tilt via plain useEffect — safe outside of map
function TiltImage({ facility, colSpan }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = 'transform';
    el.style.transition = 'transform 0.12s ease, box-shadow 0.3s ease';

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -5;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  5;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => { el.style.transform = ''; };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl group ${colSpan}`}>
      <img
        src={facility.image}
        alt={facility.title}
        loading="lazy"
        className="w-full aspect-[16/10] object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
      <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg">
        {facility.category}
      </span>
    </div>
  );
}

function FacilityRow({ facility, reverse }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.08 });

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal ${visible ? 'visible' : ''}`}
    >
      <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
        <TiltImage facility={facility} colSpan="" />
      </div>
      <div className={`lg:col-span-6 space-y-6 ${reverse ? 'lg:order-1' : ''}`}>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">{facility.title}</h2>
        <p className="text-sm text-gray-300 leading-relaxed">{facility.description}</p>
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-extrabold text-red-500 uppercase tracking-widest">Facility Specifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facility.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-red-600/40 hover:bg-gray-900 transition-all duration-300 text-xs text-gray-200 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Facilities() {
  const [headRef, headVisible]   = useScrollReveal();
  const [hoursRef, hoursVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div ref={headRef} className={`text-center max-w-3xl mx-auto space-y-4 reveal ${headVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-extrabold uppercase tracking-widest">
          <Dumbbell className="w-4 h-4" /><span>Premium Training Environment</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Gym <span className="shimmer-text">Facilities</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          World-class training conditions, Olympic tatami mats, thermal recovery, and pristine amenities — all under one roof.
        </p>
      </div>

      {/* Rows */}
      <div className="space-y-20">
        {FACILITIES.map((facility, idx) => (
          <FacilityRow key={facility.id} facility={facility} reverse={idx % 2 === 1} />
        ))}
      </div>

      {/* Hours */}
      <div ref={hoursRef} className={`bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-950 border border-gray-800 rounded-3xl p-8 lg:p-12 reveal-scale ${hoursVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-black text-white uppercase">Operational Hours &amp; Location</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Located at {GYM_INFO.address}. Open 7 days a week for classes, open mat practice, and casual fitness room visits.</p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { label: 'Weekdays', hours: GYM_INFO.openingHours.weekdays },
                { label: 'Saturday', hours: GYM_INFO.openingHours.saturday },
                { label: 'Sunday',   hours: GYM_INFO.openingHours.sunday   },
              ].map((h) => (
                <div key={h.label} className="p-3 rounded-xl bg-gray-950 border border-gray-800 hover:border-red-600/40 hover:-translate-y-1 transition-all duration-300 cursor-default">
                  <span className="text-xs text-gray-400 block font-semibold">{h.label}</span>
                  <span className="text-sm font-bold text-white">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end gap-4">
            <Link to="/pricing" className="btn-shine w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 text-center transition-all hover:-translate-y-0.5">
              Get Access Pass Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
