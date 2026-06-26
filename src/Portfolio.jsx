import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Linkedin, Mail, MapPin, ExternalLink, ChevronDown,
  Download, ArrowUpRight, GitBranch, Award,
  X, Menu, Database, Cloud, Code2, Zap, Server, Layers
} from 'lucide-react';
import {
  SiNodedotjs, SiSpringboot, SiExpress, SiPostgresql,
  SiMongodb, SiDocker, SiReact, SiNextdotjs, SiTailwindcss,
  SiJavascript, SiTypescript, SiOpenjdk, SiPython, SiMysql,
  SiAmazonwebservices, SiGit, SiVercel, SiSequelize, SiSocketdotio
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import emailjs from 'emailjs-com';

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

const ORBIT_SKILLS = [
  // Ring 1 — backend (inner, 18s CW)
  { Icon: SiNodedotjs,   tip: 'Node.js',     ring: 1, color: '#68A063', bg: 'rgba(104,160,99,0.15)',  border: 'rgba(104,160,99,0.35)',  dur: '18s', start: '0deg'   },
  { Icon: SiSpringboot,  tip: 'Spring Boot', ring: 1, color: '#6DB33F', bg: 'rgba(109,179,63,0.15)',  border: 'rgba(109,179,63,0.35)',  dur: '18s', start: '90deg'  },
  { Icon: SiExpress,     tip: 'Express.js',  ring: 1, color: '#cccccc', bg: 'rgba(200,200,200,0.08)', border: 'rgba(200,200,200,0.25)', dur: '18s', start: '200deg' },
  { Icon: SiSequelize,   tip: 'Sequelize',   ring: 1, color: '#52B0E7', bg: 'rgba(82,176,231,0.15)',  border: 'rgba(82,176,231,0.35)',  dur: '18s', start: '300deg' },
  // Ring 2 — frontend (middle, 28s CCW)
  { Icon: SiReact,       tip: 'React',       ring: 2, color: '#61DAFB', bg: 'rgba(97,218,251,0.15)',  border: 'rgba(97,218,251,0.35)',  dur: '28s', start: '45deg'  },
  { Icon: SiNextdotjs,   tip: 'Next.js',     ring: 2, color: '#cccccc', bg: 'rgba(200,200,200,0.08)', border: 'rgba(200,200,200,0.25)', dur: '28s', start: '150deg' },
  { Icon: SiTailwindcss, tip: 'Tailwind',    ring: 2, color: '#06B6D4', bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.35)',   dur: '28s', start: '260deg' },
  // Ring 3 — infra / db (outer, 36s CW)
  { Icon: SiPostgresql,  tip: 'PostgreSQL',  ring: 3, color: '#4169E1', bg: 'rgba(65,105,225,0.15)',  border: 'rgba(65,105,225,0.35)',  dur: '36s', start: '0deg'  },
  { Icon: SiMongodb,     tip: 'MongoDB',     ring: 3, color: '#47A248', bg: 'rgba(71,162,72,0.15)',   border: 'rgba(71,162,72,0.35)',   dur: '36s', start: '90deg' },
  { Icon: SiAmazonwebservices, tip: 'AWS',   ring: 3, color: '#FF9900', bg: 'rgba(255,153,0,0.15)',   border: 'rgba(255,153,0,0.35)',   dur: '36s', start: '180deg' },
  { Icon: SiDocker,      tip: 'Docker',      ring: 3, color: '#2496ED', bg: 'rgba(36,150,237,0.15)',  border: 'rgba(36,150,237,0.35)',  dur: '36s', start: '270deg' },
];

/* Orbit container is 460px; center at 230px.
   Pill is positioned at (50%,50%) = (230,230) then translateX(r).
   Ring 1 r=95  → icon center at 325px  ✓
   Ring 2 r=148 → icon center at 378px  ✓
   Ring 3 r=200 → icon center at 430px  ✓ (container 460, icon 40px wide → 450 right edge, fits) */
const RING_RADII = { 1: 95, 2: 148, 3: 200 };

/* SVG ring radii for the visual orbit paths (viewBox 0 0 460 460, center 230,230) */
const SVG_RING_R = { 1: 95, 2: 148, 3: 200 };

// Flat skill list with real brand icons — no ratings
const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    color: 'text-violet-400',
    dot: 'bg-violet-500',
    skills: [
      { name: 'JavaScript', Icon: SiJavascript,  color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript,  color: '#3178C6' },
      { name: 'Java',       Icon: FaJava,        color: '#ED8B00' },
      { name: 'Python',     Icon: SiPython,      color: '#3776AB' },
    ],
  },
  {
    label: 'Backend',
    color: 'text-blue-400',
    dot: 'bg-blue-500',
    skills: [
      { name: 'Node.js',     Icon: SiNodedotjs,  color: '#68A063' },
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Express.js',  Icon: SiExpress,    color: '#EEEEEE' },
      { name: 'Sequelize',   Icon: SiSequelize,  color: '#52B0E7' },
      { name: 'Socket.IO',   Icon: SiSocketdotio,color: '#EEEEEE' },
    ],
  },
  {
    label: 'Frontend',
    color: 'text-cyan-400',
    dot: 'bg-cyan-500',
    skills: [
      { name: 'React',        Icon: SiReact,        color: '#61DAFB' },
      { name: 'Next.js',      Icon: SiNextdotjs,    color: '#EEEEEE' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss,  color: '#06B6D4' },
    ],
  },
  {
    label: 'Databases',
    color: 'text-emerald-400',
    dot: 'bg-emerald-500',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479A1' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
    ],
  },
  {
    label: 'Infra & Tools',
    color: 'text-orange-400',
    dot: 'bg-orange-500',
    skills: [
      { name: 'AWS',    Icon: SiAmazonwebservices, color: '#FF9900' },
      { name: 'Docker', Icon: SiDocker,            color: '#2496ED' },
      { name: 'Git',    Icon: SiGit,               color: '#F05032' },
      { name: 'Vercel', Icon: SiVercel,            color: '#EEEEEE' },
    ],
  },
];

const PROJECTS = [
  {
    num: '01',
    title: 'TrackFlow',
    tag: 'Project Management Platform',
    description: 'Multi-org Kanban platform with role-based access, real-time task-level chat via Socket.IO, and a full activity log tracking every workspace event. Secure onboarding powered by Clerk OAuth.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Socket.IO', 'Clerk', 'Tailwind'],
    // highlight: '2.8M',
    // highlightLabel: 'rows backfilled',
    github: 'https://github.com/balaji259/trackflow',
    // demo: '#',
    accent: 'from-violet-500/20 to-blue-500/10',
    dot: 'bg-violet-400',
  },
  {
    num: '02',
    title: 'ResumeHub',
    tag: 'AI-Powered Resume Analyzer',
    description: 'Three-module AI platform — ATS Checker, Job Matcher, Interview Prep — driven by the Google Gemini API. Structured JSON prompt engineering over parsed PDF & DOCX documents.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Gemini API'],
    // highlight: '3',
    // highlightLabel: 'AI modules',
    github: 'https://github.com/balaji259/ResumeAnalyzer_backend',
    // demo: '#',
    accent: 'from-blue-500/20 to-cyan-500/10',
    dot: 'bg-blue-400',
  },
  {
    num: '03',
    title: 'Friendsbook',
    tag: 'Social Platform',
    description: 'Full-stack social app with Google Sign-In, real-time messaging over Socket.IO, post creation, and follow/unfollow — onboarded 100+ users from day one.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    // highlight: '100+',
    // highlightLabel: 'users onboarded',
    github: 'https://github.com/balaji259/friendsbook',
    // demo: '#',
    accent: 'from-emerald-500/20 to-teal-500/10',
    dot: 'bg-emerald-400',
  },
  {
    num: '04',
    title: 'Shrtn',
    tag: 'URL Shortener',
    description: 'Spring Boot URL shortener with click analytics — per-link statistics, redirect performance tracking, and a clean React dashboard displaying usage metrics.',
    tech: ['Spring Boot', 'PostgreSQL', 'React', 'Java'],
    // highlight: 'O(1)',
    // highlightLabel: 'redirect lookup',
    github: 'https://github.com/balaji259/Shrtn-backend',
    // demo: '#',
    accent: 'from-orange-500/20 to-yellow-500/10',
    dot: 'bg-orange-400',
  },
];

const EXPERIENCE = [
  {
    company: 'BrightChamps',
    role: 'Technology Intern',
    period: 'Jan 2026 — Jul 2026',
    type: 'Current',
    stack: ['Node.js', 'Express', 'Sequelize', 'MySQL', 'PostgreSQL', 'AWS'],
    color: 'border-violet-500/40 bg-violet-500/5',
    dot: 'bg-violet-400',
    tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    highlights: [
      { stat: '2.8M', desc: 'database rows migrated via ULID backfill scripts' },
      { stat: '45+', desc: 'routes patched across two microservices to adopt the resolve-at-facade ULID pattern' },
      { stat: 'SQS', desc: 'async pipeline built for inactive-lead reallocation, decoupled into a dedicated Lambda handler with batch failure tracking' },
      { stat: '∞ 0', desc: 'DLQ messages — student booking metrics built end-to-end with SQS handler, migrations, service & facade layers' },
    ],
  },
  {
    company: 'Friendsbook',
    role: 'Full Stack Developer Intern',
    period: 'Oct 2024 — Mar 2025',
    type: 'Past',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    color: 'border-blue-500/40 bg-blue-500/5',
    dot: 'bg-blue-400',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    highlights: [
      { stat: '100+', desc: 'users onboarded on a full-stack social platform with Google Sign-In and follow/unfollow' },
      { stat: 'RT',   desc: 'real-time messaging built with Socket.IO + validated REST APIs with structured error handling' },
      { stat: 'E2E',  desc: 'responsive React interfaces integrating frontend and backend end-to-end' },
    ],
  },
];

const EDUCATION = [
  { school: 'RGUKT — RK Valley', degree: 'B.Tech, Computer Science', period: '2022 – 2026', grade: '9.0 / 10.0 CGPA', icon: '🎓' },
  { school: 'RGUKT — RK Valley', degree: 'Pre-University Course (PUC)', period: '2020 – 2022', grade: '9.8 / 10.0 CGPA', icon: '📘' },
  { school: 'Balavikas English Medium High School', degree: 'Secondary Education (SSC)', period: '2019 – 2020', grade: '10 / 10.0 CGPA', icon: '🏫' },
];

const CERTS = [
  { name: 'Spring Framework 6 & Spring Boot 3', issuer: 'Telusko EduTech · Udemy', icon: '☕' },
  { name: 'React', issuer: 'Infosys Springboard', icon: '⚛️' },
];

/* ═══════════════════════════════════════════════
   TYPED LOG ANIMATION
═══════════════════════════════════════════════ */

const LOG_LINES = [
  { t: 'cmd', text: 'node backfill-ulid.js --table=bookings --batch=1000' },
  { t: 'out', text: 'resolving uniqueId → facade layer …' },
  { t: 'ok',  text: '✓ 2,800,000 rows migrated · 0 errors' },
  { t: 'cmd', text: 'aws sqs receive-message --queue lead-reallocation' },
  { t: 'out', text: 'dispatching → Lambda handler · tracking failures …' },
  { t: 'ok',  text: '✓ queue drained · DLQ 0' },
  { t: 'cmd', text: 'git commit -m "fix: SequelizeUniqueConstraint on ULID sync"' },
  { t: 'out', text: 'reproduced → traced call chain → verified data …' },
  { t: 'ok',  text: '✓ production resolved · 45 routes patched' },
];

function useTypedLog(active) {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState('');
  const idxRef  = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    let t;
    const tick = () => {
      const cur  = LOG_LINES[idxRef.current % LOG_LINES.length];
      const full = cur.text;
      if (charRef.current <= full.length) {
        setCursor(full.slice(0, charRef.current));
        charRef.current += Math.ceil(Math.random() * 2) + 1;
        t = setTimeout(tick, cur.t === 'cmd' ? 26 : 12);
      } else {
        setCursor('');
        setLines(prev => {
          const next = [...prev, cur];
          return next.length > 7 ? next.slice(next.length - 7) : next;
        });
        idxRef.current  += 1;
        charRef.current  = 0;
        t = setTimeout(tick, cur.t === 'ok' ? 900 : 250);
      }
    };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [active]);

  return { lines, cursor };
}

/* ═══════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════ */

// Scroll-reveal wrapper
const Reveal = ({ children, delay = 0, className = '', from = 'bottom' }) => {
  const ref   = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const initial = from === 'left' ? 'opacity-0 -translate-x-6' : 'opacity-0 translate-y-5';
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${on ? 'opacity-100 translate-x-0 translate-y-0' : initial} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Section label
const Label = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="h-px w-7 bg-gradient-to-r from-violet-500 to-blue-500" />
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet-400">{children}</span>
  </div>
);

// Badge pill
const Badge = ({ children, className = '' }) => (
  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${className}`}>
    {children}
  </span>
);

/* ═══════════════════════════════════════════════
   ORBIT VISUAL (Hero right side)
═══════════════════════════════════════════════ */

const OrbitSystem = () => (
  /* 460×460 container; center at 230px */
  <div className="select-none relative" style={{ width: 460, height: 460 }} aria-hidden>

    {/* Ambient glow behind the whole system */}
    <div className="absolute inset-0 rounded-full"
      style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,111,255,0.08) 0%, transparent 70%)' }}
    />

    {/* Static SVG orbit path rings — exact radii matching icon positions */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Ring 1 — green (backend) */}
        <linearGradient id="rg1a" x1="135" y1="135" x2="325" y2="325" gradientUnits="userSpaceOnUse">
          <stop stopColor="#68A063" stopOpacity="0.5"/>
          <stop offset="1" stopColor="#52B0E7" stopOpacity="0.5"/>
        </linearGradient>
        {/* Ring 2 — cyan (frontend) */}
        <linearGradient id="rg2a" x1="82" y1="82" x2="378" y2="378" gradientUnits="userSpaceOnUse">
          <stop stopColor="#61DAFB" stopOpacity="0.45"/>
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0.45"/>
        </linearGradient>
        {/* Ring 3 — violet/orange (infra) */}
        <linearGradient id="rg3a" x1="30" y1="30" x2="430" y2="430" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C6FFF" stopOpacity="0.4"/>
          <stop offset="0.5" stopColor="#FF9900" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#2496ED" stopOpacity="0.4"/>
        </linearGradient>
        {/* Spinning arc for outer ring */}
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7C6FFF" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#7C6FFF" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Ring 1 path — r=95 */}
      <circle cx="230" cy="230" r="95"  stroke="url(#rg1a)" strokeWidth="1"   strokeDasharray="5 6"  />
      {/* Ring 2 path — r=148 */}
      <circle cx="230" cy="230" r="148" stroke="url(#rg2a)" strokeWidth="1"   strokeDasharray="5 8"  />
      {/* Ring 3 path — r=200 */}
      <circle cx="230" cy="230" r="200" stroke="url(#rg3a)" strokeWidth="1"   strokeDasharray="6 10" />

      {/* Spinning accent arc on ring 3 */}
      <circle
        cx="230" cy="230" r="200"
        stroke="url(#arcGrad)" strokeWidth="2.5"
        strokeDasharray="80 1178"
        strokeLinecap="round"
        style={{ transformOrigin: '230px 230px', animation: 'spin-slow 8s linear infinite' }}
      />
      {/* Spinning accent arc on ring 1 (reverse) */}
      <circle
        cx="230" cy="230" r="95"
        stroke="rgba(104,160,99,0.7)" strokeWidth="2"
        strokeDasharray="40 557"
        strokeLinecap="round"
        style={{ transformOrigin: '230px 230px', animation: 'spin-slow 6s linear infinite reverse' }}
      />
    </svg>

    {/* Center node */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute w-28 h-28 rounded-full border border-violet-500/20 animate-pulse" />
        <div className="absolute w-20 h-20 rounded-full border border-violet-500/30" style={{ animation: 'pulseRing 3s ease-in-out infinite' }} />
        {/* Core */}
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] to-[#0c4a6e] border border-violet-500/50"
          style={{
            boxShadow: '0 0 30px rgba(124,111,255,0.3), 0 0 60px rgba(124,111,255,0.1), inset 0 0 20px rgba(124,111,255,0.1)',
          }}
        >
          <span className="text-4xl transform -translate-y-0.5" role="img" aria-label="developer">👨‍💻</span>
        </div>
      </div>
    </div>

    {/* Orbiting icon nodes */}
    {ORBIT_SKILLS.map((skill, i) => {
      const r   = RING_RADII[skill.ring];
      const rev = skill.ring === 2;
      const { Icon } = skill;
      return (
        <div
          key={`${skill.tip}-${i}`}
          className={`orbit-pill ${rev ? 'orbit-pill-rev' : ''}`}
          style={{
            '--start': skill.start,
            '--r':     `${r}px`,
            '--dur':   skill.dur,
            '--delay': `${i * -1.8}s`,
          }}
          title={skill.tip}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border backdrop-blur-md"
            style={{
              background: skill.bg,
              borderColor: skill.border,
              boxShadow: `0 0 16px ${skill.bg.replace('0.15', '0.5')}, 0 2px 8px rgba(0,0,0,0.4)`,
            }}
          >
            <Icon style={{ color: skill.color, fontSize: '20px' }} />
          </div>
        </div>
      );
    })}
  </div>
);

/* ═══════════════════════════════════════════════
   TERMINAL (About section)
═══════════════════════════════════════════════ */

const Terminal = ({ active }) => {
  const { lines, cursor } = useTypedLog(active);
  return (
    <div className="rounded-xl overflow-hidden border border-white/6 shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/4 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <span className="ml-3 font-mono text-[10px] text-slate-500 tracking-wide">production.log</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] text-emerald-400">live</span>
        </span>
      </div>
      {/* Body */}
      <div className="p-4 h-60 font-mono text-[11px] flex flex-col justify-end gap-1.5 bg-[#080C14] overflow-hidden">
        {lines.map((line, i) => {
          const col = line.t === 'cmd' ? 'text-slate-100' : line.t === 'ok' ? 'text-emerald-400' : 'text-slate-500';
          const pre = line.t === 'cmd' ? '❯' : line.t === 'ok' ? '✓' : ' ';
          return (
            <div key={i} className={`flex gap-2 ${col} leading-relaxed`}>
              <span className="opacity-50 w-3 shrink-0 select-none">{pre}</span>
              <span className="break-all whitespace-pre-wrap">{line.text}</span>
            </div>
          );
        })}
        {cursor !== '' && (
          <div className="flex gap-2 text-slate-100 leading-relaxed">
            <span className="opacity-50 w-3 shrink-0 select-none">❯</span>
            <span>
              {cursor}
              <span className="inline-block w-[6px] h-[13px] bg-violet-400 ml-0.5 -mb-0.5 animate-blink" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   SKILL ICON TILE
═══════════════════════════════════════════════ */

const SkillTile = ({ name, Icon, color }) => (
  <div className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/15 hover:bg-white/6 hover:-translate-y-1 transition-all duration-250 cursor-default">
    <Icon style={{ color, fontSize: '28px' }} className="transition-transform duration-300 group-hover:scale-110" />
    <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors duration-200 text-center leading-tight">{name}</span>
  </div>
);

const SkillCategoryCard = ({ cat }) => (
  <div className="glass-card rounded-2xl p-5 hover:border-white/12 transition-all duration-300 h-full">
    <div className="flex items-center gap-2 mb-4">
      <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
      <h3 className={`font-mono text-[11px] uppercase tracking-[0.18em] ${cat.color}`}>{cat.label}</h3>
    </div>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-2">
      {cat.skills.map(s => (
        <SkillTile key={s.name} name={s.name} Icon={s.Icon} color={s.color} />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN PORTFOLIO
═══════════════════════════════════════════════ */

const Portfolio = () => {
  const [activeSection,  setActiveSection]  = useState('hero');
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  const [formStatus,     setFormStatus]     = useState('idle');
  const formRef = useRef(null);
  const termRef = useRef(null);

  const sectionIds = useMemo(
    () => ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const cur = sectionIds.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 160 && r.bottom >= 160;
      });
      if (cur) setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  useEffect(() => {
    if (!termRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setTerminalActive(e.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(termRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS Error: Environment variables are missing (.env). Cannot send email.');
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setFormStatus('sent');
        formRef.current?.reset();
        setTimeout(() => setFormStatus('idle'), 4000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      });
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 font-body overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise" aria-hidden />

      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-body    { font-family: 'Inter', sans-serif; }
        .font-mono    { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* ══════════ NAV ══════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className={`
            flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500
            ${scrolled
              ? 'glass-card shadow-xl shadow-black/40'
              : 'bg-transparent'}
          `}>
            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="font-display font-semibold text-sm flex items-center gap-2 group"
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300">
                BP
              </span>
              <span className="text-slate-300 group-hover:text-white transition-colors">balaji.dev</span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(id)}
                    className={`
                      relative px-4 py-1.5 font-mono text-[12px] rounded-lg transition-all duration-200
                      ${isActive
                        ? 'text-violet-300 bg-violet-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
                    `}
                  >
                    {item}
                  </button>
                );
              })}
              <a
                href="/BALAJI_PUNETI_RESUME.pdf"
                download
                className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-mono text-[12px] font-semibold hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5"
              >
                <Download size={12} /> Resume
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-slate-300 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden mt-2 glass-card rounded-2xl px-5 py-4 flex flex-col gap-1 animate-scale-in shadow-xl shadow-black/50">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left py-2.5 px-3 font-mono text-sm text-slate-400 hover:text-violet-300 hover:bg-violet-500/8 rounded-lg transition-all duration-200"
                >
                  {item}
                </button>
              ))}
              <a
                href="/BALAJI_PUNETI_RESUME.pdf"
                download
                className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-mono text-sm font-semibold"
              >
                <Download size={14} /> Resume
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 section-grid opacity-100 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_100%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070B12] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-20 items-center">

            {/* Left column */}
            <div>
              {/* Status badge */}
              <div
                className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-8"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Available for <span className="text-emerald-400">SDE roles</span> · Backend / Full-Stack
                </span>
              </div>

              {/* Heading */}
              <h1
                className="animate-fade-up font-display font-bold leading-[1.05] tracking-tight mb-5"
                style={{ animationDelay: '0.18s', fontSize: 'clamp(2.6rem, 5.5vw, 4rem)' }}
              >
                <span className="shimmer-text">Balaji Puneti</span>
              </h1>

              {/* Subtitle */}
              <p
                className="animate-fade-up font-mono text-base sm:text-lg mb-6"
                style={{ animationDelay: '0.26s' }}
              >
                <span className="grad-text font-semibold">Software Developer</span>
                {/* <span className="text-slate-600 mx-3">·</span>
                <span className="text-slate-400">Full-Stack · Backend Engineer</span> */}
              </p>

              {/* Bio */}
              <p
                className="animate-fade-up text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mb-9"
                style={{ animationDelay: '0.34s' }}
              >
                I love building things that actually work in production — from scalable REST APIs
                and async pipelines to full-stack apps people use every day.
                Currently at BrightChamps, turning complex requirements into clean, reliable code.
              </p>

              {/* CTAs */}
              <div
                className="animate-fade-up flex flex-wrap gap-3 mb-10"
                style={{ animationDelay: '0.42s' }}
              >
                <button
                  onClick={() => scrollTo('projects')}
                  className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Projects
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-6 py-3.5 rounded-xl glass-card text-slate-300 font-semibold text-sm hover:border-violet-500/30 hover:text-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get In Touch
                </button>
              </div>

              {/* Social links */}
              <div
                className="animate-fade-up flex items-center gap-5"
                style={{ animationDelay: '0.5s' }}
              >
                {[
                  { href: 'https://github.com/balaji259', icon: Github, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/balaji-puneti', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:balajipuneti259@gmail.com', icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-violet-400 transition-colors duration-200"
                  >
                    <Icon size={14} /> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right column — orbit */}
            <div
              className="animate-fade-in hidden lg:flex items-center justify-center"
              style={{ animationDelay: '0.3s' }}
            >
              <OrbitSystem />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 hover:text-violet-400 transition-colors duration-300 animate-bounce"
        >
          <ChevronDown size={20} />
        </button>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="py-24 sm:py-32 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: text */}
            <Reveal from="left">
              <Label>About</Label>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
                Code is how I<br /><span className="grad-text">think out loud.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-5">
                I'm a software developer who genuinely enjoys the craft — the problem-solving,
                the architecture decisions, the satisfaction of a clean commit that closes a bug
                nobody could reproduce for a week.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-5">
                I work across the full stack, but my strongest ground is the backend — building
                APIs that hold up under pressure, async pipelines that process at scale, and
                systems that behave predictably even when things go wrong.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Outside of work I'm curious about distributed systems, pick up new frameworks
                when they solve something real, and believe good software is mostly about
                thinking clearly before typing.
              </p>

              {/* Stats row — no CGPA, focus on impact */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: '2.8M', label: 'Rows migrated',    color: 'text-violet-400' },
                  { val: '45+',  label: 'Routes patched',   color: 'text-blue-400'   },
                  { val: '100+', label: 'Users shipped',    color: 'text-emerald-400'},
                ].map(s => (
                  <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                    <div className={`font-display font-bold text-2xl mb-1 ${s.color}`}>{s.val}</div>
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: terminal */}
            <Reveal delay={150}>
              <div ref={termRef}>
                <Terminal active={terminalActive} />
              </div>

              {/* Quick trait cards */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: Zap,       label: 'Production-first', sub: 'Ships to live systems' },
                  { icon: GitBranch, label: 'Methodical debug',  sub: 'Trace → verify → fix' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="glass-card rounded-xl p-4 flex items-start gap-3 hover-lift hover:border-violet-500/20 transition-all duration-300">
                    <span className="p-2 rounded-lg bg-violet-500/10 mt-0.5">
                      <Icon size={14} className="text-violet-400" />
                    </span>
                    <div>
                      <div className="font-display font-semibold text-sm text-slate-200">{label}</div>
                      <div className="font-mono text-[10px] text-slate-500 mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ SKILLS ══════════ */}
      <section id="skills" className="py-24 sm:py-32 border-t border-white/4 bg-[#0A0E18]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <Label>Stack</Label>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              What I work with
            </h2>
            <p className="text-slate-500 text-base mb-14 max-w-xl">
              The tools I reach for to build things.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SKILL_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 80}>
                <SkillCategoryCard cat={cat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROJECTS ══════════ */}
      <section id="projects" className="py-24 sm:py-32 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <Label>Selected work</Label>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Things I've shipped
            </h2>
            <p className="text-slate-500 text-base mb-14 max-w-xl">
              A mix of backend-heavy platforms and full-stack products — each solving a real workflow problem.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className={`
                  group relative h-full glass-card rounded-2xl p-7 overflow-hidden
                  hover-lift hover:border-white/12 transition-all duration-300
                `}>
                  {/* Accent gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-[11px] text-slate-600">{p.num}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">{p.tag}</span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-slate-100">{p.title}</h3>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className="font-display font-bold text-2xl grad-text">{p.highlight}</div>
                        <div className="font-mono text-[9px] text-slate-600 uppercase tracking-wide">{p.highlightLabel}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{p.description}</p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tech.map(t => (
                        <Badge key={t} className="bg-white/4 text-slate-500 border-white/8">{t}</Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-5 pt-4 border-t border-white/5">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-violet-400 transition-colors duration-200"
                      >
                        <Github size={13} /> Code
                      </a>
                      {/* <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200"
                      >
                        <ExternalLink size={13} /> Live demo
                      </a> */}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section id="experience" className="py-24 sm:py-32 border-t border-white/4 bg-[#0A0E18]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <Label>Track record</Label>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-14">
              Where I've worked
            </h2>
          </Reveal>

          <div className="relative">
            <div className="timeline-line hidden sm:block" />
            <div className="space-y-8">
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 120}>
                  <div className="sm:pl-14 relative">
                    {/* Timeline dot */}
                    <span className={`hidden sm:flex absolute left-0 top-5 w-[15px] h-[15px] rounded-full border-2 border-violet-500/60 items-center justify-center`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${exp.dot}`} />
                    </span>

                    <div className={`glass-card rounded-2xl p-7 border-l-2 ${exp.color} hover:border-opacity-70 transition-all duration-300`}>
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="font-display font-bold text-lg text-slate-100">{exp.role}</h3>
                            <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] border ${exp.tagColor}`}>{exp.type}</span>
                          </div>
                          <p className="text-violet-400 font-semibold text-sm">{exp.company}</p>
                        </div>
                        <div className="shrink-0">
                          <span className="font-mono text-xs text-slate-500 bg-white/4 px-3 py-1.5 rounded-lg border border-white/6">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      {/* Stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {exp.stack.map(s => (
                          <Badge key={s} className="bg-white/4 text-slate-500 border-white/8">{s}</Badge>
                        ))}
                      </div>

                      {/* Highlights grid */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {exp.highlights.map((h, j) => (
                          <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                            <span className="font-display font-bold text-base text-violet-400 shrink-0 min-w-[2.5rem]">{h.stat}</span>
                            <span className="text-slate-400 text-xs leading-relaxed">{h.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ EDUCATION ══════════ */}
      <section id="education" className="py-24 sm:py-32 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <Label>Foundation</Label>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-14">
              Education & certifications
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
            {/* Education cards */}
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <Reveal key={edu.degree} delay={i * 80}>
                  <div className="glass-card rounded-2xl p-6 hover-lift hover:border-violet-500/20 transition-all duration-300 flex items-center gap-5">
                    <span className="text-2xl shrink-0">{edu.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-slate-100 text-sm mb-0.5">{edu.degree}</h3>
                      <p className="text-slate-500 text-xs truncate">{edu.school}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display font-bold text-sm text-violet-400">{edu.grade}</p>
                      <p className="font-mono text-[10px] text-slate-600 mt-0.5">{edu.period}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Certifications */}
            <Reveal delay={200}>
              <div className="glass-card rounded-2xl p-6 border-blue-500/15">
                <div className="flex items-center gap-2 mb-5">
                  <Award size={14} className="text-blue-400" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {CERTS.map(c => (
                    <div key={c.name} className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-blue-500/20 transition-colors duration-200">
                      <span className="text-xl shrink-0">{c.icon}</span>
                      <div>
                        <p className="font-display font-semibold text-sm text-slate-200 mb-1">{c.name}</p>
                        <p className="font-mono text-[10px] text-slate-500">{c.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="py-24 sm:py-32 border-t border-white/4 bg-[#0A0E18]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <Reveal from="left">
              <Label>Contact</Label>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight">
                Let's build something<br />
                <span className="grad-text">that works under load.</span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
                Looking for backend or full-stack SDE roles — happy to talk about systems,
                code architecture, or just say hi.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href="mailto:balajipuneti259@gmail.com"
                  className="group flex items-center gap-4 text-slate-400 hover:text-violet-300 transition-colors duration-200"
                >
                  <span className="p-3 rounded-xl glass-card group-hover:border-violet-500/25 transition-colors duration-200">
                    <Mail size={16} />
                  </span>
                  <span className="font-mono text-sm">balajipuneti259@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="p-3 rounded-xl glass-card">
                    <MapPin size={16} />
                  </span>
                  <span className="font-mono text-sm">Bengaluru, India</span>
                </div>
              </div>

              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/balaji259', icon: Github },
                  { href: 'https://www.linkedin.com/in/balaji-puneti', icon: Linkedin },
                ].map(({ href, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl glass-card text-slate-400 hover:text-violet-300 hover:border-violet-500/25 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={140}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-7 sm:p-8 space-y-5"
              >
                {[
                  { label: 'Name',    name: 'from_name',  type: 'text',  placeholder: 'Your name'        },
                  { label: 'Email',   name: 'from_email', type: 'email', placeholder: 'you@example.com'  },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/7 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 focus:bg-violet-500/5 outline-none transition-all duration-200 text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="What are you building?"
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/7 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 focus:bg-violet-500/5 outline-none transition-all duration-200 resize-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
                >
                  {formStatus === 'sending' ? 'Sending…'
                    : formStatus === 'sent'    ? '✓ Message sent!'
                    : formStatus === 'error'   ? '✗ Try again'
                    : 'Send Message'}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-8 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-mono text-xs text-slate-600">© 2026 Balaji Puneti — built with React & Tailwind</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-600">Available for hire</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;