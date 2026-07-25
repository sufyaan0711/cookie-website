import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

/**
 * Cookie sits roughly centred in the source footage (x 40-73%, y 16-75% of
 * the 1920x1080 frame). On mobile/tablet, cover-cropping only leaves a
 * narrow horizontal slice regardless of object-position, so those tiers
 * just keep the cookie centred in that slice. Desktop crops much less
 * (video and viewport aspect are close), which leaves room to shift the
 * crop well past the cookie so the left third of the frame is clean for
 * the headline instead of sitting over it — tuned empirically against the
 * actual footage, not derived from the source percentages above.
 * Vertical bias (44-50%) keeps the copy's clean band from being cropped
 * away on short/ultra-wide desktop viewports.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [reduce]);

  return (
    <section id="top" className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[52%_48%] lg:object-[-40%_44%]"
          autoPlay={!reduce}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/fissure-hero.mp4" type="video/mp4" />
        </video>

        {/* Soft edge mask: blends the video's own dark background into the
            page background at the outer edges only, no full-frame wash. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg) 0%, transparent 7%, transparent 93%, var(--color-bg) 100%), linear-gradient(to bottom, var(--color-bg) 0%, transparent 4%, transparent 100%)",
          }}
        />

        {/* Just enough top scrim to keep the nav readable over a bright frame. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/65 to-transparent" />

        {/* Text/legibility scrim, strongest where the copy actually sits.
            Mobile crops in tight on the cookie (little side clearance), so
            the band is taller and darker there; desktop copy already lives
            in clean negative space beside the cookie, so this just needs to
            carry the gentle fade into the next section. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-bg/85 via-bg/35 to-transparent sm:h-[42%] sm:from-bg/70 sm:via-bg/20 lg:h-[32%] lg:from-bg/55 lg:via-bg/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-5"
        >
          Baked to break
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text xs:text-5xl sm:text-6xl lg:text-7xl"
        >
          Break into
          <br />
          something better.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
        >
          Crisp at the edge. Molten at the centre. Cookies engineered for the perfect break.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <a
            href="#flavours"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
          >
            Explore the flavours
          </a>
          <a
            href="#the-break"
            className="group flex items-center gap-2 text-sm font-medium text-text"
          >
            See the break
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
