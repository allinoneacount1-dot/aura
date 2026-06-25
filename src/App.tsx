import "./styles.css";
import ConstellationBg from "./components/ConstellationBg";

function IconGrid() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconTrending() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconBox() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="min-h-screen relative">
      <ConstellationBg />
      <div className="grain" />

      {/* ═══════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="shell">
          <div className="flex items-center justify-between h-20">
            <span className="heading-display text-2xl text-text tracking-tight">Aura</span>
            <div className="hidden md:flex items-center gap-10 text-[13px] text-text-muted font-light">
              <a href="#features" className="hover:text-text transition-colors duration-300">Features</a>
              <a href="#pricing" className="hover:text-text transition-colors duration-300">Pricing</a>
              <a href="#about" className="hover:text-text transition-colors duration-300">About</a>
            </div>
            <button className="btn-primary text-[13px] px-6 py-3">Get Started</button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          HERO — Cinematic, full viewport
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03),transparent_70%)] pointer-events-none" />

        <div className="shell relative z-10 text-center py-32">
          <p className="text-accent text-[11px] font-medium tracking-[0.4em] uppercase mb-10 opacity-70">
            The Design System
          </p>

          <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-text mb-10 max-w-4xl mx-auto">
            Build interfaces that feel alive
          </h1>

          <p className="text-text-muted text-lg md:text-xl font-light leading-[1.8] max-w-xl mx-auto mb-14">
            A premium toolkit for crafting digital experiences with depth, motion, and cinematic intention.
          </p>

          <div className="flex items-center justify-center gap-5">
            <button className="btn-primary text-[13px]">Start Building</button>
            <button className="btn-ghost text-[13px]">View Documentation</button>
          </div>

          {/* Hero visual — floating glass panel */}
          <div className="mt-24 relative max-w-3xl mx-auto">
            <div className="glass glass-glow rounded-lg p-1 relative">
              <div className="bg-bg-deep rounded-md overflow-hidden">
                <div className="aspect-[16/9] relative">
                  {/* Mock UI */}
                  <div className="absolute inset-0 p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <div className="ml-4 h-6 w-48 bg-white/[0.03] rounded" />
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-3">
                      <div className="col-span-1 space-y-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="h-10 bg-white/[0.02] rounded" />
                        ))}
                      </div>
                      <div className="col-span-2 bg-white/[0.01] rounded" />
                      <div className="col-span-1 space-y-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-14 bg-white/[0.02] rounded" />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
                </div>
              </div>
            </div>
            {/* Reflection */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.04),transparent_70%)] pointer-events-none" />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          FEATURES — Editorial asymmetric layout
          ═══════════════════════════════════════ */}
      <section id="features" className="relative py-[clamp(100px,14vh,180px)]">
        <div className="shell">
          <div className="mb-24 max-w-2xl">
            <p className="text-accent text-[11px] font-medium tracking-[0.4em] uppercase mb-6 opacity-70">
              Capabilities
            </p>
            <h2 className="heading-section text-[clamp(2rem,4.5vw,3.5rem)] text-text mb-8">
              Everything you need,<br />nothing you don't
            </h2>
            <p className="text-text-muted text-lg font-light leading-[1.8]">
              Six core primitives. Infinite compositions. No compromises.
            </p>
          </div>

          {/* Featured large card */}
          <div className="glass glass-glow rounded-lg p-12 md:p-16 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.04),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
              <div className="w-14 h-14 bg-accent-dim flex items-center justify-center text-accent rounded-sm shrink-0">
                <IconGrid />
              </div>
              <div className="flex-1">
                <h3 className="heading-section text-2xl md:text-3xl text-text mb-6">Adaptive Grid System</h3>
                <p className="text-text-muted text-lg font-light leading-[1.9] max-w-xl">
                  Layouts that respond to content, not breakpoints. Our grid system understands hierarchy and adapts naturally to any screen size. Built on CSS Grid with intelligent auto-placement.
                </p>
              </div>
            </div>
          </div>

          {/* Two column cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="glass rounded-lg p-10 md:p-12 group hover:border-white/[0.08] transition-colors duration-500">
              <div className="w-12 h-12 bg-accent-dim flex items-center justify-center text-accent rounded-sm mb-10">
                <IconZap />
              </div>
              <h3 className="heading-section text-xl text-text mb-6">Motion First</h3>
              <p className="text-text-muted font-light leading-[1.9]">
                Every interaction has purpose. Animations guide attention, not distract from it. Physics-based timing, spring curves, and orchestrated sequences.
              </p>
            </div>

            <div className="glass rounded-lg p-10 md:p-12 group hover:border-white/[0.08] transition-colors duration-500">
              <div className="w-12 h-12 bg-gold-dim flex items-center justify-center text-gold rounded-sm mb-10">
                <IconLayers />
              </div>
              <h3 className="heading-section text-xl text-text mb-6">Component Library</h3>
              <p className="text-text-muted font-light leading-[1.9]">
                50+ production-ready primitives. Composable, accessible, and themeable. Build any interface without fighting the framework.
              </p>
            </div>
          </div>

          {/* Three column cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-lg p-10 group hover:border-white/[0.08] transition-colors duration-500">
              <div className="w-12 h-12 bg-accent-dim flex items-center justify-center text-accent rounded-sm mb-10">
                <IconShield />
              </div>
              <h3 className="text-lg font-medium text-text mb-5">Pixel Perfect</h3>
              <p className="text-text-muted text-sm font-light leading-[1.8]">
                Every element placed with intention. No random spacing, no arbitrary values.
              </p>
            </div>

            <div className="glass rounded-lg p-10 group hover:border-white/[0.08] transition-colors duration-500">
              <div className="w-12 h-12 bg-gold-dim flex items-center justify-center text-gold rounded-sm mb-10">
                <IconTrending />
              </div>
              <h3 className="text-lg font-medium text-text mb-5">Performance</h3>
              <p className="text-text-muted text-sm font-light leading-[1.8]">
                Zero-config optimization. Lazy loading, tree shaking, and edge delivery built in.
              </p>
            </div>

            <div className="glass rounded-lg p-10 group hover:border-white/[0.08] transition-colors duration-500">
              <div className="w-12 h-12 bg-accent-dim flex items-center justify-center text-accent rounded-sm mb-10">
                <IconBox />
              </div>
              <h3 className="text-lg font-medium text-text mb-5">Type Safe</h3>
              <p className="text-text-muted text-sm font-light leading-[1.8]">
                Full TypeScript coverage. Autocomplete, inline docs, and compile-time guarantees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          PRICING — Premium comparison
          ═══════════════════════════════════════ */}
      <section id="pricing" className="relative py-[clamp(100px,14vh,180px)]">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03),transparent_70%)] pointer-events-none" />

        <div className="shell relative z-10">
          <div className="text-center mb-24">
            <p className="text-accent text-[11px] font-medium tracking-[0.4em] uppercase mb-6 opacity-70">
              Pricing
            </p>
            <h2 className="heading-section text-[clamp(2rem,4.5vw,3.5rem)] text-text mb-8">
              Simple, transparent
            </h2>
            <p className="text-text-muted text-lg font-light max-w-lg mx-auto leading-[1.8]">
              No hidden fees. No surprise charges. Pick a plan and start building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {/* Starter */}
            <div className="glass rounded-lg p-12">
              <p className="text-text-muted text-sm font-light mb-4">Starter</p>
              <p className="heading-display text-5xl text-text mb-10">$0</p>
              <ul className="space-y-5 text-sm text-text-muted font-light mb-14">
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  5 projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Basic components
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Community support
                </li>
              </ul>
              <button className="btn-ghost w-full justify-center text-[13px]">Get Started</button>
            </div>

            {/* Pro — elevated */}
            <div className="glass glass-glow rounded-lg p-14 relative md:-mt-4 md:mb-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-bg text-[10px] font-semibold tracking-[0.15em] uppercase px-4 py-1.5">
                  Recommended
                </span>
              </div>
              <p className="text-accent text-sm font-light mb-4">Pro</p>
              <p className="heading-display text-6xl text-text mb-10">$29</p>
              <ul className="space-y-5 text-sm text-text-muted font-light mb-14">
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Unlimited projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  All components
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Priority support
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Custom themes
                </li>
              </ul>
              <button className="btn-primary w-full justify-center text-[13px]">Start Free Trial</button>
            </div>

            {/* Enterprise */}
            <div className="glass rounded-lg p-12">
              <p className="text-text-muted text-sm font-light mb-4">Enterprise</p>
              <p className="heading-display text-5xl text-text mb-10">Custom</p>
              <ul className="space-y-5 text-sm text-text-muted font-light mb-14">
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  SLA guarantee
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Custom development
                </li>
              </ul>
              <button className="btn-ghost w-full justify-center text-[13px]">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          FOOTER — Minimal, balanced
          ═══════════════════════════════════════ */}
      <footer className="relative py-20">
        <div className="shell">
          <div className="flex flex-col items-center text-center gap-8">
            <span className="heading-display text-2xl text-text">Aura</span>
            <p className="text-text-muted text-sm font-light">
              Built with intention. Designed with care.
            </p>
            <div className="flex items-center gap-8 text-text-muted text-sm font-light">
              <a href="#" className="hover:text-text transition-colors">GitHub</a>
              <a href="#" className="hover:text-text transition-colors">Twitter</a>
              <a href="#" className="hover:text-text transition-colors">Docs</a>
            </div>
            <p className="text-text-muted/40 text-xs">
              © 2026 Aura. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
