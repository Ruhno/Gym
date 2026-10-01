import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

import Home from './pages/Home';
import Classes from './pages/Classes';
import Pricing from './pages/Pricing';
import Instructors from './pages/Instructors';
import Facilities from './pages/Facilities';
import Account from './pages/Account';

// Scroll to top component on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-hidden">
          {/* Global Ambient Interactive Background */}
          <AnimatedBackground />

          <div className="relative z-10 flex flex-col min-h-screen justify-between">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
