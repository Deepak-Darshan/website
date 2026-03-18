import { motion } from 'framer-motion';
import { Code2, Server, Wrench, Cloud } from 'lucide-react';

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

function SkillCard({ card, chipDark, chipLight, badgeDark, badgeLight, darkMode, delay }) {
  const cardBg   = darkMode ? 'bg-slate-800/40' : 'bg-white/70';
  const border   = darkMode ? 'border-slate-700/50' : 'border-slate-200';
  const chipStyle = darkMode
    ? { background: chipDark.bg, color: chipDark.color }
    : { background: chipLight.bg, color: chipLight.color };
  const badgeStyle = darkMode
    ? { background: badgeDark.bg, color: badgeDark.color }
    : { background: badgeLight.bg, color: badgeLight.color };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={`group gradient-border ${cardBg} backdrop-blur-lg rounded-2xl p-6 border ${border} hover:shadow-xl ${card.glow} transition-all duration-300`}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.iconGradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <card.icon className="w-5 h-5 text-white" />
      </div>

      {/* Title + count */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold">{card.title}</h4>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={badgeStyle}>
          {card.items.length}
        </span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {card.items.map((skill, i) => (
          <span
            key={i}
            className="px-2.5 py-1 text-xs rounded-full font-medium transition-all hover:scale-105"
            style={chipStyle}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ darkMode }) {

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
    <section id="skills" className="relative py-24 px-6 w-full">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#ff9900' }}>
            What I Work With
          </span>
          <h3 className="text-4xl md:text-5xl font-black mt-3">
            Technical <span className="shimmer-text">Arsenal</span>
          </h3>
        </div>

        {/* ── ZONE 1: GROUND LEVEL — FRONTEND ─────────────────── */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ background: darkMode ? 'rgba(167,139,250,0.2)' : '#e5e7eb' }} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
              style={{
                color: '#a78bfa',
                background: darkMode ? 'rgba(167,139,250,0.08)' : '#f5f3ff',
                border: darkMode ? '1px solid rgba(167,139,250,0.15)' : '1px solid #ddd6fe',
              }}
            >
              Ground Level — Frontend
            </span>
            <div className="h-px flex-1" style={{ background: darkMode ? 'rgba(167,139,250,0.2)' : '#e5e7eb' }} />
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
              />
            ))}
          </div>
        </div>

        {/* ── GLOWING HORIZON DIVIDER ──────────────────────────── */}
        <div className="relative my-10">
          <div className="h-px w-full" style={{
            background: darkMode
              ? 'linear-gradient(to right, transparent, rgba(255,153,0,0.4), rgba(96,160,255,0.3), rgba(255,153,0,0.4), transparent)'
              : 'linear-gradient(to right, transparent, rgba(255,153,0,0.3), rgba(96,160,255,0.2), rgba(255,153,0,0.3), transparent)',
          }} />
          <div className="absolute inset-0 h-px blur-sm" style={{
            background: darkMode
              ? 'linear-gradient(to right, transparent, rgba(255,153,0,0.3), rgba(96,160,255,0.2), rgba(255,153,0,0.3), transparent)'
              : 'none',
          }} />
        </div>

        {/* ── ZONE 2: CLOUD LAYER — BACKEND & INFRASTRUCTURE ───── */}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ background: darkMode ? 'rgba(255,153,0,0.2)' : '#e5e7eb' }} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
              style={{
                color: '#ff9900',
                background: darkMode ? 'rgba(255,153,0,0.08)' : '#fff7ed',
                border: darkMode ? '1px solid rgba(255,153,0,0.15)' : '1px solid #fed7aa',
              }}
            >
              Cloud Layer — Backend &amp; Infrastructure
            </span>
            <div className="h-px flex-1" style={{ background: darkMode ? 'rgba(255,153,0,0.2)' : '#e5e7eb' }} />
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
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
