import { ArrowUpRight } from "lucide-react";

export const DEMO_HREF = "mailto:shashank@zimmy.art?subject=Zimmy%20demo";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 font-display text-[36px] font-bold leading-[1.02] tracking-[-0.035em] text-snow sm:text-[52px]">
        {title}
      </h2>
      {sub ? (
        <p
          className={`mt-5 text-[16.5px] leading-relaxed text-muted sm:text-[18px] ${
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function PrimaryButton({
  href = DEMO_HREF,
  children = "Book a demo",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_40px_-10px_rgb(255_77_61/0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#ff5f50] ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3.5 text-[15px] font-semibold text-snow transition-all hover:-translate-y-0.5 hover:bg-white/[0.07] ${className}`}
    >
      {children}
    </a>
  );
}
