import "./styles.css";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="grain" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="shell flex items-center justify-between h-16">
          <span className="font-display text-xl text-text">Aura</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted">
            <a href="#features" className="hover:text-text transition-colors">Features</a>
            <a href="#pricing" className="hover:text-text transition-colors">Pricing</a>
            <a href="#about" className="hover:text-text transition-colors">About</a>
          </div>
          <button className="btn-primary text-sm">Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative w-full pt-32 pb-[clamp(120px,16vh,200px)]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-8">
                Design System
              </p>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.2] mb-10">
                Build interfaces that feel alive
              </h1>
              <p className="text-muted text-lg leading-[1.9] max-w-md mb-12">
                Aura is a design toolkit for crafting digital experiences with depth, motion, and intention. No templates. No shortcuts.
              </p>
              <div className="flex items-center gap-4">
                <button className="btn-primary">Start Building</button>
                <button className="btn-ghost">View Docs</button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square glass rounded-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-gold/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute bottom-8 right-8 w-32 h-32 border border-accent/20 rounded-sm" />
                <div className="absolute top-12 left-12 w-24 h-24 border border-gold/15 rounded-sm rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative w-full py-[clamp(120px,16vh,200px)]">
        <div className="shell">
          <div className="mb-20">
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Capabilities
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.2]">
              Everything you need,<br />nothing you don't
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Large card */}
            <div className="md:col-span-2 glass p-14 rounded-sm">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-12">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="7" height="7" stroke="#00f5ff" strokeWidth="1.5"/>
                  <rect x="11" y="2" width="7" height="7" stroke="#00f5ff" strokeWidth="1.5"/>
                  <rect x="2" y="11" width="7" height="7" stroke="#00f5ff" strokeWidth="1.5"/>
                  <rect x="11" y="11" width="7" height="7" stroke="#00f5ff" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-8">Adaptive Grid System</h3>
              <p className="text-muted leading-[1.9]">
                Layouts that respond to content, not breakpoints. Our grid system understands hierarchy and adapts naturally to any screen size.
              </p>
            </div>

            {/* Small card */}
            <div className="glass p-14 rounded-sm">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-12">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#ffd700" strokeWidth="1.5"/>
                  <path d="M10 6v4l3 2" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-8">Motion First</h3>
              <p className="text-muted leading-[1.9]">
                Every interaction has purpose. Animations guide attention, not distract from it.
              </p>
            </div>

            {/* Small card */}
            <div className="glass p-14 rounded-sm">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-12">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10h14M10 3v14" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-8">Pixel Perfect</h3>
              <p className="text-muted leading-[1.9]">
                Every element is placed with intention. No random spacing, no arbitrary colors.
              </p>
            </div>

            {/* Medium card */}
            <div className="glass p-14 rounded-sm">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-12">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="#ffd700" strokeWidth="1.5"/>
                  <path d="M7 10h6M10 7v6" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-8">Component Library</h3>
              <p className="text-muted leading-[1.9]">
                50+ production-ready components that work together seamlessly.
              </p>
            </div>

            {/* Large card */}
            <div className="md:col-span-2 glass p-14 rounded-sm">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-12">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16l4-4 4 4 4-8" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-8">Performance by Default</h3>
              <p className="text-muted leading-[1.9]">
                Zero-config optimization. Lazy loading, code splitting, and asset optimization built into the core. Your app loads fast because the framework makes it impossible not to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative w-full py-[clamp(120px,16vh,200px)]">
        <div className="shell">
          <div className="text-center mb-20">
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Pricing
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.2] mb-6">
              Simple, transparent
            </h2>
            <p className="text-muted text-lg max-w-lg mx-auto leading-[1.8]">
              No hidden fees. No surprise charges. Pick a plan and start building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass p-14 rounded-sm">
              <p className="text-muted text-sm mb-4">Starter</p>
              <p className="font-display text-5xl mb-10">$0</p>
              <ul className="space-y-5 text-sm text-muted mb-12">
                <li>5 projects</li>
                <li>Basic components</li>
                <li>Community support</li>
              </ul>
              <button className="btn-ghost w-full justify-center text-sm">Get Started</button>
            </div>

            <div className="glass p-14 rounded-sm border border-accent/30 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-accent" />
              <p className="text-accent text-sm mb-4">Pro</p>
              <p className="font-display text-5xl mb-10">$29</p>
              <ul className="space-y-5 text-sm text-muted mb-12">
                <li>Unlimited projects</li>
                <li>All components</li>
                <li>Priority support</li>
                <li>Custom themes</li>
              </ul>
              <button className="btn-primary w-full justify-center text-sm">Start Free Trial</button>
            </div>

            <div className="glass p-14 rounded-sm">
              <p className="text-muted text-sm mb-4">Enterprise</p>
              <p className="font-display text-5xl mb-10">Custom</p>
              <ul className="space-y-5 text-sm text-muted mb-12">
                <li>Everything in Pro</li>
                <li>Dedicated support</li>
                <li>SLA guarantee</li>
                <li>Custom development</li>
              </ul>
              <button className="btn-ghost w-full justify-center text-sm">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/5 py-16">
        <div className="shell flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="font-display text-lg text-text">Aura</span>
          <p className="text-muted text-sm">
            Built with intention. Designed with care.
          </p>
          <p className="text-muted/50 text-xs">
            © 2026 Aura. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
