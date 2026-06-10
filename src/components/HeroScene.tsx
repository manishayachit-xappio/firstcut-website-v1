import Image from "next/image";

import { StorySpineCanvas } from "@/components/StorySpineCanvas";

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

// Quiet "machine waking up" status read-out shown beside the headline.
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
      className="film-grain vignette relative flex min-h-screen overflow-hidden pt-16"
    >
      <DormantFootage />
      <div className="scene-shell relative z-10 grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-3xl">
          <Image
            src="/fc-mark.png"
            alt="First Cut"
            width={463}
            height={549}
            priority
            className="slow-float mb-8 h-20 w-auto drop-shadow-[0_0_34px_rgba(198,154,91,0.4)] sm:h-24"
          />
          <p className="timecode mb-7">First Cut / private beta</p>
          <h1 className="text-6xl font-semibold leading-[0.92] tracking-[-0.02em] text-foreground sm:text-7xl md:text-8xl">
            The fastest way from footage to story
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            First Cut turns hours of raw video into a first edit you can watch,
            revise, and share.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href="#access"
              className="inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap border border-ember/50 bg-ember px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
            >
              Request access
            </a>
            <p className="max-w-md text-sm leading-6 text-muted">
              Private beta for filmmakers, editors, producers, creators, and
              teams drowning in footage.
            </p>
          </div>
          {/* Medium screens: compact, dimmed read-out below the copy so it
              never competes with the headline. */}
          <AwakeningCompact />
        </div>
        {/* Desktop: metadata lives in its own grid column, right of the
            headline. Grid columns cannot overlap. */}
        <SystemPanel />
      </div>
    </section>
  );
}

function SystemPanel() {
  return (
    <div className="hidden flex-col items-end gap-10 justify-self-end lg:flex">
      <div className="slow-float w-full max-w-[380px] border border-line bg-background/35 p-4 backdrop-blur">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Raw volume</span>
          <span className="text-ember">unwatched</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {fragments.slice(0, 6).map((fragment) => (
            <div
              key={fragment}
              className="break-words border border-line bg-foreground/[0.035] p-3 font-mono text-[11px] text-muted"
            >
              {fragment}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-[380px] flex-col gap-3">
        {awakening.map((line, index) => (
          <div
            key={line.text}
            className={`${line.strong ? "awaken-strong" : "awaken"} flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] ${
              line.strong ? "text-ember" : "text-muted"
            }`}
            style={
              { "--awaken-delay": `${600 + index * 520}ms` } as React.CSSProperties
            }
          >
            <span
              className={`h-1 w-1 shrink-0 rounded-full ${line.strong ? "bg-ember" : "bg-muted/60"}`}
            />
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function AwakeningCompact() {
  return (
    <div className="mt-12 hidden flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 font-mono text-[10px] tracking-[0.18em] text-muted/55 md:flex lg:hidden">
      {awakening.map((line) => (
        <span key={line.text} className={line.strong ? "text-ember/80" : ""}>
          {line.text}
        </span>
      ))}
    </div>
  );
}

function DormantFootage() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Living layer: footage moments resolving into a story spine. Sits at
          the very back; the cinematic gradients below tint and frame it. */}
      <StorySpineCanvas />
      {/* Cinematic key light: a warm ember dawn breaking over the top edge,
          layered with a deeper amber undertone, then settling into black. */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_-12%,rgba(214,168,98,0.24),transparent_56%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_62%_at_64%_-4%,rgba(143,48,40,0.20),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-6%,rgba(245,222,182,0.10),transparent_44%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/45 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(8,7,6,0.42)_78%,#080706_98%)]" />
      <div className="slow-float absolute left-1/2 top-24 h-[640px] w-[860px] -translate-x-1/2 rounded-full border border-ember/15 opacity-50 blur-2xl" />
      <div className="absolute bottom-16 left-[8%] hidden w-[86%] max-w-5xl border-y border-line py-5 opacity-60 md:block">
        <div className="flex min-w-max gap-8 font-mono text-xs text-muted">
          {fragments.map((fragment) => (
            <span key={fragment}>{fragment}</span>
          ))}
        </div>
      </div>
      <div className="scan-line absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-transparent via-ember/10 to-transparent" />
    </div>
  );
}
