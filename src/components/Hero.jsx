import { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const roles = [
  'Full-Stack Developer',
  'React Enthusiast',
  'Cloud Builder',
  'Problem Solver',
];

const codeSnippets = [
  { text: 'const dev = new Developer();',  x: '4%',  y: '22%', delay: '0s',    dur: '4s'   },
  { text: 'git commit -m "✨ magic"',       x: '72%', y: '16%', delay: '0.6s',  dur: '4.5s' },
  { text: 'npm run build:amazing',          x: '78%', y: '68%', delay: '1.1s',  dur: '3.8s' },
  { text: '<Component />',                  x: '2%',  y: '72%', delay: '1.6s',  dur: '5s'   },
  { text: 'await deployDreams()',           x: '58%', y: '84%', delay: '0.9s',  dur: '4.2s' },
];

export default function Hero({ darkMode }) {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  const snippetStyle = darkMode
    ? 'text-purple-300/35 bg-purple-500/5 border-purple-500/10'
    : 'text-purple-500/25 bg-purple-50/40 border-purple-200/20';

  const sub = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 w-full overflow-hidden">
      {/* Floating code snippets – desktop only */}
      {codeSnippets.map((s, i) => (
        <div
          key={i}
          className={`absolute hidden lg:block text-xs font-mono px-3 py-1.5 rounded-lg border select-none float-animation ${snippetStyle}`}
          style={{ left: s.x, top: s.y, animationDelay: s.delay, animationDuration: s.dur }}
        >
          {s.text}
        </div>
      ))}

      <div className="max-w-4xl w-full text-center z-10 mx-auto">
        {/* Availability badge */}
        <div className="mb-8 inline-flex items-center">
          <span className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${
            darkMode
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for Opportunities
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-none tracking-tight">
          <span className={darkMode ? 'text-white' : 'text-slate-900'}>Hi, I'm </span>
          <span className="shimmer-text">Deepak</span>
        </h1>

        {/* Typing role */}
        <div className="h-14 md:h-16 flex items-center justify-center mb-8">
          <p className={`text-2xl md:text-4xl font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {displayed}
            <span className="cursor-blink text-purple-400 ml-0.5">|</span>
          </p>
        </div>

        {/* Tagline */}
        <p className={`text-base md:text-xl mb-12 ${sub} max-w-2xl mx-auto leading-relaxed`}>
          Crafting seamless digital experiences from frontend to backend, with a passion for{' '}
          <span className="text-purple-400 font-medium">clean code</span> and{' '}
          <span className="text-blue-400 font-medium">innovative solutions</span>.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap mb-16">
          <a
            href="#projects"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            View Projects
          </a>
          <a
            href="#contact"
            className={`px-8 py-4 rounded-xl font-semibold border-2 hover:scale-105 transition-all duration-300 ${
              darkMode
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                : 'bg-slate-900/5 hover:bg-slate-900/10 border-slate-900/10 hover:border-slate-900/20'
            }`}
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll nudge */}
        <div className="flex flex-col items-center gap-1.5 opacity-50 animate-bounce">
          <span className={`text-xs tracking-widest uppercase ${sub}`}>Scroll</span>
          <ArrowDown className={`w-4 h-4 ${sub}`} />
        </div>
      </div>
    </section>
  );
}
