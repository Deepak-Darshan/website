import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home',     href: '#home'     },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [active, setActive]       = useState('home');
  const [mobileOpen, setMobile]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = ['contact', 'projects', 'skills', 'home'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled
    ? darkMode
      ? 'bg-[#06040f]/95 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_40px_rgba(0,0,0,0.55)] border-b border-white/[0.045]'
      : 'bg-white/93 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.9),0_4px_24px_rgba(0,0,0,0.07)] border-b border-slate-200/55'
    : 'bg-transparent border-b border-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-baseline gap-2 group">
          <span
            className="text-[1.6rem] font-black"
            style={{
              background: 'linear-gradient(135deg, #ff9900 15%, #60a0ff 85%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 10px rgba(255,153,0,0.25))',
              letterSpacing: '-0.05em',
            }}
          >
            DD
          </span>
          <span
            className="text-xs font-mono hover-accent transition-colors"
            style={{ color: darkMode ? '#4a5568' : '#94a3b8' }}
          >
            /dev
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                className={`relative text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? ''
                    : darkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                style={isActive ? { color: '#ff9900' } : undefined}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute -bottom-1 left-0 right-0 rounded-full"
                    style={{
                      height: 2,
                      background: 'linear-gradient(to right, #ff9900, #60a0ff)',
                      boxShadow: '0 0 6px rgba(255,153,0,0.55)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-150 ${
              darkMode
                ? 'text-yellow-300 border border-white/[0.07]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
            style={darkMode ? { background: 'rgba(255,255,255,0.05)' } : undefined}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobile(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-150 ${darkMode ? 'border border-white/[0.07]' : 'bg-slate-100 hover:bg-slate-200'}`}
            style={darkMode ? { background: 'rgba(255,255,255,0.05)' } : undefined}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden ${darkMode ? 'bg-[#06040f]/97' : 'bg-white/97'} backdrop-blur-2xl`}
          >
            <div className="px-6 pb-6 flex flex-col gap-1">
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMobile(false)}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.18 }}
                  className={`py-3 text-sm font-medium border-b transition-colors ${
                    darkMode
                      ? 'border-white/[0.06] text-slate-300 hover-accent'
                      : 'border-slate-100 text-slate-600 hover-accent'
                  }`}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
