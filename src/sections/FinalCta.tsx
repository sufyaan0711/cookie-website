import { motion } from "motion/react";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(45% 60% at 50% 100%, var(--color-accent-soft) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-semibold text-text sm:text-5xl"
        >
          Ready to break one open.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          Baked to order, boxed warm, gone by the time you've read this twice.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          href="#flavours"
          className="mt-10 inline-block rounded-sm bg-accent px-7 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
        >
          Explore the flavours
        </motion.a>
      </div>
    </section>
  );
}
