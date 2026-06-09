const fragments = [
  "CARMEN_DOC_RAW",
  "187 clips",
  "11h 42m",
  "00:13:22 hands making dough",
  "01:04:18 mother's recipe",
  "02:11:09 quiet kitchen pause",
  "03:42:51 market exterior",
  "04:08:33 family laughter",
  "06:19:04 ending beat",
];

// Quiet "machine waking up" status read-out for the hero background.
const awakening = [
  { text: "WATCHING FOOTAGE", strong: false },
  { text: "SCENE GRAPH ONLINE", strong: false },
  { text: "MOMENT CANDIDATES FOUND: 42", strong: false },
  { text: "STORY SPINE DETECTED", strong: false },
  { text: "SILENCE / HANDS / MEMORY / FAMILY", strong: false },
  { text: "FIRST CUT SEED READY", strong: true },
];

export function HeroScene() {
  return (
    <section
      id="top"
      className="film-grain relative flex min-h-screen overflow-hidden pt-16"
    >
      <DormantFootage />
      <div className="scene-shell relative z-10 grid min-h-[calc(100vh-4rem)] items-center py-16 sm:py-20">
        <div className="max-w-4xl">
          <p className="timecode mb-7">First Cut / private beta</p>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.92] tracking-normal text-foreground sm:text-7xl md:text-8xl">
            The film is already in there.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            First Cut watches your raw footage, finds the story, builds the
            first cut, and lets you direct the edit through conversation.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href="#access"
              className="inline-flex w-fit items-center justify-center border border-ember/50 bg-ember px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
            >
              Request access
            </a>
            <p className="max-w-md text-sm leading-6 text-muted">
              Private beta for filmmakers, editors, producers, creators, and
              teams drowning in footage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DormantFootage() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,rgba(143,48,40,0.18),transparent_34%),linear-gradient(180deg,rgba(8,7,6,0.2),#080706_94%)]" />
      <div className="absolute left-1/2 top-28 h-[680px] w-[880px] -translate-x-1/2 rounded-full border border-line opacity-40 blur-3xl" />
      <div className="slow-float absolute right-[6%] top-28 hidden w-[420px] border border-line bg-background/35 p-4 backdrop-blur 2xl:block">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Raw volume</span>
          <span className="text-ember">unwatched</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {fragments.slice(0, 6).map((fragment) => (
            <div
              key={fragment}
              className="border border-line bg-foreground/[0.035] p-3 font-mono text-[11px] text-muted"
            >
              {fragment}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-16 left-[8%] w-[86%] max-w-5xl border-y border-line py-5 opacity-70">
        <div className="flex min-w-max gap-8 font-mono text-xs text-muted">
          {fragments.map((fragment) => (
            <span key={fragment}>{fragment}</span>
          ))}
        </div>
      </div>
      <SystemAwakening />
      <div className="scan-line absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-transparent via-ember/10 to-transparent" />
    </div>
  );
}

function SystemAwakening() {
  return (
    <div className="absolute right-[6%] top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex 2xl:right-[34%]">
      {awakening.map((line, index) => (
        <div
          key={line.text}
          className={`${line.strong ? "awaken-strong" : "awaken"} flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] ${
            line.strong ? "text-ember" : "text-muted"
          }`}
          style={{ "--awaken-delay": `${600 + index * 520}ms` } as React.CSSProperties}
        >
          <span
            className={`h-1 w-1 rounded-full ${line.strong ? "bg-ember" : "bg-muted/60"}`}
          />
          {line.text}
        </div>
      ))}
    </div>
  );
}
