import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const LEGAL_EMAIL = "shashankdixit099@gmail.com";
export const LEGAL_UPDATED = "4 November 2026";

export type Section = { h: string; body: React.ReactNode };

export default function LegalPage({ title, intro, sections }: { title: string; intro: React.ReactNode; sections: Section[] }) {
  return (
    <>
      <Navbar overHero={false} />
      <main className="px-5 pb-20 pt-32 sm:pt-40">
        <article className="mx-auto max-w-[720px]">
          <p className="text-[13px] text-faint">Last updated {LEGAL_UPDATED}</p>
          <h1 className="display mt-3 text-[34px] text-ink sm:text-[46px]">{title}</h1>
          <div className="mt-5 text-[16px] leading-relaxed text-muted">{intro}</div>
          {sections.map((s, i) => (
            <section key={s.h} className="mt-10">
              <h2 className="text-[19px] font-medium text-ink">{i + 1}. {s.h}</h2>
              <div className="legal mt-3 space-y-3 text-[15.5px] leading-relaxed text-muted">{s.body}</div>
            </section>
          ))}
          <p className="mt-12 border-t border-line pt-6 text-[14px] text-muted">
            Questions? Email <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
