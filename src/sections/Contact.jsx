import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Zap } from 'lucide-react';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'deepakdarshanj@yahoo.com',
    href: 'mailto:deepakdarshanj@yahoo.com',
    gradient: 'from-[#ff9900] to-[#ea580c]',
    glowColor: 'rgba(255,153,0,0.22)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Deepak-Darshan',
    href: 'https://github.com/Deepak-Darshan',
    gradient: 'from-slate-600 to-slate-800',
    glowColor: 'rgba(148,163,184,0.16)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'deepak-darshan-jagadish',
    href: 'https://www.linkedin.com/in/deepak-darshan-jagadish-267b5b213',
    gradient: 'from-blue-500 to-blue-700',
    glowColor: 'rgba(59,130,246,0.2)',
  },
];

export default function Contact({ darkMode }) {
  const card   = darkMode ? 'bg-[rgba(255,255,255,0.025)]' : 'bg-white/88';
  const border = darkMode ? 'border-white/[0.065]' : 'border-slate-200/80';
  const sub    = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <section id="contact" className="relative py-28 px-6 w-full">
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
              style={darkMode ? {
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.2)',
              } : {
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? `inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 52px ${c.glowColor}, 0 8px 20px rgba(0,0,0,0.25)`
                  : `inset 0 1px 0 rgba(255,255,255,0.95), 0 16px 40px ${c.glowColor}, 0 4px 12px rgba(0,0,0,0.06)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = darkMode
                  ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.2)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                style={{ boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}
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
          className={`relative overflow-hidden rounded-3xl p-10 md:p-12 text-center border ${
            darkMode
              ? 'border-[#ff9900]/14'
              : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-200'
          }`}
          style={darkMode ? {
            background: 'linear-gradient(135deg, rgba(255,153,0,0.08) 0%, rgba(8,6,24,0.95) 40%, rgba(167,139,250,0.07) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,153,0,0.1), inset 0 -1px 0 rgba(167,139,250,0.08), 0 24px 64px rgba(255,153,0,0.07)',
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
            className="btn-say-hello relative z-10 inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-semibold"
            style={{ background: 'linear-gradient(135deg, #ff9900, #60a0ff)', color: '#fff' }}
          >
            <Mail className="w-4 h-4" />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
