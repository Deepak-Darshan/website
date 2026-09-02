import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Wrench, Cloud } from 'lucide-react';

// ─── Shooting Star — offset-path for buttery smooth motion ───────────────────
function ShootingStar({ darkMode, sectionRef }) {
  const [path, setPath]       = useState('');
  const [visible, setVisible] = useState(false);
  const [isWide, setIsWide]   = useState(false);

  // Responsive gate — only show on ≥768px
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Build the pixel-precise path once the section has been laid out
  useEffect(() => {
    if (!darkMode || !isWide || !sectionRef?.current) return;

    const w = sectionRef.current.offsetWidth;
    const h = sectionRef.current.offsetHeight;

    // Card centres (fractions of section dimensions)
    const fe = { x: w * 0.27, y: h * 0.42 }; // Frontend   (Zone 1 left)
    const dt = { x: w * 0.73, y: h * 0.42 }; // Dev Tools  (Zone 1 right)
    const be = { x: w * 0.27, y: h * 0.75 }; // Backend    (Zone 2 left)
    const cl = { x: w * 0.73, y: h * 0.75 }; // Cloud      (Zone 2 right)

    // Orbit ellipse half-axes
    const rx  = w  * 0.10;  // horizontal half-width
    const ry  = h  * 0.055; // vertical half-height
    const cpy = ry * 2.6;   // bezier control-point arm for smooth oval

    // Two bezier arcs that form a closed oval.
    // The star enters and exits from the RIGHT side (cx+rx, cy).
    const oval = (cx, cy) =>
      `C ${cx + rx} ${cy - cpy} ${cx - rx} ${cy - cpy} ${cx - rx} ${cy} ` +
      `C ${cx - rx} ${cy + cpy} ${cx + rx} ${cy + cpy} ${cx + rx} ${cy}`;

    const p = [
      // ── START: bottom-right corner ──────────────────────────────
      `M ${w * 0.93} ${h * 0.91}`,

      // ── Fly to Frontend orbit entry (right side of oval) ────────
      `C ${w * 0.68} ${h * 0.72} ${w * 0.50} ${h * 0.54} ${fe.x + rx} ${fe.y}`,

      // ── Orbit Frontend ──────────────────────────────────────────
      oval(fe.x, fe.y),

      // ── Fly to Dev Tools (sweep right across top zone) ──────────
      `C ${fe.x + rx} ${fe.y - ry * 2.2} ${dt.x - rx} ${dt.y - ry * 2.2} ${dt.x + rx} ${dt.y}`,

      // ── Orbit Dev Tools ─────────────────────────────────────────
      oval(dt.x, dt.y),

      // ── Fly to Backend (curve down-left) ────────────────────────
      `C ${dt.x + rx} ${dt.y + h * 0.12} ${be.x + rx} ${be.y - h * 0.08} ${be.x + rx} ${be.y}`,

      // ── Orbit Backend ───────────────────────────────────────────
      oval(be.x, be.y),

      // ── Fly to Cloud & Database (sweep right across bottom zone) ─
      `C ${be.x + rx} ${be.y - ry * 2.2} ${cl.x - rx} ${cl.y - ry * 2.2} ${cl.x + rx} ${cl.y}`,

      // ── Orbit Cloud & Database ───────────────────────────────────
      oval(cl.x, cl.y),

      // ── EXIT: fly toward top-left corner ─────────────────────────
      `C ${cl.x + rx} ${cl.y - h * 0.20} ${w * 0.30} ${h * 0.22} ${w * 0.04} ${h * 0.03}`,
    ].join(' ');

    setPath(p);

    // First appearance after 2 s
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, [darkMode, isWide, sectionRef]);

  // After each run: hide, then re-show 60 s later
  const handleAnimationEnd = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 60000);
  };

  if (!darkMode || !isWide || !visible || !path) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 40 }}>
      <div
        onAnimationEnd={handleAnimationEnd}
        style={{
          position: 'absolute',
          offsetPath: `path('${path}')`,
          offsetDistance: '0%',
          offsetRotate: 'auto',
          animation: 'shooting-star-fly 12s ease-in-out forwards',
          willChange: 'offset-distance, opacity, transform',
        }}
      >
        {/* Star head — bright white core */}
        <div style={{
          width: 10, height: 10, borderRadius: '50%', position: 'relative', zIndex: 1,
          background: 'radial-gradient(circle, #ffffff 0%, #fff8e7 30%, rgba(255,220,150,0.7) 60%, transparent 100%)',
          boxShadow: '0 0 6px 2px rgba(255,255,255,0.9), 0 0 16px 5px rgba(255,255,255,0.5), 0 0 34px 10px rgba(255,200,100,0.3), 0 0 68px 20px rgba(255,150,50,0.15)',
        }} />
        {/* Primary tail — sharp white gradient */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)',
          width: 80, height: 2,
          background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 20%, rgba(255,230,180,0.3) 50%, transparent 100%)',
          borderRadius: 1,
        }} />
        {/* Wide glow tail */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)',
          width: 110, height: 8,
          background: 'linear-gradient(to left, rgba(255,255,255,0.4) 0%, rgba(255,220,150,0.2) 30%, rgba(255,180,80,0.08) 60%, transparent 100%)',
          borderRadius: 4, filter: 'blur(2px)',
        }} />
        {/* Outer atmospheric glow */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)',
          width: 140, height: 14,
          background: 'linear-gradient(to left, rgba(255,255,255,0.15) 0%, rgba(255,200,100,0.06) 40%, transparent 100%)',
          borderRadius: 7, filter: 'blur(5px)',
        }} />
        {/* Sparkle particle dots */}
        <div style={{
          position: 'absolute', top: '50%', right: 'calc(100% + 12px)', transform: 'translateY(-50%)',
          width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 0 4px 1px rgba(255,255,255,0.5), -16px 3px 2px 0 rgba(255,255,255,0.3), -34px -2px 2px 0 rgba(255,255,255,0.2), -52px 4px 1px 0 rgba(255,230,180,0.15)',
        }} />
      </div>
    </div>
  );
}

// ─── Geological layer: crust topo contour lines ──────────────────────────────
// 5 wavy lines per 600×120 tile; amber + blue accent; seamlessly tileable.
const TOPO_CRUST = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='120'>` +
    // line 1 — slate blue-grey
    `<path stroke='rgba(70,100,130,0.13)' stroke-width='0.75' fill='none'` +
    ` d='M0,22 C150,10 300,34 450,22 C525,16 562,26 600,22'/>` +
    // line 2 — forest green
    `<path stroke='rgba(40,80,52,0.11)' stroke-width='1.1' fill='none'` +
    ` d='M0,48 C120,34 280,62 420,52 C510,46 556,54 600,48'/>` +
    // line 3 — oceanic blue
    `<path stroke='rgba(28,75,115,0.10)' stroke-width='0.75' fill='none'` +
    ` d='M0,70 C180,58 360,82 480,70 C540,64 574,76 600,70'/>` +
    // line 4 — earthy brown
    `<path stroke='rgba(80,58,38,0.10)' stroke-width='1' fill='none'` +
    ` d='M0,92 C150,78 300,106 450,96 C525,90 562,98 600,92'/>` +
    // line 5 — forest green
    `<path stroke='rgba(48,80,50,0.09)' stroke-width='0.75' fill='none'` +
    ` d='M0,110 C200,100 350,118 500,108 C550,104 578,112 600,110'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

// Zone 1 — Frontend & Dev Tools
const zone1Cards = [
  {
    title: 'Frontend',
    icon: Code2,
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Figma'],
    iconGradient: 'from-[#a78bfa] to-[#7c3aed]',
    glow: 'hover:shadow-violet-500/20',
  },
  {
    title: 'Dev Tools',
    icon: Wrench,
    items: ['Git', 'Docker', 'REST APIs'],
    iconGradient: 'from-[#a78bfa] to-[#7c3aed]',
    glow: 'hover:shadow-violet-500/20',
  },
];

// Zone 2 — Backend & Cloud
const zone2Cards = [
  {
    title: 'Backend',
    icon: Server,
    items: ['Python', 'Java', 'C', 'FastAPI', 'Node.js'],
    iconGradient: 'from-[#ff9900] to-[#ea580c]',
    glow: 'hover:shadow-orange-500/20',
  },
  {
    title: 'Cloud & Database',
    icon: Cloud,
    items: ['AWS Lambda', 'AWS SQS', 'AWS API Gateway', 'AWS CloudWatch', 'DynamoDB', 'PostgreSQL'],
    iconGradient: 'from-[#60a0ff] to-[#ff9900]',
    glow: 'hover:shadow-blue-500/20',
  },
];

function SkillCard({ card, chipDark, chipLight, badgeDark, badgeLight, darkMode, delay, chipGlow, isZone2 }) {
  const cardBg = darkMode
    ? 'bg-[rgba(255,255,255,0.025)]'
    : 'bg-white/88';
  const border = darkMode
    ? 'border-white/[0.065]'
    : 'border-slate-200/80';

  const chipStyle = darkMode
    ? { background: chipDark.bg, color: chipDark.color }
    : { background: chipLight.bg, color: chipLight.color };
  const badgeStyle = darkMode
    ? { background: badgeDark.bg, color: badgeDark.color }
    : { background: badgeLight.bg, color: badgeLight.color };

  const normalShadow = darkMode
    ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 16px rgba(0,0,0,0.3)'
    : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 20px rgba(0,0,0,0.06)';

  const hoverShadow = darkMode
    ? isZone2
      ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,153,0,0.12)'
      : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5)'
    : normalShadow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`group gradient-border ${cardBg} backdrop-blur-xl rounded-2xl p-7 border ${border} ${card.glow} transition-shadow duration-[220ms]`}
      style={{ boxShadow: normalShadow, position: 'relative', zIndex: 20 }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = hoverShadow; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = normalShadow; }}
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.iconGradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      >
        <card.icon className="w-5 h-5 text-white" />
      </div>

      {/* Title + count */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold">{card.title}</h4>
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={badgeStyle}>
          {card.items.length}
        </span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {card.items.map((skill, i) => (
          <motion.span
            key={i}
            className="px-3 py-1 text-xs rounded-full font-medium"
            style={{ ...chipStyle, transition: 'all 0.15s ease' }}
            whileHover={{ scale: 1.08, boxShadow: chipGlow }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ darkMode }) {
  const sectionRef = useRef(null);

  // Zone 1 chip/badge styles — violet
  const z1ChipDark  = { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa' };
  const z1ChipLight = { bg: '#ede9fe', color: '#7c3aed' };
  const z1BadgeDark  = { bg: 'rgba(167,139,250,0.15)', color: '#a78bfa' };
  const z1BadgeLight = { bg: '#ede9fe', color: '#7c3aed' };

  // Zone 2 chip/badge styles — orange
  const z2ChipDark  = { bg: 'rgba(255,153,0,0.12)', color: '#ff9900' };
  const z2ChipLight = { bg: '#fff7ed', color: '#ea580c' };
  const z2BadgeDark  = { bg: 'rgba(255,153,0,0.15)', color: '#ff9900' };
  const z2BadgeLight = { bg: '#fff7ed', color: '#ea580c' };

  return (
    <section ref={sectionRef} id="skills" className="relative py-28 px-6 w-full">
      {/* ── Shooting star ──────────────────────────────────────────────────── */}
      <ShootingStar darkMode={darkMode} sectionRef={sectionRef} />

      {/* ── Geological background: The Crust ────────────────────────────────── */}
      {darkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Crust base overlay — oceanic blue → forest green → earthy brown */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(12,38,62,0.12) 0%, rgba(22,52,38,0.16) 48%, rgba(48,30,15,0.20) 100%)',
          }} />

          {/* OCEANIC BLUE — open ocean above continental crust */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '55%',
            background: [
              'radial-gradient(ellipse 80% 60% at 25% 0%, rgba(14,65,108,0.16) 0%, transparent 68%)',
              'radial-gradient(ellipse 60% 45% at 80% 5%, rgba(18,75,48,0.12) 0%, transparent 62%)',
            ].join(', '),
          }} />

          {/* Oceanic-blue streaks — surface shimmer */}
          {[7, 14, 21].map((pct) => (
            <div key={pct} style={{
              position: 'absolute',
              top: `${pct}%`, left: '4%', right: '4%', height: 1,
              background: 'linear-gradient(to right, transparent, rgba(45,130,185,0.15) 25%, rgba(45,130,185,0.15) 75%, transparent)',
            }} />
          ))}

          {/* FOREST GREEN — continental landmass mid-section */}
          <div style={{
            position: 'absolute',
            top: '28%', left: 0, right: 0, height: '38%',
            background: 'radial-gradient(ellipse 100% 65% at 62% 50%, rgba(22,68,38,0.14) 0%, transparent 70%)',
          }} />

          {/* CRUST TOPO — slate grey, oceanic blue, forest green contour lines */}
          <div style={{
            position: 'absolute',
            top: '38%', bottom: 0, left: 0, right: 0,
            backgroundImage: TOPO_CRUST,
            backgroundSize: '600px 120px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
          }} />

          {/* TRANSITION — earthy brown deepening, bleeding into mantle below */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to bottom, transparent, rgba(55,25,10,0.24))',
          }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#ff9900' }}>
            What I Work With
          </span>
          <h3 className="text-4xl md:text-5xl font-black mt-3">
            Technical <span className="shimmer-text">Arsenal</span>
          </h3>
        </div>

        {/* ── ZONE 1: GROUND LEVEL — FRONTEND ─────────────────── */}
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: darkMode ? 'linear-gradient(to right, transparent, rgba(167,139,250,0.25))' : 'linear-gradient(to right, transparent, #e5e7eb)' }} />
            <span
              className="text-[0.68rem] font-bold uppercase tracking-[0.22em] px-4 py-1.5 rounded-full whitespace-nowrap"
              style={{
                color: '#a78bfa',
                background: darkMode ? 'rgba(167,139,250,0.09)' : '#f5f3ff',
                border: darkMode ? '1px solid rgba(167,139,250,0.18)' : '1px solid #ddd6fe',
                boxShadow: darkMode ? 'inset 0 1px 0 rgba(167,139,250,0.1)' : 'none',
              }}
            >
              Ground Level — Frontend
            </span>
            <div className="h-px flex-1" style={{ background: darkMode ? 'linear-gradient(to left, transparent, rgba(167,139,250,0.25))' : 'linear-gradient(to left, transparent, #e5e7eb)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zone1Cards.map((card, idx) => (
              <SkillCard
                key={idx}
                card={card}
                chipDark={z1ChipDark}
                chipLight={z1ChipLight}
                badgeDark={z1BadgeDark}
                badgeLight={z1BadgeLight}
                darkMode={darkMode}
                delay={idx * 0.1}
                chipGlow="0 0 12px rgba(167,139,250,0.2)"
                isZone2={false}
              />
            ))}
          </div>
        </div>

        {/* ── GLOWING HORIZON DIVIDER ──────────────────────────── */}
        <div style={{ position: 'relative', marginTop: 40, marginBottom: 40 }}>
          <div style={{
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(255,153,0,0.5), rgba(96,160,255,0.35), transparent)',
          }} />
          <div style={{
            position: 'absolute',
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            background: darkMode ? '#06040f' : '#eff6ff',
            padding: '0 16px',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,153,0,0.6)',
            whiteSpace: 'nowrap',
          }}>
            HORIZON
          </div>
        </div>

        {/* ── ZONE 2: CLOUD LAYER — BACKEND & INFRASTRUCTURE ───── */}
        <div className="mt-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: darkMode ? 'linear-gradient(to right, transparent, rgba(255,153,0,0.25))' : 'linear-gradient(to right, transparent, #e5e7eb)' }} />
            <span
              className="text-[0.68rem] font-bold uppercase tracking-[0.22em] px-4 py-1.5 rounded-full whitespace-nowrap"
              style={{
                color: '#ff9900',
                background: darkMode ? 'rgba(255,153,0,0.09)' : '#fff7ed',
                border: darkMode ? '1px solid rgba(255,153,0,0.18)' : '1px solid #fed7aa',
                boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,153,0,0.1)' : 'none',
              }}
            >
              Cloud Layer — Backend &amp; Infrastructure
            </span>
            <div className="h-px flex-1" style={{ background: darkMode ? 'linear-gradient(to left, transparent, rgba(255,153,0,0.25))' : 'linear-gradient(to left, transparent, #e5e7eb)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zone2Cards.map((card, idx) => (
              <SkillCard
                key={idx}
                card={card}
                chipDark={z2ChipDark}
                chipLight={z2ChipLight}
                badgeDark={z2BadgeDark}
                badgeLight={z2BadgeLight}
                darkMode={darkMode}
                delay={idx * 0.1 + 0.15}
                chipGlow="0 0 12px rgba(255,153,0,0.2)"
                isZone2={true}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
