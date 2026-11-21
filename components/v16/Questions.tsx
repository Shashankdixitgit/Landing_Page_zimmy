import { Plus } from "lucide-react";
import Reveal from "../v15/Reveal";

/**
 * /v16's questions block. It started as a copy of components/v15/Questions.tsx
 * (/v15 keeps its own, unchanged); this one has no default answers, since /v16
 * always passes its own (components/v16/ChatHome.tsx), and takes an `id`.
 *
 * `id` gives the section an anchor (/v16 uses "faq").
 */
export default function Questions({ items, id }: { items: { q: string; a: string }[]; id?: string }) {
  return (
    <section id={id} className="px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[680px]">
        <h2 className="serif text-center text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">Questions</h2>
        <div className="mt-10 divide-y divide-[var(--bd-line)] border-y border-[var(--bd-line)]">
          {items.map(({ q, a }) => (
            <details key={q} className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[16px] font-medium text-[var(--bd-ink)]">
                {q}
                <Plus className="bd-plus h-4 w-4 shrink-0 text-[var(--bd-muted)] transition-transform duration-200" aria-hidden />
              </summary>
              <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-[var(--bd-muted)]">{a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
