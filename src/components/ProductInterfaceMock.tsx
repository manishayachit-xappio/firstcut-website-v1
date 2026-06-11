"use client";

import { CSSProperties } from "react";

import { useInView } from "@/components/useInView";

const clips = [
  "A001_KITCHEN_HANDS.mov",
  "A014_MARKET_EXT.mov",
  "B032_INTERVIEW_MOTHER_RECIPE.mov",
  "C006_FAMILY_TABLE.mov",
  "D011_QUIET_PAUSE.mov",
  "E019_ENDING_BEAT.mov",
];

const processing = [
  "Watching footage...",
  "Finding scenes...",
  "Mapping story beats...",
  "Shaping the first cut...",
];

const moments = [
  "00:13:22 Hands making dough",
  "01:04:18 Mother's recipe",
  "02:11:09 Quiet kitchen pause",
  "03:42:51 Market exterior",
  "04:08:33 Family laughter",
  "06:19:04 Ending beat",
];

const transcript = [
  "My mother never wrote it down.",
  "You know it by watching.",
  "This kitchen is where I remember her.",
];

// Rough-assembly clip blocks: label, in-point timecode, relative bar width.
const assembly = [
  { label: "Opening image", tc: "00:00", width: 46 },
  { label: "Kitchen hands", tc: "00:18", width: 62 },
  { label: "Interview setup", tc: "00:39", width: 40 },
  { label: "Memory beat", tc: "01:07", width: 73 },
  { label: "Market texture", tc: "01:34", width: 54 },
  { label: "Family table", tc: "02:02", width: 67 },
  { label: "Ending silence", tc: "02:41", width: 36 },
];

function delay(ms: number): CSSProperties {
  return { "--stage-delay": `${ms}ms` } as CSSProperties;
}

export function ProductInterfaceMock() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`interface-stage relative overflow-hidden border border-line bg-[#0d0b0a] shadow-2xl shadow-black/50 ${
        inView ? "is-playing" : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:px-6">
        <span>First Cut Studio</span>
        <span className="text-ember">footage mapped</span>
      </div>
      <div className="grid gap-px bg-line lg:grid-cols-[0.82fr_1.08fr_1fr]">
        <IngestPanel />
        <AskPanel />
        <CutPanel />
      </div>
    </div>
  );
}

function IngestPanel() {
  return (
    <section className="min-h-[520px] bg-[#0b0908] p-5 sm:p-6">
      <PanelHeader label="State A" title="Ingest" />
      <div className="stage-reveal mt-6 border border-line bg-foreground/[0.035] p-4" style={delay(0)}>
        <p className="font-mono text-sm text-foreground">CARMEN_DOC_RAW</p>
        <p className="mt-2 font-mono text-xs text-muted">187 clips / 11h 42m</p>
      </div>
      <div className="stage-reveal mt-6 space-y-2 font-mono text-xs text-muted" style={delay(200)}>
        {processing.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember"
              style={{ "--pulse-delay": `${index * 300}ms` } as CSSProperties}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-3">
        {clips.map((clip, index) => (
          <div
            key={clip}
            className="stage-reveal break-words border border-line bg-background/45 p-3 font-mono text-[11px] text-muted"
            style={delay(320 + index * 60)}
          >
            {clip}
          </div>
        ))}
      </div>
    </section>
  );
}

function AskPanel() {
  return (
    <section className="min-h-[520px] bg-[#100d0b] p-5 sm:p-6">
      <PanelHeader label="State B" title="Ask" />
      <div
        className="stage-reveal mt-6 border border-ember/30 bg-ember/[0.07] p-4"
        style={delay(620)}
      >
        <p className="font-mono text-xs leading-6 text-foreground">
          Make a three minute first cut about Carmen, food, memory, and family.
        </p>
      </div>
      <div className="mt-7">
        <p
          className="stage-reveal mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
          style={delay(800)}
        >
          surfaced moments
        </p>
        <div className="space-y-2">
          {moments.map((moment, index) => (
            <div
              key={moment}
              className="stage-reveal break-words border border-line bg-foreground/[0.035] px-3 py-2 font-mono text-[11px] text-muted"
              style={delay(860 + index * 90)}
            >
              {moment}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 space-y-3">
        {transcript.map((line, index) => (
          <blockquote
            key={line}
            className="stage-reveal border-l border-blood pl-3 text-sm leading-6 text-foreground/80"
            style={delay(1400 + index * 90)}
          >
            &ldquo;{line}&rdquo;
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function CutPanel() {
  return (
    <section className="min-h-[520px] bg-[#0b0908] p-5 sm:p-6">
      <PanelHeader label="State C" title="Cut" />
      <div
        className="stage-reveal mt-6 flex items-center justify-between border border-line bg-foreground/[0.035] px-4 py-3"
        style={delay(1700)}
      >
        <div>
          <span className="font-mono text-sm text-foreground">First Cut v1</span>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            rough assembly
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          assembled
        </span>
      </div>

      <div
        className="stage-reveal mt-5 flex justify-between border-b border-line pb-2 font-mono text-[9px] tracking-[0.12em] text-muted/70"
        style={delay(1780)}
      >
        <span>00:00</span>
        <span>01:00</span>
        <span>02:00</span>
        <span>03:00</span>
      </div>

      {/* rough assembly: stacked clip blocks with a playhead marker */}
      <div className="relative mt-4 space-y-2">
        <div
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-px bg-ember/70"
          style={{ left: "34%" }}
          aria-hidden="true"
        >
          <span className="absolute -top-1 -left-[3px] h-1.5 w-1.5 rounded-full bg-ember" />
        </div>
        {assembly.map((block, index) => (
          <div
            key={block.label}
            className="stage-reveal relative h-9 overflow-hidden border border-line bg-background"
            style={delay(1840 + index * 80)}
          >
            <div
              className="h-full bg-gradient-to-r from-ember/55 to-blood/35"
              style={{ width: `${block.width}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-2.5">
              <span className="truncate font-mono text-[10px] text-foreground/90">
                {block.label}
              </span>
              <span className="ml-2 shrink-0 font-mono text-[9px] text-foreground/60">
                {block.tc}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="stage-reveal mt-6 border-t border-line pt-4"
        style={delay(2480)}
      >
        <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
          <span>story confidence</span>
          <span className="text-ember">strong</span>
        </div>
        <div className="h-1 w-full overflow-hidden bg-foreground/10">
          <div className="h-full w-[82%] bg-gradient-to-r from-ember/70 to-ember" />
        </div>
        <p className="mt-4 font-mono text-xs leading-6 text-muted">
          Assembled from 27 moments across 11h 42m
        </p>
      </div>
    </section>
  );
}

function PanelHeader({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
        {label}
      </p>
      <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
    </div>
  );
}
