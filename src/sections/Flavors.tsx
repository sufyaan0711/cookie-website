type Flavour = {
  name: string;
  note: string;
  price: string;
  gradient: string;
};

const FLAVOURS: Flavour[] = [
  {
    name: "Salted Dark Chocolate",
    note: "62% cocoa ribbon, flaked sea salt, browned butter base.",
    price: "£4.50",
    gradient: "linear-gradient(160deg, #2a1712 0%, #100b0a 100%)",
  },
  {
    name: "Brown Butter Pecan",
    note: "Toasted pecans folded through a deeply browned butter dough.",
    price: "£4.75",
    gradient: "linear-gradient(160deg, #4a3111 0%, #241a0c 100%)",
  },
  {
    name: "Espresso Chunk",
    note: "Whole espresso beans, dark chocolate chunks, no added bitterness.",
    price: "£4.75",
    gradient: "linear-gradient(160deg, #2c211d 0%, #14100e 100%)",
  },
  {
    name: "Miso Caramel",
    note: "White miso caramel core with a faint umami edge.",
    price: "£4.95",
    gradient: "linear-gradient(160deg, #3a2a14 0%, #1c150b 100%)",
  },
  {
    name: "Classic Molten",
    note: "The one that started it. Dark chocolate, vanilla bean, sea salt.",
    price: "£4.25",
    gradient: "linear-gradient(160deg, #26201c 0%, #16151780 55%, #121113 100%)",
  },
];

export function Flavors() {
  return (
    <section id="flavours" className="border-t border-border bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">The lineup.</h2>
          <p className="hidden max-w-xs text-sm text-muted sm:block">
            Five cookies. Each one built around its own idea of a centre.
          </p>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FLAVOURS.map((flavour) => (
            <div
              key={flavour.name}
              className="relative min-h-[260px] w-[74vw] shrink-0 snap-start border border-border p-6 sm:w-[320px]"
              style={{ background: flavour.gradient }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text">{flavour.name}</h3>
                  <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted">{flavour.note}</p>
                </div>
                <span className="font-mono text-sm text-accent">{flavour.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
