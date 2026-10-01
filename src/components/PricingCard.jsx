import React from 'react';
import { Check, Sparkles, Zap, Trophy, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PricingCard({ plan, onSelect }) {
  const { user, updateActivePlan } = useAuth();
  const navigate = useNavigate();

  const isCurrentPlan = user?.activePlan === plan.id;

  const handleChoose = () => {
    if (onSelect) {
      onSelect(plan);
      return;
    }
    if (user) {
      updateActivePlan(plan.id);
      navigate('/account');
    } else {
      navigate('/account', { state: { initialPlan: plan.id } });
    }
  };

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 flex flex-col justify-between ${
        plan.popular
          ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900 border-2 border-red-600 shadow-2xl shadow-red-600/20 scale-105 z-10'
          : 'bg-gray-900/90 border border-gray-800 hover:border-gray-700'
      } p-6 lg:p-8`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-red-600/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Most Popular Choice</span>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
          {plan.id === 'elite' && <Trophy className="w-6 h-6 text-amber-400" />}
          {plan.id === 'advanced' && <Zap className="w-6 h-6 text-red-500" />}
        </div>

        <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
          {plan.description}
        </p>

        <div className="mb-6 pb-6 border-b border-gray-800">
          <div className="flex items-baseline">
            <span className="text-4xl font-black text-white">£{plan.price.toFixed(2)}</span>
            <span className="text-gray-400 text-sm font-medium ml-2">/ {plan.period}</span>
          </div>
        </div>

        <ul className="space-y-3.5 mb-8 text-sm">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-300">
              <div className="mt-0.5 rounded-full p-0.5 bg-red-600/20 text-red-500 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleChoose}
        className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
          isCurrentPlan
            ? 'bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 cursor-default'
            : plan.popular
            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/30'
            : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
        }`}
      >
        {isCurrentPlan ? (
          <>
            <ShieldCheck className="w-5 h-5" />
            <span>Active Plan</span>
          </>
        ) : (
          <span>{user ? 'Switch to This Plan' : 'Select Plan & Register'}</span>
        )}
      </button>
    </div>
  );
}
