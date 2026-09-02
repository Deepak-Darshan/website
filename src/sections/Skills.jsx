import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Wrench, Cloud } from 'lucide-react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

// ─── Shooting Star — GSAP MotionPathPlugin for buttery smooth motion ─────────
function ShootingStar({ darkMode, sectionRef }) {
  const starRef  = useRef(null);
  const tlRef    = useRef(null);
  const timerRef = useRef(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!darkMode || !isWide) return;

    function run() {
      const star    = starRef.current;
      const section = sectionRef?.current;
      if (!star || !section) return;

      const w = section.offsetWidth;
      const h = section.offsetHeight;

      // Gentle S-curve across the section: bottom-right → sweeps through the cards → top-left
      const path = [
        { x: w * 0.95, y: h * 0.88 },
        { x: w * 0.75, y: h * 0.72 },
        { x: w * 0.60, y: h * 0.58 },
        { x: w * 0.50, y: h * 0.50 },
        { x: w * 0.40, y: h * 0.42 },
        { x: w * 0.28, y: h * 0.30 },
        { x: w * 0.14, y: h * 0.16 },
        { x: w * 0.03, y: h * 0.05 },
      ];

      const TOTAL = 14;

      gsap.set(star, { x: path[0].x, y: path[0].y, opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({
        onComplete() {
          gsap.set(star, { opacity: 0 });
          timerRef.current = setTimeout(run, 60000);
        },
      });

      tl.to(star, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
      tl.to(star, {
        motionPath: { path, curviness: 1.6, autoRotate: true },
        duration: TOTAL,
        ease: 'none',
      }, '<0.2');
      tl.to(star, { opacity: 0, scale: 0.3, duration: 1, ease: 'power2.in' }, '-=1.2');

      tlRef.current = tl;
    }

    timerRef.current = setTimeout(run, 2000);
    return () => {
      clearTimeout(timerRef.current);
      tlRef.current?.kill();
    };
  }, [darkMode, isWide, sectionRef]);

  if (!darkMode || !isWide) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 40 }}>
      <div
        ref={starRef}
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0, willChange: 'transform, opacity, filter' }}
      >
        {/* === METEOR CORE — pulsing hot white/blue center === */}
        <div style={{
          width: '9px', height: '9px', borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 0%, #e0f0ff 25%, #ffcc66 55%, rgba(255,120,30,0.6) 80%, transparent 100%)',
          boxShadow: [
            '0 0 4px 2px rgba(255,255,255,1)',
            '0 0 10px 4px rgba(200,220,255,0.8)',
            '0 0 20px 8px rgba(255,180,60,0.5)',
            '0 0 40px 15px rgba(255,100,20,0.25)',
          ].join(', '),
          position: 'relative', zIndex: 10,
          animation: 'meteor-core-pulse 0.3s ease-in-out infinite alternate',
        }} />

        {/* === HEAT ENVELOPE — fiery glow wrapping the core === */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '22px', height: '18px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,200,80,0.3) 0%, rgba(255,120,20,0.15) 40%, transparent 70%)',
          animation: 'meteor-heat-flicker 0.15s ease-in-out infinite alternate',
          zIndex: 5,
        }} />

        {/* === PRIMARY TAIL — hot plasma trail === */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%',
          transform: 'translateY(-50%)',
          width: '90px', height: '3px',
          background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,220,140,0.8) 10%, rgba(255,160,50,0.5) 30%, rgba(255,100,20,0.25) 55%, rgba(200,60,10,0.1) 75%, transparent 100%)',
          borderRadius: '1.5px',
          animation: 'meteor-tail-breathe 0.4s ease-in-out infinite alternate',
          zIndex: 4,
        }} />

        {/* === SECONDARY TAIL — wider diffuse heat trail === */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%',
          transform: 'translateY(-50%)',
          width: '130px', height: '8px',
          background: 'linear-gradient(to left, rgba(255,200,100,0.4) 0%, rgba(255,140,40,0.2) 20%, rgba(255,80,10,0.08) 50%, transparent 80%)',
          borderRadius: '4px', filter: 'blur(2px)',
          animation: 'meteor-tail-breathe 0.55s ease-in-out infinite alternate-reverse',
          zIndex: 3,
        }} />

        {/* === OUTER GLOW TRAIL — atmospheric ionization === */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%',
          transform: 'translateY(-50%)',
          width: '180px', height: '16px',
          background: 'linear-gradient(to left, rgba(255,180,80,0.15) 0%, rgba(255,120,40,0.06) 30%, rgba(200,80,20,0.02) 60%, transparent 100%)',
          borderRadius: '8px', filter: 'blur(5px)',
          animation: 'meteor-tail-breathe 0.7s ease-in-out infinite alternate',
          zIndex: 2,
        }} />

        {/* === IONIZATION TRAIL — faint blue/violet edge glow === */}
        <div style={{
          position: 'absolute', top: '50%', right: '100%',
          transform: 'translateY(-50%)',
          width: '60px', height: '12px',
          background: 'linear-gradient(to left, rgba(150,180,255,0.2) 0%, rgba(120,140,255,0.08) 40%, transparent 100%)',
          borderRadius: '6px', filter: 'blur(3px)',
          animation: 'meteor-tail-breathe 0.35s ease-in-out infinite alternate-reverse',
          zIndex: 1,
        }} />

        {/* === FIRE FRAGMENTS — sparks breaking off the body === */}
        <div style={{
          position: 'absolute', top: '30%', right: 'calc(100% + 10px)',
          width: '3px', height: '3px', borderRadius: '50%',
          background: 'rgba(255,200,80,0.9)',
          boxShadow: '0 0 4px 1px rgba(255,150,30,0.6)',
          animation: 'spark-drift-1 0.8s ease-out infinite',
          zIndex: 6,
        }} />
        <div style={{
          position: 'absolute', top: '70%', right: 'calc(100% + 6px)',
          width: '2.5px', height: '2.5px', borderRadius: '50%',
          background: 'rgba(255,180,60,0.85)',
          boxShadow: '0 0 3px 1px rgba(255,120,20,0.5)',
          animation: 'spark-drift-2 0.65s ease-out infinite',
          animationDelay: '0.15s',
          zIndex: 6,
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: 'calc(100% + 20px)',
          width: '2px', height: '2px', borderRadius: '50%',
          background: 'rgba(255,240,200,0.8)',
          boxShadow: '0 0 3px 1px rgba(255,200,100,0.4)',
          animation: 'spark-drift-3 1.1s ease-out infinite',
          animationDelay: '0.3s',
          zIndex: 6,
        }} />
        <div style={{
          position: 'absolute', top: '80%', right: 'calc(100% + 16px)',
          width: '2px', height: '2px', borderRadius: '50%',
          background: 'rgba(255,140,30,0.75)',
          boxShadow: '0 0 3px 1px rgba(255,80,10,0.4)',
          animation: 'spark-drift-1 0.9s ease-out infinite',
          animationDelay: '0.5s',
          zIndex: 6,
        }} />

        {/* === DEBRIS TRAIL — tiny twinkling dots scattered behind === */}
        <div style={{
          position: 'absolute', top: '50%', right: 'calc(100% + 5px)',
          transform: 'translateY(-50%)',
          width: '2px', height: '2px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)',
          boxShadow: [
            '-8px -3px 0 0 rgba(255,220,150,0.5)',
            '-18px 4px 0 0 rgba(255,180,80,0.35)',
            '-30px -2px 0 0 rgba(255,150,50,0.25)',
            '-42px 5px 0 0 rgba(255,120,30,0.18)',
            '-56px -4px 0 0 rgba(255,100,20,0.12)',
            '-72px 2px 0 0 rgba(255,80,10,0.08)',
            '-90px -3px 0 0 rgba(200,60,10,0.05)',
          ].join(', '),
          animation: 'debris-twinkle 0.5s ease-in-out infinite alternate',
          zIndex: 5,
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
