"use client";

import { CSSProperties } from "react";

import { useInView } from "@/components/useInView";

const notes = [
  { text: "00:42 Replace this with a more intimate shot.", highlight: true },
  { text: "01:18 This section drags. Tighten it.", highlight: false },
  { text: "02:05 Try a warmer music cue.", highlight: false },
  {
    text: "Global: Make this feel less like a profile and more like a memory.",
    highlight: false,
  },
];

// Each editorial note resolves into a concrete timeline change in v2.
const changes = [
  { label: "Opening image replaced", tag: "replaced" },
  { label: "Kitchen hands inserted", tag: "inserted" },
  { label: "Interview delayed", tag: "delayed" },
  { label: "Silence extended", tag: "extended" },
  { label: "Pacing tightened", tag: "tightened" },
];

function delay(ms: number): CSSProperties {
  return { "--stage-delay": `${ms}ms` } as CSSProperties;
}

export function RevisionLoopScene() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="border-y border-line bg-[#0b0908] py-28 sm:py-36">
      <div className="scene-shell grid gap-14 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div>
          <p className="timecode mb-7">Scene 04 / revision loop</p>
          <h2 className="text-5xl font-semibold leading-tight sm:text-7xl">
            Then direct it.
          </h2>
          <p className="mt-7 text-xl leading-9 text-muted">
            First Cut is built around how creative work actually happens: watch,
            react, note, revise.
          </p>
          <p className="mt-10 text-3xl font-semibold">
            Not a blank timeline. A first cut.
          </p>
        </div>

        <div
          ref={ref}
          className={`border border-line bg-background/55 p-4 sm:p-6 ${
            inView ? "is-playing" : ""
          }`}
        >
          {/* v1 */}
          <div className="stage-reveal" style={delay(0)}>
            <VersionTimeline version="First Cut v1" status="before notes" muted />
          </div>

          {/* notes flowing down into the next version */}
          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              timecoded notes
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="space-y-2">
            {notes.map((note, index) => (
              <p
                key={note.text}
                className={`stage-reveal break-words border px-3 py-2 font-mono text-xs leading-6 ${
                  note.highlight
                    ? "border-ember/50 bg-ember/[0.08] text-foreground"
                    : "border-line bg-foreground/[0.02] text-foreground/70"
                }`}
                style={delay(200 + index * 90)}
              >
                {note.highlight ? (
                  <span className="mr-2 font-semibold text-ember">→</span>
                ) : null}
                {note.text}
              </p>
            ))}
          </div>

          <div className="my-4 flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
              ↓ applied to timeline
            </span>
          </div>

          {/* v2 with the resulting, labeled changes */}
          <div className="stage-reveal" style={delay(680)}>
            <VersionTimeline
              version="First Cut v2"
              status="after notes"
              changes={changes}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function VersionTimeline({
  version,
  status,
  muted = false,
  changes,
}: {
  version: string;
  status: string;
  muted?: boolean;
  changes?: { label: string; tag: string }[];
}) {
  const widths = muted ? [58, 74, 42, 64, 49] : [46, 60, 38, 72, 56, 34];

  return (
    <div className="border border-line bg-[#0e0c0b] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs text-foreground">{version}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
          {status}
        </p>
      </div>
      <div className="flex h-14 items-end gap-1 border-t border-line pt-3">
        {widths.map((width, index) => (
          <div
            key={`${version}-${width}-${index}`}
            className={muted ? "bg-muted/20" : "bg-ember/60"}
            style={{ height: `${24 + index * 5}px`, width: `${width}px` }}
          />
        ))}
      </div>
      {changes ? (
        <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
          {changes.map((change) => (
            <li
              key={change.label}
              className="flex items-center justify-between gap-3 font-mono text-[11px] text-foreground/80"
            >
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-ember" />
                <span className="break-words">{change.label}</span>
              </span>
              <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-ember/80">
                {change.tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
