"use client";

import { CSSProperties, ReactNode } from "react";

import { useInView } from "@/components/useInView";

// Fades its children up into place the moment they scroll into view. Used for
// the manifesto's staged, keynote-style reveal. Respects prefers-reduced-motion
// via the .stage-reveal rule in globals.css.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={inView ? "is-playing" : ""}>
      <div
        className={`stage-reveal ${className ?? ""}`}
        style={{ "--stage-delay": `${delay}ms` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
