import { motion } from "motion/react";

type Ingredient = {
  name: string;
  note: string;
  gradient: string;
  span: string;
};

const INGREDIENTS: Ingredient[] = [
  {
    name: "Single-origin cocoa",
    note: "62% dark couverture, melted into the dough in ribbons rather than folded in as chips, so every third bite finds a molten seam.",
    gradient: "linear-gradient(150deg, #2a1712 0%, #1a100d 55%, #100b0a 100%)",
    span: "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  },
  {
    name: "Cultured butter",
    note: "Browned first, then cooled and re-whipped for a deeper, nuttier crumb.",
    gradient: "linear-gradient(150deg, #4a3111 0%, #241a0c 100%)",
    span: "lg:col-span-3",
  },
  {
    name: "Whole vanilla bean",
    note: "Scraped, not extracted. You'll see the flecks.",
    gradient: "radial-gradient(circle at 30% 30%, #2c2a26 0%, #17161a 70%)",
    span: "lg:col-span-2",
  },
  {
    name: "Flaked sea salt",
    note: "Finished by hand after baking, while the centre is still soft enough to hold it.",
    gradient: "linear-gradient(160deg, #2a2c30 0%, #17181c 100%)",
    span: "lg:col-span-1",
  },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="border-t border-border bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">
            Four ingredients, no shortcuts.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Everything else is technique. We keep the list short so each one has to earn its place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {INGREDIENTS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`relative min-h-[220px] overflow-hidden border border-border p-7 ${item.span}`}
              style={{ background: item.gradient }}
            >
              <h3 className="font-display text-xl font-semibold text-text">{item.name}</h3>
              <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
