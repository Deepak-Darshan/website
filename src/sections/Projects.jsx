import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// ─── Project data ─────────────────────────────────────────────────────────────
// Pieces 1-5 fill the puzzle. Any beyond index 4 appear as cards below.
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
    tagline: 'Browser-based maze escape game with intelligent monster AI',
    description:
      'A browser-based 2D maze escape game where you navigate as an angel through procedurally generated 21×21 mazes, collecting 3 star keys to unlock the exit — while evading a BFS-powered monster that accelerates when hunting you.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    features: [
      'Procedurally generated mazes via recursive backtracking',
      'BFS pathfinding monster AI that speeds up 20% when tracking',
      'Bomb mechanic to destroy walls and create new paths',
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
    tagline: 'TCP-like reliability over raw UDP sockets',
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
  // ─── Add more projects here — they appear as cards below the puzzle ──────
];

// ─── 5-piece puzzle geometry: 900 × 480, global coordinates ──────────────────
//
//  Row 1 (y: 0→240): 3 equal pieces, 300 px wide each
//  Row 2 (y: 240→480): 2 pieces — P4: 0→500, P5: 500→900
//
//  All 5 piece divs are full 900×480. clip-path (in global px) defines each
//  visible shape. CSS clip-path also gates pointer-events, so hover is accurate.
//
//  Tab size: T=20 px protrusion, TW=60 px wide.
//
//  Connections:
//    P1 right tab  (x:300→320, y:90→150)  ↔  P2 left blank
//    P2 right tab  (x:600→620, y:90→150)  ↔  P3 left blank
//    P1 bottom tab (x:110→170, y:240→260) ↔  P4 top blank-1
//    P2 bottom tab (x:410→470, y:240→260) ↔  P4 top blank-2
//    P3 bottom tab (x:710→770, y:240→260) ↔  P5 top blank
//    P4 right tab  (x:500→520, y:320→380) ↔  P5 left blank

const PW = 900;
const PH = 480;

// Piece 1 — top-left (0→300, 0→240), right tab + bottom tab
const CLIP1 =
  'M 0,0 L 300,0 ' +
  'L 300,90 L 320,90 L 320,150 L 300,150 ' +   // right tab →
  'L 300,240 ' +
  'L 170,240 L 170,260 L 110,260 L 110,240 ' +  // bottom tab ↓
  'L 0,240 Z';

// Piece 2 — top-middle (300→600, 0→240), left blank + right tab + bottom tab
const CLIP2 =
  'M 300,0 L 600,0 ' +
  'L 600,90 L 620,90 L 620,150 L 600,150 ' +   // right tab →
  'L 600,240 ' +
  'L 470,240 L 470,260 L 410,260 L 410,240 ' +  // bottom tab ↓
  'L 300,240 ' +
  'L 300,150 L 320,150 L 320,90 L 300,90 Z';    // left blank ←

// Piece 3 — top-right (600→900, 0→240), left blank + bottom tab
const CLIP3 =
  'M 600,0 L 900,0 L 900,240 ' +
  'L 770,240 L 770,260 L 710,260 L 710,240 ' +  // bottom tab ↓
  'L 600,240 ' +
  'L 600,150 L 620,150 L 620,90 L 600,90 Z';    // left blank ←

// Piece 4 — bottom-left (0→500, 240→480), 2× top blanks + right tab
const CLIP4 =
  'M 0,240 ' +
  'L 110,240 L 110,260 L 170,260 L 170,240 ' +  // top blank-1 (P1 tab)
  'L 410,240 L 410,260 L 470,260 L 470,240 ' +  // top blank-2 (P2 tab)
  'L 500,240 ' +
  'L 500,320 L 520,320 L 520,380 L 500,380 ' +  // right tab →
  'L 500,480 L 0,480 Z';

// Piece 5 — bottom-right (500→900, 240→480), top blank + left blank
const CLIP5 =
  'M 500,240 ' +
  'L 710,240 L 710,260 L 770,260 L 770,240 ' +  // top blank (P3 tab)
  'L 900,240 L 900,480 L 500,480 ' +
  'L 500,380 L 520,380 L 520,320 L 500,320 Z';  // left blank (P4 tab)

// Per-piece metadata: scatter start, scroll ranges, transform origin, content layout
const PIECES = [
  {
    clipId: 'pc1', path: CLIP1,
    transformOrigin: '150px 120px',
    fromX: -420, fromY: -240, fromR: -22,
    scrollRange: [0, 0.36],    opRange: [0, 0.16],
    // image region (absolute within 900×480 div)
    img: { left: 0, top: 0, width: 300, height: 130 },
    // content text region
    txt: { left: 12, top: 138, width: 270 },
  },
  {
    clipId: 'pc2', path: CLIP2,
    transformOrigin: '450px 120px',
    fromX: 0, fromY: -380, fromR: 14,
    scrollRange: [0.04, 0.40], opRange: [0.04, 0.20],
    img: { left: 300, top: 0, width: 300, height: 130 },
    txt: { left: 312, top: 136, width: 265 },
  },
  {
    clipId: 'pc3', path: CLIP3,
    transformOrigin: '750px 120px',
    fromX: 420, fromY: -240, fromR: -16,
    scrollRange: [0.08, 0.44], opRange: [0.08, 0.24],
    img: { left: 600, top: 0, width: 300, height: 130 },
    txt: { left: 612, top: 136, width: 263 },
  },
  {
    clipId: 'pc4', path: CLIP4,
    transformOrigin: '250px 360px',
    fromX: -340, fromY: 330, fromR: 20,
    scrollRange: [0.06, 0.42], opRange: [0.06, 0.22],
    img: { left: 0, top: 242, width: 500, height: 118 },
    txt: { left: 12, top: 366, width: 468 },
  },
  {
    clipId: 'pc5', path: CLIP5,
    transformOrigin: '700px 360px',
    fromX: 360, fromY: 330, fromR: -24,
    scrollRange: [0.11, 0.48], opRange: [0.11, 0.27],
    img: { left: 500, top: 242, width: 400, height: 118 },
    txt: { left: 512, top: 366, width: 368 },
  },
];

// ─── PuzzlePiece — isolated hover state (no parent re-renders on hover) ───────
function PuzzlePiece({ meta, motionStyle, project, darkMode }) {
  const [hovered, setHovered] = useState(false);

  const headCol   = darkMode ? '#f1f5f9' : '#0f172a';
  const subCol    = darkMode ? '#94a3b8' : '#64748b';
  const chipBg    = darkMode ? 'rgba(51,65,85,0.9)' : '#f1f5f9';
  const chipCol   = darkMode ? '#cbd5e1' : '#475569';
  const overlayBg = darkMode ? 'rgba(6,3,16,0.94)' : 'rgba(255,255,255,0.96)';
  const btnSecBg  = darkMode ? '#334155' : '#f1f5f9';
  const btnSecCol = darkMode ? '#e2e8f0' : '#374151';

  return (
    <motion.div
      style={{
        position: 'absolute', left: 0, top: 0,
        width: PW, height: PH,
        clipPath: `url(#${meta.clipId})`,
        willChange: 'transform, opacity',
        transformOrigin: meta.transformOrigin,
        cursor: 'pointer',
        ...motionStyle,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background fill */}
      <div style={{
        position: 'absolute',
        left: meta.img.left, top: meta.img.top,
        width: meta.img.width, height: meta.img.height + (meta.txt.top - (meta.img.top + meta.img.height)) + 80,
        background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.9)',
      }} />

      {/* Project image */}
      <img
        src={project.image}
        alt={project.title}
        style={{
          position: 'absolute',
          left: meta.img.left, top: meta.img.top,
          width: meta.img.width, height: meta.img.height,
          objectFit: 'cover',
        }}
      />

      {/* Image gradient overlay */}
      <div style={{
        position: 'absolute',
        left: meta.img.left, top: meta.img.top,
        width: meta.img.width, height: meta.img.height,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Accent stripe */}
      <div style={{
        position: 'absolute',
        left: meta.img.left, top: meta.img.top,
        width: meta.img.width, height: 3,
        background: `linear-gradient(to right, ${project.accentStart}, ${project.accentEnd})`,
      }} />

      {/* Title + tagline + chips */}
      <div style={{ position: 'absolute', left: meta.txt.left, top: meta.txt.top, width: meta.txt.width }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: headCol, margin: '0 0 3px' }}>
          {project.title}
        </p>
        <p style={{ fontSize: 11, color: subCol, margin: '0 0 6px', lineHeight: 1.4 }}>
          {project.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={i} style={{
              padding: '1px 7px', borderRadius: 999,
              fontSize: 9, fontWeight: 600,
              background: chipBg, color: chipCol,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Hover overlay — always in DOM, CSS opacity transition ─────────────
           Covers the full 900×480 div so clip-path clips it to the piece shape.
           opacity toggle = no mount/unmount = no repaint spike.               */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: PW, height: PH,
        background: overlayBg,
        opacity: hovered ? 1 : 0,
        pointerEvents: hovered ? 'auto' : 'none',
        transition: 'opacity 0.16s ease',
        zIndex: 10,
      }}>
        {/* Content centred in the piece's visual area */}
        <div style={{
          position: 'absolute',
          left: meta.img.left + 14,
          top: meta.img.top + 14,
          width: meta.img.width - 28,
          height: (meta.img.height + 120) - 28,
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
                padding: '5px 11px', borderRadius: 7,
                background: `linear-gradient(135deg, ${project.accentStart}, ${project.accentEnd})`,
                fontSize: 10, fontWeight: 700, color: '#fff', textDecoration: 'none',
              }}
            >
              <ExternalLink size={10} /> Demo
            </a>
            <a
              href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '5px 11px', borderRadius: 7,
                background: btnSecBg, fontSize: 10, fontWeight: 700,
                color: btnSecCol, textDecoration: 'none',
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

// ─── Extra project card (6th project onwards) ────────────────────────────────
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
        <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {project.title}
        </h4>
        <p className={`text-sm mb-3 ${sub}`}>{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={i} className={`px-2 py-0.5 text-xs rounded-full font-medium ${chip}`}>{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span className={`px-2 py-0.5 text-xs rounded-full ${chip}`}>+{project.tech.length - 3}</span>
          )}
        </div>
        <div className="flex gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-xs font-semibold text-white hover:scale-105 transition-transform">
            <ExternalLink size={12} /> Live Demo
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
  const [winW, setWinW] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // ── Per-piece scroll transforms (hooks must be at top level) ─────────────
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

  const allMotion = [
    { x: p1x, y: p1y, rotate: p1r, opacity: p1o },
    { x: p2x, y: p2y, rotate: p2r, opacity: p2o },
    { x: p3x, y: p3y, rotate: p3r, opacity: p3o },
    { x: p4x, y: p4y, rotate: p4r, opacity: p4o },
    { x: p5x, y: p5y, rotate: p5r, opacity: p5o },
  ];

  const scale        = Math.min(1, (winW - 32) / PW);
  const subCol       = darkMode ? '#94a3b8' : '#64748b';
  const headCol      = darkMode ? '#f8fafc' : '#0f172a';

  const puzzleProjects = projects.slice(0, 5);
  const extraProjects  = projects.slice(5);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ position: 'relative', paddingTop: 96, paddingBottom: 120, width: '100%', overflow: 'hidden' }}
    >
      {/* ── SVG clip-path defs (hidden) ─────────────────────────────────────── */}
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          {PIECES.map((p) => (
            <clipPath key={p.clipId} id={p.clipId}>
              <path d={p.path} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* ── Section header ───────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 72, paddingLeft: 24, paddingRight: 24 }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a855f7',
        }}>
          What I've Built
        </span>
        <h3 style={{ fontSize: 'clamp(30px,5vw,48px)', fontWeight: 900, margin: '12px 0 0', color: headCol }}>
          Featured <span className="shimmer-text">Projects</span>
        </h3>
      </div>

      {/* ── Puzzle stage ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
        {/* Outer box reserves correct scaled layout space */}
        <div style={{ width: PW * scale, height: PH * scale, position: 'relative', flexShrink: 0 }}>
          {/* Inner 900×480 — CSS-scaled to fit viewport */}
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
                motionStyle={allMotion[i]}
                project={project}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hint */}
      <p style={{
        textAlign: 'center', marginTop: 36,
        fontSize: 12, color: subCol,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <span>Scroll to assemble · Hover each piece to explore</span>
      </p>

      {/* ── Extra projects (6th onwards) ─────────────────────────────────────── */}
      {extraProjects.length > 0 && (
        <div style={{ maxWidth: 1200, margin: '72px auto 0', paddingLeft: 24, paddingRight: 24 }}>
          <p style={{
            textAlign: 'center', marginBottom: 40,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#a855f7',
          }}>
            More Projects
          </p>
          <div className={`grid gap-8 ${extraProjects.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {extraProjects.map((p) => (
              <ExtraCard key={p.id} project={p} darkMode={darkMode} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
