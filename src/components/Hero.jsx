import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const roles = ['Full-Stack Developer', 'Cloud Architect', 'React Builder', 'AWS Engineer', 'Problem Solver'];

// 40 hardcoded star positions. Every star at index where (i % 3 === 2) is a twinkle star.
const STARS = [
  { x:'3%',  y:'4%',  s:1, o:0.55 },
  { x:'8%',  y:'9%',  s:2, o:0.70 },
  { x:'15%', y:'3%',  s:1, o:0.40 },  // twinkle (i=2)
  { x:'22%', y:'8%',  s:1, o:0.60 },
  { x:'30%', y:'5%',  s:2, o:0.80 },
  { x:'38%', y:'12%', s:1, o:0.50 },  // twinkle (i=5)
  { x:'45%', y:'7%',  s:1, o:0.35 },
  { x:'52%', y:'4%',  s:2, o:0.90 },
  { x:'60%', y:'10%', s:1, o:0.60 },  // twinkle (i=8)
  { x:'5%',  y:'18%', s:1, o:0.45 },
  { x:'12%', y:'22%', s:2, o:0.70 },
  { x:'20%', y:'16%', s:1, o:0.50 },  // twinkle (i=11)
  { x:'28%', y:'25%', s:1, o:0.65 },
  { x:'35%', y:'19%', s:2, o:0.40 },
  { x:'42%', y:'28%', s:1, o:0.80 },  // twinkle (i=14)
  { x:'49%', y:'15%', s:1, o:0.55 },
  { x:'57%', y:'22%', s:2, o:0.60 },
  { x:'10%', y:'35%', s:1, o:0.45 },  // twinkle (i=17)
  { x:'18%', y:'42%', s:1, o:0.70 },
  { x:'26%', y:'38%', s:2, o:0.50 },
  { x:'33%', y:'45%', s:1, o:0.35 },  // twinkle (i=20)
  { x:'40%', y:'40%', s:1, o:0.65 },
  { x:'48%', y:'48%', s:2, o:0.80 },
  { x:'66%', y:'18%', s:1, o:0.50 },  // twinkle (i=23)
  { x:'72%', y:'8%',  s:2, o:0.65 },
  { x:'68%', y:'35%', s:1, o:0.40 },
  { x:'55%', y:'35%', s:1, o:0.70 },  // twinkle (i=26)
  { x:'63%', y:'45%', s:2, o:0.50 },
  { x:'4%',  y:'55%', s:1, o:0.40 },
  { x:'14%', y:'58%', s:1, o:0.60 },  // twinkle (i=29)
  { x:'22%', y:'62%', s:2, o:0.50 },
  { x:'30%', y:'55%', s:1, o:0.70 },
  { x:'38%', y:'60%', s:1, o:0.40 },  // twinkle (i=32)
  { x:'46%', y:'65%', s:2, o:0.60 },
  { x:'54%', y:'58%', s:1, o:0.50 },
  { x:'62%', y:'62%', s:1, o:0.80 },  // twinkle (i=35)
  { x:'16%', y:'72%', s:2, o:0.40 },
  { x:'24%', y:'78%', s:1, o:0.60 },
  { x:'32%', y:'72%', s:1, o:0.50 },  // twinkle (i=38)
  { x:'40%', y:'75%', s:2, o:0.70 },
];

// 5 floating code snippets
const SNIPPETS = [
  { text: 'sqs.sendMessage()',  x: '6%',  y: '28%', delay: '0s',   dur: '4.2s', accent: '#ff9900' },
  { text: 'useState(data)',     x: '70%', y: '20%', delay: '0.7s', dur: '3.8s', accent: '#a78bfa' },
  { text: 'lambda.invoke()',    x: '75%', y: '62%', delay: '1.2s', dur: '4.5s', accent: '#ff9900' },
  { text: 'db.putItem()',       x: '3%',  y: '68%', delay: '1.8s', dur: '5.0s', accent: '#ff9900' },
  { text: 'await deploy()',     x: '55%', y: '78%', delay: '0.5s', dur: '4.0s', accent: '#60a0ff' },
];

// 4 data packets traveling horizontally
const PACKETS = [
  { color: '#ff9900', y: '22%', dur: '4s',   del: '0s' },
  { color: '#60a0ff', y: '40%', dur: '5.5s', del: '1.3s' },
  { color: '#a78bfa', y: '57%', dur: '3.8s', del: '2.2s' },
  { color: '#10b981', y: '73%', dur: '6.2s', del: '0.8s' },
];

// City buildings: [x, width, height, fillIndex]
const FILLS = ['#0a0820', '#0d0a28', '#141030', '#180e38'];
const BUILDINGS = [
  [0,20,42,0],[22,16,58,1],[40,28,32,2],[70,18,68,0],[90,24,48,3],
  [116,14,74,1],[132,22,52,2],[156,30,82,0],[188,16,44,3],[206,26,62,1],
  [234,20,38,2],[256,28,78,0],[286,14,56,3],[302,32,36,1],[336,18,88,0],
  [356,22,52,2],[380,26,66,3],[408,18,46,0],[428,30,72,1],[460,16,54,2],
  [478,24,40,3],[504,28,80,0],[534,18,62,1],[554,22,44,2],[578,30,90,3],
  [610,16,56,0],[628,24,42,1],[654,28,70,2],[684,20,50,3],[706,26,64,0],
  [734,18,82,1],[754,30,46,2],[786,22,60,3],[810,16,76,0],[828,28,40,1],
  [858,20,56,2],[880,24,72,3],[906,30,46,0],[938,18,84,1],[958,26,58,2],
  [986,22,42,3],[1010,28,66,0],[1040,16,80,1],[1058,30,52,2],[1090,24,68,3],
  [1116,20,44,0],[1138,28,62,1],[1168,18,76,2],[1188,26,40,3],[1216,22,58,0],
  [1240,30,68,1],[1272,16,82,2],[1290,28,48,3],[1320,20,44,0],[1342,24,62,1],
  [1368,32,36,2],
];

// Deterministic windows per building
function getBuildingWindows(bx, bw, bh, bidx) {
  const wins = [];
  const cols = Math.max(1, Math.floor(bw / 8));
  const rows = Math.max(1, Math.floor(bh / 12));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = (bidx * 17 + r * 13 + c * 7) % 12;
      if (seed <= 3) continue;
      const wx = bx + 2 + (cols > 1 ? Math.floor(c * (bw - 6) / (cols - 1)) : Math.floor((bw - 3) / 2));
      const wy = (120 - bh) + 4 + r * 11;
      if (wy >= 118) continue;
      const fill = seed <= 6 ? '#ffd700' : seed <= 9 ? '#60a0ff' : '#ffffff';
      const op = seed <= 6 ? 0.65 : seed <= 9 ? 0.55 : 0.08;
      wins.push({ wx, wy, fill, op });
    }
  }
  return wins;
}

export default function Hero({ darkMode }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

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

  const sub = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 0', width: '100%', overflow: 'hidden' }}>

      {/* ── LAYER 1: DEEP SKY ──────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: darkMode ? 'radial-gradient(ellipse at 50% 0%, #0a0624 0%, #06040f 60%)' : 'linear-gradient(to bottom, #e8f0f8, #d0ddf0)' }}>

        {/* Stars — desktop only */}
        {darkMode && STARS.map((star, i) => (
          <div
            key={i}
            className={i % 3 === 2 ? 'twinkle-star' : undefined}
            style={{
              position: 'absolute',
              left: star.x, top: star.y,
              width: star.s, height: star.s,
              borderRadius: '50%',
              background: '#ffffff',
              opacity: star.o,
              pointerEvents: 'none',
              ...(i % 3 === 2 ? { '--twinkle-dur': `${2 + (i % 3)}s` } : {}),
            }}
          />
        ))}

        {/* AWS Orbit System — upper right */}
        <div style={{ position: 'absolute', right: '8%', top: '5%', width: 160, height: 160, opacity: darkMode ? 1 : 0.6 }}>
          {/* Label */}
          <p style={{ position: 'absolute', top: 'calc(50% - 28px)', left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontFamily: 'monospace', color: '#ff9900', whiteSpace: 'nowrap', opacity: 0.85, margin: 0 }}>
            AWS Cloud
          </p>
          {/* Center glow dot */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 10, height: 10, borderRadius: '50%', background: '#ff9900', boxShadow: '0 0 12px #ff9900, 0 0 24px rgba(255,153,0,0.4)' }} />
          {/* Ring 1 — r:40 */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,153,0,0.15)' }} />
          {/* Ring 2 — r:65 */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 130, height: 130, borderRadius: '50%', border: '1px solid rgba(96,160,255,0.12)' }} />
          {/* Orbit dot 1 — inner, orange */}
          <div className="orbit-w1" style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
            <div style={{ position: 'absolute', top: -40, left: -3, width: 6, height: 6, borderRadius: '50%', background: '#ff9900', boxShadow: '0 0 5px #ff9900' }} />
          </div>
          {/* Orbit dot 2 — inner offset, blue */}
          <div className="orbit-w2" style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
            <div style={{ position: 'absolute', top: -40, left: -3, width: 5, height: 5, borderRadius: '50%', background: '#60a0ff', boxShadow: '0 0 5px #60a0ff' }} />
          </div>
          {/* Orbit dot 3 — outer, violet */}
          <div className="orbit-w3" style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
            <div style={{ position: 'absolute', top: -65, left: -3, width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 5px #a78bfa' }} />
          </div>
        </div>
      </div>

      {/* ── LAYER 2: CODE SNIPPETS + DATA PACKETS ──────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {/* Floating code snippets */}
        {SNIPPETS.map((s, i) => (
          <div
            key={i}
            className="absolute hidden lg:block text-xs font-mono px-3 py-1.5 rounded-lg border select-none float-animation"
            style={{
              left: s.x, top: s.y,
              animationDelay: s.delay,
              animationDuration: s.dur,
              color: `${s.accent}66`,
              background: `${s.accent}08`,
              borderColor: `${s.accent}18`,
            }}
          >
            {s.text}
          </div>
        ))}

        {/* Data packets */}
        {PACKETS.map((p, i) => (
          <div
            key={i}
            className="packet-anim"
            style={{
              position: 'absolute',
              top: p.y,
              left: 0,
              width: 6, height: 3,
              borderRadius: 2,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`,
              opacity: 0,
              '--pdur': p.dur,
              '--pdel': p.del,
            }}
          />
        ))}
      </div>

      {/* ── LAYER 3: CITY SKYLINE ──────────────────────────────── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, zIndex: 2, pointerEvents: 'none' }}>
        <svg width="100%" height="120" viewBox="0 0 1400 120" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="horiGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="transparent" />
              <stop offset="25%"  stopColor="rgba(255,153,0,0.15)" />
              <stop offset="50%"  stopColor="rgba(96,160,255,0.12)" />
              <stop offset="75%"  stopColor="rgba(255,153,0,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Buildings + windows */}
          {BUILDINGS.map((b, i) => {
            const wins = getBuildingWindows(b[0], b[1], b[2], i);
            const fillColor = darkMode ? FILLS[b[3]] : '#c8d4e4';
            return (
              <g key={i}>
                <rect x={b[0]} y={120 - b[2]} width={b[1]} height={b[2]} fill={fillColor} />
                {darkMode && wins.map((w, j) => (
                  <rect key={j} x={w.wx} y={w.wy} width={3} height={4} fill={w.fill} opacity={w.op} />
                ))}
              </g>
            );
          })}

          {/* Horizon glow */}
          <rect x={0} y={106} width={1400} height={14} fill="url(#horiGlow)" />
        </svg>

        {/* Gradient fade — blends skyline seamlessly into the next section */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: darkMode
            ? 'linear-gradient(to bottom, transparent, #06040f)'
            : 'linear-gradient(to bottom, transparent, #eef2f9)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── HERO CONTENT ───────────────────────────────────────── */}
      <div className="max-w-4xl w-full text-center z-10 relative mx-auto" style={{ paddingBottom: 130 }}>

        {/* Availability badge — premium pill with ring pulse */}
        <div className="mb-10 inline-flex items-center">
          <span
            className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium border ${
              darkMode
                ? 'text-emerald-400 border-emerald-500/18'
                : 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
            }`}
            style={darkMode ? {
              background: 'rgba(16,185,129,0.07)',
              boxShadow: 'inset 0 1px 0 rgba(16,185,129,0.08), 0 0 24px rgba(16,185,129,0.05)',
            } : {
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="badge-ring absolute inline-flex rounded-full w-full h-full bg-emerald-400" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            Available for Opportunities
          </span>
        </div>

        {/* Name — monumental */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.92]">
          <span style={{ color: darkMode ? '#e2e8f0' : '#0f172a' }}>Hi, I'm </span>
          <span className="shimmer-text">Deepak</span>
        </h1>

        {/* Typing role */}
        <div className="h-14 md:h-16 flex items-center justify-center mb-8">
          <p className="text-2xl md:text-4xl font-bold" style={{ color: darkMode ? '#b0c4d8' : '#374151' }}>
            {displayed}
            <span className="cursor-blink ml-0.5" style={{ color: '#ff9900' }}>|</span>
          </p>
        </div>

        {/* Tagline */}
        <p className={`text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${sub}`}>
          Crafting seamless digital experiences from pixel to cloud — with a passion for{' '}
          <span style={{ color: '#a78bfa' }} className="font-medium">clean code</span> and{' '}
          <span style={{ color: '#ff9900' }} className="font-medium">scalable infrastructure</span>.
        </p>

        {/* CTAs — premium */}
        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <a
            href="#projects"
            className="group btn-primary flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: 'linear-gradient(135deg, #ff9900, #60a0ff)', color: '#fff' }}
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            View Projects
          </a>
          <a
            href="#contact"
            className="btn-ghost px-8 py-4 rounded-xl font-semibold"
            style={{
              background: darkMode ? 'rgba(255,153,0,0.05)' : 'rgba(255,153,0,0.06)',
              border: '1.5px solid rgba(255,153,0,0.22)',
              color: darkMode ? '#e2e8f0' : '#374151',
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-6 md:gap-10 mb-16"
        >
          {[
            { value: '5+',  label: 'Projects' },
            { value: '18+', label: 'Technologies' },
            { value: 'AWS', label: 'Cloud Stack' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-10">
              {i > 0 && (
                <div
                  className="w-px h-9"
                  style={{ background: darkMode ? 'rgba(112,144,176,0.25)' : '#cbd5e1' }}
                />
              )}
              <div className="text-center">
                <div
                  className="text-xl md:text-2xl font-black"
                  style={{ color: darkMode ? '#e2e8f0' : '#0f172a' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs mt-1 tracking-wide" style={{ color: '#7090b0' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll nudge — light and elegant */}
        <div className="flex flex-col items-center gap-2 animate-bounce" style={{ opacity: 0.35 }}>
          <span className="text-[10px] font-medium tracking-[0.24em] uppercase" style={{ color: '#7090b0' }}>Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" style={{ color: '#7090b0' }} />
        </div>
      </div>
    </section>
  );
}
