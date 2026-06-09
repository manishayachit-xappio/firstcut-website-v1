import { Footer } from "@/components/Footer";
import { HeroScene } from "@/components/HeroScene";
import { ManifestoAccessScene } from "@/components/ManifestoAccessScene";
import { Nav } from "@/components/Nav";
import { NewInterfaceScene } from "@/components/NewInterfaceScene";
import { OldWayScene } from "@/components/OldWayScene";
import { RevisionLoopScene } from "@/components/RevisionLoopScene";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroScene />
        <OldWayScene />
        <NewInterfaceScene />
        <RevisionLoopScene />
        <ManifestoAccessScene />
        <section className="bg-background pb-20 pt-4">
          <div className="scene-shell">
            <p className="font-mono text-sm tracking-[0.04em] text-muted/70">
              The blank timeline had a good run.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
