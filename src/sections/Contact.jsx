import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Zap } from 'lucide-react';

// ─── Geological layer: mantle topo contour lines ─────────────────────────────
// 4 tightly-packed wavy lines, same tile as Projects.jsx TOPO_MANTLE
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
            backgroundSize: '350px 45px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 42%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 42%, transparent 100%)',
          }} />

          {/* Overall warm tint — we're deep underground now */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(60,20,5,0.18) 0%, rgba(80,25,5,0.25) 100%)',
          }} />

          {/* CORE — radial glow emanating from center-bottom */}
          <div style={{
            position: 'absolute',
            bottom: '-15%', left: '50%',
            transform: 'translateX(-50%)',
            width: '130%', height: '70%',
            background: 'radial-gradient(ellipse at center bottom, rgba(255,90,0,0.18) 0%, rgba(255,130,0,0.10) 45%, transparent 70%)',
            filter: 'blur(32px)',
          }} />

          {/* ── CRYSTALLINE MINERAL ELEMENTS — upper mantle zone ─────────── */}

          {/* Crystal 1 — angular rhombus, left */}
          <svg width="18" height="26" viewBox="0 0 18 26" fill="none" style={{position:'absolute',top:'7%',left:'6%',opacity:0.15,animation:'rock-drift-3 44s ease-in-out 3s infinite',filter:'drop-shadow(0 0 3px rgba(255,100,0,0.13))',pointerEvents:'none'}}>
            <path d="M9 1L17 10L9 25L1 10Z" fill="rgba(170,100,40,0.28)" stroke="rgba(255,140,0,0.24)" strokeWidth="0.5"/>
            <line x1="9" y1="2" x2="9" y2="24" stroke="rgba(255,153,0,0.11)" strokeWidth="0.3"/>
            <line x1="3" y1="10" x2="15" y2="10" stroke="rgba(255,153,0,0.08)" strokeWidth="0.3"/>
          </svg>

          {/* Crystal 2 — hexagonal olivine, upper right — glowing */}
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" style={{position:'absolute',top:'12%',right:'9%',opacity:0.16,animation:'mineral-glow 6s ease-in-out 1s infinite, rock-drift-2 38s ease-in-out 5s infinite',pointerEvents:'none'}}>
            <path d="M11 1L21 6L21 14L11 19L1 14L1 6Z" fill="rgba(55,150,60,0.18)" stroke="rgba(100,200,80,0.24)" strokeWidth="0.5"/>
            <line x1="11" y1="1" x2="11" y2="19" stroke="rgba(100,200,80,0.11)" strokeWidth="0.3"/>
            <line x1="1" y1="10" x2="21" y2="10" stroke="rgba(100,200,80,0.09)" strokeWidth="0.3"/>
            <line x1="5" y1="3" x2="17" y2="17" stroke="rgba(100,200,80,0.06)" strokeWidth="0.3"/>
          </svg>

          {/* Crystal 3 — elongated shard, center — glowing */}
          <svg width="14" height="32" viewBox="0 0 14 32" fill="none" style={{position:'absolute',top:'18%',left:'38%',opacity:0.14,animation:'mineral-glow 8s ease-in-out 2s infinite, rock-drift-1 50s ease-in-out 10s infinite',filter:'drop-shadow(0 0 4px rgba(255,100,0,0.14))',pointerEvents:'none'}}>
            <path d="M7 1L13 11L11 24L7 31L3 24L1 11Z" fill="rgba(175,110,45,0.30)" stroke="rgba(255,153,0,0.26)" strokeWidth="0.5"/>
            <line x1="7" y1="3" x2="7" y2="29" stroke="rgba(255,153,0,0.12)" strokeWidth="0.35"/>
            <line x1="2" y1="15" x2="12" y2="15" stroke="rgba(255,153,0,0.09)" strokeWidth="0.3"/>
            <line x1="3" y1="8" x2="11" y2="23" stroke="rgba(255,120,0,0.07)" strokeWidth="0.3"/>
          </svg>

          {/* Crystal 4 — warm angular chunk, right mid — glowing */}
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none" style={{position:'absolute',top:'26%',right:'7%',opacity:0.17,animation:'rock-drift-3 46s ease-in-out 7s infinite',filter:'drop-shadow(0 0 4px rgba(255,100,0,0.16))',pointerEvents:'none'}}>
            <path d="M4 20L1 9L7 1L19 2L26 10L23 20L13 21Z" fill="rgba(180,100,40,0.32)" stroke="rgba(255,140,0,0.26)" strokeWidth="0.5"/>
            <line x1="5" y1="15" x2="18" y2="5" stroke="rgba(255,153,0,0.13)" strokeWidth="0.4"/>
            <line x1="11" y1="19" x2="24" y2="9" stroke="rgba(255,130,0,0.09)" strokeWidth="0.35"/>
            <line x1="3" y1="11" x2="20" y2="16" stroke="rgba(255,120,0,0.07)" strokeWidth="0.3"/>
          </svg>

          {/* Crystal 5 — small olivine, upper center */}
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" style={{position:'absolute',top:'8%',left:'52%',opacity:0.14,animation:'mineral-glow 7s ease-in-out 4s infinite, rock-drift-2 42s ease-in-out 14s infinite',pointerEvents:'none'}}>
            <path d="M3 12L1 6L5 1L11 2L15 7L12 13Z" fill="rgba(55,145,55,0.20)" stroke="rgba(80,200,80,0.22)" strokeWidth="0.5"/>
            <line x1="4" y1="10" x2="12" y2="3" stroke="rgba(100,200,80,0.11)" strokeWidth="0.3"/>
          </svg>

          {/* ── LAVA CRACKS — branching fissures, bottom half ────────────── */}
          <svg
            style={{position:'absolute',bottom:0,left:0,width:'100%',height:'55%',pointerEvents:'none'}}
            viewBox="0 0 1200 360" preserveAspectRatio="none" fill="none"
          >
            {/* Main fissure — rises from center bottom */}
            <path d="M600 360 Q588 320 594 280 Q608 240 582 200 Q565 175 572 140 Q580 110 560 80"
                  stroke="rgba(255,100,0,0.30)" strokeWidth="2.5" strokeLinecap="round"
                  style={{animation:'lava-pulse 4s ease-in-out infinite'}}/>
            {/* Branch 1 — right */}
            <path d="M594 280 Q632 265 668 248 Q704 236 734 210 Q758 196 782 170"
                  stroke="rgba(255,120,0,0.23)" strokeWidth="1.8" strokeLinecap="round"
                  style={{animation:'lava-pulse 5s ease-in-out 0.8s infinite'}}/>
            {/* Branch 2 — left */}
            <path d="M582 200 Q540 183 506 158 Q476 137 450 108 Q433 88 413 64"
                  stroke="rgba(255,128,0,0.21)" strokeWidth="1.5" strokeLinecap="round"
                  style={{animation:'lava-pulse 6s ease-in-out 1.2s infinite'}}/>
            {/* Branch 3 — far right extension */}
            <path d="M734 210 Q770 198 803 174 Q833 155 863 130"
                  stroke="rgba(255,140,0,0.17)" strokeWidth="1.2" strokeLinecap="round"
                  style={{animation:'lava-pulse 4.5s ease-in-out 2s infinite'}}/>
            {/* Branch 4 — secondary left */}
            <path d="M506 158 Q470 147 438 130 Q410 115 388 88"
                  stroke="rgba(255,118,0,0.16)" strokeWidth="1" strokeLinecap="round"
                  style={{animation:'lava-pulse 5.5s ease-in-out 1.5s infinite'}}/>
            {/* Branch 5 — far left thin */}
            <path d="M413 64 Q383 52 352 40 Q318 29 284 20"
                  stroke="rgba(255,108,0,0.13)" strokeWidth="0.8" strokeLinecap="round"
                  style={{animation:'lava-pulse 7s ease-in-out 3s infinite'}}/>
            {/* Branch 6 — upper right thin */}
            <path d="M863 130 Q902 114 942 94 Q982 78 1013 54"
                  stroke="rgba(255,120,0,0.13)" strokeWidth="0.8" strokeLinecap="round"
                  style={{animation:'lava-pulse 6.5s ease-in-out 2.5s infinite'}}/>
            {/* Hairline crack left */}
            <path d="M450 108 Q418 99 386 80 Q358 62 333 42"
                  stroke="rgba(255,100,0,0.11)" strokeWidth="0.6" strokeLinecap="round"
                  style={{animation:'lava-pulse 8s ease-in-out 4s infinite'}}/>
            {/* Hairline crack right */}
            <path d="M782 170 Q822 162 860 148 Q897 134 928 111"
                  stroke="rgba(255,110,0,0.11)" strokeWidth="0.6" strokeLinecap="round"
                  style={{animation:'lava-pulse 7.5s ease-in-out 3.5s infinite'}}/>
            {/* Base fissure — along bottom edge */}
            <path d="M340 360 Q470 346 600 360 Q730 346 860 360"
                  stroke="rgba(255,90,0,0.24)" strokeWidth="2.2" strokeLinecap="round"
                  style={{animation:'lava-pulse 3.5s ease-in-out 0.3s infinite'}}/>
            {/* Additional thin veins */}
            <path d="M560 80 Q530 60 500 42 Q468 26 440 12"
                  stroke="rgba(255,100,0,0.10)" strokeWidth="0.6" strokeLinecap="round"
                  style={{animation:'lava-pulse 9s ease-in-out 5s infinite'}}/>
            <path d="M572 140 Q540 130 508 112"
                  stroke="rgba(255,110,0,0.09)" strokeWidth="0.5" strokeLinecap="round"
                  style={{animation:'lava-pulse 6s ease-in-out 3.8s infinite'}}/>
            {/* Magma pool dots at major intersections */}
            <circle cx="594" cy="280" r="4" fill="rgba(255,150,0,0.38)" style={{animation:'lava-pulse 3s ease-in-out infinite',filter:'drop-shadow(0 0 7px rgba(255,100,0,0.52))'}}/>
            <circle cx="582" cy="200" r="3.5" fill="rgba(255,140,0,0.33)" style={{animation:'lava-pulse 4s ease-in-out 1s infinite',filter:'drop-shadow(0 0 6px rgba(255,90,0,0.44))'}}/>
            <circle cx="734" cy="210" r="3" fill="rgba(255,160,0,0.30)" style={{animation:'lava-pulse 3.5s ease-in-out 0.6s infinite',filter:'drop-shadow(0 0 5px rgba(255,100,0,0.42))'}}/>
            <circle cx="506" cy="158" r="2.5" fill="rgba(255,140,0,0.28)" style={{animation:'lava-pulse 5s ease-in-out 2s infinite',filter:'drop-shadow(0 0 4px rgba(255,80,0,0.37))'}}/>
            <circle cx="600" cy="357" r="5.5" fill="rgba(255,120,0,0.42)" style={{animation:'lava-pulse 2.5s ease-in-out 0.2s infinite',filter:'drop-shadow(0 0 9px rgba(255,100,0,0.58))'}}/>
          </svg>
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
