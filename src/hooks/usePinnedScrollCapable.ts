import { useEffect, useState } from "react";

const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * True only when the viewport is wide enough AND the user hasn't asked for
 * reduced motion — the gate for every pinned/scrubbed cinematic sequence.
 * Everything else gets the static stacked fallback.
 */
export function usePinnedScrollCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setCapable(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCapable(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return capable;
}
