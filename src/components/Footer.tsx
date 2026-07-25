import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-display text-lg font-semibold tracking-wide text-text">FISSURE</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Oversized, slow-baked cookies built around molten centres, deep textures and the perfect break.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Site</span>
              <a href="#the-crack" className="text-sm text-muted hover:text-text">The Crack</a>
              <a href="#ingredients" className="text-sm text-muted hover:text-text">Ingredients</a>
              <a href="#the-break" className="text-sm text-muted hover:text-text">The Break</a>
              <a href="#flavours" className="text-sm text-muted hover:text-text">Flavours</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Contact</span>
              <a href="mailto:hello@fissure.cookies" className="text-sm text-muted hover:text-text">
                hello@fissure.cookies
              </a>
              <div className="flex gap-4 pt-1">
                <a href="#" aria-label="Fissure on Instagram" className="text-muted hover:text-text">
                  <InstagramLogo size={20} weight="light" />
                </a>
                <a href="#" aria-label="Fissure on TikTok" className="text-muted hover:text-text">
                  <TiktokLogo size={20} weight="light" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Fissure Cookie Co.</span>
          <span>A Nexora original.</span>
        </div>
      </div>
    </footer>
  );
}
