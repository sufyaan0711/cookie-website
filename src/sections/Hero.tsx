import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

/**
 * Hero stands ready for /public/videos/fissure-hero.mp4 (with a matching
 * /public/images/hero-poster.jpg poster). Until those exist, the layered
 * gradient stage below is the deliverable — a premium dark placeholder,
 * not a stock photo or a fake cookie render.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 38%, #26201c 0%, #16151780 55%, #121113 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(38% 30% at 50% 42%, var(--color-accent-soft) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-transparent" />

        <video
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          onLoadedData={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <source src="/videos/fissure-hero.mp4" type="video/mp4" />
        </video>
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
