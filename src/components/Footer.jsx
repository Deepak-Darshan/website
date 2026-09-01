import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer({ darkMode }) {
  const sub = darkMode ? 'text-slate-500' : 'text-slate-400';

  return (
    <footer
      className="w-full py-10 relative"
      style={{
        borderTop: '1px solid rgba(255,168,0,0.16)',
        boxShadow: '0 -1px 20px rgba(255,168,0,0.08)',
      }}
    >
      {/* ── Geological background: Core — hottest point ───────────────────── */}
      {darkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Core radial — warm glow rising from below */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 110% 220% at 50% 100%, rgba(238,152,0,0.22) 0%, rgba(215,100,0,0.12) 50%, transparent 70%)',
          }} />
          {/* Flat warm tint — footer is the warmest section */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(28,10,2,0.22)',
          }} />
          {/* Lava veins bleeding in from Contact above */}
          <svg
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}
            viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none"
          >
            {/* Left vein — continuation of Contact branch 4/5 */}
            <path d="M413 0 Q382 22 351 44 Q318 64 284 80"
                  stroke="rgba(255,168,0,0.20)" strokeWidth="0.8" strokeLinecap="round"
                  style={{animation:'lava-pulse 8s ease-in-out 4s infinite'}}/>
            {/* Center vein — continuation of main fissure */}
            <path d="M594 0 Q590 22 588 44 Q586 62 585 80"
                  stroke="rgba(255,182,0,0.24)" strokeWidth="1.1" strokeLinecap="round"
                  style={{animation:'lava-pulse 4.5s ease-in-out 1s infinite'}}/>
            {/* Right vein — continuation of Contact branch 1/3 */}
            <path d="M782 0 Q813 22 842 44 Q866 62 892 80"
                  stroke="rgba(255,160,0,0.18)" strokeWidth="0.7" strokeLinecap="round"
                  style={{animation:'lava-pulse 7s ease-in-out 3s infinite'}}/>
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5 relative">
        <p className={`${sub} flex items-center gap-1.5 text-sm`}>
          Built with{' '}
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
          {' '}using React &amp; Tailwind CSS
        </p>

        <p className={`${sub} text-xs tracking-wide`}>
          © {new Date().getFullYear()} Deepak Darshan. All rights reserved.
        </p>

        <div className={`flex items-center gap-5 ${sub}`}>
          <a
            href="mailto:deepakdarshanj@yahoo.com"
            className="hover-accent"
            aria-label="Email"
            style={{ transition: 'all 0.18s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(255,153,0,0.6))'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
          >
            <Mail className="w-[17px] h-[17px]" />
          </a>
          <a
            href="https://github.com/Deepak-Darshan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-accent"
            aria-label="GitHub"
            style={{ transition: 'all 0.18s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(255,153,0,0.6))'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
          >
            <Github className="w-[17px] h-[17px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/deepak-darshan-jagadish-267b5b213"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-accent"
            aria-label="LinkedIn"
            style={{ transition: 'all 0.18s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(255,153,0,0.6))'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
          >
            <Linkedin className="w-[17px] h-[17px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
