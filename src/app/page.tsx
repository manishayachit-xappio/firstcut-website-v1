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
      </main>
      <Footer />
    </>
  );
}
