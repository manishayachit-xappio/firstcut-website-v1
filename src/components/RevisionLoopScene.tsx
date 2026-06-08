const notes = [
  "00:42 Replace this with a more intimate shot.",
  "01:18 This section drags. Tighten it.",
  "02:05 Try a warmer music cue.",
  "Global: Make this feel less like a profile and more like a memory.",
];

export function RevisionLoopScene() {
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
        <div className="border border-line bg-background/55 p-4 sm:p-6">
          <div className="grid gap-5 md:grid-cols-[0.86fr_1fr]">
            <div className="border border-line bg-foreground/[0.035] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                timecoded notes
              </p>
              <div className="mt-5 space-y-3">
                {notes.map((note) => (
                  <p
                    key={note}
                    className="border-b border-line pb-3 font-mono text-xs leading-6 text-foreground/85 last:border-b-0"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <VersionTimeline version="First Cut v1" muted />
              <VersionTimeline version="First Cut v2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VersionTimeline({
  version,
  muted = false,
}: {
  version: string;
  muted?: boolean;
}) {
  const widths = muted ? [58, 74, 42, 64, 49] : [46, 60, 38, 72, 56, 34];

  return (
    <div className="border border-line bg-[#0e0c0b] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs text-foreground">{version}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
          {muted ? "before notes" : "after notes"}
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
    </div>
  );
}
