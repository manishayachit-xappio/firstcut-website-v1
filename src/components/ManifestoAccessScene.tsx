import { WaitlistForm } from "@/components/WaitlistForm";

export function ManifestoAccessScene() {
  return (
    <section id="manifesto" className="bg-background py-28 sm:py-40">
      <div className="scene-shell grid gap-20 lg:grid-cols-[0.95fr_0.8fr]">
        <div>
          <p className="timecode mb-7">Scene 05 / manifesto</p>
          <h2 className="max-w-4xl text-5xl font-semibold leading-tight sm:text-7xl">
            Editing starts before the timeline now.
          </h2>
          <div className="mt-10 max-w-2xl space-y-6 text-xl leading-9 text-muted">
            <p>Manual editing begins by arranging clips.</p>
            <p>AI native editing begins by understanding footage.</p>
            <p>
              Search was the first layer. Generation was the spectacle.
              Assembly is the prize.
            </p>
            <p className="text-foreground">
              First Cut is building the creative reasoning layer for video.
            </p>
          </div>
        </div>
        <div id="access" className="scroll-mt-24">
          <div className="border border-line bg-[#0b0908] p-5 sm:p-7">
            <p className="timecode mb-6">Access</p>
            <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Private access opens in waves.
            </h3>
            <p className="mt-5 text-base leading-7 text-muted">
              We are starting with people who have real footage, real deadlines,
              and real stories buried inside the mess.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
