import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer({ darkMode }) {
  const sub    = darkMode ? 'text-slate-500' : 'text-slate-400';
  const hover  = 'hover-accent transition-all duration-150 hover:scale-110';

  return (
    <footer
      className="w-full py-10"
      style={{
        borderTop: darkMode
          ? '1px solid rgba(255,255,255,0.055)'
          : '1px solid rgba(203,213,225,0.7)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <p className={`${sub} flex items-center gap-1.5 text-sm`}>
          Built with{' '}
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
          {' '}using React &amp; Tailwind CSS
        </p>

        <p className={`${sub} text-xs tracking-wide`}>
          © {new Date().getFullYear()} Deepak Darshan. All rights reserved.
        </p>

        <div className={`flex items-center gap-5 ${sub}`}>
          <a href="mailto:deepakdarshanj@yahoo.com" className={hover} aria-label="Email">
            <Mail className="w-[17px] h-[17px]" />
          </a>
          <a href="https://github.com/Deepak-Darshan" target="_blank" rel="noopener noreferrer" className={hover} aria-label="GitHub">
            <Github className="w-[17px] h-[17px]" />
          </a>
          <a href="https://www.linkedin.com/in/deepak-darshan-jagadish-267b5b213" target="_blank" rel="noopener noreferrer" className={hover} aria-label="LinkedIn">
            <Linkedin className="w-[17px] h-[17px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
