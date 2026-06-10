import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-line bg-background py-8">
      <div className="scene-shell flex items-center gap-3">
        <Image
          src="/fc-mark.png"
          alt="First Cut"
          width={463}
          height={549}
          className="h-6 w-auto opacity-80"
        />
        <p className="font-mono text-xs text-muted">
          First Cut is built by Xappio.
        </p>
      </div>
    </footer>
  );
}
