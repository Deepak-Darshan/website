import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'SmartQueue',
    tagline: 'Distributed task queue powered by AWS & AI',
    description:
      'A distributed task queue on AWS SQS with three priority tiers and a Dead Letter Queue. Features a Claude-powered ops assistant for natural language diagnostics, auto-scaling workers (1–8 instances), and a circuit breaker — achieving 9.6 tasks/sec at 100% success rate.',
    tech: ['FastAPI', 'AWS SQS', 'DynamoDB', 'Docker', 'Claude API', 'GitHub Actions'],
    features: [
      'Priority-aware processing (high / normal / low queues)',
      'Auto-scaling 1–8 workers with circuit breaker',
      'AI ops assistant for natural language diagnostics',
      'Dead-letter routing and failure isolation',
      '7-day TTL task tracking via DynamoDB',
    ],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
    accentStart: '#8b5cf6', accentEnd: '#ec4899',
    githubUrl: 'https://github.com/Deepak-Darshan/smartqueue',
    liveUrl: 'https://github.com/Deepak-Darshan/smartqueue',
  },
  {
    id: 2,
    title: 'Tether',
    tagline: 'Swipe-based professional networking in React Native',
    description:
      'A mobile-first professional networking platform built with React Native/Expo and a Node.js + PostgreSQL backend. Users swipe to discover profiles, match on mutual interest, and message — with secure JWT token storage and full TypeScript support.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL', 'Drizzle ORM'],
    features: [
      'Swipe-based profile discovery with animated cards',
      'Mutual-match algorithm and integrated messaging',
      'JWT auth with Expo SecureStore token management',
      'Full profile CRUD with Zod validation',
      'Dark mode UI throughout',
    ],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    accentStart: '#3b82f6', accentEnd: '#06b6d4',
    githubUrl: 'https://github.com/Deepak-Darshan/tether',
    liveUrl: 'https://github.com/Deepak-Darshan/tether',
  },
  {
    id: 3,
    title: 'ViewTrend',
    tagline: 'AI analytics dashboard for NSW school incidents',
    description:
      "Streamlit dashboard pulling live data from the NSW Government CKAN API, detecting statistical anomalies via z-score analysis, and generating plain-English insights with Groq's LLaMA 3.3 70B model.",
    tech: ['Python', 'Streamlit', 'Groq API', 'LLaMA 3.3', 'Pandas', 'ckanapi'],
    features: [
      'Live data ingestion from NSW Government CKAN API',
      'Z-score anomaly detection across incident categories',
      'AI-generated plain-English insights and recommendations',
      'Interactive trend and category visualisations',
      'Smart CSV fallback when API is unavailable',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    accentStart: '#10b981', accentEnd: '#14b8a6',
    githubUrl: 'https://github.com/Deepak-Darshan/viewTrend',
    liveUrl: 'https://github.com/Deepak-Darshan/viewTrend',
  },
  {
    id: 4,
    title: 'Maze Chase',
    tagline: 'Browser maze escape game with intelligent monster AI',
    description:
      'A browser-based 2D maze escape game where you navigate as an angel through procedurally generated 21×21 mazes, collecting 3 star keys to unlock the exit — while evading a BFS-powered monster that accelerates 20% when hunting you.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    features: [
      'Procedurally generated mazes via recursive backtracking',
      'BFS pathfinding monster AI that speeds up when tracking',
      'Bomb mechanic to destroy walls and open new paths',
      'Safe zones, checkpoints, power-ups and spike hazards',
      'Real-time HUD — keys, deaths, time, monster speed',
    ],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
    accentStart: '#f59e0b', accentEnd: '#ef4444',
    githubUrl: 'https://github.com/Deepak-Darshan/maze-game',
    liveUrl: 'https://github.com/Deepak-Darshan/maze-game',
  },
  {
    id: 5,
    title: 'UDP Reliable Protocol',
    tagline: 'TCP-like reliability built over raw UDP sockets',
    description:
      "From-scratch implementation of a reliable transport protocol over UDP using only Python's standard library — sliding window, cumulative ACKs, fast retransmit (3 dup-ACKs), 16-bit checksum, and configurable packet loss/corruption simulation.",
    tech: ['Python', 'UDP Sockets', 'Sliding Window', 'Checksum', 'Network Sim'],
    features: [
      'Sliding window with cumulative acknowledgements',
      '16-bit ones-complement checksum error detection',
      'Fast retransmit on 3 duplicate ACKs + timeout retry',
      'Out-of-order segment buffering',
      'Configurable packet loss & corruption simulation',
    ],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
    accentStart: '#6366f1', accentEnd: '#a855f7',
    githubUrl: 'https://github.com/Deepak-Darshan/UDP-Reliable-Protocol',
    liveUrl: 'https://github.com/Deepak-Darshan/UDP-Reliable-Protocol',
  },
  // Add more projects here — they auto-appear as cards below the puzzle
];

// ─── Puzzle geometry: 900 × 500 ───────────────────────────────────────────────
//
//  Row 1 (y: 0 → 250):  P1 (0→300)  P2 (300→600)  P3 (600→900)
//  Row 2 (y: 250 → 500): P4 (0→500)  P5 (500→900)
//
//  Tab: 28px protrusion, 70px wide — large enough to be clearly visible.
//
//  All 5 divs are 900×500 px, stacked at position 0,0.
//  clip-path: polygon() on each div cuts it to its piece shape.
//  CSS polygon() is always reliable on HTML elements (no SVG defs needed).
//
//  Connections (piece A tab fills piece B blank):
//    P1 right tab  (x:300→328, y:95→165)  ↔ P2 left blank
//    P2 right tab  (x:600→628, y:95→165)  ↔ P3 left blank
//    P1 bottom tab (x:105→175, y:250→278) ↔ P4 top blank-1
//    P2 bottom tab (x:405→475, y:250→278) ↔ P4 top blank-2
//    P3 bottom tab (x:705→775, y:250→278) ↔ P5 top blank
//    P4 right tab  (x:500→528, y:330→400) ↔ P5 left blank

const PW  = 900;
const PH  = 500;
const T   = 28;   // tab protrusion (px)
// tab width = 70px (used inline in poly() calls below)

// Helpers so the polygon strings are readable
const poly = (...pts) =>
  `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(', ')})`;

// ── Piece 1: top-left (0→300, 0→250), right tab + bottom tab ─────────────────
const POLY1 = poly(
  [0,0],[300,0],
  [300,95],[300+T,95],[300+T,165],[300,165],   // right tab →
  [300,250],
  [175,250],[175,250+T],[105,250+T],[105,250],  // bottom tab ↓
  [0,250],
);

// ── Piece 2: top-middle (300→600, 0→250), left blank + right tab + bottom tab ─
const POLY2 = poly(
  [300,0],[600,0],
  [600,95],[600+T,95],[600+T,165],[600,165],   // right tab →
  [600,250],
  [475,250],[475,250+T],[405,250+T],[405,250],  // bottom tab ↓
  [300,250],
  [300,165],[300+T,165],[300+T,95],[300,95],   // left blank ←
);

// ── Piece 3: top-right (600→900, 0→250), left blank + bottom tab ─────────────
const POLY3 = poly(
  [600,0],[900,0],[900,250],
  [775,250],[775,250+T],[705,250+T],[705,250],  // bottom tab ↓
  [600,250],
  [600,165],[600+T,165],[600+T,95],[600,95],   // left blank ←
);

// ── Piece 4: bottom-left (0→500, 250→500), 2× top blanks + right tab ─────────
const POLY4 = poly(
  [0,250],
  [105,250],[105,250+T],[175,250+T],[175,250],  // top blank-1 (P1 tab)
  [405,250],[405,250+T],[475,250+T],[475,250],  // top blank-2 (P2 tab)
  [500,250],
  [500,330],[500+T,330],[500+T,400],[500,400],  // right tab →
  [500,500],[0,500],
);

// ── Piece 5: bottom-right (500→900, 250→500), top blank + left blank ──────────
const POLY5 = poly(
  [500,250],
  [705,250],[705,250+T],[775,250+T],[775,250],  // top blank (P3 tab)
  [900,250],[900,500],[500,500],
  [500,400],[500+T,400],[500+T,330],[500,330],  // left blank ←
);

// Per-piece config: clip polygon, SVG outline points, scatter, scroll ranges, layout
// svgPoints mirrors the polygon coords as "x,y x,y …" for the <polygon> stroke outline
const PIECES = [
  {
    poly: POLY1,
    svgPoints: `0,0 300,0 300,95 ${300+T},95 ${300+T},165 300,165 300,250 175,250 175,${250+T} 105,${250+T} 105,250 0,250`,
    transformOrigin: '150px 125px',
    fromX: -440, fromY: -260, fromR: -22,
    scrollRange: [0,    0.36], opRange: [0,    0.16],
    img: { x: 0,   y: 0,   w: 300, h: 140 },
    // txt safe: right tab protrudes outward — full x:0→300 available at y:148
    txt: { x: 14,  y: 148, w: 272, maxH: 96 },
    popup: { x: 150, y: 125 },
  },
  {
    poly: POLY2,
    svgPoints: `300,0 600,0 600,95 ${600+T},95 ${600+T},165 600,165 600,250 475,250 475,${250+T} 405,${250+T} 405,250 300,250 300,165 ${300+T},165 ${300+T},95 300,95`,
    transformOrigin: '450px 125px',
    fromX: 0,    fromY: -400, fromR: 15,
    scrollRange: [0.04, 0.40], opRange: [0.04, 0.20],
    img: { x: 300, y: 0,   w: 300, h: 140 },
    // left blank indent: x:300→328 at y:95–165 → push txt x past x:328
    txt: { x: 336, y: 148, w: 250, maxH: 96 },
    popup: { x: 450, y: 125 },
  },
  {
    poly: POLY3,
    svgPoints: `600,0 900,0 900,250 775,250 775,${250+T} 705,${250+T} 705,250 600,250 600,165 ${600+T},165 ${600+T},95 600,95`,
    transformOrigin: '750px 125px',
    fromX: 440,  fromY: -260, fromR: -16,
    scrollRange: [0.08, 0.44], opRange: [0.08, 0.24],
    img: { x: 600, y: 0,   w: 300, h: 140 },
    // left blank indent: x:600→628 at y:95–165 → push txt x past x:628
    txt: { x: 636, y: 148, w: 250, maxH: 96 },
    popup: { x: 750, y: 125 },
  },
  {
    poly: POLY4,
    svgPoints: `0,250 105,250 105,${250+T} 175,${250+T} 175,250 405,250 405,${250+T} 475,${250+T} 475,250 500,250 500,330 ${500+T},330 ${500+T},400 500,400 500,500 0,500`,
    transformOrigin: '250px 375px',
    fromX: -360, fromY: 340,  fromR: 20,
    scrollRange: [0.06, 0.42], opRange: [0.06, 0.22],
    img: { x: 0,   y: 252, w: 500, h: 126 },
    // right tab protrudes outward — txt ends at x:482, safely within x:0→500
    txt: { x: 14,  y: 384, w: 468, maxH: 108 },
    popup: { x: 250, y: 375 },
  },
  {
    poly: POLY5,
    svgPoints: `500,250 705,250 705,${250+T} 775,${250+T} 775,250 900,250 900,500 500,500 500,400 ${500+T},400 ${500+T},330 500,330`,
    transformOrigin: '700px 375px',
    fromX: 360,  fromY: 340,  fromR: -24,
    scrollRange: [0.11, 0.48], opRange: [0.11, 0.27],
    img: { x: 500, y: 252, w: 400, h: 126 },
    // left blank indent: x:500→528 at y:330–400 → push txt y past y:400
    txt: { x: 514, y: 408, w: 368, maxH: 84 },
    popup: { x: 700, y: 375 },
  },
];

// ─── PuzzlePiece — hover state isolated so siblings never re-render ───────────
function PuzzlePiece({ meta, motionX, motionY, motionR, motionO, project, darkMode, assembled, onAssembledEnter, onAssembledLeave }) {
  const [hovered, setHovered] = useState(false);

  const cardBg    = darkMode ? '#0f172a' : '#ffffff';
  const headCol   = darkMode ? '#f1f5f9' : '#0f172a';
  const subCol    = darkMode ? '#94a3b8' : '#64748b';
  const chipBg    = darkMode ? 'rgba(51,65,85,0.95)' : '#f1f5f9';
  const chipCol   = darkMode ? '#cbd5e1' : '#475569';
  const overlayBg = darkMode ? 'rgba(6,3,18,0.95)' : 'rgba(255,255,255,0.97)';
  const btnSec    = darkMode ? { bg: '#1e293b', col: '#e2e8f0' } : { bg: '#f1f5f9', col: '#374151' };

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0, top: 0,
        width: PW, height: PH,
        // ↓ polygon() is native CSS — no SVG defs, no url() lookup, always works
        clipPath: meta.poly,
        // background on the div itself fills the clipped shape (incl. tab bumps)
        background: cardBg,
        // drop-shadow follows clip-path — creates a glowing halo around the piece shape
        // including the tab bumps, making each piece look distinct
        filter: [
          `drop-shadow(0 0 3px rgba(255,255,255,0.55))`,
          `drop-shadow(0 0 8px ${project.accentStart}cc)`,
          `drop-shadow(0 8px 24px rgba(0,0,0,0.6))`,
        ].join(' '),
        willChange: 'transform, opacity',
        transformOrigin: meta.transformOrigin,
        cursor: 'pointer',
        x: motionX, y: motionY, rotate: motionR, opacity: motionO,
      }}
      onMouseEnter={() => { setHovered(true);  if (assembled) onAssembledEnter(); }}
      onMouseLeave={() => { setHovered(false); if (assembled) onAssembledLeave(); }}
    >
      {/* Project image — covers the piece's main body (not the tab bumps) */}
      <img
        src={project.image}
        alt={project.title}
        style={{
          position: 'absolute',
          left: meta.img.x, top: meta.img.y,
          width: meta.img.w, height: meta.img.h,
          objectFit: 'cover',
        }}
      />

      {/* Image gradient overlay */}
      <div style={{
        position: 'absolute',
        left: meta.img.x, top: meta.img.y,
        width: meta.img.w, height: meta.img.h,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.6) 100%)',
      }} />

      {/* Colour accent stripe along top of image */}
      <div style={{
        position: 'absolute',
        left: meta.img.x, top: meta.img.y,
        width: meta.img.w, height: 4,
        background: `linear-gradient(to right, ${project.accentStart}, ${project.accentEnd})`,
      }} />

      {/* Title + tagline + tech chips */}
      <div style={{
        position: 'absolute', left: meta.txt.x, top: meta.txt.y,
        width: meta.txt.w, maxHeight: meta.txt.maxH,
        overflow: 'hidden', textAlign: 'center',
      }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: headCol, margin: '0 0 3px', lineHeight: 1.2 }}>
          {project.title}
        </p>
        <p style={{ fontSize: 11, color: subCol, margin: '0 0 7px', lineHeight: 1.4 }}>
          {project.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={i} style={{
              padding: '1px 7px', borderRadius: 999,
              fontSize: 9, fontWeight: 600,
              background: chipBg, color: chipCol,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Piece outline — SVG polygon stroke drawn along the boundary ──────────
           Lives inside the clipped div so it is also clipped at the edge.
           Half the strokeWidth (outer half) is clipped away → clean inner border.
           Two layers: white subtle + accent colour for contrast on any background. */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: PW, height: PH, pointerEvents: 'none', zIndex: 6 }}
        aria-hidden="true"
      >
        <polygon points={meta.svgPoints} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={6} />
        <polygon points={meta.svgPoints} fill="none" stroke={project.accentStart} strokeWidth={2} strokeOpacity={0.7} />
      </svg>

      {/* ── Hover overlay — always in DOM, toggled via CSS opacity only ──────────
           The overlay is 900×500 and gets clipped by the parent's clip-path,
           so it fills exactly the puzzle piece shape on hover.
           No mount/unmount = no repaint spike.                                 */}
      {/* When assembled the floating glass popup is used instead — hide this overlay */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: PW, height: PH,
        background: overlayBg,
        opacity: (!assembled && hovered) ? 1 : 0,
        pointerEvents: (!assembled && hovered) ? 'auto' : 'none',
        transition: 'opacity 0.16s ease',
        zIndex: 10,
      }}>
        <div style={{
          position: 'absolute',
          left: meta.img.x + 16,
          top: meta.img.y + 16,
          width: meta.img.w - 32,
          bottom: PH - (meta.img.y + meta.img.h + 110),
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: headCol, marginBottom: 5 }}>
            {project.title}
          </p>
          <p style={{ fontSize: 11, color: subCol, marginBottom: 8, lineHeight: 1.55 }}>
            {project.description}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px', flexShrink: 0 }}>
            {project.features.slice(0, 4).map((f, i) => (
              <li key={i} style={{
                fontSize: 10, color: subCol,
                display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: 3,
              }}>
                <span style={{ color: project.accentStart, flexShrink: 0, marginTop: 1 }}>▸</span>
                {f}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 6, marginTop: 'auto', flexWrap: 'wrap', flexShrink: 0 }}>
            <a
              href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '5px 12px', borderRadius: 7,
                background: `linear-gradient(135deg, ${project.accentStart}, ${project.accentEnd})`,
                fontSize: 10, fontWeight: 700, color: '#fff', textDecoration: 'none',
              }}
            >
              <ExternalLink size={10} /> View
            </a>
            <a
              href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '5px 12px', borderRadius: 7,
                background: btnSec.bg, fontSize: 10, fontWeight: 700,
                color: btnSec.col, textDecoration: 'none',
              }}
            >
              <Github size={10} /> Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Extra project card (6th+ project) ───────────────────────────────────────
function ExtraCard({ project, darkMode }) {
  const card   = darkMode ? 'bg-slate-800/50' : 'bg-white/70';
  const border = darkMode ? 'border-slate-700/50' : 'border-slate-200';
  const sub    = darkMode ? 'text-slate-400' : 'text-slate-600';
  const chip   = darkMode ? 'bg-slate-700/80 text-slate-300' : 'bg-slate-100 text-slate-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={`gradient-border ${card} backdrop-blur-lg rounded-2xl overflow-hidden border ${border} hover:shadow-xl transition-all duration-300`}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, ${project.accentStart}, ${project.accentEnd})` }} />
      </div>
      <div className="p-5">
        <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h4>
        <p className={`text-sm mb-3 ${sub}`}>{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={i} className={`px-2 py-0.5 text-xs rounded-full font-medium ${chip}`}>{t}</span>
          ))}
          {project.tech.length > 3 && <span className={`px-2 py-0.5 text-xs rounded-full ${chip}`}>+{project.tech.length - 3}</span>}
        </div>
        <div className="flex gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-xs font-semibold text-white hover:scale-105 transition-transform">
            <ExternalLink size={12} /> View
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold hover:scale-105 transition-transform ${darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
            <Github size={12} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Projects({ darkMode }) {
  const sectionRef = useRef(null);
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

  useEffect(() => {
    const fn = () => setWinW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // All 5 pieces — hooks must be declared at the top level, not in a loop
  const p1x = useTransform(scrollYProgress, PIECES[0].scrollRange, [PIECES[0].fromX, 0]);
  const p1y = useTransform(scrollYProgress, PIECES[0].scrollRange, [PIECES[0].fromY, 0]);
  const p1r = useTransform(scrollYProgress, PIECES[0].scrollRange, [PIECES[0].fromR, 0]);
  const p1o = useTransform(scrollYProgress, PIECES[0].opRange,     [0, 1]);

  const p2x = useTransform(scrollYProgress, PIECES[1].scrollRange, [PIECES[1].fromX, 0]);
  const p2y = useTransform(scrollYProgress, PIECES[1].scrollRange, [PIECES[1].fromY, 0]);
  const p2r = useTransform(scrollYProgress, PIECES[1].scrollRange, [PIECES[1].fromR, 0]);
  const p2o = useTransform(scrollYProgress, PIECES[1].opRange,     [0, 1]);

  const p3x = useTransform(scrollYProgress, PIECES[2].scrollRange, [PIECES[2].fromX, 0]);
  const p3y = useTransform(scrollYProgress, PIECES[2].scrollRange, [PIECES[2].fromY, 0]);
  const p3r = useTransform(scrollYProgress, PIECES[2].scrollRange, [PIECES[2].fromR, 0]);
  const p3o = useTransform(scrollYProgress, PIECES[2].opRange,     [0, 1]);

  const p4x = useTransform(scrollYProgress, PIECES[3].scrollRange, [PIECES[3].fromX, 0]);
  const p4y = useTransform(scrollYProgress, PIECES[3].scrollRange, [PIECES[3].fromY, 0]);
  const p4r = useTransform(scrollYProgress, PIECES[3].scrollRange, [PIECES[3].fromR, 0]);
  const p4o = useTransform(scrollYProgress, PIECES[3].opRange,     [0, 1]);

  const p5x = useTransform(scrollYProgress, PIECES[4].scrollRange, [PIECES[4].fromX, 0]);
  const p5y = useTransform(scrollYProgress, PIECES[4].scrollRange, [PIECES[4].fromY, 0]);
  const p5r = useTransform(scrollYProgress, PIECES[4].scrollRange, [PIECES[4].fromR, 0]);
  const p5o = useTransform(scrollYProgress, PIECES[4].opRange,     [0, 1]);

  const motionValues = [
    { x: p1x, y: p1y, r: p1r, o: p1o },
    { x: p2x, y: p2y, r: p2r, o: p2o },
    { x: p3x, y: p3y, r: p3r, o: p3o },
    { x: p4x, y: p4y, r: p4r, o: p4o },
    { x: p5x, y: p5y, r: p5r, o: p5o },
  ];

  // Detect when all pieces have snapped together (last piece finishes at 0.48)
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    return scrollYProgress.on('change', (v) => setAssembled(v >= 0.48));
  }, [scrollYProgress]);

  // Assembled-state popup — track which piece is hovered
  const [hoveredPieceIdx, setHoveredPieceIdx] = useState(null);
  const hoverTimer = useRef(null);
  const handlePieceEnter  = (i) => { clearTimeout(hoverTimer.current); setHoveredPieceIdx(i); };
  const handlePieceLeave  = ()  => { hoverTimer.current = setTimeout(() => setHoveredPieceIdx(null), 140); };
  const handlePopoverEnter = () => { clearTimeout(hoverTimer.current); };
  const handlePopoverLeave = () => { hoverTimer.current = setTimeout(() => setHoveredPieceIdx(null), 140); };

  // Outer perimeter of the complete puzzle rectangle (0,0 → PW,PH)
  const PERIMETER = 2 * (PW + PH); // 2800 px

  const scale          = Math.min(1, (winW - 32) / PW);
  const headCol        = darkMode ? '#f8fafc' : '#0f172a';
  const subCol         = darkMode ? '#94a3b8' : '#64748b';
  const puzzleProjects = projects.slice(0, 5);
  const extraProjects  = projects.slice(5);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ position: 'relative', paddingTop: 96, paddingBottom: 120, width: '100%', overflow: 'hidden' }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 72, paddingLeft: 24, paddingRight: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a855f7' }}>
          What I've Built
        </span>
        <h3 style={{ fontSize: 'clamp(30px,5vw,48px)', fontWeight: 900, margin: '12px 0 0', color: headCol }}>
          Featured <span className="shimmer-text">Projects</span>
        </h3>
      </div>

      {/* Puzzle stage */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
        {/* Outer box reserves the correct scaled layout height */}
        <div style={{ width: PW * scale, height: PH * scale, position: 'relative', flexShrink: 0 }}>
          {/* Inner 900×500 div — CSS-scaled to fit viewport */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: PW, height: PH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}>
            {puzzleProjects.map((project, i) => (
              <PuzzlePiece
                key={project.id}
                meta={PIECES[i]}
                motionX={motionValues[i].x}
                motionY={motionValues[i].y}
                motionR={motionValues[i].r}
                motionO={motionValues[i].o}
                project={project}
                darkMode={darkMode}
                assembled={assembled}
                onAssembledEnter={() => handlePieceEnter(i)}
                onAssembledLeave={handlePieceLeave}
              />
            ))}

            {/* ── Assembled glass popup ────────────────────────────────────────────
                 Lives as a sibling of the piece divs (not inside any clipped div)
                 so it renders outside the clip-path boundary at full quality.
                 A 140 ms hover-timeout bridges the gap when the cursor moves
                 from the piece to the popup link button.                        */}
            <AnimatePresence>
              {assembled && hoveredPieceIdx !== null && (() => {
                const proj = PIECES[hoveredPieceIdx] && puzzleProjects[hoveredPieceIdx];
                const anchor = PIECES[hoveredPieceIdx].popup;
                if (!proj) return null;
                // Clamp so the 220px-wide card never bleeds past the puzzle edges
                const clampedX = Math.max(110, Math.min(PW - 110, anchor.x));
                const clampedY = Math.max(90,  Math.min(PH - 90,  anchor.y));
                return (
                  <motion.div
                    key={`popup-${hoveredPieceIdx}`}
                    initial={{ opacity: 0, scale: 0.90, y: 10 }}
                    animate={{ opacity: 1, scale: 1,    y: 0  }}
                    exit={{    opacity: 0, scale: 0.90, y: 10 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    onMouseEnter={handlePopoverEnter}
                    onMouseLeave={handlePopoverLeave}
                    style={{
                      position: 'absolute',
                      left: clampedX,
                      top: clampedY,
                      transform: 'translate(-50%, -50%)',
                      width: 220,
                      zIndex: 60,
                      borderRadius: 16,
                      overflow: 'hidden',
                      background: darkMode ? 'rgba(8,4,22,0.86)' : 'rgba(255,255,255,0.90)',
                      backdropFilter: 'blur(28px)',
                      WebkitBackdropFilter: 'blur(28px)',
                      border: darkMode
                        ? '1px solid rgba(168,85,247,0.28)'
                        : '1px solid rgba(168,85,247,0.25)',
                      boxShadow: darkMode
                        ? '0 20px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)'
                        : '0 20px 40px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9)',
                    }}
                  >
                    {/* Accent top stripe */}
                    <div style={{
                      height: 3,
                      background: `linear-gradient(to right, ${proj.accentStart}, ${proj.accentEnd})`,
                    }} />

                    <div style={{ padding: '14px 16px 16px' }}>
                      {/* Title */}
                      <p style={{
                        fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em',
                        color: darkMode ? '#f8fafc' : '#0f172a',
                        margin: '0 0 6px',
                      }}>
                        {proj.title}
                      </p>

                      {/* Description — capped at 4 lines */}
                      <p style={{
                        fontSize: 10.5,
                        color: darkMode ? '#94a3b8' : '#64748b',
                        lineHeight: 1.6,
                        margin: '0 0 14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {proj.description}
                      </p>

                      {/* GitHub link */}
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '5px 12px', borderRadius: 8,
                          background: `linear-gradient(135deg, ${proj.accentStart}, ${proj.accentEnd})`,
                          fontSize: 10, fontWeight: 700, color: '#fff',
                          textDecoration: 'none', letterSpacing: '0.01em',
                        }}
                      >
                        <Github size={10} /> View on GitHub
                      </a>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* ── Perimeter glow — fires when all pieces are assembled ─────────────
                 Layer 1: dim static border fades in (shows the complete rectangle).
                 Layer 2: bright 200 px segment travels around the perimeter in a
                          loop — the "running light" animation.
                 Both use the same SVG <rect> path so the glow hugs the puzzle edge. */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: PW, height: PH, pointerEvents: 'none', zIndex: 40, overflow: 'visible' }}
              aria-hidden="true"
            >
              <defs>
                <filter id="perimeterGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Layer 1 — static dim border, fades in when assembled */}
              <motion.rect
                x={1} y={1} width={PW - 2} height={PH - 2}
                fill="none"
                stroke="rgba(168,85,247,0.45)"
                strokeWidth={2}
                animate={{ opacity: assembled ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Layer 2 — traveling bright spot, loops while assembled */}
              {assembled && (
                <motion.rect
                  key="traveler"
                  x={1} y={1} width={PW - 2} height={PH - 2}
                  fill="none"
                  stroke="#d946ef"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeDasharray={`200 ${PERIMETER - 200}`}
                  filter="url(#perimeterGlow)"
                  animate={{ strokeDashoffset: [0, -PERIMETER] }}
                  transition={{ duration: 1.4, ease: 'linear', repeat: Infinity }}
                />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p style={{
        textAlign: 'center', marginTop: 36, fontSize: 12, color: subCol,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        Scroll to assemble · Hover each piece to explore
      </p>

      {/* Extra projects (6th+) */}
      {extraProjects.length > 0 && (
        <div style={{ maxWidth: 1200, margin: '72px auto 0', paddingLeft: 24, paddingRight: 24 }}>
          <p style={{
            textAlign: 'center', marginBottom: 40,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#a855f7',
          }}>More Projects</p>
          <div className={`grid gap-8 ${extraProjects.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {extraProjects.map((p) => <ExtraCard key={p.id} project={p} darkMode={darkMode} />)}
          </div>
        </div>
      )}
    </section>
  );
}
