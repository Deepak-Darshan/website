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
          {/* Fade-in from Projects — smooth warm transition at section top */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 128,
            background: 'linear-gradient(to bottom, rgba(40,15,5,0.25), transparent)',
            zIndex: 1,
          }} />

          {/* MANTLE — dense topo lines fading out toward the bottom */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: '30%', left: 0, right: 0,
            backgroundImage: TOPO_MANTLE,
            backgroundSize: '350px 45px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 42%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 42%, transparent 100%)',
          }} />

          {/* Overall warm tint — clearly noticeable warmth, we're deep underground */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(55,20,5,0.22) 0%, rgba(70,25,5,0.30) 100%)',
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

          {/* Crystal 1 — large amber shard, left — heat-glowing */}
          <svg width="34" height="48" viewBox="0 0 34 48" fill="none" style={{position:'absolute',top:'10%',left:'12%',opacity:0.46,animation:'mineral-glow 6s ease-in-out 1s infinite, rock-drift-3 44s ease-in-out 3s infinite',filter:'drop-shadow(0 0 5px rgba(255,100,0,0.22))',pointerEvents:'none'}}>
            <path d="M8 42L2 26L6 8L17 2L28 8L32 24L26 40L15 46Z" fill="rgba(140,70,18,0.72)"/>
            <path d="M17 2L28 8L32 24L20 14Z" fill="rgba(200,130,42,0.52)"/>
            <path d="M8 42L2 26L6 8L10 20Z" fill="rgba(68,34,8,0.68)"/>
            <line x1="8" y1="36" x2="28" y2="10" stroke="rgba(240,175,65,0.48)" strokeWidth="1.0"/>
            <line x1="10" y1="38" x2="30" y2="14" stroke="rgba(218,155,52,0.30)" strokeWidth="0.7"/>
            <line x1="12" y1="24" x2="6" y2="14" stroke="rgba(228,162,58,0.34)" strokeWidth="0.6"/>
            <line x1="18" y1="10" x2="26" y2="32" stroke="rgba(212,148,50,0.28)" strokeWidth="0.5"/>
            <circle cx="22" cy="12" r="1.4" fill="rgba(255,200,85,0.60)"/>
            <circle cx="12" cy="26" r="1.0" fill="rgba(242,180,68,0.48)"/>
            <circle cx="26" cy="30" r="0.7" fill="rgba(235,168,62,0.40)"/>
            <path d="M17 2L28 8L32 24" fill="none" stroke="rgba(235,178,72,0.40)" strokeWidth="0.9"/>
          </svg>

          {/* Crystal 2 — warm hexagonal olivine chunk, upper right */}
          <svg width="44" height="38" viewBox="0 0 44 38" fill="none" style={{position:'absolute',top:'22%',right:'15%',opacity:0.44,animation:'mineral-glow 7s ease-in-out 2s infinite, rock-drift-2 38s ease-in-out 5s infinite',filter:'drop-shadow(0 0 4px rgba(255,100,0,0.20))',pointerEvents:'none'}}>
            <path d="M8 32L2 18L8 4L22 2L36 6L42 20L36 34L20 38Z" fill="rgba(130,65,18,0.72)"/>
            <path d="M22 2L36 6L42 20L28 12Z" fill="rgba(192,118,38,0.52)"/>
            <path d="M8 32L2 18L8 4L12 18Z" fill="rgba(62,30,8,0.68)"/>
            <line x1="10" y1="28" x2="36" y2="8" stroke="rgba(235,168,58,0.46)" strokeWidth="1.0"/>
            <line x1="14" y1="34" x2="40" y2="14" stroke="rgba(215,148,48,0.30)" strokeWidth="0.7"/>
            <line x1="8" y1="20" x2="28" y2="24" stroke="rgba(225,158,54,0.32)" strokeWidth="0.6"/>
            <line x1="20" y1="6" x2="14" y2="28" stroke="rgba(218,152,50,0.26)" strokeWidth="0.5"/>
            <circle cx="30" cy="8" r="1.3" fill="rgba(252,198,82,0.58)"/>
            <circle cx="18" cy="20" r="1.0" fill="rgba(238,172,65,0.46)"/>
            <circle cx="36" cy="26" r="0.8" fill="rgba(228,162,60,0.38)"/>
            <path d="M22 2L36 6L42 20" fill="none" stroke="rgba(228,170,68,0.38)" strokeWidth="0.9"/>
          </svg>

          {/* Crystal 3 — elongated hot shard, left-center */}
          <svg width="24" height="50" viewBox="0 0 24 50" fill="none" style={{position:'absolute',top:'35%',left:'65%',opacity:0.42,animation:'mineral-glow 8s ease-in-out 3s infinite, rock-drift-1 50s ease-in-out 10s infinite',filter:'drop-shadow(0 0 5px rgba(255,110,0,0.22))',pointerEvents:'none'}}>
            <path d="M5 44L2 28L5 10L12 2L20 10L22 26L18 42L12 48Z" fill="rgba(148,72,16,0.72)"/>
            <path d="M12 2L20 10L22 26L14 16Z" fill="rgba(205,132,40,0.52)"/>
            <path d="M5 44L2 28L5 10L8 22Z" fill="rgba(70,35,8,0.68)"/>
            <line x1="6" y1="38" x2="20" y2="10" stroke="rgba(245,178,68,0.50)" strokeWidth="1.1"/>
            <line x1="4" y1="28" x2="18" y2="20" stroke="rgba(222,158,54,0.32)" strokeWidth="0.7"/>
            <line x1="8" y1="44" x2="20" y2="30" stroke="rgba(232,165,58,0.28)" strokeWidth="0.6"/>
            <line x1="14" y1="6" x2="10" y2="32" stroke="rgba(218,152,50,0.26)" strokeWidth="0.5"/>
            <circle cx="16" cy="8" r="1.3" fill="rgba(255,205,88,0.62)"/>
            <circle cx="8" cy="24" r="1.0" fill="rgba(242,182,70,0.50)"/>
            <path d="M12 2L20 10L22 26" fill="none" stroke="rgba(238,180,70,0.40)" strokeWidth="0.9"/>
          </svg>

          {/* Crystal 4 — broad angular chunk, right side */}
          <svg width="50" height="36" viewBox="0 0 50 36" fill="none" style={{position:'absolute',top:'48%',right:'35%',opacity:0.48,animation:'rock-drift-3 46s ease-in-out 7s infinite',filter:'drop-shadow(0 0 5px rgba(255,105,0,0.24))',pointerEvents:'none'}}>
            <path d="M6 30L2 16L8 4L22 2L38 6L48 18L42 32L24 34Z" fill="rgba(155,78,20,0.72)"/>
            <path d="M22 2L38 6L48 18L30 10Z" fill="rgba(210,132,42,0.52)"/>
            <path d="M6 30L2 16L8 4L12 18Z" fill="rgba(72,36,8,0.68)"/>
            <line x1="8" y1="26" x2="40" y2="6" stroke="rgba(248,180,68,0.50)" strokeWidth="1.1"/>
            <line x1="12" y1="30" x2="44" y2="12" stroke="rgba(225,158,54,0.32)" strokeWidth="0.7"/>
            <line x1="6" y1="18" x2="32" y2="22" stroke="rgba(235,165,58,0.34)" strokeWidth="0.6"/>
            <line x1="24" y1="4" x2="20" y2="28" stroke="rgba(222,155,52,0.28)" strokeWidth="0.6"/>
            <line x1="36" y1="8" x2="42" y2="26" stroke="rgba(215,150,50,0.24)" strokeWidth="0.5"/>
            <circle cx="34" cy="8" r="1.5" fill="rgba(255,205,88,0.62)"/>
            <circle cx="20" cy="18" r="1.1" fill="rgba(242,182,70,0.50)"/>
            <circle cx="40" cy="22" r="0.8" fill="rgba(232,168,62,0.40)"/>
            <path d="M22 2L38 6L48 18" fill="none" stroke="rgba(235,178,70,0.40)" strokeWidth="1.0"/>
          </svg>

          {/* Crystal 5 — small glowing amber nugget, upper center */}
          <svg width="28" height="30" viewBox="0 0 28 30" fill="none" style={{position:'absolute',top:'55%',left:'40%',opacity:0.44,animation:'mineral-glow 5s ease-in-out 4s infinite, rock-drift-2 42s ease-in-out 14s infinite',filter:'drop-shadow(0 0 4px rgba(255,115,0,0.22))',pointerEvents:'none'}}>
            <path d="M6 26L2 14L6 4L14 1L22 6L26 18L20 28Z" fill="rgba(145,72,18,0.72)"/>
            <path d="M14 1L22 6L26 18L16 10Z" fill="rgba(205,130,42,0.52)"/>
            <path d="M6 26L2 14L6 4L10 14Z" fill="rgba(68,34,8,0.68)"/>
            <line x1="6" y1="22" x2="24" y2="6" stroke="rgba(242,175,65,0.48)" strokeWidth="0.9"/>
            <line x1="10" y1="26" x2="26" y2="12" stroke="rgba(220,155,52,0.30)" strokeWidth="0.6"/>
            <line x1="8" y1="16" x2="20" y2="20" stroke="rgba(230,162,56,0.32)" strokeWidth="0.5"/>
            <circle cx="18" cy="8" r="1.2" fill="rgba(252,200,84,0.58)"/>
            <circle cx="10" cy="18" r="0.9" fill="rgba(238,175,66,0.46)"/>
            <path d="M14 1L22 6L26 18" fill="none" stroke="rgba(232,172,68,0.38)" strokeWidth="0.8"/>
          </svg>

          {/* ── LAVA CRACKS — branching fissures, bottom half ────────────── */}
          <svg
            style={{position:'absolute',bottom:0,left:0,width:'100%',height:'55%',pointerEvents:'none',WebkitMaskImage:'linear-gradient(to bottom, transparent 0%, black 40%)',maskImage:'linear-gradient(to bottom, transparent 0%, black 40%)'}}
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
