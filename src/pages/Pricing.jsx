import React, { useRef, useEffect, useState } from 'react';
import { MEMBERSHIP_PLANS, ADDONS_AND_COURSES } from '../data/gymData';
import PricingCard from '../components/PricingCard';
import PriceCalculator from '../components/PriceCalculator';
import { Sparkles, Shield, HelpCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/animations';

function useStagger(count) {
  const refs = useRef([]);
  const [visibles, setVisibles] = useState(() => Array(count).fill(false));

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
      { threshold: 0.06 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [count]);

  const setRef = (i) => (el) => { refs.current[i] = el; if (el) el.dataset.idx = i; };
  return [setRef, visibles];
}

export default function Pricing() {
  const [headRef,   headVisible]   = useScrollReveal();
  const [calcRef,   calcVisible]   = useScrollReveal({ threshold: 0.04 });
  const [addonsRef, addonsVisible] = useScrollReveal({ threshold: 0.04 });
  const [faqRef,    faqVisible]    = useScrollReveal({ threshold: 0.08 });

  const [setPlanRef, planVisibles]   = useStagger(MEMBERSHIP_PLANS.length);
  const [setAddonRef, addonVisibles] = useStagger(ADDONS_AND_COURSES.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div ref={headRef} className={`text-center max-w-3xl mx-auto space-y-4 reveal ${headVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /><span>Flexible & Transparent Rates</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Membership <span className="shimmer-text">Pricing</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Choose a structured membership plan or build your custom training package. No lock-in contracts.
        </p>
      </div>

      {/* Membership Tiers */}
      <div>
        <div className={`flex items-center justify-between mb-8 reveal ${headVisible ? 'visible' : ''}`} style={{ transitionDelay: '80ms' }}>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-500" /><span>Monthly Membership Packages</span>
          </h2>
          <span className="text-xs text-gray-400 font-medium hidden sm:block">All plans include locker &amp; shower access</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {MEMBERSHIP_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              ref={setPlanRef(i)}
              className={`reveal-scale ${planVisibles[i] ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div ref={calcRef} className={`reveal ${calcVisible ? 'visible' : ''}`}>
        <PriceCalculator />
      </div>

      {/* Add-ons */}
      <div ref={addonsRef} className={`bg-gray-900/80 border border-gray-800 rounded-3xl p-8 lg:p-12 space-y-8 backdrop-blur-md reveal ${addonsVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Specialist Instruction & Casual Access</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">Courses &amp; Add-on Services</h2>
          <p className="text-gray-400 text-sm mt-2">Enhance training with private coaching, structured self-defence modules, or casual day passes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADDONS_AND_COURSES.map((item, i) => (
            <div
              key={item.id}
              ref={setAddonRef(i)}
              className={`bg-gray-950/80 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-red-600/40 hover:-translate-y-1 transition-all duration-300 group reveal ${addonVisibles[i] ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-600/20 text-red-400 border border-red-600/30">{item.category}</span>
                <h3 className="text-lg font-extrabold text-white mt-3 group-hover:text-red-300 transition-colors">{item.name}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-800 flex items-baseline justify-between">
                <span className="text-2xl font-black text-white group-hover:text-red-400 transition-colors">£{item.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">/ {item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div ref={faqRef} className={`max-w-3xl mx-auto space-y-6 reveal ${faqVisible ? 'visible' : ''}`}>
        <h3 className="text-2xl font-black text-white text-center uppercase tracking-tight">Frequently Asked Questions</h3>
        {[
          { q: 'Can I upgrade or switch my membership plan anytime?',    a: 'Yes — upgrade your plan directly through your Member Portal. Changes take effect immediately with no admin fees.' },
          { q: 'Is gear or uniform required for beginner sessions?',     a: 'Comfortable athletic sportswear works for your first visit. Gi uniforms and boxing gloves can be rented or purchased from our pro shop on-site.' },
        ].map((item, i) => (
          <div key={i} className={`p-5 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-2 hover:border-red-600/40 transition-all duration-300 reveal ${faqVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />{item.q}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed pl-6">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
