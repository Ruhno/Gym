import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Sparkles, Trophy, Flame, ArrowRight,
  CheckCircle2, Star, ChevronDown,
} from 'lucide-react';

/* ── Facility thumbnail with tilt — proper component, not inline hook ── */
function FacilityThumb({ facility, colSpan }) {
  const ref = useRef(null);
  useEffect(() => attachTilt(ref.current, 5), []);
  return (
    <div ref={ref} className={`relative rounded-2xl overflow-hidden group tilt-card ${colSpan}`}>
      <img src={facility.image} alt={facility.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white mb-1 inline-block">{facility.category}</span>
        <h4 className="text-xs font-bold text-white">{facility.title}</h4>
      </div>
    </div>
  );
}
import { GYM_INFO, INSTRUCTORS, FACILITIES } from '../data/gymData';
import { useScrollReveal, useCountUp, attachTilt, attachMagnet } from '../hooks/animations';

/* ── Stat counter ── */
function StatCounter({ end, suffix = '', label, isVisible, delay = 0 }) {
  const count = useCountUp(end, 1400, isVisible);
  return (
    <div className={`reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">{count}{suffix}</div>
      <div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>
    </div>
  );
}

/* ── Tilt card — uses attachTilt helper ── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => attachTilt(ref.current, 8), []);
  return <div ref={ref} className={`tilt-card ${className}`}>{children}</div>;
}

/* ── Magnetic button — uses attachMagnet helper ── */
function MagBtn({ to, children, primary = true }) {
  const ref = useRef(null);
  useEffect(() => attachMagnet(ref.current, 0.28), []);
  return (
    <Link
      to={to}
      ref={ref}
      className={`btn-shine w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2
        ${primary
          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/30'
          : 'bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-700 hover:border-gray-500'
        }`}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const [statsRef,      statsVisible]      = useScrollReveal({ threshold: 0.2  });
  const [programsRef,   programsVisible]   = useScrollReveal({ threshold: 0.05 });
  const [facilitiesRef, facilitiesVisible] = useScrollReveal({ threshold: 0.06 });
  const [coachRef,      coachVisible]      = useScrollReveal({ threshold: 0.08 });
  const [ctaRef,        ctaVisible]        = useScrollReveal({ threshold: 0.1  });

  return (
    <div>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-10">
        {/* Static hero background — no parallax */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=50&w=1400"
            alt="DoBu dojo"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-18"
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/15 border border-red-600/35 text-red-400 text-xs font-extrabold uppercase tracking-widest reveal-left visible">
                <Flame className="w-4 h-4 fill-red-500" />
                <span>Premier Martial Arts & Combat Academy</span>
              </div>

              {/* Heading — plain text, no glitch */}
              <div className="reveal visible" style={{ transitionDelay: '100ms' }}>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[1.0]">
                  Forge Discipline.
                </h1>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.0] mt-1">
                  <span className="shimmer-text">Master the Art.</span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed reveal visible" style={{ transitionDelay: '200ms' }}>
                World-class instruction in Jiu-jitsu, Karate, Judo & Muay Thai — plus elite athletic conditioning for champions at every level.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 reveal visible" style={{ transitionDelay: '300ms' }}>
                <MagBtn to="/classes" primary>
                  <span>Explore Timetable</span><ArrowRight className="w-5 h-5" />
                </MagBtn>
                <MagBtn to="/pricing" primary={false}>
                  <Sparkles className="w-5 h-5 text-red-500" /><span>View Membership Rates</span>
                </MagBtn>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 reveal visible" style={{ transitionDelay: '400ms' }}>
                <ChevronDown className="w-4 h-4 text-red-500" /><span>Scroll to explore</span>
              </div>
            </div>

            {/* Feature panel */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="glass-card p-8 rounded-3xl border border-red-600/15 space-y-6 reveal-right visible" style={{ transitionDelay: '150ms' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-500">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">DoBu Philosophy</h3>
                    <p className="text-xs text-gray-400">Built for beginners &amp; champions</p>
                  </div>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300">
                  {[
                    'Traditional belt progression & rank testing',
                    'Dedicated Youth & Kids martial arts classes',
                    'Finnish sauna, steam room & recovery suite',
                    'Olympic-standard tatami mat arena',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="group-hover:text-white transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/facilities" className="btn-shine block w-full text-center py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 border border-gray-700 hover:border-red-600/40 hover:text-white">
                  Take Virtual Tour →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className="bg-gray-950/80 border-y border-gray-800/50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCounter end={6}    suffix="+"        label="Expert Black Belt Coaches"   isVisible={statsVisible} delay={0}   />
            <StatCounter end={7}    suffix=" Days"    label="Training Sessions Per Week"  isVisible={statsVisible} delay={100} />
            <StatCounter end={3000} suffix=" sq ft"   label="Olympic Tatami Mat Arena"    isVisible={statsVisible} delay={200} />
            <StatCounter end={5}    suffix=""         label="Martial Arts Disciplines"    isVisible={statsVisible} delay={300} />
          </div>
        </div>
      </section>

      {/* ══ PROGRAMS ══ */}
      <section ref={programsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className={`text-center max-w-3xl mx-auto mb-16 space-y-3 reveal ${programsVisible ? 'visible' : ''}`}>
          <p className="text-xs font-extrabold text-red-500 uppercase tracking-widest">Our Core Disciplines</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">Specialized Training Programs</h2>
          <p className="text-gray-400 text-sm">From self-defence to competition grappling to elite conditioning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Martial Arts & Grappling',    desc: 'Comprehensive instruction in Jiu-jitsu, Karate, Judo and Muay Thai for all experience levels.',                   bullets: ['Jiu-jitsu (Gi & No-Gi)', 'Karate (Kata & Kumite)', 'Judo (Olympic Throws)'],         cta: '/classes',  ctaLabel: 'View Timetable'       },
            { icon: Flame,  title: 'Self-Defence Courses',        desc: '6-Week Beginners Course — real-world situational awareness, de-escalation and escape tactics.',                    bullets: ['2 × 1-hr Weekly Sessions', 'Situational Awareness', 'Escape & De-escalation'],      cta: '/pricing',  ctaLabel: 'Course Details (£180)' },
            { icon: Trophy, title: 'Fitness & Personal Training', desc: 'S&C programs by sports science specialists. Maximize power, endurance and injury resilience.',                      bullets: ['1-on-1 Fitness (£35/hr)', 'Private MA Tuition (£15/hr)', 'Day Pass (£6/visit)'],   cta: '/pricing',  ctaLabel: 'Calculate Package'    },
          ].map(({ icon: Icon, title, desc, bullets, cta, ctaLabel }, i) => (
            <div key={title} className={`reveal ${programsVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <TiltCard className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 flex flex-col h-full group hover-card">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/25 flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600/20 transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-red-400 transition-colors duration-300">{title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2 text-xs text-gray-300 mb-6">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={cta} className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors mt-auto">
                  <span>{ctaLabel}</span><ArrowRight className="w-4 h-4" />
                </Link>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FACILITIES ══ */}
      <section ref={facilitiesRef} className="bg-gray-950/70 border-y border-gray-800/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={`lg:col-span-5 space-y-6 reveal-left ${facilitiesVisible ? 'visible' : ''}`}>
              <p className="text-xs font-extrabold text-red-500 uppercase tracking-widest">World-Class Infrastructure</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">Designed For Serious Champions</h2>
              <p className="text-gray-400 text-sm leading-relaxed">From high-density mat arenas to thermal recovery saunas — DoBu provides an unparalleled environment.</p>
              <div className="space-y-3 pt-2">
                {FACILITIES.slice(0, 3).map((f, i) => (
                  <div key={f.id} className={`flex items-start gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-red-600/35 hover:-translate-y-0.5 transition-all duration-300 group reveal ${facilitiesVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors duration-200">{f.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/facilities" className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider">
                Explore All Facilities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className={`lg:col-span-7 grid grid-cols-2 gap-4 reveal-right ${facilitiesVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
              {FACILITIES.map((f, i) => (
                <FacilityThumb key={f.id} facility={f} colSpan={i === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ COACH ══ */}
      <section ref={coachRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className={`bg-gray-900 border border-red-600/15 rounded-3xl p-8 lg:p-12 reveal-scale ${coachVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-red-600/30 group">
                <img src={INSTRUCTORS[0].image} alt="Mauricio Gomez" loading="lazy" className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/15 text-red-400 text-xs font-bold uppercase">
                <Star className="w-4 h-4 fill-red-500" /><span>Head Coach & Founder</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase shimmer-text">Master Mauricio Gomez</h2>
              <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-red-600 pl-4">
                "Our mission is to build mental fortitude alongside technical martial arts perfection. We don't just teach combat — we cultivate character, respect, and physical resilience."
              </p>
              <div className="flex flex-wrap gap-2">
                {INSTRUCTORS[0].ranks.map((r, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-red-600/15 text-xs text-gray-200 border border-gray-700 hover:border-red-600/35 transition-colors duration-200 cursor-default">{r}</span>
                ))}
              </div>
              <Link to="/instructors" className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider">
                Meet Full Coaching Roster (6)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className={`rounded-3xl overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800 p-10 sm:p-16 text-center text-white reveal-scale ${ctaVisible ? 'visible' : ''}`}>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">Ready To Begin Your Martial Arts Journey?</h2>
            <p className="text-red-100 text-sm sm:text-base font-medium">Join DoBu Martial Arts today. Select your plan, book your first session, and train alongside experienced masters.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/pricing" className="btn-shine w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-950 hover:bg-gray-100 font-extrabold text-sm uppercase tracking-wider">Join Now From £25/month</Link>
              <Link to="/classes" className="btn-shine w-full sm:w-auto px-8 py-4 rounded-xl bg-black/30 hover:bg-black/50 text-white font-bold text-sm uppercase tracking-wider border border-white/25">View Full Timetable</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
