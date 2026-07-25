import { useCallback, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { PinnedScrollSection } from "../components/PinnedScrollSection";

const STOPS = [
  {
    headline: "Snap, not shatter.",
    body: "A clean fracture across the middle, with just enough resistance to feel deliberate.",
  },
  {
    headline: "The centre holds longest.",
    body: "Everything around it has already cooled by the time the core is ready to eat.",
  },
  {
    headline: "Best shared. Rarely is.",
    body: "One cookie, two halves, an argument over who got the bigger piece.",
  },
];

/** Same framed-panel treatment as The Crack's stage, but 16/9 (the
 *  source footage's native aspect) rather than 16/11: the snap throws
 *  the two halves out almost to the full frame edges (measured across
 *  the footage: x/y both reach ~0-100% at the peak), so matching the
 *  video's own aspect avoids cropping any of it instead of fighting a
 *  narrower box with object-position. */
function StageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-surface">
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 2.75rem 1.1rem var(--color-surface)" }}
      />
    </div>
  );
}

export function TheBreak() {
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
        poster="/images/break-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/fissure-break.mp4" type="video/mp4" />
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
          src="/images/break-final.jpg"
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
          poster="/images/break-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/fissure-break.mp4" type="video/mp4" />
        </video>
      )}
    </StageFrame>
  );

  return (
    <PinnedScrollSection
      id="the-break"
      variant="break"
      title="The Break"
      stops={STOPS}
      textSide="left"
      visual={scrubVisual}
      fallbackVisual={fallbackVisual}
      onScrub={handleScrub}
    />
  );
}
