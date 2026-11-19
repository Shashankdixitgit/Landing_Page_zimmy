import Link from "next/link";
import { LogoMark } from "../Logo";
import { CREATOR_HREF, DEMO_HREF } from "../ui";

/** A quiet top bar over the sky: the mark and name on the left, two links on the right. */
export function Nav({ home = "/v15" }: { home?: string }) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:h-[72px]">
        <Link href={home} className="inline-flex items-center gap-1.5" aria-label="HitRate home">
          <LogoMark className="h-7 w-7" />
          <span className="serif text-[22px] text-[var(--bd-ink)]">HitRate</span>
        </Link>
        <nav className="flex items-center gap-5 text-[14px]">
          <Link href={CREATOR_HREF} className="hidden text-[var(--bd-text)] hover:text-black sm:inline">
            For creators
          </Link>
          <a
            href={DEMO_HREF}
            className="rounded-full bg-white/70 px-4 py-2 font-medium text-[var(--bd-ink)] shadow-[0_0_0_1px_rgb(17_17_17/0.08)] backdrop-blur-md transition-colors hover:bg-white"
          >
            Book a demo
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-5 text-[13px] text-[var(--bd-muted)] sm:flex-row">
        <span className="inline-flex items-center gap-1.5">
          <LogoMark className="h-5 w-5" />
          <span className="serif text-[16px] text-[var(--bd-ink)]">HitRate</span>
          <span className="ml-2">© 2026</span>
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
          <Link href={CREATOR_HREF} className="hover:text-[var(--bd-ink)]">For creators</Link>
          <Link href="/pricing" className="hover:text-[var(--bd-ink)]">Pricing</Link>
          <Link href="/privacy" className="hover:text-[var(--bd-ink)]">Privacy</Link>
          <Link href="/terms" className="hover:text-[var(--bd-ink)]">Terms</Link>
          <a href={DEMO_HREF} className="hidden hover:text-[var(--bd-ink)] sm:inline">Book a demo</a>
        </nav>
      </div>
    </footer>
  );
}
