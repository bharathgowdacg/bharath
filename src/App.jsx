import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UpgradedContactForm from "./components/UpgradedContactForm";
import Hero3D from "./hero3D";
import ParticlesBackground from "./components/ParticlesBackground";
import SpaceVideoBackground from "./components/SpaceVideoBackground";



// -----------------------------
// Helper: projects data
// -----------------------------
const PROJECTS = [
  {
    id: 1,
    title: "Scalable SaaS Platform",
    subtitle: "Project Management Tool",
    desc: "Full-stack app for team collaboration, realtime sync, and task automation.",
    tags: ["React", "Node", "MongoDB"]
  },
  {
    id: 2,
    title: "Real-Time Analytics Tool",
    subtitle: "Data Visualization",
    desc: "Dashboard focusing on performance, streams & interactive charts.",
    tags: ["D3.js", "WebSockets", "Postgres"]
  },
  {
    id: 3,
    title: "E-commerce Microservices",
    subtitle: "High-performance Backend",
    desc: "Microservices and queueing for resilient order processing.",
    tags: ["Python", "Docker", "Redis"]
  }
];

// -----------------------------
// App
// -----------------------------
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % PROJECTS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // keyboard navigation for carousel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % PROJECTS.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // smooth link handler
  const handleSmoothLink = useCallback((e, href) => {
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" });
      }
    }
  }, []);

  // theme toggle
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("theme", theme); } catch { }
  }, [theme]);

  const navLinks = useMemo(() => [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ], []);

  return (
    <>
      <ScrollProgress />
      

  {/* NAV */ }
  <nav className="fixed top-0 left-0 w-full z-50">
    <div className="backdrop-blur-xl bg-slate-900/30 dark:bg-slate-800/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleSmoothLink(e, "#hero")}
          className="text-lg font-bold text-white/95"
        >
          Bharath.
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleSmoothLink(e, l.href)}
              className="relative text-slate-200 hover:text-white transition px-2 py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/bharath_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
          >
            Resume
          </a>
        </div>
      </div>
    </div>
  </nav>

  <SpaceVideoBackground /> 

  {/* MAIN */ }
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-slate-100">

    {/* HERO */}
    <section
      id="hero"
      className="relative min-h-[70vh] grid grid-cols-1 md:grid-cols-12 items-center gap-8 py-12"
    >

    {/*ParticlesBackground*/}

      <div className="relative z-10 md:col-span-6 flex items-center justify-center">
        <div className="w-full max-w-md h-[420px]">
          <Hero3D />
        </div>
      </div>

      <div className="relative z-10 md:col-span-6">

        <img
          src="/profile.jpg"
          alt="Bharath"
          className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl mb-6 object-cover mx-auto md:mx-0 animate-float"
        />

        <p className="text-indigo-300 font-medium mb-2">Hello, I'm</p>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
          Bharath Gowda C G
        </h1>

        <p className="mt-4 text-lg text-slate-300 max-w-lg">
          I build fast, reliable web applications and delightful user experiences.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow-lg">
            View Projects
          </a>

          <a href="#contact" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">
            Contact Me
          </a>
        </div>
      </div>
    </section>

    {/* ABOUT — FIXED */}
    <section id="about" className="section-block">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-heading">About Me</h2>

        <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur rounded-2xl p-6 border border-white/8">
          <p className="text-slate-200 leading-relaxed">
            I'm a full-stack developer specializing in building robust, scalable apps and clean frontends. I enjoy solving real problems, optimizing performance and learning new tech stacks.
          </p>
        </div>
      </motion.div>
    </section>

    {/* SKILLS — FIXED */}
    <section id="skills" className="section-block">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-heading">Skills</h2>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "React",
            "JavaScript",
            "Tailwind",
            "Node.js",
            "Python",
            "MongoDB",
            "SQL"
          ].map((s) => (
            <div
              key={s}
              className="
      skill-btn
      p-4
      rounded-2xl
      text-center 
      font-semibold 
      text-white
      bg-gradient-to-br from-indigo-500/40 via-purple-600/40 to-blue-500/40
      backdrop-blur-xl
      shadow-[0_8px_20px_rgba(0,0,0,0.4)]
      border border-white/10
      transition-all
      duration-300
    "
            >
              {s}
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* PROJECTS SECTION — FIXED WRAPPER */}
    <section id="projects" className="section-block">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-heading">Featured Projects</h2>

        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden">

            {/* slides */}
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              ref={carouselRef}
            >
              {PROJECTS.map((p) => (
                <div key={p.id} className="min-w-full px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-900/60 p-8 rounded-2xl border border-white/10 shadow-xl"
                  >
                    <h3 className="text-2xl font-semibold text-indigo-100 mb-1">
                      {p.title}
                    </h3>
                    <p className="text-slate-300 mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs bg-white/6 px-3 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* prev/next */}
            <button
              onClick={() =>
                setActiveIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/6"
            >
              ◀
            </button>

            <button
              onClick={() =>
                setActiveIndex((i) => (i + 1) % PROJECTS.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/6"
            >
              ▶
            </button>

            {/* dots */}
            <div className="flex gap-2 justify-center mt-4">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full ${idx === activeIndex ? "bg-indigo-400" : "bg-white/10"
                    }`}
                ></button>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </section>

    {/* CONTACT SECTION — FIXED WRAPPER */}
    <section id="contact" className="section-block">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-heading">Contact</h2>

        <div className="max-w-3xl mx-auto">
          <UpgradedContactForm />
        </div>
      </motion.div>
    </section>
  </main>

  {/* FOOTER */ }
  <footer className="mt-24 pb-10 text-center relative z-10">
    <div className="flex justify-center space-x-6 mb-4">

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/bharath-gowda-a5a890315"
        target="_blank"
        rel="noreferrer"
        className="text-slate-200 hover:text-indigo-300 transition duration-300"
        aria-label="LinkedIn"
      >
        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 
        0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 
        6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 
        3.204s1.75.79 1.75 1.764S7.466 6.732 6.5 6.732zM20 
        19h-3v-5.604c0-3.368-4-3.529-4 0V19h-3V8h3v1.765C14.396 
        7.179 20 6.988 20 12.241V19z"/>
        </svg>
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/bharathgowdacg"
        target="_blank"
        rel="noreferrer"
        className="text-slate-200 hover:text-indigo-300 transition duration-300"
        aria-label="GitHub"
      >
        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 
        0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
        0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.757-1.332-1.757-1.09-.744.084-.729.084-.729 
        1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 
        1.304 3.495.996.108-.775.419-1.305.762-1.604-2.665-.304-5.467-1.336-5.467-5.934 
        0-1.31.469-2.383 1.236-3.224-.124-.303-.536-1.523.117-3.18 
        0 0 1.006-.322 3.3.432a11.48 11.48 0 0 1 
        6 0c2.293-.754 3.299-.432 3.299-.432.653 
        1.657.241 2.877.118 3.18.768.841 1.236 
        1.914 1.236 3.224 0 4.61-2.804 5.63-5.479 
        5.922.43.37.823 1.102.823 2.222 0 1.604-.014 
        2.897-.014 3.289 0 .321.218.694.825.577C20.565 
        22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      </a>

    </div>

    <p className="text-slate-400 text-sm">
      © 2025 Bharath. All rights reserved.
    </p>
  </footer>

    </>
  );
}

function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled =
        (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setPercent(Math.min(100, Math.max(0, scrolled || 0)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-50"
      style={{
        width: `${percent}%`,
        background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
      }}
    />
  );
}
