import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "#the-crack", label: "The Crack" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#the-break", label: "The Break" },
  { href: "#flavours", label: "Flavours" },
];

const CTA_LABEL = "Explore the flavours";

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" />
      <path
        d="M9 13L14 16.5L11.5 20.5L18 18L16 23.5"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-text">
          <Mark />
          FISSURE
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#flavours"
          className="hidden shrink-0 whitespace-nowrap rounded-sm bg-accent px-4 py-2 font-body text-sm font-medium text-bg transition-transform active:scale-[0.98] md:inline-block"
        >
          {CTA_LABEL}
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-text md:hidden"
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg px-6 py-8 md:hidden">
          <ul className="flex flex-col gap-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-lg text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#flavours"
            onClick={() => setOpen(false)}
            className="mt-8 block rounded-sm bg-accent px-4 py-3 text-center font-body text-sm font-medium text-bg"
          >
            {CTA_LABEL}
          </a>
        </div>
      )}
    </header>
  );
}
