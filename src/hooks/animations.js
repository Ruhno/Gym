import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────
// useScrollReveal — Intersection Observer, fires once
// ─────────────────────────────────────────────
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined' && el.getBoundingClientRect) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.01, rootMargin: options.rootMargin ?? '100px 0px 100px 0px' }
    );
    observer.observe(el);

    const fallback = setTimeout(() => {
      setIsVisible(true);
    }, 250);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return [ref, isVisible];
}

// ─────────────────────────────────────────────
// useCountUp — runs once, no ongoing work
// ─────────────────────────────────────────────
export function useCountUp(end, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, start]);

  return count;
}

// ─────────────────────────────────────────────
// attachTilt — plain function, attach to any ref.current
// Writes transform directly to DOM, no state, throttled to ~30fps
// ─────────────────────────────────────────────
export function attachTilt(el, maxTilt = 8) {
  if (!el) return () => {};
  el.style.willChange = 'transform';

  let raf = null;
  let pending = null;

  const onMove = (e) => {
    pending = e;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      if (!pending) return;
      const ev = pending; pending = null;
      const r = el.getBoundingClientRect();
      const rx = ((ev.clientY - r.top)  / r.height - 0.5) * -maxTilt;
      const ry = ((ev.clientX - r.left) / r.width  - 0.5) *  maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf); raf = null; pending = null;
    el.style.transform = '';
  };

  el.addEventListener('mousemove', onMove, { passive: true });
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    cancelAnimationFrame(raf);
  };
}

// ─────────────────────────────────────────────
// attachMagnet — plain function, ~30fps throttled
// ─────────────────────────────────────────────
export function attachMagnet(el, strength = 0.3) {
  if (!el) return () => {};
  el.style.willChange = 'transform';

  let raf = null;
  let pending = null;

  const onMove = (e) => {
    pending = e;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      if (!pending) return;
      const ev = pending; pending = null;
      const r = el.getBoundingClientRect();
      const dx = (ev.clientX - (r.left + r.width  / 2)) * strength;
      const dy = (ev.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf); raf = null; pending = null;
    el.style.transform = '';
  };

  el.addEventListener('mousemove', onMove, { passive: true });
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    cancelAnimationFrame(raf);
  };
}
