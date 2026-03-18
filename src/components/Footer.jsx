import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer({ darkMode }) {
  const sub    = darkMode ? 'text-slate-500' : 'text-slate-400';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const hover  = 'hover-accent transition-colors';

  return (
    <footer className={`w-full py-8 border-t ${border}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className={`${sub} flex items-center gap-1`}>
          Built with{' '}
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400 mx-0.5" />
          {' '}using React &amp; Tailwind CSS
        </p>

        <p className={sub}>© {new Date().getFullYear()} Deepak Darshan. All rights reserved.</p>

        <div className={`flex items-center gap-4 ${sub}`}>
          <a href="mailto:deepakdarshanj@yahoo.com" className={hover} aria-label="Email">
            <Mail className="w-4 h-4" />
          </a>
          <a href="https://github.com/Deepak-Darshan" target="_blank" rel="noopener noreferrer" className={hover} aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/deepak-darshan-jagadish-267b5b213" target="_blank" rel="noopener noreferrer" className={hover} aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
