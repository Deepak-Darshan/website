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
        {/* Subtle grid */}
        {darkMode && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
        )}
        {/* Orbs */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
          style={{
            background: darkMode ? 'radial-gradient(circle, rgba(255,153,0,0.08), transparent 70%)' : 'radial-gradient(circle, rgba(255,153,0,0.06), transparent 70%)',
            top: '-15%',
            left: '-10%',
            transform: `translateY(${scrollY * 0.07}px)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: darkMode ? 'radial-gradient(circle, rgba(96,160,255,0.08), transparent 70%)' : 'radial-gradient(circle, rgba(96,160,255,0.05), transparent 70%)',
            bottom: '10%',
            right: '-5%',
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-3xl"
          style={{
            background: darkMode ? 'radial-gradient(circle, rgba(167,139,250,0.06), transparent 70%)' : 'radial-gradient(circle, rgba(167,139,250,0.04), transparent 70%)',
            top: '45%',
            left: '35%',
            transform: `translateY(${scrollY * 0.03}px)`,
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
