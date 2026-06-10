"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's signature animation: a field of dim "footage moment" nodes with a
 * luminous ember story-spine that continuously threads left-to-right through a
 * subset of them — the machine finding the cut — then regenerates along a new
 * path. This is First Cut's answer to a topographic graph background: instead of
 * traversing terrain, you watch raw footage resolve into a story.
 *
 * Everything is canvas + rAF. It is DPR- and resize-aware and falls back to a
 * single static frame when the user prefers reduced motion.
 */

type Node = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  r: number;
  // slow independent drift so the field feels alive, not animated
  driftPhase: number;
  driftSpeed: number;
  driftAmp: number;
  twinklePhase: number;
};

const EMBER = "198, 154, 91";
const BLOOD = "143, 48, 40";
const HEAD = "245, 226, 186";

// One full thread (footage -> story) plays over this window, with the path
// drawing in, holding, then dissolving so the next thread can form.
const CYCLE_MS = 9000;
const DRAW_FRACTION = 0.62; // portion of the cycle spent drawing the spine
const HOLD_FRACTION = 0.2; // fully-drawn hold before the dissolve

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function StorySpineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let spine: number[] = []; // indices into nodes, ordered left -> right
    let cycleStart = 0;
    let raf = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    function buildNodes() {
      // Density scales with area but stays capped for performance.
      const target = Math.min(
        130,
        Math.max(40, Math.round((width * height) / 13000)),
      );
      nodes = Array.from({ length: target }, () => {
        const baseX = rand(0, width);
        const baseY = rand(0, height);
        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          r: rand(0.6, 1.8),
          driftPhase: rand(0, Math.PI * 2),
          driftSpeed: rand(0.08, 0.22),
          driftAmp: rand(4, 14),
          twinklePhase: rand(0, Math.PI * 2),
        };
      });
    }

    function buildSpine() {
      if (nodes.length < 6) {
        spine = nodes.map((_, i) => i);
        return;
      }
      // Walk left -> right choosing the next node within a meandering vertical
      // band, so the path reads like a story arc rather than random scribble.
      const order = nodes
        .map((n, i) => ({ i, x: n.x, y: n.y }))
        .sort((a, b) => a.x - b.x);
      const picked: number[] = [];
      const count = Math.min(11, Math.max(6, Math.round(width / 150)));
      const stride = Math.max(1, Math.floor(order.length / count));
      // Start mid-frame and let the band meander gently around the vertical
      // centre, keeping the spine in the hero's clear, readable zone.
      let band = height * rand(0.42, 0.6);
      for (let k = 0; k < order.length && picked.length < count; k += stride) {
        // From the next few candidates, prefer the one closest to the drifting
        // band to keep vertical jumps gentle.
        const window = order.slice(k, k + stride + 3);
        let best = window[0];
        let bestD = Infinity;
        for (const c of window) {
          // Pull gently back toward centre so the path never wanders off-frame.
          const d = Math.abs(c.y - band) + Math.abs(c.y - height * 0.5) * 0.25;
          if (d < bestD) {
            bestD = d;
            best = c;
          }
        }
        if (best) {
          picked.push(best.i);
          band = band * 0.6 + best.y * 0.4;
        }
      }
      spine = picked;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
      buildSpine();
    }

    function drawNode(n: Node, glow: number) {
      // glow 0 = dormant clip, 1 = fully lit by the spine
      const alpha = 0.32 + glow * 0.66;
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, n.r + glow * 2.2, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${glow > 0.05 ? EMBER : "190, 178, 162"}, ${alpha})`;
      if (glow > 0.05) {
        ctx!.shadowBlur = 12 + glow * 22;
        ctx!.shadowColor = `rgba(${EMBER}, ${glow})`;
      } else {
        ctx!.shadowBlur = 0;
      }
      ctx!.fill();
      ctx!.shadowBlur = 0;
    }

    function frame(now: number) {
      if (!cycleStart) cycleStart = now;
      const elapsed = (now - cycleStart) % CYCLE_MS;
      const phase = elapsed / CYCLE_MS;

      // Regenerate the spine each time the cycle wraps.
      if (phase < 0.012 && elapsed < 80) buildSpine();

      // progress: 0 -> 1 across the draw window, then hold, then dissolve.
      let progress: number;
      let spineAlpha: number;
      if (phase < DRAW_FRACTION) {
        progress = easeInOut(phase / DRAW_FRACTION);
        spineAlpha = Math.min(1, (phase / DRAW_FRACTION) * 4);
      } else if (phase < DRAW_FRACTION + HOLD_FRACTION) {
        progress = 1;
        spineAlpha = 1;
      } else {
        progress = 1;
        const d = (phase - DRAW_FRACTION - HOLD_FRACTION) /
          (1 - DRAW_FRACTION - HOLD_FRACTION);
        spineAlpha = Math.max(0, 1 - d);
      }

      const t = now / 1000;
      ctx!.clearRect(0, 0, width, height);

      // Drift the field.
      for (const n of nodes) {
        n.x = n.baseX + Math.cos(t * n.driftSpeed + n.driftPhase) * n.driftAmp;
        n.y =
          n.baseY + Math.sin(t * n.driftSpeed * 0.9 + n.driftPhase) * n.driftAmp;
      }

      // Build the spine point list + cumulative lengths.
      const pts = spine.map((i) => nodes[i]).filter(Boolean) as Node[];
      const segLen: number[] = [];
      let total = 0;
      for (let i = 1; i < pts.length; i++) {
        const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        segLen.push(d);
        total += d;
      }
      const headDist = progress * total;

      // Dormant field with a gentle twinkle.
      for (const n of nodes) {
        const tw = 0.5 + 0.5 * Math.sin(t * 0.8 + n.twinklePhase);
        drawNode(n, 0);
        if (tw > 0.85) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 0.6, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${EMBER}, ${(tw - 0.85) * 0.6})`;
          ctx!.fill();
        }
      }

      // The story spine: a wide soft glow pass under a thin bright pass.
      if (pts.length > 1 && spineAlpha > 0.01) {
        let acc = 0;
        let headX = pts[0].x;
        let headY = pts[0].y;

        const stroke = (lineWidth: number, color: string, blur: number) => {
          ctx!.beginPath();
          ctx!.moveTo(pts[0].x, pts[0].y);
          let walked = 0;
          for (let i = 1; i < pts.length; i++) {
            const seg = segLen[i - 1];
            if (walked + seg <= headDist) {
              ctx!.lineTo(pts[i].x, pts[i].y);
              walked += seg;
            } else {
              const remain = headDist - walked;
              const f = seg > 0 ? remain / seg : 0;
              headX = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f;
              headY = pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f;
              ctx!.lineTo(headX, headY);
              break;
            }
            if (i === pts.length - 1) {
              headX = pts[i].x;
              headY = pts[i].y;
            }
          }
          ctx!.strokeStyle = color;
          ctx!.lineWidth = lineWidth;
          ctx!.lineCap = "round";
          ctx!.lineJoin = "round";
          ctx!.shadowBlur = blur;
          ctx!.shadowColor = `rgba(${EMBER}, ${0.6 * spineAlpha})`;
          ctx!.stroke();
          ctx!.shadowBlur = 0;
        };

        stroke(10, `rgba(${BLOOD}, ${0.3 * spineAlpha})`, 30);
        stroke(2.4, `rgba(${EMBER}, ${spineAlpha})`, 16);
        stroke(1, `rgba(${HEAD}, ${0.7 * spineAlpha})`, 8);

        // Light up the clips the spine has already reached.
        acc = 0;
        for (let i = 0; i < pts.length; i++) {
          if (i > 0) acc += segLen[i - 1];
          const lit = acc <= headDist ? 1 : 0;
          if (lit) drawNode(pts[i], spineAlpha);
        }

        // Leading head: the cut being made right now.
        if (progress < 1) {
          const pulse = 1.4 + 0.5 * Math.sin(t * 6);
          ctx!.beginPath();
          ctx!.arc(headX, headY, 2.4 + pulse, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${HEAD}, ${0.95 * spineAlpha})`;
          ctx!.shadowBlur = 22;
          ctx!.shadowColor = `rgba(${EMBER}, ${spineAlpha})`;
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function staticFrame() {
      ctx!.clearRect(0, 0, width, height);
      for (const n of nodes) drawNode(n, 0);
      const pts = spine.map((i) => nodes[i]).filter(Boolean) as Node[];
      if (pts.length > 1) {
        ctx!.beginPath();
        ctx!.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx!.lineTo(pts[i].x, pts[i].y);
        ctx!.strokeStyle = `rgba(${EMBER}, 0.5)`;
        ctx!.lineWidth = 1.2;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
        for (const p of pts) drawNode(p, 0.7);
      }
    }

    resize();
    const onResize = () => {
      resize();
      if (reduceMotion) staticFrame();
    };
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      staticFrame();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
