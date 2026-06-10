import Image from "next/image";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/70 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="scene-shell flex h-16 items-center justify-between text-sm"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-medium tracking-[0.18em] uppercase"
          aria-label="First Cut — home"
        >
          <Image
            src="/fc-mark.png"
            alt=""
            width={463}
            height={549}
            priority
            className="h-7 w-auto drop-shadow-[0_0_10px_rgba(198,154,91,0.25)] transition group-hover:drop-shadow-[0_0_14px_rgba(198,154,91,0.45)]"
          />
          <span>First Cut</span>
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
