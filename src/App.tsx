import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { TheCrack } from "./sections/TheCrack";
import { Ingredients } from "./sections/Ingredients";
import { TheBreak } from "./sections/TheBreak";
import { Craft } from "./sections/Craft";
import { Flavors } from "./sections/Flavors";
import { FinalCta } from "./sections/FinalCta";

function GrainOverlay() {
  return (
    <svg className="film-grain" aria-hidden="true">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

function App() {
  return (
    <>
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <TheCrack />
        <Ingredients />
        <TheBreak />
        <Craft />
        <Flavors />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;
