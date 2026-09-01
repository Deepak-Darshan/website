import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Zap } from 'lucide-react';

// ─── Geological layer: mantle topo contour lines ─────────────────────────────
const TOPO_MANTLE = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='350' height='36'>` +
    `<path stroke='rgba(255,153,0,0.04)' stroke-width='1' fill='none'` +
    ` d='M0,12 C88,4 175,20 263,12 C306,8 330,16 350,12'/>` +
    `<path stroke='rgba(255,153,0,0.033)' stroke-width='1' fill='none'` +
    ` d='M0,24 C88,16 175,32 263,24 C306,20 330,28 350,24'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'deepakdarshanj@yahoo.com',
    href: 'mailto:deepakdarshanj@yahoo.com',
    gradient: 'from-[#ff9900] to-[#ea580c]',
    glowColor: 'rgba(255,153,0,0.22)',
    iconGlow: '0 6px 12px rgba(255,153,0,0.3)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Deepak-Darshan',
    href: 'https://github.com/Deepak-Darshan',
    gradient: 'from-slate-600 to-slate-800',
    glowColor: 'rgba(148,163,184,0.16)',
    iconGlow: '0 6px 12px rgba(71,85,105,0.3)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'deepak-darshan-jagadish',
    href: 'https://www.linkedin.com/in/deepak-darshan-jagadish-267b5b213',
    gradient: 'from-blue-500 to-blue-700',
    glowColor: 'rgba(59,130,246,0.2)',
    iconGlow: '0 6px 12px rgba(59,130,246,0.3)',
  },
];

export default function Contact({ darkMode }) {
  const card   = darkMode ? 'bg-[rgba(255,255,255,0.025)]' : 'bg-white/88';
  const border = darkMode ? 'border-white/[0.065]' : 'border-slate-200/80';
  const sub    = darkMode ? 'text-slate-400' : 'text-slate-600';

  const cardNormalShadow = darkMode
    ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 16px rgba(0,0,0,0.3)'
    : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 20px rgba(0,0,0,0.06)';

  return (
    <section id="contact" className="relative py-28 px-6 w-full">
      {/* ── Geological background: Mantle → Core ──────────────────────────── */}
      {darkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* MANTLE — dense topo lines fading out toward the bottom */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: '30%', left: 0, right: 0,
            backgroundImage: TOPO_MANTLE,
            backgroundSize: '350px 36px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
          }} />

          {/* Overall warm tint — we're deep underground now */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(38,12,3,0.07) 0%, rgba(60,20,4,0.11) 100%)',
          }} />

          {/* CORE — radial glow emanating from center-bottom */}
          <div style={{
            position: 'absolute',
            bottom: '-15%', left: '50%',
            transform: 'translateX(-50%)',
            width: '130%', height: '70%',
            background: 'radial-gradient(ellipse at center bottom, rgba(255,90,0,0.08) 0%, rgba(255,130,0,0.04) 45%, transparent 70%)',
            filter: 'blur(48px)',
          }} />
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            Get In Touch
          </span>
          <h3 className="text-4xl md:text-5xl font-black mt-3">
            Let's Build <span className="shimmer-text">Something Amazing</span>
          </h3>
          <p className={`text-base md:text-lg mt-5 ${sub} max-w-xl mx-auto leading-relaxed`}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {contacts.map((c, idx) => (
            <motion.a
              key={idx}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              className={`group gradient-border ${card} backdrop-blur-xl rounded-2xl p-7 border ${border} transition-all duration-[220ms] flex flex-col items-center text-center hover:-translate-y-3`}
              style={{ boxShadow: cardNormalShadow }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? `inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.5), 0 24px 52px ${c.glowColor}`
                  : `inset 0 1px 0 rgba(255,255,255,0.95), 0 16px 40px ${c.glowColor}, 0 4px 12px rgba(0,0,0,0.06)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = cardNormalShadow;
              }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                style={{ boxShadow: c.iconGlow }}
              >
                <c.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] mb-1.5 ${sub}`}>{c.label}</span>
              <span className="font-semibold text-sm break-all">{c.value}</span>
              <ArrowUpRight
                className={`w-4 h-4 mt-3.5 ${sub} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150`}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA banner — premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden p-10 md:p-12 text-center ${
            darkMode
              ? ''
              : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border border-purple-200 rounded-3xl'
          }`}
          style={darkMode ? {
            background: 'linear-gradient(135deg, rgba(255,153,0,0.08), rgba(96,160,255,0.04), rgba(167,139,250,0.08))',
            border: '1px solid rgba(255,153,0,0.15)',
            borderRadius: 24,
            boxShadow: 'inset 0 1px 0 rgba(255,153,0,0.1), 0 4px 32px rgba(0,0,0,0.3)',
          } : {}}
        >
          {/* Ambient glow orb inside banner (dark only) */}
          {darkMode && (
            <div
              className="absolute pointer-events-none"
              style={{
                top: '-40%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 400,
                height: 200,
                background: 'radial-gradient(ellipse, rgba(255,153,0,0.08), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          )}

          <Zap
            className="w-8 h-8 mx-auto mb-5 relative z-10"
            style={{ color: '#ff9900', filter: darkMode ? 'drop-shadow(0 0 8px rgba(255,153,0,0.6))' : 'none' }}
          />
          <h4 className="text-2xl font-bold mb-2 relative z-10">Ready to collaborate?</h4>
          <p className={`${sub} mb-8 max-w-sm mx-auto relative z-10`}>
            Drop me an email and let's make something great together.
          </p>
          <a
            href="mailto:deepakdarshanj@yahoo.com"
            className="relative z-10"
            style={{
              background: 'linear-gradient(135deg, #ff9900, #60a0ff)',
              padding: '14px 36px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              color: 'white',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 24px rgba(255,153,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(255,153,0,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,153,0,0.3)';
            }}
          >
            <Mail className="w-4 h-4" />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
