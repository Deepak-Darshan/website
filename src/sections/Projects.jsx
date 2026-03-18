import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    tagline: 'Full-stack marketplace with payment integration',
    description:
      'Built a complete e-commerce solution with user authentication, product management, shopping cart, and Stripe payment integration. Features real-time inventory updates and order tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    features: [
      'User authentication with JWT',
      'Admin dashboard for product management',
      'Real-time cart synchronization',
      'Secure payment processing',
      'Responsive design',
    ],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
    color: 'from-purple-500 to-pink-500',
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/Deepak-Darshan',
  },
  {
    id: 2,
    title: 'AI Task Manager',
    tagline: 'Smart productivity app with ML recommendations',
    description:
      'Intelligent task management system that uses machine learning to predict task duration and suggest optimal scheduling. Built with Python backend and React frontend.',
    tech: ['Python', 'React', 'TensorFlow', 'PostgreSQL', 'Flask'],
    features: [
      'ML-powered task duration prediction',
      'Smart scheduling recommendations',
      'Collaborative task boards',
      'Data visualization dashboard',
      'RESTful API',
    ],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
    color: 'from-blue-500 to-cyan-500',
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/Deepak-Darshan',
  },
  {
    id: 3,
    title: 'Real-Time Chat App',
    tagline: 'WebSocket-based messaging platform',
    description:
      'Modern chat application with real-time messaging, file sharing, and video call capabilities. Supports group chats and end-to-end encryption.',
    tech: ['React', 'Node.js', 'Socket.io', 'WebRTC', 'Redis'],
    features: [
      'Real-time messaging with WebSockets',
      'Video call integration',
      'File sharing capabilities',
      'Group chat management',
      'Message encryption',
    ],
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop',
    color: 'from-emerald-500 to-teal-500',
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/Deepak-Darshan',
  },
];

// ─── Puzzle geometry ──────────────────────────────────────────────────────────
// Total puzzle: 900 × 420 px
//
// Piece 1 div  : left=0,   top=0,   w=460, h=420   (tab on right at y 75→135)
// Piece 2 div  : left=440, top=0,   w=460, h=230   (blank left y 75→135 ; tab bottom x 195→255 local)
// Piece 3 div  : left=440, top=210, w=460, h=210   (blank top  x 195→255 local)
//
// Each clipPath path is in the LOCAL coordinate system of its div (0,0 = top-left of div).
// Tab size: 20 px protrusion, 60 px wide.

const PW = 900;
const PH = 420;

// Piece 1: left block.  Tab protrudes RIGHT at x=440→460, y=75→135.
const CLIP1 = 'M 0,0 L 440,0 L 440,75 L 460,75 L 460,135 L 440,135 L 440,420 L 0,420 Z';

// Piece 2: top-right block.
//   Blank on left  (indent x=0→20,  y=75→135  → piece 1's tab sits here).
//   Tab on bottom  (protrudes y=210→230, x=195→255 local).
const CLIP2 =
  'M 0,0 L 460,0 L 460,210 L 255,210 L 255,230 L 195,230 L 195,210' +
  ' L 0,210 L 0,135 L 20,135 L 20,75 L 0,75 Z';

// Piece 3: bottom-right block.
//   Blank on top  (indent y=0→20, x=195→255 local → piece 2's tab sits here).
const CLIP3 = 'M 0,0 L 195,0 L 195,20 L 255,20 L 255,0 L 460,0 L 460,210 L 0,210 Z';

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects({ darkMode }) {
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [winW, setWinW] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Scroll progress: 0 when section bottom hits viewport bottom, 1 when section top hits viewport top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // ── Piece 1: leads, range 0 → 0.4 ──────────────────────────────────────────
  const p1x = useTransform(scrollYProgress, [0, 0.4],  [-350, 0]);
  const p1y = useTransform(scrollYProgress, [0, 0.4],  [-200, 0]);
  const p1r = useTransform(scrollYProgress, [0, 0.4],  [-20,  0]);
  const p1o = useTransform(scrollYProgress, [0, 0.15], [0,    1]);

  // ── Piece 2: slight delay, range 0.05 → 0.45 ───────────────────────────────
  const p2x = useTransform(scrollYProgress, [0.05, 0.45], [300,  0]);
  const p2y = useTransform(scrollYProgress, [0.05, 0.45], [-250, 0]);
  const p2r = useTransform(scrollYProgress, [0.05, 0.45], [15,   0]);
  const p2o = useTransform(scrollYProgress, [0.05, 0.22], [0,    1]);

  // ── Piece 3: most delay, range 0.1 → 0.5 ───────────────────────────────────
  const p3x = useTransform(scrollYProgress, [0.1, 0.5],  [-100, 0]);
  const p3y = useTransform(scrollYProgress, [0.1, 0.5],  [350,  0]);
  const p3r = useTransform(scrollYProgress, [0.1, 0.5],  [25,   0]);
  const p3o = useTransform(scrollYProgress, [0.1, 0.28], [0,    1]);

  // ── Responsive scale ────────────────────────────────────────────────────────
  const scale = Math.min(1, (winW - 32) / PW);

  // ── Theme tokens ────────────────────────────────────────────────────────────
  const cardBg    = darkMode ? 'rgba(15,23,42,0.75)'  : 'rgba(255,255,255,0.8)';
  const overlayBg = darkMode ? 'rgba(8,4,18,0.94)'    : 'rgba(255,255,255,0.96)';
  const headCol   = darkMode ? '#f8fafc' : '#0f172a';
  const subCol    = darkMode ? '#94a3b8' : '#64748b';
  const chipBg    = darkMode ? 'rgba(51,65,85,0.9)'   : '#f1f5f9';
  const chipCol   = darkMode ? '#cbd5e1' : '#475569';
  const btnSecBg  = darkMode ? '#334155' : '#f1f5f9';
  const btnSecCol = darkMode ? '#e2e8f0' : '#374151';
  const shadow    = darkMode
    ? '0 8px 32px rgba(124,58,237,0.25), 0 2px 8px rgba(0,0,0,0.5)'
    : '0 8px 32px rgba(124,58,237,0.12), 0 2px 8px rgba(0,0,0,0.08)';

  // ── Shared helpers ───────────────────────────────────────────────────────────
  const Chips = ({ tech }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
      {tech.slice(0, 3).map((t, i) => (
        <span
          key={i}
          style={{
            padding: '2px 9px', borderRadius: 999,
            fontSize: 10, fontWeight: 600,
            background: chipBg, color: chipCol,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );

  const Overlay = ({ project }) => (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: overlayBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column',
        padding: '18px 20px',
        overflowY: 'auto',
        zIndex: 20,
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 700, color: headCol, marginBottom: 6 }}>
        {project.title}
      </p>
      <p style={{ fontSize: 11, color: subCol, marginBottom: 10, lineHeight: 1.55 }}>
        {project.description}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px 0' }}>
        {project.features.map((f, i) => (
          <li
            key={i}
            style={{
              fontSize: 11, color: subCol,
              display: 'flex', alignItems: 'flex-start',
              gap: 6, marginBottom: 4,
            }}
          >
            <span style={{ color: '#a855f7', flexShrink: 0, marginTop: 1 }}>▸</span>
            {f}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 13px', borderRadius: 8,
            background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)',
            fontSize: 11, fontWeight: 700, color: '#fff',
            textDecoration: 'none',
          }}
        >
          <ExternalLink size={11} />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 13px', borderRadius: 8,
            background: btnSecBg, fontSize: 11, fontWeight: 700,
            color: btnSecCol, textDecoration: 'none',
          }}
        >
          <Github size={11} />
          Code
        </a>
      </div>
    </div>
  );

  // ── Piece wrapper style factory ──────────────────────────────────────────────
  const pieceBase = (left, top, width, height, clipId, x, y, rotate, opacity) => ({
    position: 'absolute',
    left, top, width, height,
    clipPath: `url(#${clipId})`,
    background: cardBg,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    overflow: 'hidden',
    cursor: 'pointer',
    filter: shadow ? `drop-shadow(${shadow.split(',')[0].replace('0 ','').trim()})` : undefined,
    x, y, rotate, opacity,
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        position: 'relative',
        paddingTop: 96,
        paddingBottom: 120,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ── Hidden SVG clip-path defs ─────────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <clipPath id="puzzleClip1"><path d={CLIP1} /></clipPath>
          <clipPath id="puzzleClip2"><path d={CLIP2} /></clipPath>
          <clipPath id="puzzleClip3"><path d={CLIP3} /></clipPath>
        </defs>
      </svg>

      {/* ── Section header ────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 72, paddingLeft: 24, paddingRight: 24 }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#a855f7',
        }}>
          What I've Built
        </span>
        <h3 style={{
          fontSize: 'clamp(30px,5vw,48px)',
          fontWeight: 900, margin: '12px 0 0',
          color: headCol,
        }}>
          Featured{' '}
          <span className="shimmer-text">Projects</span>
        </h3>
      </div>

      {/* ── Puzzle stage ─────────────────────────────────────────────────────── */}
      {/*  Outer box reserves the correct scaled height in document flow.        */}
      {/*  Inner 900×420 div is transformed (scaled) without affecting layout.   */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ width: PW * scale, height: PH * scale, position: 'relative', flexShrink: 0 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: PW, height: PH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}>

            {/* ════════════════════════════════════════════════════════
                PIECE 1  —  left block (0,0 → 460×420)
                Project: E-Commerce Platform
            ════════════════════════════════════════════════════════ */}
            <motion.div
              style={pieceBase(0, 0, 460, 420, 'puzzleClip1', p1x, p1y, p1r, p1o)}
              onMouseEnter={() => setHovered(1)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(124,58,237,0.18) 0%, rgba(0,0,0,0.65) 100%)',
                }} />
                {/* Accent top stripe */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(to right,#8b5cf6,#ec4899)',
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '18px 22px' }}>
                <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: headCol }}>
                  {projects[0].title}
                </h4>
                <p style={{ fontSize: 13, color: subCol, lineHeight: 1.5 }}>
                  {projects[0].tagline}
                </p>
                <Chips tech={projects[0].tech} />
                <p style={{ fontSize: 11, color: subCol, marginTop: 14, opacity: 0.6 }}>
                  Hover to explore →
                </p>
              </div>

              {hovered === 1 && <Overlay project={projects[0]} />}
            </motion.div>

            {/* ════════════════════════════════════════════════════════
                PIECE 2  —  top-right block (left=440,top=0 → 460×230)
                Project: AI Task Manager
            ════════════════════════════════════════════════════════ */}
            <motion.div
              style={pieceBase(440, 0, 460, 230, 'puzzleClip2', p2x, p2y, p2r, p2o)}
              onMouseEnter={() => setHovered(2)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 118, overflow: 'hidden' }}>
                <img
                  src={projects[1].image}
                  alt={projects[1].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(59,130,246,0.18) 0%, rgba(0,0,0,0.6) 100%)',
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(to right,#3b82f6,#06b6d4)',
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '14px 22px' }}>
                <h4 style={{ fontSize: 17, fontWeight: 800, marginBottom: 3, color: headCol }}>
                  {projects[1].title}
                </h4>
                <p style={{ fontSize: 12, color: subCol }}>
                  {projects[1].tagline}
                </p>
                <Chips tech={projects[1].tech} />
              </div>

              {hovered === 2 && <Overlay project={projects[1]} />}
            </motion.div>

            {/* ════════════════════════════════════════════════════════
                PIECE 3  —  bottom-right block (left=440,top=210 → 460×210)
                Project: Real-Time Chat App
            ════════════════════════════════════════════════════════ */}
            <motion.div
              style={pieceBase(440, 210, 460, 210, 'puzzleClip3', p3x, p3y, p3r, p3o)}
              onMouseEnter={() => setHovered(3)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 98, overflow: 'hidden' }}>
                <img
                  src={projects[2].image}
                  alt={projects[2].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(16,185,129,0.18) 0%, rgba(0,0,0,0.6) 100%)',
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(to right,#10b981,#14b8a6)',
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '10px 22px' }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 3, color: headCol }}>
                  {projects[2].title}
                </h4>
                <p style={{ fontSize: 12, color: subCol }}>{projects[2].tagline}</p>
                <Chips tech={projects[2].tech} />
              </div>

              {hovered === 3 && <Overlay project={projects[2]} />}
            </motion.div>

          </div>{/* /inner 900×420 */}
        </div>{/* /scaled outer box */}
      </div>{/* /flex centering */}

      {/* ── Hint ─────────────────────────────────────────────────────────────── */}
      <p style={{
        textAlign: 'center', marginTop: 36,
        fontSize: 12, color: subCol,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 8,
      }}>
        <span>Scroll to assemble the puzzle</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Hover each piece to explore</span>
      </p>
    </section>
  );
}
