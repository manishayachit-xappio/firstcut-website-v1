const clips = [
  "A001_KITCHEN_HANDS.mov",
  "A014_MARKET_EXT.mov",
  "B032_INTERVIEW_MOTHER_RECIPE.mov",
  "C006_FAMILY_TABLE.mov",
  "D011_QUIET_PAUSE.mov",
  "E019_ENDING_BEAT.mov",
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

const timeline = [
  "Opening image",
  "Kitchen detail",
  "Interview setup",
  "Memory beat",
  "Market texture",
  "Family table",
  "Ending silence",
];

export function ProductInterfaceMock() {
  return (
    <div className="interface-stage relative overflow-hidden border border-line bg-[#0d0b0a] shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:px-6">
        <span>First Cut Studio</span>
        <span className="text-ember">moment graph online</span>
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
      <div className="mt-6 border border-line bg-foreground/[0.035] p-4">
        <p className="font-mono text-sm text-foreground">CARMEN_DOC_RAW</p>
        <p className="mt-2 font-mono text-xs text-muted">187 clips / 11h 42m</p>
      </div>
      <div className="mt-6 space-y-2 font-mono text-xs text-muted">
        {[
          "Watching footage...",
          "Finding scenes...",
          "Mapping story beats...",
          "Building moment graph...",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-3">
        {clips.map((clip) => (
          <div
            key={clip}
            className="border border-line bg-background/45 p-3 font-mono text-[11px] text-muted"
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
      <div className="mt-6 border border-ember/30 bg-ember/[0.07] p-4">
        <p className="font-mono text-xs leading-6 text-foreground">
          Make a three minute first cut about Carmen, food, memory, and family.
        </p>
      </div>
      <div className="mt-7">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          surfaced moments
        </p>
        <div className="space-y-2">
          {moments.map((moment) => (
            <div
              key={moment}
              className="border border-line bg-foreground/[0.035] px-3 py-2 font-mono text-[11px] text-muted"
            >
              {moment}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 space-y-3">
        {transcript.map((line) => (
          <blockquote
            key={line}
            className="border-l border-blood pl-3 text-sm leading-6 text-foreground/80"
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
      <div className="mt-6 flex items-center justify-between border border-line bg-foreground/[0.035] p-4">
        <span className="font-mono text-sm text-foreground">First Cut v1</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
          assembled
        </span>
      </div>
      <div className="mt-7 space-y-3">
        {timeline.map((label, index) => (
          <div key={label}>
            <div className="mb-1 flex justify-between font-mono text-[10px] text-muted">
              <span>{label}</span>
              <span>0{index}:1{index}</span>
            </div>
            <div className="h-8 border border-line bg-background">
              <div
                className="h-full bg-gradient-to-r from-ember/60 to-blood/35"
                style={{ width: `${48 + index * 7}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-7 border-t border-line pt-4 font-mono text-xs leading-6 text-muted">
        Assembled from 27 moments across 11h 42m of footage
      </p>
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
