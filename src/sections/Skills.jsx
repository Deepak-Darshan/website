import { motion } from 'framer-motion';
import { Code2, Database, Server, Wrench } from 'lucide-react';

const skillData = {
  frontend: {
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Figma'],
    gradient: 'from-purple-500 to-pink-500',
    glow: 'hover:shadow-purple-500/20',
    badge: 'bg-purple-500/10 text-purple-400',
  },
  backend: {
    items: ['Python', 'Java', 'C'],
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'hover:shadow-blue-500/20',
    badge: 'bg-blue-500/10 text-blue-400',
  },
  database: {
    items: ['DynamoDB', 'PostgreSQL'],
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'hover:shadow-emerald-500/20',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  other: {
    items: ['Git', 'Docker', 'REST APIs', 'MIPS Assembly', 'AWS Lambda', 'AWS API Gateway', 'AWS CloudWatch'],
    gradient: 'from-orange-500 to-amber-500',
    glow: 'hover:shadow-orange-500/20',
    badge: 'bg-orange-500/10 text-orange-400',
  },
};

const categories = [
  { title: 'Frontend',      icon: Code2,   key: 'frontend' },
  { title: 'Backend',       icon: Server,  key: 'backend'  },
  { title: 'Database',      icon: Database, key: 'database' },
  { title: 'Tools & Cloud', icon: Wrench,  key: 'other'    },
];

export default function Skills({ darkMode }) {
  const card  = darkMode ? 'bg-slate-800/40' : 'bg-white/70';
  const border = darkMode ? 'border-slate-700/50' : 'border-slate-200';
  const chip  = darkMode ? 'bg-slate-700/70 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200';

  return (
    <section id="skills" className="relative py-24 px-6 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            What I Work With
          </span>
          <h3 className="text-4xl md:text-5xl font-black mt-3">
            Technical <span className="shimmer-text">Arsenal</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const data = skillData[cat.key];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                className={`group gradient-border ${card} backdrop-blur-lg rounded-2xl p-6 border ${border} hover:shadow-xl ${data.glow} transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>

                {/* Title + count */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold">{cat.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${data.badge}`}>
                    {data.items.length}
                  </span>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {data.items.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all hover:scale-105 ${chip}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
