import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import './App.css';

// Circuit-board PCB trace pattern — generated once at module load
const CIRCUIT_BG = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
    `<g stroke-width='1' fill='none' stroke-linecap='square'>` +
    // Amber traces — primary palette
    `<path stroke='rgba(255,153,0,0.04)' d='M0,45 H80 V110 H155 V200'/>` +
    `<path stroke='rgba(255,153,0,0.04)' d='M30,0 V70 H200'/>` +
    `<path stroke='rgba(255,153,0,0.04)' d='M0,145 H50 V0'/>` +
    `<path stroke='rgba(255,153,0,0.04)' d='M130,0 V35 H200'/>` +
    `<path stroke='rgba(255,153,0,0.04)' d='M200,170 H100 V200'/>` +
    // Blue accent trace
    `<path stroke='rgba(96,160,255,0.03)' d='M0,115 H45 V175 H200'/>` +
    // Violet accent trace
    `<path stroke='rgba(167,139,250,0.03)' d='M65,0 V30 H95 V60 H200'/>` +
    `</g>` +
    // Nodes at turns and endpoints
    `<g fill='rgba(255,153,0,0.085)'>` +
    `<circle cx='80' cy='45' r='1.5'/>` +
    `<circle cx='80' cy='110' r='1.5'/>` +
    `<circle cx='155' cy='110' r='1.5'/>` +
    `<circle cx='30' cy='70' r='1.5'/>` +
    `<circle cx='50' cy='145' r='1.5'/>` +
    `<circle cx='130' cy='35' r='1.5'/>` +
    `<circle cx='100' cy='170' r='1.5'/>` +
    `<circle cx='45' cy='115' r='1.5'/>` +
    `<circle cx='45' cy='175' r='1.5'/>` +
    `<circle cx='65' cy='30' r='1.5'/>` +
    `<circle cx='95' cy='30' r='1.5'/>` +
    `<circle cx='95' cy='60' r='1.5'/>` +
    `</g>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

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
        {/* Circuit-board PCB trace pattern */}
        {darkMode && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: CIRCUIT_BG,
              backgroundSize: '200px 200px',
            }}
          />
        )}

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
