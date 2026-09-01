import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setCursorPos({ x, y });
      const lerp = () => {
        ringRef.current.x += (x - ringRef.current.x) * 0.12;
        ringRef.current.y += (y - ringRef.current.y) * 0.12;
        setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(lerp);
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const bgGradient = darkMode
    ? 'from-[#06040f] via-[#080618] to-[#060410]'
    : 'from-blue-50 via-purple-50 to-pink-50';

  const textColor = darkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br ${bgGradient} transition-colors duration-500 ${textColor}`}>
      {/* Scroll progress */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Custom cursor (desktop only) */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring hidden md:block" style={{ left: ringPos.x, top: ringPos.y }} />

      {/* Background layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1 — top-left amber, deep and atmospheric */}
        <div
          className="absolute rounded-full"
          style={{
            width: 920, height: 920,
            background: darkMode
              ? 'radial-gradient(circle, rgba(255,153,0,0.11), transparent 62%)'
              : 'radial-gradient(circle, rgba(255,153,0,0.07), transparent 62%)',
            top: '-20%',
            left: '-12%',
            filter: 'blur(72px)',
            transform: `translateY(${scrollY * 0.07}px)`,
          }}
        />

        {/* Orb 2 — bottom-right blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 760, height: 760,
            background: darkMode
              ? 'radial-gradient(circle, rgba(96,160,255,0.1), transparent 62%)'
              : 'radial-gradient(circle, rgba(96,160,255,0.06), transparent 62%)',
            bottom: '4%',
            right: '-8%',
            filter: 'blur(72px)',
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        />

        {/* Orb 3 — center violet */}
        <div
          className="absolute rounded-full"
          style={{
            width: 560, height: 560,
            background: darkMode
              ? 'radial-gradient(circle, rgba(167,139,250,0.08), transparent 62%)'
              : 'radial-gradient(circle, rgba(167,139,250,0.05), transparent 62%)',
            top: '45%',
            left: '35%',
            filter: 'blur(72px)',
            transform: `translateY(${scrollY * 0.03}px)`,
          }}
        />

        {/* Orb 4 — mid-right amber, parallax */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(255,153,0,0.05), transparent 70%)',
            top: '60%',
            right: '20%',
            transform: `translateY(${-scrollY * 0.04}px)`,
          }}
        />

        {/* Orb 5 — mantle zone, lower-center burnt amber */}
        {darkMode && (
          <div
            className="absolute rounded-full"
            style={{
              width: 700, height: 700,
              background: 'radial-gradient(circle, rgba(220,80,0,0.10), transparent 65%)',
              bottom: '18%',
              left: '22%',
              filter: 'blur(90px)',
              transform: `translateY(${-scrollY * 0.02}px)`,
            }}
          />
        )}

        {/* Orb 6 — core, deep amber ellipse at very bottom */}
        {darkMode && (
          <div
            className="absolute"
            style={{
              width: '120%', height: 420,
              background: 'radial-gradient(ellipse at center bottom, rgba(255,80,0,0.13), transparent 68%)',
              bottom: '-5%',
              left: '-10%',
              filter: 'blur(80px)',
              transform: `translateY(${-scrollY * 0.01}px)`,
            }}
          />
        )}
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
