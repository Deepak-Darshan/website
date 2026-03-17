import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, RotateCcw } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    tagline: 'Full-stack marketplace with payment integration',
    description:
      'Built a complete e-commerce solution with user authentication, product management, shopping cart, and Stripe payment integration. Features real-time inventory updates and order tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    features: [
      'User authentication with JWT',
      'Admin dashboard for product management',
      'Real-time cart synchronization',
      'Secure payment processing',
      'Responsive design',
    ],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
    color: 'from-purple-500 to-pink-500',
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/Deepak-Darshan',
  },
  {
    id: 2,
    title: 'AI Task Manager',
    tagline: 'Smart productivity app with ML recommendations',
    description:
      'Intelligent task management system that uses machine learning to predict task duration and suggest optimal scheduling. Built with Python backend and React frontend.',
    tech: ['Python', 'React', 'TensorFlow', 'PostgreSQL', 'Flask'],
    features: [
      'ML-powered task duration prediction',
      'Smart scheduling recommendations',
      'Collaborative task boards',
      'Data visualization dashboard',
      'RESTful API',
    ],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
    color: 'from-blue-500 to-cyan-500',
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/Deepak-Darshan',
  },
  {
    id: 3,
    title: 'Real-Time Chat App',
    tagline: 'WebSocket-based messaging platform',
    description:
      'Modern chat application with real-time messaging, file sharing, and video call capabilities. Supports group chats and end-to-end encryption.',
    tech: ['React', 'Node.js', 'Socket.io', 'WebRTC', 'Redis'],
    features: [
      'Real-time messaging with WebSockets',
      'Video call integration',
      'File sharing capabilities',
      'Group chat management',
      'Message encryption',
    ],
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop',
    color: 'from-emerald-500 to-teal-500',
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/Deepak-Darshan',
  },
];

export default function Projects({ darkMode }) {
  const [flipped, setFlipped] = useState({});

  const toggle = (id) => setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  const card    = darkMode ? 'bg-slate-800/50' : 'bg-white/60';
  const border  = darkMode ? 'border-slate-700/60' : 'border-slate-200';
  const sub     = darkMode ? 'text-slate-400' : 'text-slate-500';
  const chipBg  = darkMode ? 'bg-slate-700/80 text-slate-300' : 'bg-slate-100 text-slate-600';

  return (
    <section id="projects" className="relative py-24 px-6 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            What I've Built
          </span>
          <h3 className="text-4xl md:text-5xl font-black mt-3">
            Featured <span className="shimmer-text">Projects</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
              className="relative h-[420px] cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={() => toggle(project.id)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped[project.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* ── Front ── */}
                <div
                  className={`absolute inset-0 ${card} backdrop-blur-lg rounded-2xl border ${border} overflow-hidden`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Image with gradient overlay */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30`} />
                    {/* Color accent bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color}`} />
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-bold mb-1">{project.title}</h4>
                    <p className={`text-sm mb-4 ${sub}`}>{project.tagline}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 text-xs rounded-full ${darkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-100 text-purple-700'}`}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${chipBg}`}>
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <div className={`flex items-center gap-1 mt-4 text-xs ${sub}`}>
                      <RotateCcw className="w-3 h-3" />
                      Click to flip
                    </div>
                  </div>
                </div>

                {/* ── Back ── */}
                <div
                  className={`absolute inset-0 ${card} backdrop-blur-lg rounded-2xl border ${border} p-5 overflow-y-auto`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {/* Accent top bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} rounded-t-2xl`} />

                  <h4 className="text-lg font-bold mb-2 mt-2">{project.title}</h4>
                  <p className={`text-sm mb-4 ${sub} leading-relaxed`}>{project.description}</p>

                  <div className="mb-4">
                    <h5 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${sub}`}>Key Features</h5>
                    <ul className="space-y-1.5">
                      {project.features.map((f, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${sub}`}>
                          <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${project.color} rounded-lg text-sm font-semibold text-white hover:shadow-lg transition-all hover:scale-105`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
