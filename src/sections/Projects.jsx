import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import tetherImg from '../photos/Tether.PNG';
import viewTrendImg from '../photos/ViewTrend.png';
import gamerStatsImg from '../photos/GamerStats.png';

// ─── Geological layer patterns ────────────────────────────────────────────────
// Crust: 5 wavy lines, 600×120 tile — same as Skills.jsx
const TOPO_CRUST = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='120'>` +
    `<path stroke='rgba(255,153,0,0.075)' stroke-width='0.75' fill='none'` +
    ` d='M0,22 C150,10 300,34 450,22 C525,16 562,26 600,22'/>` +
    `<path stroke='rgba(255,153,0,0.095)' stroke-width='1.1' fill='none'` +
    ` d='M0,48 C120,34 280,62 420,52 C510,46 556,54 600,48'/>` +
    `<path stroke='rgba(96,160,255,0.07)' stroke-width='0.75' fill='none'` +
    ` d='M0,70 C180,58 360,82 480,70 C540,64 574,76 600,70'/>` +
    `<path stroke='rgba(255,153,0,0.085)' stroke-width='1' fill='none'` +
    ` d='M0,92 C150,78 300,106 450,96 C525,90 562,98 600,92'/>` +
    `<path stroke='rgba(255,153,0,0.065)' stroke-width='0.75' fill='none'` +
    ` d='M0,110 C200,100 350,118 500,108 C550,104 578,112 600,110'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

// Mantle: 4 tightly-packed lines, 350×45 tile — denser and warmer
const TOPO_MANTLE = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='350' height='45'>` +
    `<path stroke='rgba(255,153,0,0.11)' stroke-width='1' fill='none'` +
    ` d='M0,10 C88,2 175,18 263,10 C306,6 330,14 350,10'/>` +
    `<path stroke='rgba(255,153,0,0.13)' stroke-width='1.5' fill='none'` +
    ` d='M0,22 C88,14 175,30 263,22 C306,18 330,26 350,22'/>` +
    `<path stroke='rgba(255,153,0,0.10)' stroke-width='1' fill='none'` +
    ` d='M0,33 C88,25 175,41 263,33 C306,29 330,37 350,33'/>` +
    `<path stroke='rgba(96,160,255,0.07)' stroke-width='0.75' fill='none'` +
    ` d='M0,43 C88,35 175,51 263,43 C306,39 330,47 350,43'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

// ─── Language color map ────────────────────────────────────────────────────────
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Java:       '#b07219',
  C:          '#555555',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Shell:      '#89e051',
  Go:         '#00ADD8',
  Rust:       '#dea584',
};

function getLangColor(lang) {
  return (lang && LANG_COLORS[lang]) || '#8b949e';
}

// ─── Time ago helper ───────────────────────────────────────────────────────────
function timeAgo(dateString) {
  const diff  = Date.now() - new Date(dateString).getTime();
  const days  = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years  = Math.floor(days / 365);
  if (years  >= 1) return `${years}y ago`;
  if (months >= 1) return `${months}mo ago`;
  if (weeks  >= 1) return `${weeks}w ago`;
  if (days   >= 1) return `${days}d ago`;
  return 'today';
}

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
    image: tetherImg,
    imagePosition: 'center 20%',
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
    image: viewTrendImg,
    accentStart: '#10b981', accentEnd: '#14b8a6',
    githubUrl: 'https://github.com/Deepak-Darshan/viewTrend',
    liveUrl: 'https://github.com/Deepak-Darshan/viewTrend',
  },
  {
    id: 4,
    title: 'GamerStats',
    tagline: 'Real-time gaming stats and leaderboard tracker',
    description:
      'A real-time gaming statistics dashboard that aggregates player data, tracks performance metrics across sessions, and renders live leaderboards — giving competitive gamers actionable insights into their gameplay.',
    tech: ['JavaScript', 'React', 'Node.js', 'WebSocket', 'MongoDB'],
    features: [
      'Live leaderboard with real-time score updates',
      'Per-session performance breakdown and trend charts',
      'Cross-platform player profile aggregation',
      'WebSocket-powered live data feed',
      'Responsive dashboard with dark mode',
    ],
    image: gamerStatsImg,
    imagePosition: 'center top',
    accentStart: '#f59e0b', accentEnd: '#ef4444',
    githubUrl: 'https://github.com/Deepak-Darshan/gamerstats',
    liveUrl: 'https://github.com/Deepak-Darshan/gamerstats',
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

// ─── Excluded puzzle project names ────────────────────────────────────────────
const PUZZLE_NAMES = ['smartqueue', 'tether', 'viewTrend', 'gamerstats', 'UDP-Reliable-Protocol'];

// ─── Collaborative repos you contribute to but don't own ─────────────────────
// Add any shared / friend's repo here as "owner/repo-name"
const COLLAB_REPOS = [
  'RyanYoon2005/Ghostie_data-collection',
  'RyanYoon2005/Ghostie_data-retrieval',
  'RyanYoon2005/Ghostie_analytical-model',
];

// ─── Folder groups in All Deployments ────────────────────────────────────────
// Repos listed here are pulled out of the main grid and rendered as a group.
const FOLDER_GROUPS = [
  {
    name: 'Hospitality Search Engine',
    connected: true,
    repoOrder: [
      'RyanYoon2005/Ghostie_data-collection',
      'RyanYoon2005/Ghostie_data-retrieval',
      'RyanYoon2005/Ghostie_analytical-model',
    ],
    stepLabels: ['Collect', 'Retrieve', 'Analyse'],
    slugs: new Set([
      'RyanYoon2005/Ghostie_data-collection',
      'RyanYoon2005/Ghostie_data-retrieval',
      'RyanYoon2005/Ghostie_analytical-model',
    ]),
  },
];

function repoSlug(repo) {
  return `${repo.owner.login}/${repo.name}`;
}

// ─── GitHub repos custom hook ─────────────────────────────────────────────────
function useGitHubRepos(retryCount) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const ownedFetch = fetch('https://api.github.com/users/Deepak-Darshan/repos?sort=pushed&per_page=100&type=public')
      .then(r => { if (!r.ok) throw new Error(`GitHub API responded with ${r.status}`); return r.json(); });

    const collabFetches = COLLAB_REPOS.map(slug =>
      fetch(`https://api.github.com/repos/${slug}`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
    );

    Promise.all([ownedFetch, ...collabFetches])
      .then(([owned, ...collabs]) => {
        if (cancelled) return;
        const ownedFiltered = owned.filter(r => !r.fork);
        const collabFiltered = collabs.filter(Boolean);
        // Merge, deduplicate by id, sort by pushed_at
        const merged = [...ownedFiltered, ...collabFiltered];
        const unique = Array.from(new Map(merged.map(r => [r.id, r])).values());
        unique.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        setRepos(unique);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [retryCount]);

  return { repos, loading, error };
}

// ─── CountUp component ────────────────────────────────────────────────────────
function CountUp({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) return;
    const start = performance.now();
    const duration = 1200;
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return <>{count}</>;
}

// ─── SkeletonCard component ───────────────────────────────────────────────────
function SkeletonCard() {
  const shimmer = {
    background: 'linear-gradient(90deg, rgba(255,153,0,0.04) 0%, rgba(255,153,0,0.12) 50%, rgba(255,153,0,0.04) 100%)',
    backgroundSize: '200% 100%',
    animation: 'ghSkeletonShimmer 1.6s ease-in-out infinite',
    borderRadius: 4,
  };
  return (
    <div style={{
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(10,8,32,0.6)',
      overflow: 'hidden',
    }}>
      <div style={{ height: 3, ...shimmer }} />
      <div style={{ padding: 16 }}>
        <div style={{ width: 140, height: 14, marginBottom: 12, ...shimmer }} />
        <div style={{ width: '100%', height: 32, marginBottom: 16, ...shimmer }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 60, height: 10, ...shimmer }} />
          <div style={{ width: 40, height: 10, ...shimmer }} />
        </div>
      </div>
    </div>
  );
}

// ─── RepoCard component ───────────────────────────────────────────────────────
function RepoCard({ repo, index, darkMode, headCol, subCol }) {
  const [hovered, setHovered] = useState(false);
  const langColor = getLangColor(repo.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(index * 0.05, 0.4) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(repo.html_url, '_blank')}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 14,
        border: `1px solid ${hovered ? `${langColor}55` : 'rgba(255,255,255,0.08)'}`,
        background: darkMode ? 'rgba(10,8,32,0.6)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${langColor}18` : 'none',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${langColor}, ${langColor}55)`, flexShrink: 0 }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 16px 0' }}>
        <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: headCol, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {repo.name}
          </div>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: 9, color: '#10b981', textDecoration: 'none', display: 'inline-block', marginTop: 2 }}
            >
              ↗ live
            </a>
          )}
        </div>
        {repo.stargazers_count > 0 && (
          <div style={{
            background: 'rgba(255,153,0,0.10)',
            border: '1px solid rgba(255,153,0,0.22)',
            borderRadius: 20,
            padding: '2px 8px',
            fontSize: 10,
            color: '#ff9900',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            ★ {repo.stargazers_count}
          </div>
        )}
      </div>

      {/* Description */}
      <div style={{ padding: '8px 16px 0', flexGrow: 1 }}>
        <p style={{
          fontSize: 12,
          lineHeight: 1.6,
          color: subCol,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontStyle: repo.description ? 'normal' : 'italic',
        }}>
          {repo.description || 'No description'}
        </p>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 16px 0' }}>
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} style={{
              background: 'rgba(96,160,255,0.08)',
              border: '1px solid rgba(96,160,255,0.22)',
              borderRadius: 20,
              padding: '2px 7px',
              fontSize: 9,
              color: '#60a0ff',
              fontWeight: 500,
            }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 14px', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {repo.language && (
            <>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: langColor, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: subCol }}>{repo.language}</span>
            </>
          )}
        </div>
        <span style={{ fontSize: 9, color: subCol }}>{timeAgo(repo.pushed_at)}</span>
      </div>

      {/* Top-right corner action buttons — appear on hover */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        gap: 5,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: hovered ? 'auto' : 'none',
        zIndex: 10,
      }}>
        <button
          onClick={e => { e.stopPropagation(); window.open(repo.html_url, '_blank'); }}
          style={{
            background: 'rgba(10,8,32,0.85)',
            border: '1px solid rgba(255,153,0,0.4)',
            borderRadius: 7,
            padding: '4px 10px',
            fontSize: 10,
            fontWeight: 600,
            color: '#ff9900',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'inherit',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <Github size={11} /> View Code
        </button>
        {repo.homepage && (
          <button
            onClick={e => { e.stopPropagation(); window.open(repo.homepage, '_blank'); }}
            style={{
              background: 'rgba(10,8,32,0.85)',
              border: '1px solid rgba(255,153,0,0.4)',
              borderRadius: 7,
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 600,
              color: '#ff9900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'inherit',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <ExternalLink size={11} /> Open
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── FolderGroup — collapsible group of repo cards in the feed ───────────────
function FolderGroup({ name, repos, connected, repoOrder, stepLabels, darkMode, headCol, subCol, startIndex }) {
  const [open, setOpen] = useState(true);

  // Sort repos according to repoOrder when connected pipeline is used
  const orderedRepos = connected && repoOrder
    ? repoOrder.map(slug => repos.find(r => repoSlug(r) === slug)).filter(Boolean)
    : repos;

  return (
    <div style={{ gridColumn: '1 / -1' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          background: 'rgba(255,153,0,0.05)',
          border: '1px solid rgba(255,153,0,0.18)',
          borderRadius: open ? '12px 12px 0 0' : 12,
          padding: '12px 18px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.2s, border-radius 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,153,0,0.09)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,153,0,0.05)'}
      >
        <span style={{ fontSize: 16 }}>📁</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: headCol, flex: 1, textAlign: 'left' }}>
          {name}
        </span>
        {connected && (
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,153,0,0.6)',
            background: 'rgba(255,153,0,0.06)',
            border: '1px solid rgba(255,153,0,0.15)',
            borderRadius: 20, padding: '2px 8px', marginRight: 6,
          }}>
            pipeline
          </span>
        )}
        <span style={{
          fontSize: 10, color: subCol,
          background: 'rgba(255,153,0,0.10)',
          border: '1px solid rgba(255,153,0,0.2)',
          borderRadius: 20,
          padding: '2px 8px',
          marginRight: 8,
        }}>
          {repos.length} repo{repos.length !== 1 ? 's' : ''}
        </span>
        <span style={{ fontSize: 12, color: subCol, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          ▾
        </span>
      </button>

      {open && (
        <div style={{
          border: '1px solid rgba(255,153,0,0.18)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          padding: '20px 16px 16px',
          background: 'rgba(255,153,0,0.02)',
        }}>
          {connected ? (
            <>
              {/* Pipeline divider label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,153,0,0.12)' }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,153,0,0.45)' }}>
                  data pipeline
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,153,0,0.12)' }} />
              </div>

              {/* Cards + connectors */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
                {orderedRepos.flatMap((repo, i) => {
                  const stepLabel = stepLabels && stepLabels[i];
                  const items = [
                    <div
                      key={repo.id}
                      style={{ flex: '1 1 220px', maxWidth: 320, paddingTop: 32, position: 'relative' }}
                    >
                      {/* Step badge */}
                      <div style={{
                        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        background: 'rgba(255,153,0,0.12)',
                        border: '1px solid rgba(255,153,0,0.35)',
                        borderRadius: 20, padding: '3px 10px',
                        whiteSpace: 'nowrap',
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#ff9900' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {stepLabel && (
                          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,153,0,0.75)' }}>
                            {stepLabel}
                          </span>
                        )}
                      </div>
                      <RepoCard
                        repo={repo}
                        index={startIndex + i}
                        darkMode={darkMode}
                        headCol={headCol}
                        subCol={subCol}
                      />
                    </div>,
                  ];

                  if (i < orderedRepos.length - 1) {
                    items.push(
                      <div
                        key={`connector-${i}`}
                        style={{
                          flex: '0 0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '32px 6px 0',
                          minWidth: 36,
                        }}
                      >
                        {/* Dashed line + arrowhead */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <div style={{
                            width: 20, height: 2,
                            background: 'repeating-linear-gradient(to right, rgba(255,153,0,0.6) 0px, rgba(255,153,0,0.6) 4px, transparent 4px, transparent 8px)',
                          }} />
                          <div style={{
                            width: 0, height: 0,
                            borderTop: '5px solid transparent',
                            borderBottom: '5px solid transparent',
                            borderLeft: '7px solid rgba(255,153,0,0.7)',
                          }} />
                        </div>
                      </div>
                    );
                  }

                  return items;
                })}
              </div>
            </>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 12,
            }}>
              {repos.map((repo, i) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  index={startIndex + i}
                  darkMode={darkMode}
                  headCol={headCol}
                  subCol={subCol}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
          objectPosition: project.imagePosition || 'center top',
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

// ─── Filter options ───────────────────────────────────────────────────────────
const FEED_FILTERS = ['All', 'Python', 'JavaScript', 'TypeScript', 'AWS', 'Most Starred', 'Recently Updated'];

// ─── Main component ───────────────────────────────────────────────────────────
export default function Projects({ darkMode }) {
  const sectionRef = useRef(null);
  const puzzleRef  = useRef(null);
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

  useEffect(() => {
    const fn = () => setWinW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Track scroll only against the puzzle area so the animation completes
  // when the puzzle section reaches the viewport top — not half-way through
  // the much taller section that now includes the GitHub feed below.
  const { scrollYProgress } = useScroll({
    target: puzzleRef,
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

  // ── GitHub feed state ───────────────────────────────────────────────────────
  const [retryCount,   setRetryCount]   = useState(0);
  const { repos, loading, error }       = useGitHubRepos(retryCount);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm,   setSearchTerm]   = useState('');
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchFocused, setSearchFocused] = useState(false);

  // Reset visible count when filter or search changes
  useEffect(() => { setVisibleCount(9); }, [activeFilter, searchTerm]);

  // Inject keyframes needed by the feed section
  useEffect(() => {
    const id = 'gh-feed-styles';
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = `
      @keyframes ghSkeletonShimmer {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
      }
      @keyframes ghDotPulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
    `;
    document.head.appendChild(el);
    return () => { const s = document.getElementById(id); if (s) s.remove(); };
  }, []);

  // ── Computed filtered repos ─────────────────────────────────────────────────
  let filteredRepos = [...repos];

  if (activeFilter === 'Most Starred') {
    filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (activeFilter === 'Recently Updated') {
    filteredRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  } else if (activeFilter === 'AWS') {
    filteredRepos = filteredRepos.filter(r => {
      const hay = `${r.name} ${r.description || ''}`.toLowerCase();
      const topics = r.topics || [];
      return hay.includes('aws') || hay.includes('sqs') || hay.includes('lambda') ||
             hay.includes('dynamodb') || topics.includes('aws');
    });
  } else if (activeFilter !== 'All') {
    filteredRepos = filteredRepos.filter(r => r.language === activeFilter);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredRepos = filteredRepos.filter(r =>
      r.name.toLowerCase().includes(term) ||
      (r.description && r.description.toLowerCase().includes(term))
    );
  }

  // ── Stats ───────────────────────────────────────────────────────────────────
  const uniqueLangs = new Set(repos.map(r => r.language).filter(Boolean)).size;
  const totalStars  = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const langCounts  = repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const topLang = Object.entries(langCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || '—';

  // ── Shared style values ─────────────────────────────────────────────────────
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
      {/* ── Geological background: Crust → Mantle ──────────────────────────── */}
      {darkMode && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Progressive warm overlay — entire section warms top→bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(40,15,5,0.06), rgba(60,22,5,0.20))',
          }} />

          {/* CRUST — topo lines over Featured Projects (top portion) */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: '45%', left: 0, right: 0,
            backgroundImage: TOPO_CRUST,
            backgroundSize: '600px 120px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          }} />

          {/* MANTLE — dense topo lines over the repo feed area */}
          <div style={{
            position: 'absolute',
            top: '38%', bottom: 0, left: 0, right: 0,
            backgroundImage: TOPO_MANTLE,
            backgroundSize: '350px 45px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 80%, transparent 100%)',
          }} />

          {/* Warm amber radial — mantle heat building in the lower portion */}
          <div style={{
            position: 'absolute',
            top: '50%', bottom: 0, left: 0, right: 0,
            background: 'radial-gradient(ellipse 90% 60% at 50% 85%, rgba(220,75,0,0.13) 0%, transparent 70%)',
          }} />

          {/* Gradient fade at the bottom — 200px smooth blend into Contact */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: 200,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(35,12,4,0.30) 100%)',
              zIndex: 2,
            }}
          />

          {/* ── ROCK ELEMENTS — floating geological specimens ─────────────── */}

          {/* Rock 1 — large rough stone, top-left crust zone */}
          <svg width="52" height="40" viewBox="0 0 52 40" fill="none" style={{position:'absolute',top:'18%',left:'7%',opacity:0.45,animation:'rock-drift-1 32s ease-in-out infinite',pointerEvents:'none'}}>
            <path d="M8 34L2 20L10 6L22 2L38 5L48 16L44 32L30 38L14 37Z" fill="rgba(50,32,18,0.82)"/>
            <path d="M22 2L38 5L48 16L30 12Z" fill="rgba(85,60,35,0.48)"/>
            <path d="M8 34L2 20L10 6L14 18Z" fill="rgba(25,14,6,0.72)"/>
            <line x1="12" y1="30" x2="35" y2="8" stroke="rgba(130,95,55,0.38)" strokeWidth="0.9"/>
            <line x1="18" y1="35" x2="42" y2="18" stroke="rgba(120,88,50,0.28)" strokeWidth="0.6"/>
            <line x1="8" y1="22" x2="28" y2="20" stroke="rgba(125,92,52,0.32)" strokeWidth="0.6"/>
            <line x1="24" y1="14" x2="14" y2="28" stroke="rgba(115,85,48,0.25)" strokeWidth="0.5"/>
            <circle cx="30" cy="10" r="1.2" fill="rgba(160,120,70,0.42)"/>
            <circle cx="20" cy="18" r="0.9" fill="rgba(148,110,64,0.35)"/>
            <circle cx="38" cy="22" r="0.7" fill="rgba(140,102,60,0.30)"/>
            <path d="M22 2L38 5L48 16" fill="none" stroke="rgba(120,85,50,0.30)" strokeWidth="0.9"/>
          </svg>

          {/* Rock 2 — angular dark shard with quartz vein, right mid */}
          <svg width="38" height="46" viewBox="0 0 38 46" fill="none" style={{position:'absolute',top:'42%',right:'10%',opacity:0.42,animation:'rock-drift-2 37s ease-in-out 4s infinite',pointerEvents:'none'}}>
            <path d="M6 38L2 22L8 6L18 2L30 8L36 22L32 36L20 44L10 42Z" fill="rgba(45,30,16,0.82)"/>
            <path d="M18 2L30 8L36 22L24 14Z" fill="rgba(75,52,30,0.48)"/>
            <path d="M6 38L2 22L8 6L12 20Z" fill="rgba(22,12,5,0.72)"/>
            <line x1="8" y1="36" x2="32" y2="10" stroke="rgba(145,115,75,0.42)" strokeWidth="1.3"/>
            <line x1="10" y1="38" x2="34" y2="12" stroke="rgba(125,95,58,0.26)" strokeWidth="0.7"/>
            <line x1="14" y1="40" x2="28" y2="28" stroke="rgba(115,85,50,0.28)" strokeWidth="0.6"/>
            <line x1="20" y1="12" x2="14" y2="28" stroke="rgba(108,80,45,0.24)" strokeWidth="0.5"/>
            <circle cx="26" cy="12" r="1.1" fill="rgba(155,118,72,0.40)"/>
            <circle cx="16" cy="26" r="0.8" fill="rgba(142,108,65,0.32)"/>
            <path d="M18 2L30 8L36 22" fill="none" stroke="rgba(118,88,52,0.28)" strokeWidth="0.8"/>
          </svg>

          {/* Rock 3 — rounded pebble with grain texture */}
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none" style={{position:'absolute',top:'30%',left:'25%',opacity:0.40,animation:'rock-drift-3 26s ease-in-out 8s infinite',pointerEvents:'none'}}>
            <ellipse cx="15" cy="12" rx="13" ry="10" fill="rgba(58,40,22,0.82)"/>
            <ellipse cx="13" cy="10" rx="9" ry="6" fill="rgba(82,58,34,0.38)"/>
            <path d="M5 16 Q12 10 25 14" fill="none" stroke="rgba(118,88,52,0.35)" strokeWidth="0.7"/>
            <path d="M4 12 Q15 8 26 11" fill="none" stroke="rgba(110,82,47,0.28)" strokeWidth="0.6"/>
            <path d="M8 18 Q15 14 24 17" fill="none" stroke="rgba(105,78,44,0.22)" strokeWidth="0.5"/>
            <line x1="10" y1="6" x2="22" y2="18" stroke="rgba(112,84,48,0.26)" strokeWidth="0.5"/>
            <circle cx="12" cy="8" r="1" fill="rgba(152,115,68,0.40)"/>
            <circle cx="20" cy="15" r="0.7" fill="rgba(140,105,62,0.32)"/>
          </svg>

          {/* Rock 4 — wide flat sedimentary slab with strata lines */}
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none" style={{position:'absolute',top:'35%',right:'28%',opacity:0.38,animation:'rock-drift-1 42s ease-in-out 14s infinite',pointerEvents:'none'}}>
            <path d="M6 22L2 14L10 4L26 2L46 4L56 12L52 22L34 26L14 25Z" fill="rgba(55,38,20,0.80)"/>
            <path d="M10 4L26 2L46 4L56 12L30 8Z" fill="rgba(80,55,32,0.42)"/>
            <path d="M6 22L2 14L10 4L12 14Z" fill="rgba(28,16,7,0.70)"/>
            <line x1="6" y1="14" x2="54" y2="14" stroke="rgba(118,90,52,0.35)" strokeWidth="0.8"/>
            <line x1="8" y1="18" x2="50" y2="18" stroke="rgba(110,82,47,0.28)" strokeWidth="0.7"/>
            <line x1="12" y1="10" x2="48" y2="10" stroke="rgba(105,78,44,0.25)" strokeWidth="0.6"/>
            <line x1="14" y1="22" x2="46" y2="22" stroke="rgba(98,74,42,0.20)" strokeWidth="0.5"/>
            <line x1="30" y1="3" x2="28" y2="25" stroke="rgba(122,92,54,0.28)" strokeWidth="0.7"/>
            <circle cx="36" cy="7" r="1" fill="rgba(148,112,66,0.38)"/>
            <circle cx="18" cy="16" r="0.7" fill="rgba(138,104,62,0.30)"/>
            <path d="M10 4L26 2L46 4L56 12" fill="none" stroke="rgba(115,86,50,0.26)" strokeWidth="0.8"/>
          </svg>

          {/* Rock 5 — green olivine mineral, mantle zone lower */}
          <svg width="36" height="38" viewBox="0 0 36 38" fill="none" style={{position:'absolute',top:'76%',left:'58%',opacity:0.45,animation:'rock-drift-2 30s ease-in-out 6s infinite',filter:'drop-shadow(0 0 3px rgba(50,120,35,0.15))',pointerEvents:'none'}}>
            <path d="M10 34L2 20L6 6L18 2L30 6L34 18L28 32L16 36Z" fill="rgba(28,55,22,0.82)"/>
            <path d="M18 2L30 6L34 18L22 10Z" fill="rgba(45,90,35,0.42)"/>
            <path d="M10 34L2 20L6 6L12 16Z" fill="rgba(18,35,12,0.72)"/>
            <line x1="8" y1="28" x2="28" y2="8" stroke="rgba(70,130,50,0.32)" strokeWidth="0.9"/>
            <line x1="14" y1="32" x2="32" y2="14" stroke="rgba(62,118,44,0.24)" strokeWidth="0.7"/>
            <line x1="6" y1="16" x2="22" y2="18" stroke="rgba(66,122,47,0.28)" strokeWidth="0.6"/>
            <line x1="20" y1="6" x2="26" y2="24" stroke="rgba(60,115,42,0.22)" strokeWidth="0.5"/>
            <circle cx="24" cy="10" r="1.3" fill="rgba(100,160,70,0.36)"/>
            <circle cx="16" cy="20" r="0.9" fill="rgba(90,145,62,0.30)"/>
            <path d="M18 2L30 6L34 18" fill="none" stroke="rgba(72,132,52,0.26)" strokeWidth="0.8"/>
          </svg>

          {/* Rock 6 — amber crystal shard */}
          <svg width="30" height="42" viewBox="0 0 30 42" fill="none" style={{position:'absolute',top:'55%',left:'80%',opacity:0.40,animation:'rock-drift-3 35s ease-in-out 10s infinite',pointerEvents:'none'}}>
            <path d="M6 36L2 22L6 6L14 2L24 8L28 22L22 36L12 40Z" fill="rgba(70,40,12,0.82)"/>
            <path d="M14 2L24 8L28 22L18 12Z" fill="rgba(110,70,22,0.42)"/>
            <path d="M6 36L2 22L6 6L10 18Z" fill="rgba(35,18,5,0.72)"/>
            <line x1="8" y1="32" x2="24" y2="10" stroke="rgba(150,105,35,0.38)" strokeWidth="0.9"/>
            <line x1="10" y1="34" x2="26" y2="14" stroke="rgba(135,95,30,0.25)" strokeWidth="0.6"/>
            <line x1="12" y1="20" x2="6" y2="12" stroke="rgba(142,100,32,0.28)" strokeWidth="0.6"/>
            <line x1="18" y1="8" x2="24" y2="28" stroke="rgba(130,92,28,0.22)" strokeWidth="0.5"/>
            <circle cx="20" cy="10" r="1.1" fill="rgba(170,125,45,0.42)"/>
            <circle cx="10" cy="22" r="0.8" fill="rgba(155,112,38,0.35)"/>
            <path d="M14 2L24 8L28 22" fill="none" stroke="rgba(145,105,35,0.30)" strokeWidth="0.8"/>
          </svg>

          {/* Rock 7 — debris chunk */}
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" style={{position:'absolute',top:'85%',left:'38%',opacity:0.38,animation:'rock-drift-1 24s ease-in-out 16s infinite',pointerEvents:'none'}}>
            <path d="M4 14L1 8L5 2L12 1L18 5L17 12L11 16Z" fill="rgba(60,38,22,0.82)"/>
            <path d="M5 2L12 1L18 5L10 6Z" fill="rgba(92,65,38,0.42)"/>
            <path d="M4 14L1 8L5 2L7 8Z" fill="rgba(30,18,8,0.72)"/>
            <line x1="4" y1="12" x2="16" y2="4" stroke="rgba(125,92,52,0.36)" strokeWidth="0.7"/>
            <line x1="7" y1="14" x2="17" y2="8" stroke="rgba(115,85,48,0.26)" strokeWidth="0.5"/>
            <circle cx="13" cy="4" r="0.9" fill="rgba(150,112,66,0.40)"/>
          </svg>

          {/* Rock 8 — medium textured stone */}
          <svg width="44" height="32" viewBox="0 0 44 32" fill="none" style={{position:'absolute',top:'68%',right:'18%',opacity:0.42,animation:'rock-drift-2 40s ease-in-out 2s infinite',pointerEvents:'none'}}>
            <path d="M6 26L2 14L10 4L24 2L38 6L42 18L36 28L18 30Z" fill="rgba(55,35,20,0.82)"/>
            <path d="M10 4L24 2L38 6L42 18L26 10Z" fill="rgba(80,55,32,0.42)"/>
            <path d="M6 26L2 14L10 4L12 16Z" fill="rgba(28,16,7,0.72)"/>
            <line x1="10" y1="24" x2="34" y2="6" stroke="rgba(120,90,52,0.34)" strokeWidth="0.8"/>
            <line x1="14" y1="28" x2="40" y2="12" stroke="rgba(110,82,47,0.25)" strokeWidth="0.6"/>
            <line x1="8" y1="18" x2="30" y2="22" stroke="rgba(108,80,45,0.28)" strokeWidth="0.6"/>
            <line x1="18" y1="6" x2="14" y2="24" stroke="rgba(115,86,50,0.26)" strokeWidth="0.5"/>
            <line x1="28" y1="4" x2="36" y2="20" stroke="rgba(108,80,45,0.22)" strokeWidth="0.5"/>
            <circle cx="30" cy="8" r="1.1" fill="rgba(152,115,68,0.40)"/>
            <circle cx="18" cy="16" r="0.8" fill="rgba(140,105,62,0.32)"/>
            <path d="M10 4L24 2L38 6L42 18" fill="none" stroke="rgba(112,84,48,0.26)" strokeWidth="0.8"/>
          </svg>
        </div>
      )}

      {/* puzzleRef wraps only the header + puzzle stage so scroll progress is
          relative to this area and the pieces are fully assembled by the time
          the section top reaches the viewport top (via nav link or scroll). */}
      <div ref={puzzleRef}>

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
                // Clamp so the 290px-wide card stays within puzzle bounds
                const clampedX = Math.max(145, Math.min(PW - 145, anchor.x));
                const clampedY = Math.max(105, Math.min(PH - 105, anchor.y));
                // Inverted: dark mode → white card, light mode → dark card
                const titleCol = darkMode ? '#0a0514' : '#ffffff';
                const descCol  = darkMode ? 'rgba(10,5,20,0.72)' : 'rgba(255,255,255,0.78)';
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
                      width: 290,
                      zIndex: 60,
                      borderRadius: 18,
                      overflow: 'hidden',
                      background: darkMode ? 'rgba(255,255,255,0.95)' : 'rgba(8,4,22,0.92)',
                      backdropFilter: 'blur(28px)',
                      WebkitBackdropFilter: 'blur(28px)',
                      border: `1px solid ${proj.accentStart}50`,
                      boxShadow: darkMode
                        ? `0 24px 56px rgba(0,0,0,0.4), 0 0 28px ${proj.accentStart}1a, inset 0 1px 0 rgba(255,255,255,0.9)`
                        : `0 24px 56px rgba(0,0,0,0.7), 0 0 28px ${proj.accentStart}1a, inset 0 1px 0 rgba(255,255,255,0.06)`,
                    }}
                  >
                    {/* Accent top stripe */}
                    <div style={{
                      height: 3,
                      background: `linear-gradient(to right, ${proj.accentStart}, ${proj.accentEnd})`,
                    }} />

                    <div style={{ padding: '16px 18px 18px' }}>
                      {/* Title */}
                      <p style={{
                        fontSize: 14, fontWeight: 800, letterSpacing: '-0.025em',
                        color: titleCol,
                        margin: '0 0 8px',
                      }}>
                        {proj.title}
                      </p>

                      {/* Full description — no line clamp */}
                      <p style={{
                        fontSize: 11,
                        color: descCol,
                        lineHeight: 1.65,
                        margin: '0 0 16px',
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
                          padding: '6px 14px', borderRadius: 8,
                          background: `linear-gradient(135deg, ${proj.accentStart}, ${proj.accentEnd})`,
                          fontSize: 11, fontWeight: 700, color: '#fff',
                          textDecoration: 'none', letterSpacing: '0.01em',
                        }}
                      >
                        <Github size={11} /> View on GitHub
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

      </div>{/* end puzzleRef */}

      {/* Hint */}
      <p style={{
        textAlign: 'center', marginTop: 36, fontSize: 12, color: subCol,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        Scroll to assemble · Hover each piece to explore
      </p>

      {/* ── GitHub Repository Feed ──────────────────────────────────────────── */}
      <div
        id="github-feed"
        style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 1200, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}
      >
        {/* ── Part 1: Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}
          >
            <div style={{
              width: 5, height: 5, borderRadius: '50%', background: '#10b981',
              animation: 'ghDotPulse 1.5s ease-in-out infinite',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: subCol,
            }}>
              Live from GitHub
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, margin: '0 0 10px',
              color: headCol, letterSpacing: '-0.03em',
            }}
          >
            All{' '}<span className="shimmer-text">Deployments</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={{ fontSize: 13, color: subCol, margin: 0 }}
          >
            Every repo. Auto-updating. No redeploy needed.
          </motion.p>
        </div>

        {/* ── Part 2: Stats bar ── */}
        {!loading && !error && (
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: 40,
          }}>
            {[
              { value: repos.length, label: 'Repositories', isNum: true },
              { value: uniqueLangs,  label: 'Languages',    isNum: true },
              { value: totalStars,   label: 'Total Stars',  isNum: true },
              { value: topLang,      label: 'Top Language', isNum: false },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: 'rgba(255,153,0,0.06)',
                  border: '1px solid rgba(255,153,0,0.15)',
                  borderRadius: 12,
                  padding: '16px 24px',
                  textAlign: 'center',
                  minWidth: 110,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700, color: '#ff9900', lineHeight: 1 }}>
                  {stat.isNum ? <CountUp target={stat.value} /> : stat.value}
                </div>
                <div style={{
                  fontSize: 10, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: subCol, marginTop: 5,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Part 3: Filter + Search bar ── */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: 32,
        }}>
          <input
            type="text"
            placeholder="Search repos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${searchFocused ? 'rgba(255,153,0,0.5)' : 'rgba(255,153,0,0.2)'}`,
              borderRadius: 8,
              padding: '8px 14px',
              fontSize: 12,
              color: headCol,
              fontFamily: 'monospace',
              outline: 'none',
              width: 200,
              transition: 'border-color 0.2s',
            }}
          />
          {FEED_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '5px 14px',
                borderRadius: 20,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.18s',
                background: activeFilter === f ? 'rgba(255,153,0,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeFilter === f ? 'rgba(255,153,0,0.4)' : 'rgba(255,255,255,0.10)'}`,
                color: activeFilter === f ? '#ff9900' : subCol,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Part 4: Content area ── */}

        {/* Loading skeletons */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 12,
              padding: '28px 36px',
            }}>
              <div style={{ fontSize: 24, color: '#ef4444', marginBottom: 10 }}>✕</div>
              <p style={{ fontSize: 14, color: headCol, margin: '0 0 6px', fontWeight: 600 }}>
                Failed to reach GitHub API
              </p>
              <p style={{ fontSize: 12, color: subCol, margin: '0 0 18px' }}>{error}</p>
              <button
                onClick={() => setRetryCount(c => c + 1)}
                style={{
                  background: 'rgba(255,153,0,0.12)',
                  border: '1px solid rgba(255,153,0,0.3)',
                  borderRadius: 8,
                  padding: '7px 20px',
                  fontSize: 12,
                  color: '#ff9900',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Repo grid */}
        {!loading && !error && (() => {
          // Separate folder repos from regular repos (only when no active filter/search)
          const isFiltered = activeFilter !== 'All' || searchTerm.trim();
          const folderSlugSet = new Set(FOLDER_GROUPS.flatMap(g => [...g.slugs]));

          const regularRepos = isFiltered
            ? filteredRepos
            : filteredRepos.filter(r => !folderSlugSet.has(repoSlug(r)));

          const folderData = isFiltered
            ? []
            : FOLDER_GROUPS.map(group => ({
                ...group,
                repos: filteredRepos.filter(r => group.slugs.has(repoSlug(r))),
              })).filter(g => g.repos.length > 0);

          const visibleRegular = regularRepos.slice(0, visibleCount);

          if (filteredRepos.length === 0) {
            return (
              /* Empty state */
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontSize: 14, color: subCol, marginBottom: 16 }}>
                  <span className="cursor-blink" style={{ color: '#ff9900', marginRight: 6 }}>_</span>
                  No repos match this filter
                </p>
                <button
                  onClick={() => { setActiveFilter('All'); setSearchTerm(''); }}
                  style={{
                    background: 'rgba(255,153,0,0.10)',
                    border: '1px solid rgba(255,153,0,0.25)',
                    borderRadius: 8,
                    padding: '7px 18px',
                    fontSize: 12,
                    color: '#ff9900',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Clear filters
                </button>
              </div>
            );
          }

          return (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {/* Folder groups (shown when no active filter/search) */}
                {folderData.map((group, gi) => (
                  <FolderGroup
                    key={group.name}
                    name={group.name}
                    repos={group.repos}
                    connected={group.connected}
                    repoOrder={group.repoOrder}
                    stepLabels={group.stepLabels}
                    darkMode={darkMode}
                    headCol={headCol}
                    subCol={subCol}
                    startIndex={gi * 10}
                  />
                ))}

                {/* Regular repo cards */}
                {visibleRegular.map((repo, i) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    index={i}
                    darkMode={darkMode}
                    headCol={headCol}
                    subCol={subCol}
                  />
                ))}
              </div>

              {/* Load more */}
              {visibleCount < regularRepos.length && (
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <button
                    onClick={() => setVisibleCount(v => v + 9)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,153,0,0.3)',
                      borderRadius: 10,
                      padding: '10px 28px',
                      fontSize: 12,
                      color: '#ff9900',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,153,0,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    Load more deployments ({regularRepos.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          );
        })()}

        {/* Section footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, marginTop: 44, flexWrap: 'wrap',
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%', background: '#10b981',
            animation: 'ghDotPulse 1.5s ease-in-out infinite', flexShrink: 0,
          }} />
          <span style={{ fontSize: 10, color: subCol }}>
            Synced with GitHub · Updates on every page load
          </span>
          <a
            href="https://github.com/Deepak-Darshan"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 10, color: '#ff9900', textDecoration: 'none' }}
          >
            View full profile →
          </a>
        </div>
      </div>

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
