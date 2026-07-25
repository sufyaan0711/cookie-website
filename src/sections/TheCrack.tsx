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

export function TheCrack() {
  return (
    <PinnedScrollSection id="the-crack" variant="crack" title="The Crack" stops={STOPS} textSide="right" />
  );
}
