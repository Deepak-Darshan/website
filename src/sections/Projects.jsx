import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// ─── Project data ─────────────────────────────────────────────────────────────
// Top 3 → puzzle pieces. Any beyond index 2 → cards below the puzzle.
const projects = [
  {
    id: 1,
    title: 'SmartQueue',
    tagline: 'Production-grade distributed task queue powered by AWS & AI',
    description:
      'A distributed task queue system built on AWS SQS with three priority tiers and a Dead Letter Queue. Features an AI-powered ops assistant (Claude API) for natural language diagnostics, auto-scaling workers (1–8 instances), and a circuit breaker pattern — achieving 9.6 tasks/sec at 100% success rate.',
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
    liveUrl: 'https://github.com/Deepak-Darshan/smartqueue',
    githubUrl: 'https://github.com/Deepak-Darshan/smartqueue',
  },
  {
    id: 2,
    title: 'Tether',
    tagline: 'Swipe-based professional networking app in React Native',
    description:
      'A mobile-first professional networking platform built with React Native/Expo and a Node.js + PostgreSQL backend. Users swipe to discover profiles, match on mutual interest, and chat — all with secure token storage and full TypeScript support.',
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
    liveUrl: 'https://github.com/Deepak-Darshan/tether',
    githubUrl: 'https://github.com/Deepak-Darshan/tether',
  },
  {
    id: 3,
    title: 'ViewTrend',
    tagline: 'AI-powered analytics dashboard for NSW school incidents',
    description:
      'A Streamlit dashboard that pulls live data from the NSW Government CKAN API, automatically detects statistical anomalies via z-score analysis, and generates plain-English insights and business recommendations using Groq\'s LLaMA 3.3 70B model.',
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
    liveUrl: 'https://github.com/Deepak-Darshan/viewTrend',
    githubUrl: 'https://github.com/Deepak-Darshan/viewTrend',
  },
  {
    id: 4,
    title: 'UDP Reliable Protocol',
    tagline: 'TCP-like reliability built on top of raw UDP sockets',
    description:
      'A from-scratch implementation of a reliable transport protocol over UDP using only Python\'s standard library. Implements sliding window, cumulative ACKs, fast retransmit (3 dup-ACKs), 16-bit checksum error detection, and configurable network simulation for packet loss and corruption.',
    tech: ['Python', 'UDP Sockets', 'Sliding Window', 'Checksum', 'Network Simulation'],
    features: [
      'Sliding window with cumulative acknowledgements',
      '16-bit ones-complement checksum for error detection',
      'Fast retransmit on 3 duplicate ACKs + timeout retry',
      'Out-of-order segment buffering',
      'Configurable packet loss & corruption simulation',
    ],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
    accentStart: '#f59e0b', accentEnd: '#ef4444',
    liveUrl: 'https://github.com/Deepak-Darshan/UDP-Reliable-Protocol',
    githubUrl: 'https://github.com/Deepak-Darshan/UDP-Reliable-Protocol',
  },
  // ─── Add more projects here — they auto-appear as cards below the puzzle ───
];

// ─── Puzzle geometry (900 × 420, fixed for top 3 projects) ───────────────────
//
//  ┌──────────────────┬─────────────────────┐
//  │                  │     Piece 2         │
//  │    Piece 1       │  (top-right,        │
//  │  (left col,      │   440×210 + tab)    │
//  │   440×420)       ├─────────────────────┤
//  │     [tab→]       │     Piece 3         │
//  │                  │  (bottom-right,     │
//  │                  │   440×210)          │
//  └──────────────────┴─────────────────────┘
//
//  Tab size: 20 px protrusion, 60 px wide.
//  All clip-path coords are in each div's LOCAL coordinate system.

const PW = 900;
const PH = 420;

// Piece 1: left block (div 460×420). Tab on right at y 75→135.
const CLIP1 = 'M 0,0 L 440,0 L 440,75 L 460,75 L 460,135 L 440,135 L 440,420 L 0,420 Z';

// Piece 2: top-right (div 460×230). Blank left y 75→135; tab bottom x 195→255.
const CLIP2 =
  'M 0,0 L 460,0 L 460,210 L 255,210 L 255,230 L 195,230 L 195,210' +
  ' L 0,210 L 0,135 L 20,135 L 20,75 L 0,75 Z';

// Piece 3: bottom-right (div 460×210). Blank top x 195→255.
const CLIP3 = 'M 0,0 L 195,0 L 195,20 L 255,20 L 255,0 L 460,0 L 460,210 L 0,210 Z';

// ─── PuzzlePiece — isolated hover state so parent never re-renders ────────────
// Performance note: by keeping `hovered` state inside this component, a hover
// event on one piece does NOT trigger re-renders on the other two pieces or
// their Framer Motion scroll transforms.
function PuzzlePiece({ motionStyle, project, imageHeight, darkMode, children }) {
  const [hovered, setHovered] = useState(false);

  const headCol   = darkMode ? '#f8fafc' : '#0f172a';
  const subCol    = darkMode ? '#94a3b8' : '#64748b';
  const chipBg    = darkMode ? 'rgba(51,65,85,0.9)' : '#f1f5f9';
  const chipCol   = darkMode ? '#cbd5e1' : '#475569';
  const overlayBg = darkMode ? 'rgba(8,4,18,0.93)' : 'rgba(255,255,255,0.96)';
  const btnSecBg  = darkMode ? '#334155' : '#f1f5f9';
  const btnSecCol = darkMode ? '#e2e8f0' : '#374151';

  return (
    <motion.div
      style={{ ...motionStyle, willChange: 'transform, opacity' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image strip */}
      <div style={{ position: 'relative', height: imageHeight, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)`,
        }} />
        {/* Accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(to right, ${project.accentStart}, ${project.accentEnd})`,
        }} />
      </div>

      {/* Card content — passed as children for size flexibility */}
      {children({ headCol, subCol, chipBg, chipCol })}

      {/* ── Hover overlay — always in DOM, toggled via opacity + pointer-events ──
           This is the key perf fix: no mount/unmount, GPU-composited opacity
           transition, no backdrop-blur recalculation spike.                    */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: overlayBg,
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'opacity 0.18s ease',
          display: 'flex', flexDirection: 'column',
          padding: '18px 20px',
          overflowY: 'auto',
          zIndex: 20,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: headCol, marginBottom: 6 }}>
          {project.title}
        </p>
        <p style={{ fontSize: 11, color: subCol, marginBottom: 10, lineHeight: 1.6 }}>
          {project.description}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px 0' }}>
          {project.features.map((f, i) => (
            <li key={i} style={{
              fontSize: 11, color: subCol,
              display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4,
            }}>
              <span style={{ color: '#a855f7', flexShrink: 0, marginTop: 1 }}>▸</span>
              {f}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
          <a
            href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 13px', borderRadius: 8,
              background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)',
              fontSize: 11, fontWeight: 700, color: '#fff', textDecoration: 'none',
            }}
          >
            <ExternalLink size={11} /> Live Demo
          </a>
          <a
            href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 13px', borderRadius: 8,
              background: btnSecBg, fontSize: 11, fontWeight: 700,
              color: btnSecCol, textDecoration: 'none',
            }}
          >
            <Github size={11} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Extra project card (projects beyond the top 3) ───────────────────────────
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
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, ${project.accentStart}, ${project.accentEnd})` }}
        />
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
          <a
            href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-xs font-semibold text-white hover:scale-105 transition-transform"
          >
            <ExternalLink size={12} /> Live Demo
          </a>
          <a
            href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold hover:scale-105 transition-transform ${darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
          >
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

  // Piece 1 — leads, range 0 → 0.4
  const p1x = useTransform(scrollYProgress, [0, 0.4],  [-350, 0]);
  const p1y = useTransform(scrollYProgress, [0, 0.4],  [-200, 0]);
  const p1r = useTransform(scrollYProgress, [0, 0.4],  [-20,  0]);
  const p1o = useTransform(scrollYProgress, [0, 0.15], [0,    1]);

  // Piece 2 — slight delay, range 0.05 → 0.45
  const p2x = useTransform(scrollYProgress, [0.05, 0.45], [300,  0]);
  const p2y = useTransform(scrollYProgress, [0.05, 0.45], [-250, 0]);
  const p2r = useTransform(scrollYProgress, [0.05, 0.45], [15,   0]);
  const p2o = useTransform(scrollYProgress, [0.05, 0.22], [0,    1]);

  // Piece 3 — most delay, range 0.1 → 0.5
  const p3x = useTransform(scrollYProgress, [0.1, 0.5],  [-100, 0]);
  const p3y = useTransform(scrollYProgress, [0.1, 0.5],  [350,  0]);
  const p3r = useTransform(scrollYProgress, [0.1, 0.5],  [25,   0]);
  const p3o = useTransform(scrollYProgress, [0.1, 0.28], [0,    1]);

  const scale       = Math.min(1, (winW - 32) / PW);
  const cardBg      = darkMode ? 'rgba(15,23,42,0.80)' : 'rgba(255,255,255,0.85)';
  const subCol      = darkMode ? '#94a3b8' : '#64748b';
  const headCol     = darkMode ? '#f8fafc' : '#0f172a';

  // Split: top 3 go in the puzzle, the rest become regular cards
  const puzzleProjects = projects.slice(0, 3);
  const extraProjects  = projects.slice(3);

  const pieceBase = (left, top, width, height, clipId, x, y, rotate, opacity) => ({
    position: 'absolute',
    left, top, width, height,
    clipPath: `url(#${clipId})`,
    background: cardBg,
    overflow: 'hidden',
    cursor: 'pointer',
    x, y, rotate, opacity,
  });

  const Chips = ({ tech, chipBg, chipCol }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
      {tech.slice(0, 3).map((t, i) => (
        <span key={i} style={{
          padding: '2px 9px', borderRadius: 999,
          fontSize: 10, fontWeight: 600,
          background: chipBg, color: chipCol,
        }}>{t}</span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ position: 'relative', paddingTop: 96, paddingBottom: 120, width: '100%', overflow: 'hidden' }}
    >
      {/* Hidden SVG clip-path defs */}
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <clipPath id="puzzleClip1"><path d={CLIP1} /></clipPath>
          <clipPath id="puzzleClip2"><path d={CLIP2} /></clipPath>
          <clipPath id="puzzleClip3"><path d={CLIP3} /></clipPath>
        </defs>
      </svg>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 72, paddingLeft: 24, paddingRight: 24 }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a855f7',
        }}>
          What I've Built
        </span>
        <h3 style={{
          fontSize: 'clamp(30px,5vw,48px)', fontWeight: 900,
          margin: '12px 0 0', color: headCol,
        }}>
          Featured <span className="shimmer-text">Projects</span>
        </h3>
      </div>

      {/* ── Puzzle (top 3) ──────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
        {/* Outer box reserves correct scaled layout height */}
        <div style={{ width: PW * scale, height: PH * scale, position: 'relative', flexShrink: 0 }}>
          {/* Inner 900×420 puzzle, CSS-scaled */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: PW, height: PH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}>

            {/* ── Piece 1 — left block ── */}
            <PuzzlePiece
              motionStyle={pieceBase(0, 0, 460, 420, 'puzzleClip1', p1x, p1y, p1r, p1o)}
              project={puzzleProjects[0]}
              imageHeight={200}
              darkMode={darkMode}
            >
              {({ headCol, subCol, chipBg, chipCol }) => (
                <div style={{ padding: '18px 22px' }}>
                  <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: headCol }}>
                    {puzzleProjects[0].title}
                  </h4>
                  <p style={{ fontSize: 13, color: subCol, lineHeight: 1.5 }}>
                    {puzzleProjects[0].tagline}
                  </p>
                  <Chips tech={puzzleProjects[0].tech} chipBg={chipBg} chipCol={chipCol} />
                  <p style={{ fontSize: 11, color: subCol, marginTop: 14, opacity: 0.5 }}>
                    Hover to explore →
                  </p>
                </div>
              )}
            </PuzzlePiece>

            {/* ── Piece 2 — top-right block ── */}
            <PuzzlePiece
              motionStyle={pieceBase(440, 0, 460, 230, 'puzzleClip2', p2x, p2y, p2r, p2o)}
              project={puzzleProjects[1]}
              imageHeight={118}
              darkMode={darkMode}
            >
              {({ headCol, subCol, chipBg, chipCol }) => (
                <div style={{ padding: '14px 22px' }}>
                  <h4 style={{ fontSize: 17, fontWeight: 800, marginBottom: 3, color: headCol }}>
                    {puzzleProjects[1].title}
                  </h4>
                  <p style={{ fontSize: 12, color: subCol }}>{puzzleProjects[1].tagline}</p>
                  <Chips tech={puzzleProjects[1].tech} chipBg={chipBg} chipCol={chipCol} />
                </div>
              )}
            </PuzzlePiece>

            {/* ── Piece 3 — bottom-right block ── */}
            <PuzzlePiece
              motionStyle={pieceBase(440, 210, 460, 210, 'puzzleClip3', p3x, p3y, p3r, p3o)}
              project={puzzleProjects[2]}
              imageHeight={98}
              darkMode={darkMode}
            >
              {({ headCol, subCol, chipBg, chipCol }) => (
                <div style={{ padding: '10px 22px' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 3, color: headCol }}>
                    {puzzleProjects[2].title}
                  </h4>
                  <p style={{ fontSize: 12, color: subCol }}>{puzzleProjects[2].tagline}</p>
                  <Chips tech={puzzleProjects[2].tech} chipBg={chipBg} chipCol={chipCol} />
                </div>
              )}
            </PuzzlePiece>

          </div>
        </div>
      </div>

      {/* Hint */}
      <p style={{
        textAlign: 'center', marginTop: 36,
        fontSize: 12, color: subCol,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <span>Scroll to assemble the puzzle</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Hover each piece to explore</span>
      </p>

      {/* ── Extra projects (4th onwards) rendered as regular cards ────────────── */}
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
