type FissureSeamProps = {
  variant: "crack" | "break";
  /** 0-1 fixed pose, used only in the static (mobile / reduced-motion) fallback. */
  staticProgress?: number;
  className?: string;
};

/**
 * Abstract cinematic placeholder for the future 3D / video moment — a seam
 * of light widening between two panels. Not a literal cookie: this stands in
 * for whichever medium (Three.js scene, MP4, WebM, image sequence) replaces
 * it, and both the class names below are the GSAP scrub targets used by
 * PinnedScrollSection.
 */
export function FissureSeam({ variant, staticProgress, className = "" }: FissureSeamProps) {
  const isStatic = staticProgress !== undefined;
  const p = staticProgress ?? 0;

  if (variant === "crack") {
    const shift = 4 + p * 9;
    return (
      <div
        className={`fissure-stage relative aspect-[16/11] w-full overflow-hidden border border-border bg-surface ${className}`}
      >
        <div
          className="seam-panel-a absolute inset-0 bg-gradient-to-b from-surface-raised via-surface to-bg"
          style={{ clipPath: "inset(0 0 50% 0)", transform: isStatic ? `translateY(-${shift}%)` : undefined }}
        />
        <div
          className="seam-panel-b absolute inset-0 bg-gradient-to-t from-surface-raised via-surface to-bg"
          style={{ clipPath: "inset(50% 0 0 0)", transform: isStatic ? `translateY(${shift}%)` : undefined }}
        />
        <div
          className="seam-glow absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-accent"
          style={{
            opacity: isStatic ? 0.5 + p * 0.5 : 0.5,
            boxShadow: `0 0 ${isStatic ? 24 + p * 40 : 24}px ${isStatic ? 4 + p * 10 : 4}px var(--color-accent-soft)`,
          }}
        />
      </div>
    );
  }

  const dx = 3 + p * 7;
  const crumbs = [
    { x: -34, y: -18 },
    { x: 30, y: -26 },
    { x: -22, y: 22 },
    { x: 36, y: 20 },
    { x: 4, y: -34 },
    { x: -6, y: 32 },
  ];

  return (
    <div
      className={`fissure-stage relative aspect-[16/11] w-full overflow-hidden border border-border bg-surface ${className}`}
    >
      <div
        className="seam-panel-a absolute inset-0 bg-gradient-to-br from-surface-raised via-surface to-bg"
        style={{
          clipPath: "polygon(0 0, 48% 0, 56% 100%, 0 100%)",
          transform: isStatic ? `translate(-${dx}%, -${dx * 0.4}%)` : undefined,
        }}
      />
      <div
        className="seam-panel-b absolute inset-0 bg-gradient-to-tl from-surface-raised via-surface to-bg"
        style={{
          clipPath: "polygon(48% 0, 100% 0, 100% 100%, 56% 100%)",
          transform: isStatic ? `translate(${dx}%, ${dx * 0.4}%)` : undefined,
        }}
      />
      <div
        className="seam-glow absolute bottom-[6%] left-1/2 top-[6%] w-px -translate-x-1/2 bg-accent"
        style={{
          opacity: isStatic ? 0.5 + p * 0.5 : 0.5,
          boxShadow: `0 0 ${isStatic ? 24 + p * 36 : 24}px ${isStatic ? 4 + p * 8 : 4}px var(--color-accent-soft)`,
        }}
      />
      {crumbs.map((c, i) => (
        <span
          key={i}
          className="seam-crumb absolute left-1/2 top-1/2 block h-1.5 w-1.5 rounded-full bg-accent"
          style={{
            opacity: isStatic ? Math.min(1, p * 1.6) : 0,
            transform: isStatic ? `translate(${c.x * p}px, ${c.y * p}px)` : "translate(0, 0)",
          }}
        />
      ))}
    </div>
  );
}
