export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/70 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="scene-shell flex h-16 items-center justify-between text-sm"
      >
        <a href="#top" className="font-medium tracking-[0.18em] uppercase">
          First Cut
        </a>
        <div className="flex items-center gap-6 text-muted">
          <a className="transition hover:text-foreground" href="#manifesto">
            Manifesto
          </a>
          <a className="transition hover:text-foreground" href="#access">
            Access
          </a>
        </div>
      </nav>
    </header>
  );
}
