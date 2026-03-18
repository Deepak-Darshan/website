import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Zap } from 'lucide-react';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'deepakdarshanj@yahoo.com',
    href: 'mailto:deepakdarshanj@yahoo.com',
    gradient: 'from-[#ff9900] to-[#ea580c]',
    glow: 'hover:shadow-orange-500/25',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Deepak-Darshan',
    href: 'https://github.com/Deepak-Darshan',
    gradient: 'from-slate-600 to-slate-800',
    glow: 'hover:shadow-slate-500/25',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'deepak-darshan-jagadish',
    href: 'https://www.linkedin.com/in/deepak-darshan-jagadish-267b5b213',
    gradient: 'from-blue-500 to-blue-700',
    glow: 'hover:shadow-blue-500/25',
  },
];

export default function Contact({ darkMode }) {
  const card    = darkMode ? 'bg-slate-800/40' : 'bg-white/70';
  const border  = darkMode ? 'border-slate-700/50' : 'border-slate-200';
  const sub     = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <section id="contact" className="relative py-24 px-6 w-full">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            Get In Touch
          </span>
          <h3 className="text-4xl md:text-5xl font-black mt-3">
            Let's Build <span className="shimmer-text">Something Amazing</span>
          </h3>
          <p className={`text-base md:text-lg mt-4 ${sub} max-w-xl mx-auto`}>
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
              className={`group gradient-border ${card} backdrop-blur-lg rounded-2xl p-6 border ${border} hover:shadow-xl ${c.glow} transition-all duration-300 flex flex-col items-center text-center`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest mb-1 ${sub}`}>{c.label}</span>
              <span className="font-semibold text-sm break-all">{c.value}</span>
              <ArrowUpRight className={`w-4 h-4 mt-3 ${sub} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`} />
            </motion.a>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-8 md:p-10 text-center border ${
            darkMode
              ? 'bg-gradient-to-br from-[#ff9900]/8 via-[#60a0ff]/5 to-[#a78bfa]/8 border-[#ff9900]/20'
              : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-200'
          }`}
        >
          <Zap className="w-8 h-8 mx-auto mb-4" style={{ color: '#ff9900' }} />
          <h4 className="text-2xl font-bold mb-2">Ready to collaborate?</h4>
          <p className={`${sub} mb-7 max-w-sm mx-auto`}>
            Drop me an email and let's make something great together.
          </p>
          <a
            href="mailto:deepakdarshanj@yahoo.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ background: 'linear-gradient(to right, #ff9900, #60a0ff)', color: '#fff' }}
          >
            <Mail className="w-4 h-4" />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
