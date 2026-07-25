import { useCallback, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { PinnedScrollSection } from "../components/PinnedScrollSection";

const STOPS = [
  {
    headline: "Baked whole.",
    body: "Every Fissure starts as one piece: an even, deep-gold shell with nothing showing through.",
  },
  {
    headline: "Broken open.",
    body: "The crust gives first, then the crumb, then the seam of cocoa running through the centre.",
  },
  {
    headline: "That's the point.",
    body: "We design for the break, not around it. If it didn't crack like this, we'd change the recipe.",
  },
];

/** Same framed-panel treatment FissureSeam used: bordered box, soft inset
 *  vignette blending the video's edges into the panel's own background
 *  rather than the abstract seam-of-light placeholder it replaces. */
function StageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden border border-border bg-surface">
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 2.75rem 1.1rem var(--color-surface)" }}
      />
    </div>
  );
}

export function TheCrack() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScrub = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || Number.isNaN(video.duration)) return;
    const target = progress * video.duration;
    if (Math.abs(video.currentTime - target) > 0.03) {
      video.currentTime = target;
    }
  }, []);

  const scrubVisual = (
    <StageFrame>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        poster="/images/crack-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/fissure-crack.mp4" type="video/mp4" />
      </video>
    </StageFrame>
  );

  // Mobile/tablet skip the pin+scrub entirely (touch-scroll seeking is
  // unreliable across devices), so this just autoplay-loops instead.
  // Reduced-motion gets the true final frame, no video decode at all.
  const fallbackVisual = (
    <StageFrame>
      {reduce ? (
        <img
          src="/images/crack-final.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/crack-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/fissure-crack.mp4" type="video/mp4" />
        </video>
      )}
    </StageFrame>
  );

  return (
    <PinnedScrollSection
      id="the-crack"
      variant="crack"
      title="The Crack"
      stops={STOPS}
      textSide="right"
      visual={scrubVisual}
      fallbackVisual={fallbackVisual}
      onScrub={handleScrub}
    />
  );
}
