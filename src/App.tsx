import { useRef, useEffect, useState, useCallback } from "react";
import "./styles.css";

/* ═══════════════════════════════════════════════════════
   AURORA BACKGROUND — living light system
   ═══════════════════════════════════════════════════════ */
function AuroraBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };

    const orbs = [
      { x: 0.3, y: 0.2, r: 500, color: [56, 189, 248], speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.6, r: 400, color: [212, 168, 83], speed: 0.0002, phase: 2 },
      { x: 0.5, y: 0.8, r: 350, color: [139, 92, 246], speed: 0.00025, phase: 4 },
    ];

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      t++;

      for (const orb of orbs) {
        const cx = c.width * (orb.x + Math.sin(t * orb.speed + orb.phase) * 0.08);
        const cy = c.height * (orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * 0.06);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        g.addColorStop(0, `rgba(${orb.color.join(",")}, 0.04)`);
        g.addColorStop(0.5, `rgba(${orb.color.join(",")}, 0.015)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, c.width, c.height);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ═══════════════════════════════════════════════════════
   CONSTELLATION — depth-aware particle system
   ═══════════════════════════════════════════════════════ */
function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    interface Star { x: number; y: number; z: number; vx: number; vy: number; }
    const stars: Star[] = [];
    const COUNT = 80;
    let raf: number;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };

    const init = () => {
      stars.length = 0;
      for (let i = 0; i < COUNT; i++) {
        stars.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          z: Math.random() * 3 + 0.5,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = c.width;
        if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height;
        if (s.y > c.height) s.y = 0;

        const size = s.z * 0.6;
        const alpha = 0.15 + s.z * 0.08;

        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.fill();

        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120 + (stars[i].z + stars[j].z) * 15;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / maxDist) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ═══════════════════════════════════════════════════════
   REVEAL — intersection observer hook
   ═══════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAGNETIC BUTTON — follows cursor on hover
   ═══════════════════════════════════════════════════════ */
function MagneticBtn({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
      {...props}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   TILT CARD — 3D tilt on hover
   ═══════════════════════════════════════════════════════ */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.01)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ICONS — custom SVG, not generic
   ═══════════════════════════════════════════════════════ */
const icons = {
  grid: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  zap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  trend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  box: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <AuroraBg />
      <Constellation />
      <div className="grain" />

      {/* ═══════════════════════════════════
          NAVBAR — floating glass
          ═══════════════════════════════════ */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[1100px]">
        <div
          className="glass rounded-2xl px-8 py-4 flex items-center justify-between"
          style={{
            background: `rgba(4, 6, 14, ${Math.min(scrollY / 300, 0.85)})`,
            borderColor: `rgba(255,255,255, ${0.04 + Math.min(scrollY / 5000, 0.04)})`,
          }}
        >
          <span className="font-display text-xl text-text tracking-tight">Aura</span>
          <div className="hidden md:flex items-center gap-10 text-[13px] text-text-secondary font-light">
            <a href="#features" className="hover:text-text transition-colors duration-300">Features</a>
            <a href="#pricing" className="hover:text-text transition-colors duration-300">Pricing</a>
            <a href="#about" className="hover:text-text transition-colors duration-300">About</a>
          </div>
          <MagneticBtn className="btn-primary text-[13px] px-6 py-3">Get Started</MagneticBtn>
        </div>
      </nav>

      {/* ═══════════════════════════════════
          HERO — cinematic composition
          focal point: the product showcase
          ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-40">
        <div className="shell relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow */}
            <Reveal>
              <p className="text-accent text-[11px] font-medium tracking-[0.5em] uppercase mb-8 opacity-60">
                The Design System
              </p>
            </Reveal>

            {/* Statement — smaller but more powerful */}
            <Reveal delay={1}>
              <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] text-text text-balance leading-[1.08] mb-8 max-w-3xl">
                Interfaces that feel like living systems
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={2}>
              <p className="text-text-secondary text-base md:text-lg font-light leading-[1.8] max-w-lg mb-12">
                A premium toolkit for crafting digital experiences with depth, motion, and cinematic intention.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={3}>
              <div className="flex items-center gap-4 mb-20">
                <MagneticBtn className="btn-primary">Start Building {icons.arrow}</MagneticBtn>
                <MagneticBtn className="btn-ghost">Documentation</MagneticBtn>
              </div>
            </Reveal>

            {/* Product showcase — the focal point */}
            <Reveal delay={3}>
              <div className="relative max-w-4xl w-full">
                {/* Ambient glow behind */}
                <div className="absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_60%)] pointer-events-none" />

                {/* Glass container */}
                <TiltCard className="glass glass-glow rounded-3xl p-2 relative">
                  <div className="bg-bg-elevated rounded-[20px] overflow-hidden relative">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.04]">
                      <div className="flex gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]/70" />
                        <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]/70" />
                        <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]/70" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="h-6 w-64 bg-white/[0.03] rounded-md" />
                      </div>
                    </div>

                    {/* App content */}
                    <div className="aspect-[16/10] p-6 flex gap-4">
                      {/* Sidebar */}
                      <div className="w-48 shrink-0 space-y-2">
                        {[1,2,3,4,5,6].map(i => (
                          <div key={i} className={`h-9 rounded-lg ${i === 1 ? 'bg-accent/10 border border-accent/20' : 'bg-white/[0.02]'}`} />
                        ))}
                      </div>

                      {/* Main content area */}
                      <div className="flex-1 flex flex-col gap-4">
                        {/* Top bar */}
                        <div className="h-10 bg-white/[0.02] rounded-lg flex items-center px-4 gap-3">
                          <div className="w-4 h-4 rounded bg-accent/20" />
                          <div className="h-3 w-32 bg-white/[0.04] rounded" />
                          <div className="ml-auto h-6 w-20 bg-accent/10 rounded-md" />
                        </div>

                        {/* Content grid */}
                        <div className="flex-1 grid grid-cols-3 gap-3">
                          {/* Chart area */}
                          <div className="col-span-2 bg-white/[0.015] rounded-xl p-4 relative overflow-hidden">
                            <div className="absolute bottom-4 left-4 right-4">
                              <svg viewBox="0 0 300 60" className="w-full h-16 opacity-40">
                                <polyline
                                  fill="none"
                                  stroke="rgba(56,189,248,0.6)"
                                  strokeWidth="1.5"
                                  points="0,50 20,45 40,48 60,35 80,38 100,25 120,28 140,15 160,20 180,12 200,18 220,10 240,15 260,8 280,12 300,5"
                                />
                                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="rgba(56,189,248,0.15)" />
                                  <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                                <polygon
                                  fill="url(#g)"
                                  points="0,50 20,45 40,48 60,35 80,38 100,25 120,28 140,15 160,20 180,12 200,18 220,10 240,15 260,8 280,12 300,5 300,60 0,60"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-3">
                            {[1,2,3].map(i => (
                              <div key={i} className="h-[calc(33.33%-8px)] bg-white/[0.02] rounded-xl p-3 flex flex-col justify-between">
                                <div className="h-2 w-12 bg-white/[0.06] rounded" />
                                <div className="h-4 w-16 bg-accent/10 rounded" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* Reflection */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.03),transparent_70%)] pointer-events-none" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════
          FEATURES — editorial asymmetric
          focal point: the large core card
          ═══════════════════════════════════ */}
      <section id="features" className="relative py-[clamp(140px,18vh,220px)]">
        <div className="shell">
          {/* Section header — left aligned, editorial */}
          <Reveal>
            <div className="mb-28 max-w-xl">
              <p className="text-accent text-[11px] font-medium tracking-[0.5em] uppercase mb-6 opacity-60">
                Capabilities
              </p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-text leading-[1.1] mb-6">
                Six primitives.<br />Infinite compositions.
              </h2>
              <p className="text-text-secondary text-base font-light leading-[1.8]">
                No compromises. No templates. Just the building blocks for exceptional interfaces.
              </p>
            </div>
          </Reveal>

          {/* CORE SYSTEM — the focal point */}
          <Reveal>
            <TiltCard className="glass glass-glow rounded-3xl p-14 md:p-16 mb-16 relative overflow-hidden group">
              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none transition-opacity duration-700 group-hover:opacity-150" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
                <div className="w-16 h-16 bg-accent-subtle flex items-center justify-center text-accent rounded-2xl shrink-0 glass-inner-glow">
                  {icons.grid}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-text mb-6">Adaptive Grid System</h3>
                  <p className="text-text-secondary text-lg font-light leading-[1.9] max-w-xl mb-8">
                    Layouts that respond to content, not breakpoints. Our grid system understands hierarchy and adapts naturally to any screen size. Built on CSS Grid with intelligent auto-placement and subgrid support.
                  </p>
                  <div className="flex items-center gap-3 text-accent text-sm font-medium">
                    <span>Explore the system</span>
                    {icons.arrow}
                  </div>
                </div>
                {/* Visual element */}
                <div className="hidden lg:block w-64 shrink-0">
                  <div className="grid grid-cols-3 gap-2">
                    {[1,2,3,4,5,6,7,8,9].map(i => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg transition-all duration-700 ${
                          i === 1 || i === 5 || i === 9
                            ? 'bg-accent/10 border border-accent/20'
                            : 'bg-white/[0.02] border border-white/[0.04]'
                        }`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* SATELLITE CARLS — 2 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Reveal delay={1}>
              <TiltCard className="glass rounded-3xl p-12 md:p-14 group hover:border-white/[0.1] transition-colors duration-500">
                <div className="w-14 h-14 bg-accent-subtle flex items-center justify-center text-accent rounded-2xl mb-12 glass-inner-glow">
                  {icons.zap}
                </div>
                <h3 className="font-display text-xl text-text mb-7">Motion First</h3>
                <p className="text-text-secondary font-light leading-[1.9]">
                  Every interaction has purpose. Physics-based timing, spring curves, and orchestrated sequences that guide attention.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={2}>
              <TiltCard className="glass rounded-3xl p-12 md:p-14 group hover:border-white/[0.1] transition-colors duration-500">
                <div className="w-14 h-14 bg-gold-glow flex items-center justify-center text-gold rounded-2xl mb-12 glass-inner-glow">
                  {icons.layers}
                </div>
                <h3 className="font-display text-xl text-text mb-7">Component Library</h3>
                <p className="text-text-secondary font-light leading-[1.9]">
                  50+ production-ready primitives. Composable, accessible, and themeable. Build any interface without fighting the framework.
                </p>
              </TiltCard>
            </Reveal>
          </div>

          {/* SATELLITE CARDS — 3 column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: icons.shield, title: "Pixel Perfect", desc: "Every element placed with intention. No random spacing, no arbitrary values.", color: "accent" },
              { icon: icons.trend, title: "Performance", desc: "Zero-config optimization. Lazy loading, tree shaking, and edge delivery.", color: "gold" },
              { icon: icons.box, title: "Type Safe", desc: "Full TypeScript coverage. Autocomplete, inline docs, compile-time safety.", color: "accent" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i + 1}>
                <TiltCard className="glass rounded-3xl p-12 group hover:border-white/[0.1] transition-colors duration-500">
                  <div className={`w-14 h-14 ${item.color === "accent" ? "bg-accent-subtle text-accent" : "bg-gold-glow text-gold"} flex items-center justify-center rounded-2xl mb-12 glass-inner-glow`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-medium text-text mb-6">{item.title}</h3>
                  <p className="text-text-secondary text-sm font-light leading-[1.8]">{item.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════
          PRICING — Pro as center of gravity
          focal point: the Pro card
          ═══════════════════════════════════ */}
      <section id="pricing" className="relative py-[clamp(140px,18vh,220px)]">
        <div className="shell relative z-10">
          <Reveal>
            <div className="text-center mb-28">
              <p className="text-accent text-[11px] font-medium tracking-[0.5em] uppercase mb-6 opacity-60">
                Pricing
              </p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-text mb-6">
                Simple, transparent
              </h2>
              <p className="text-text-secondary text-lg font-light max-w-lg mx-auto leading-[1.8]">
                No hidden fees. No surprise charges.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto items-center">
            {/* Starter */}
            <Reveal delay={1}>
              <div className="glass rounded-3xl p-14">
                <p className="text-text-secondary text-sm font-light mb-5">Starter</p>
                <p className="font-display text-5xl text-text mb-14">$0</p>
                <ul className="space-y-5 text-sm text-text-secondary font-light mb-18">
                  {["5 projects", "Basic components", "Community support"].map(t => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-accent/60 rounded-full" />
                      {t}
                    </li>
                  ))}
                </ul>
                <MagneticBtn className="btn-ghost w-full justify-center text-[13px]">Get Started</MagneticBtn>
              </div>
            </Reveal>

            {/* PRO — elevated, glowing, the focal point */}
            <Reveal delay={2}>
              <div className="relative">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-accent text-bg text-[10px] font-semibold tracking-[0.2em] uppercase px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(56,189,248,0.3)]">
                    Most Popular
                  </span>
                </div>

                <div className="glass glass-glow rounded-3xl p-16 md:-mt-4 md:mb-4 relative overflow-hidden">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, rgba(56,189,248,0.3), transparent, rgba(56,189,248,0.15), transparent)",
                      animation: "spin 8s linear infinite",
                    }}
                  />
                  <div className="absolute inset-[1px] rounded-[23px] bg-bg-elevated" />

                  <div className="relative z-10">
                    <p className="text-accent text-sm font-light mb-5">Pro</p>
                    <p className="font-display text-6xl md:text-7xl text-text mb-14">$29</p>
                    <ul className="space-y-5 text-sm text-text-secondary font-light mb-18">
                      {["Unlimited projects", "All components", "Priority support", "Custom themes"].map(t => (
                        <li key={t} className="flex items-center gap-3">
                          <span className="w-1 h-1 bg-accent rounded-full" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <MagneticBtn className="btn-primary w-full justify-center text-[13px]">Start Free Trial {icons.arrow}</MagneticBtn>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Enterprise */}
            <Reveal delay={3}>
              <div className="glass rounded-3xl p-14">
                <p className="text-text-secondary text-sm font-light mb-5">Enterprise</p>
                <p className="font-display text-5xl text-text mb-14">Custom</p>
                <ul className="space-y-5 text-sm text-text-secondary font-light mb-18">
                  {["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom development"].map(t => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-gold/60 rounded-full" />
                      {t}
                    </li>
                  ))}
                </ul>
                <MagneticBtn className="btn-ghost w-full justify-center text-[13px]">Contact Sales</MagneticBtn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════
          FOOTER — minimal, centered
          ═══════════════════════════════════ */}
      <footer className="relative py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-center text-center gap-8">
              <span className="font-display text-3xl text-text">Aura</span>
              <p className="text-text-secondary text-sm font-light max-w-xs leading-relaxed">
                Built with intention. Designed with care.
              </p>
              <div className="flex items-center gap-10 text-text-secondary text-sm font-light">
                {["GitHub", "Twitter", "Docs"].map(t => (
                  <a key={t} href="#" className="hover:text-text transition-colors duration-300">{t}</a>
                ))}
              </div>
              <p className="text-text-dim text-xs">© 2026 Aura. All rights reserved.</p>
            </div>
          </Reveal>
        </div>
      </footer>

      {/* Spin animation for Pro card border */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
