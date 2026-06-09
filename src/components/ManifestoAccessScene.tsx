import { Reveal } from "@/components/Reveal";
import { WaitlistForm } from "@/components/WaitlistForm";

const revolutions = [
  { eyebrow: "The Camera Revolution", line: "Everyone became a photographer." },
  {
    eyebrow: "The Smartphone Revolution",
    line: "Everyone became a videographer.",
  },
  {
    eyebrow: "The AI Revolution",
    line: "Everyone becomes a filmmaker.",
    climax: true,
  },
];

const everyday = [
  "Every trip.",
  "Every game.",
  "Every birthday.",
  "Every adventure.",
  "Every ordinary moment.",
];

export function ManifestoAccessScene() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-background py-32 sm:py-48"
    >
      {/* Vision-into-the-future light. Soft, dawn-like horizon glow. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[6%] h-[560px] w-[min(860px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,154,91,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] left-1/2 h-[460px] w-[min(1100px,96vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(143,48,40,0.10),transparent_72%)] blur-3xl" />
      </div>

      <div className="scene-shell relative">
        <Reveal>
          <p className="timecode text-center">Scene 05 / manifesto</p>
        </Reveal>

        {/* Three revolutions, each landing harder than the last. */}
        <div className="mx-auto mt-20 max-w-4xl space-y-16 text-center sm:mt-28 sm:space-y-24">
          {revolutions.map((r) => (
            <Reveal key={r.eyebrow}>
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.32em] sm:text-xs ${
                  r.climax ? "text-ember" : "text-muted"
                }`}
              >
                {r.eyebrow}
              </p>
              <p
                className={`mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl ${
                  r.climax ? "text-ember" : "text-foreground"
                }`}
              >
                {r.line}
              </p>
            </Reveal>
          ))}
        </div>

        {/* The case: documented lives that never become stories. */}
        <div className="mx-auto mt-32 max-w-3xl space-y-10 text-center sm:mt-48">
          <Reveal>
            <p className="text-balance text-2xl leading-snug text-foreground sm:text-4xl">
              For the first time in history, billions of people are documenting
              their lives.
            </p>
          </Reveal>

          <Reveal>
            <div className="space-y-1.5 text-lg leading-relaxed text-muted sm:text-2xl">
              {everyday.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="text-balance text-xl leading-snug text-muted sm:text-2xl">
              Yet most of those memories are never seen again.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-balance text-xl leading-snug text-muted sm:text-2xl">
              Not because they aren&rsquo;t meaningful.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-balance text-2xl leading-snug text-foreground sm:text-3xl">
              Because turning footage into story is difficult.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-balance text-xl leading-snug text-muted sm:text-2xl">
              We believe that is about to change.
            </p>
          </Reveal>
        </div>

        {/* The thesis and crescendo. */}
        <div className="mx-auto mt-32 max-w-3xl text-center sm:mt-48">
          <Reveal>
            <p className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
              First Cut transforms raw footage into narrative.
            </p>
          </Reveal>

          <div className="mt-12 space-y-3">
            <Reveal>
              <p className="text-xl leading-snug text-muted sm:text-2xl">
                The same way AI transformed writing.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-xl leading-snug text-muted sm:text-2xl">
                The same way AI transformed software.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-xl leading-snug text-foreground sm:text-2xl">
                AI will transform storytelling.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="mx-auto mt-20 max-w-4xl text-balance bg-gradient-to-r from-ember via-foreground to-ember bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl">
              And when it does, everyone becomes a filmmaker.
            </p>
          </Reveal>
        </div>

        {/* Access box — unchanged, centered beneath the manifesto. */}
        <div className="mx-auto mt-32 w-full max-w-xl sm:mt-48">
          <div id="access" className="scroll-mt-24">
            <div className="border border-line bg-[#0b0908] p-5 sm:p-7">
              <p className="timecode mb-6">Access</p>
              <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Private access opens in waves.
              </h3>
              <p className="mt-5 text-base leading-7 text-foreground">
                We are not looking for everyone.
              </p>
              <p className="mt-3 text-base leading-7 text-muted">
                We are starting with people who have real footage, real
                deadlines, and real stories buried inside the mess.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
