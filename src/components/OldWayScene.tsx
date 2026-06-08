const files = [
  "A001_KITCHEN_HANDS.mov",
  "B032_INTERVIEW_MOTHER_RECIPE.mov",
  "C006_FAMILY_TABLE.mov",
  "D011_QUIET_PAUSE.mov",
];

export function OldWayScene() {
  return (
    <section className="border-y border-line bg-[#0b0908] py-28 sm:py-36">
      <div className="scene-shell">
        <p className="timecode mb-7">Scene 02 / the old way</p>
        <h2 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
          The timeline was never meant to start empty.
        </h2>
        <div className="mt-12 grid gap-8 text-xl leading-9 text-muted lg:grid-cols-[1fr_0.78fr]">
          <div className="space-y-6">
            <p>
              You do not begin with a story. You begin with drives. Folders.
              Interviews. Reactions. B roll. Silence. Mistakes. Gold.
            </p>
            <p className="text-foreground">Somewhere inside it is the cut.</p>
            <p>
              Today, finding it is still mostly memory, transcripts, bins, and
              pain.
            </p>
            <p className="text-foreground">
              The bottleneck in video is no longer capture. It is comprehension.
            </p>
          </div>
          <div className="self-end border border-line bg-foreground/[0.03] p-4">
            {files.map((file, index) => (
              <div
                key={file}
                className="flex items-center justify-between border-b border-line py-4 last:border-b-0"
              >
                <span className="font-mono text-xs text-muted">{file}</span>
                <span className="font-mono text-xs text-ember">
                  0{index + 1}:0{index * 2 + 3}:18
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
