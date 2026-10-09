import { ArrowRight, ArrowUpRight } from "lucide-react";

export const DEMO_HREF = "mailto:shashank@zimmy.art?subject=Zimmy%20demo";
export const CREATOR_HREF = "https://creator.zimmy.art";

/** Two-line headline on the left, supporting copy on the right. */
export function SplitHead({
  title,
  sub,
  wide = false,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
      <h2 className={`display text-[38px] text-ink sm:text-[52px] ${wide ? "max-w-3xl" : "max-w-2xl"}`}>{title}</h2>
      {sub ? (
        <p className="max-w-[23rem] text-[15.5px] leading-relaxed text-muted lg:pb-2">{sub}</p>
      ) : null}
    </div>
  );
}

export function PrimaryButton({
  href = DEMO_HREF,
  children = "Book a demo",
  className = "",
  wide = false,
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-accent-hover ${
        wide ? "w-full py-3.5" : ""
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

export function OutlineButton({
  href,
  children,
  className = "",
  wide = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border border-line bg-surface px-6 py-3 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-ink/25 ${
        wide ? "w-full py-3.5" : ""
      } ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-accent">
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

export function Chip({ children, tone = "soft" }: { children: React.ReactNode; tone?: "soft" | "mint" | "sky" }) {
  const bg = tone === "mint" ? "bg-mint text-accent" : tone === "sky" ? "bg-sky text-[#235a80]" : "bg-soft text-muted";
  return <span className={`inline-flex rounded-md px-2 py-0.5 text-[11.5px] font-medium ${bg}`}>{children}</span>;
}
