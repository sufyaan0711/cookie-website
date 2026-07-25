import { motion } from "motion/react";

const STATS = [
  { value: "18h", label: "cold ferment before baking" },
  { value: "62%", label: "single-origin dark cocoa" },
  { value: "212°F", label: "at the molten centre" },
];

export function Craft() {
  return (
    <section id="craft" className="border-t border-border bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl font-semibold text-text sm:text-4xl"
        >
          Baked in small batches, broken on purpose.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg"
        >
          A long cold ferment develops the flavour before the oven ever gets involved. We under-bake the
          centre on purpose, so it keeps working after it leaves the tray. What you get is a shell that
          holds its shape and a core that doesn't.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 flex max-w-md items-stretch justify-center divide-x divide-border"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex-1 px-6 first:pl-0 last:pr-0">
              <div className="font-mono text-2xl font-medium text-accent sm:text-3xl">{stat.value}</div>
              <div className="mt-2 text-xs leading-snug text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
