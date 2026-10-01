import React, { useState, useRef, useEffect } from 'react';
import { Award, CheckCircle, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InstructorCard({ instructor }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = 'transform';
    el.style.transition = 'transform 0.12s ease, box-shadow 0.3s ease';
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  8;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="tilt-card bg-gray-900/90 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-colors duration-300 flex flex-col justify-between group"
      >
        {/* Photo */}
        <div className="relative overflow-hidden aspect-[4/3] bg-gray-950">
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />

          {/* Discipline badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {instructor.disciplines.slice(0, 3).map((d, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-600/90 text-white shadow-md hover:bg-red-500 transition-colors duration-200 cursor-default"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl font-extrabold text-white group-hover:text-red-400 transition-colors duration-300">
              {instructor.name}
            </h3>
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest">
              {instructor.role}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Qualifications:
            </span>
            <div className="space-y-1.5">
              {instructor.ranks.map((rank, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 group/rank hover:text-white transition-colors">
                  <Award className="w-3.5 h-3.5 text-red-500 shrink-0 group-hover/rank:scale-110 transition-transform" />
                  <span>{rank}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mt-3">{instructor.bio}</p>
          </div>

          <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 transition-all hover:gap-2.5"
            >
              <Info className="w-4 h-4 text-red-500" />
              <span>Full Bio &amp; Specialties</span>
            </button>
            <button
              onClick={() => navigate('/classes')}
              className="p-2 rounded-lg bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              title="View Schedule"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bio Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border-spin">
            <div className="relative h-48 bg-gray-950">
              <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-900/80 text-white flex items-center justify-center text-sm font-bold border border-gray-700 hover:bg-red-600 transition-all"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <h3 className="text-2xl font-black text-white">{instructor.name}</h3>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{instructor.role}</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Specialty</h4>
                <p className="text-sm font-semibold text-white">{instructor.specialty}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Credentials</h4>
                <ul className="space-y-1.5">
                  {instructor.ranks.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Coach Profile</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{instructor.bio}</p>
              </div>
              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold text-xs hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { setShowModal(false); navigate('/pricing'); }}
                  className="btn-shine px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all"
                >
                  Book Private Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
