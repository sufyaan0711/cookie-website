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

export function TheBreak() {
  return (
    <PinnedScrollSection id="the-break" variant="break" title="The Break" stops={STOPS} textSide="left" />
  );
}
