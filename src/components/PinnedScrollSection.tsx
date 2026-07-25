import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { gsap } from "../lib/gsap";
import { usePinnedScrollCapable } from "../hooks/usePinnedScrollCapable";
import { FissureSeam } from "./FissureSeam";

export type ScrollStop = {
  headline: string;
  body: string;
};

type PinnedScrollSectionProps = {
  id: string;
  variant: "crack" | "break";
  title: string;
  stops: ScrollStop[];
  /** Text column side on desktop; the visual takes the other side. */
  textSide?: "left" | "right";
  /** Overrides the default abstract FissureSeam visual in the pinned stage. */
  visual?: ReactNode;
  /** Overrides the default static FissureSeam visual in the mobile/reduced-motion fallback. */
  fallbackVisual?: ReactNode;
  /** Raw scroll progress (0-1) on every scrub tick, only while pinned — lets a
   *  visual (e.g. a scroll-scrubbed video) sync itself independently of the
   *  eased text-crossfade timeline below. */
  onScrub?: (progress: number) => void;
};

/**
 * Shared architecture for "The Crack" and "The Break." On capable viewports
 * this pins the stage and scrubs the visual + text stops to scroll position.
 * On mobile / reduced-motion it renders a normal static stack instead —
 * no pin, no scrub, same copy.
 *
 * The default visual is intentionally abstract (see FissureSeam) so this
 * slot can be swapped for a Three.js scene, a video, or a scroll-controlled
 * image sequence without touching the scroll or copy architecture — pass
 * `visual`/`fallbackVisual` to do so per section.
 */
export function PinnedScrollSection({
  id,
  variant,
  title,
  stops,
  textSide = "right",
  visual,
  fallbackVisual,
  onScrub,
}: PinnedScrollSectionProps) {
  const capable = usePinnedScrollCapable();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const onScrubRef = useRef(onScrub);
  onScrubRef.current = onScrub;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || !capable) return;

    const ctx = gsap.context(() => {
      const stopEls = gsap.utils.toArray<HTMLElement>(".scroll-stop", section);
      const panelA = section.querySelectorAll<HTMLElement>(".seam-panel-a");
      const panelB = section.querySelectorAll<HTMLElement>(".seam-panel-b");
      const glow = section.querySelectorAll<HTMLElement>(".seam-glow");
      const crumbs = section.querySelectorAll<HTMLElement>(".seam-crumb");

      gsap.set(stopEls, { autoAlpha: 0, y: 24 });
      gsap.set(stopEls[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin,
          anticipatePin: 1,
          onUpdate: (self) => onScrubRef.current?.(self.progress),
        },
      });

      if (variant === "crack") {
        tl.to(panelA, { yPercent: -10, ease: "none" }, 0);
        tl.to(panelB, { yPercent: 10, ease: "none" }, 0);
      } else {
        tl.to(panelA, { xPercent: -7, yPercent: -3, ease: "none" }, 0);
        tl.to(panelB, { xPercent: 7, yPercent: 3, ease: "none" }, 0);
        crumbs.forEach((crumb, i) => {
          const angle = (i / crumbs.length) * Math.PI * 2;
          tl.to(crumb, { x: Math.cos(angle) * 46, y: Math.sin(angle) * 30, opacity: 1, ease: "none" }, 0);
        });
      }
      tl.to(glow, { opacity: 1, ease: "none" }, 0);

      stopEls.forEach((el, i) => {
        if (i === 0) return;
        const start = i / stopEls.length;
        tl.to(stopEls[i - 1], { autoAlpha: 0, y: -24, duration: 0.12 }, start - 0.06);
        tl.to(el, { autoAlpha: 1, y: 0, duration: 0.12 }, start);
      });
    }, section);

    return () => ctx.revert();
  }, [capable, variant]);

  const resolvedVisual = visual ?? <FissureSeam variant={variant} />;
  const resolvedFallbackVisual = fallbackVisual ?? <FissureSeam variant={variant} staticProgress={0.55} />;

  if (!capable) {
    return (
      <section id={id} className="border-t border-border py-20 xs:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">{resolvedFallbackVisual}</div>
          <div className="space-y-14">
            {stops.map((stop) => (
              <motion.div
                key={stop.headline}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl"
              >
                <h3 className="text-2xl font-semibold text-text sm:text-3xl">{stop.headline}</h3>
                <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted">{stop.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const textOrder = textSide === "right" ? "md:order-2" : "md:order-1";
  const visualOrder = textSide === "right" ? "md:order-1" : "md:order-2";

  return (
    <div ref={sectionRef} id={id} className="relative" style={{ height: `${(stops.length + 1) * 100}vh` }}>
      <div ref={pinRef} className="flex min-h-[100dvh] items-center border-t border-border bg-bg">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
          <div className={visualOrder}>{resolvedVisual}</div>
          <div className={`relative min-h-[180px] ${textOrder}`}>
            <span className="sr-only">{title}</span>
            {stops.map((stop) => (
              <div key={stop.headline} className="scroll-stop absolute inset-0 flex flex-col justify-center">
                <h3 className="text-3xl font-semibold text-text sm:text-4xl">{stop.headline}</h3>
                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">{stop.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
