import { ProductInterfaceMock } from "@/components/ProductInterfaceMock";

export function NewInterfaceScene() {
  return (
    <section className="bg-background py-28 sm:py-40">
      <div className="scene-shell">
        <div className="mb-12 max-w-3xl">
          <p className="timecode mb-7">Scene 03 / new interface</p>
          <h2 className="text-5xl font-semibold leading-tight sm:text-7xl">
            Ask for the cut.
          </h2>
          <p className="mt-7 text-xl leading-9 text-muted">
            Describe the film you are trying to make. First Cut watches the
            footage, finds the moments, builds the structure, and gives you
            something to react to.
          </p>
        </div>
        <ProductInterfaceMock />
      </div>
    </section>
  );
}
