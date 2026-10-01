import React, { useState } from 'react';
import { Calculator, Plus, Check, Shield, Info, ArrowRight, Sparkles } from 'lucide-react';
import { MEMBERSHIP_PLANS, ADDONS_AND_COURSES } from '../data/gymData';
import { useNavigate } from 'react-router-dom';

export default function PriceCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('intermediate');
  const [privateHours, setPrivateHours] = useState(2);
  const [personalFitnessHours, setPersonalFitnessHours] = useState(1);
  const [casualVisits, setCasualVisits] = useState(0);
  const [includeSelfDefence, setIncludeSelfDefence] = useState(false);
  const navigate = useNavigate();

  const currentPlan = MEMBERSHIP_PLANS.find(p => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];

  // Calculate monthly total
  const planCost = currentPlan.price;
  const privateCost = privateHours * 15.00;
  const fitnessCost = personalFitnessHours * 35.00;
  const casualCost = casualVisits * 6.00;
  const selfDefenceCost = includeSelfDefence ? 180.00 : 0;

  const totalMonthlyCost = planCost + privateCost + fitnessCost + casualCost;
  const grandFirstMonthTotal = totalMonthlyCost + selfDefenceCost;

  const handleApply = () => {
    navigate('/account', {
      state: {
        customCalculatedPlan: {
          plan: currentPlan,
          privateHours,
          personalFitnessHours,
          casualVisits,
          includeSelfDefence,
          totalMonthlyCost
        }
      }
    });
  };

  return (
    <div className="bg-gray-900 border border-red-600/30 rounded-2xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Interactive Fee & Package Estimator</h2>
            <p className="text-gray-400 text-sm">Customize your training regimen and calculate your exact monthly investment.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Membership Base Tier */}
            <div>
              <label className="block text-white font-bold text-sm mb-3">
                1. Select Base Membership Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MEMBERSHIP_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedPlanId === plan.id
                        ? 'bg-red-600/20 border-red-600 text-white shadow-lg shadow-red-600/20'
                        : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">{plan.name.replace(' Membership', '')}</div>
                    <div className="text-lg font-black text-white">£{plan.price.toFixed(2)}<span className="text-xs font-normal text-gray-400">/mo</span></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Private Martial Arts Tuition Hours */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-bold text-sm">
                  2. Private Martial Arts Tuition (£15.00/hr)
                </label>
                <span className="text-red-400 font-bold text-sm">{privateHours} hrs/mo (£{privateCost.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={privateHours}
                onChange={(e) => setPrivateHours(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 hrs</span>
                <span>5 hrs</span>
                <span>10 hrs</span>
              </div>
            </div>

            {/* Step 3: Personal Fitness Training Hours */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-bold text-sm">
                  3. Personal Fitness Training (£35.00/hr)
                </label>
                <span className="text-red-400 font-bold text-sm">{personalFitnessHours} hrs/mo (£{fitnessCost.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={personalFitnessHours}
                onChange={(e) => setPersonalFitnessHours(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 hrs</span>
                <span>4 hrs</span>
                <span>8 hrs</span>
              </div>
            </div>

            {/* Step 4: Casual Fitness Room Visits */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-bold text-sm">
                  4. Casual Fitness Room Passes (£6.00/visit)
                </label>
                <span className="text-red-400 font-bold text-sm">{casualVisits} visits/mo (£{casualCost.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={casualVisits}
                onChange={(e) => setCasualVisits(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 visits</span>
                <span>6 visits</span>
                <span>12 visits</span>
              </div>
            </div>

            {/* Step 5: Add 6-Week Beginners Self-Defence Course */}
            <div className="pt-2">
              <label
                onClick={() => setIncludeSelfDefence(!includeSelfDefence)}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  includeSelfDefence
                    ? 'bg-red-600/20 border-red-600 text-white'
                    : 'bg-gray-800/40 border-gray-700 text-gray-300 hover:bg-gray-800/80'
                }`}
              >
                <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                  includeSelfDefence ? 'bg-red-600 border-red-600 text-white' : 'border-gray-600'
                }`}>
                  {includeSelfDefence && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-white text-sm">Add 6-Week Beginners' Self-Defence Course</span>
                    <span className="font-bold text-red-400 text-sm">£180.00 (One-off)</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Includes 2 x 1-hr weekly structured sessions focused on practical defense & de-escalation tactics.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Breakdown Summary Column */}
          <div className="lg:col-span-5 bg-gray-950/80 rounded-xl p-6 border border-gray-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                <span>Estimated Investment Summary</span>
              </h3>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>{currentPlan.name}</span>
                  <span className="font-semibold text-white">£{planCost.toFixed(2)} /mo</span>
                </div>
                {privateHours > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Private Tuition ({privateHours} hrs)</span>
                    <span className="font-semibold text-white">£{privateCost.toFixed(2)} /mo</span>
                  </div>
                )}
                {personalFitnessHours > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Fitness Coaching ({personalFitnessHours} hrs)</span>
                    <span className="font-semibold text-white">£{fitnessCost.toFixed(2)} /mo</span>
                  </div>
                )}
                {casualVisits > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Fitness Room ({casualVisits} visits)</span>
                    <span className="font-semibold text-white">£{casualCost.toFixed(2)} /mo</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                  <span className="font-bold text-gray-200">Recurring Monthly Fee:</span>
                  <span className="text-2xl font-black text-white">£{totalMonthlyCost.toFixed(2)}</span>
                </div>

                {includeSelfDefence && (
                  <div className="pt-2 border-t border-gray-800/60 flex justify-between text-red-400 text-xs">
                    <span>+ Self-Defence Course (One-off):</span>
                    <span className="font-bold">£180.00</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-red-600/10 border border-red-600/30 mb-6">
                <div className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Total Due at Sign Up (Month 1):</div>
                <div className="text-3xl font-black text-red-500">£{grandFirstMonthTotal.toFixed(2)}</div>
                <div className="text-[11px] text-gray-400 mt-1">Includes month 1 membership + selected tuition & add-ons. No hidden registration fees.</div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Lock In This Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
