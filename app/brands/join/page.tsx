import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import BrandJoinForm from "@/components/BrandJoinForm";
import { BRAND_STEPS } from "@/lib/brandForm";
import FormBackdrop from "@/components/FormBackdrop";

export const metadata: Metadata = {
  title: "Join HitRate as an app team",
  description: "Eight quick questions so we can show you the videos and ads already winning for apps like yours.",
  robots: { index: false },
};

/** Options a select will actually accept, so a bad query value can't blank the field. */
function optionsFor(id: string): string[] {
  for (const step of BRAND_STEPS) {
    const f = step.fields.find((x) => x.id === id);
    if (f?.options) return f.options;
  }
  return [];
}

export default async function BrandJoinPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // /v10 reads the visitor's website itself and sends what it found, so the form
  // starts filled in and never repeats the same lookup.
  const q = await searchParams;
  const one = (k: string) => {
    const v = q[k];
    return (Array.isArray(v) ? v[0] : v)?.trim().slice(0, 300) || undefined;
  };
  const pick = (k: string, id: string) => {
    const v = one(k);
    return v && optionsFor(id).includes(v) ? v : undefined;
  };
  const initialAnswers = Object.fromEntries(
    Object.entries({
      website: one("website"),
      brand_name: one("brand_name"),
      category: pick("category", "category"),
      country: pick("country", "country"),
      // /v16 carries a question asked in its chat box, so the founders see it.
      notes: one("notes"),
    }).filter(([, v]) => v),
  ) as Record<string, string>;

  return (
    <>
      <main className="min-h-screen px-3 pb-16 pt-5 sm:px-5 sm:pt-8">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-2">
          <Link href="/" aria-label="HitRate home">
            <Logo />
          </Link>
          <Link href="/" className="text-[14px] font-medium text-ink/70 hover:text-ink">
            Exit
          </Link>
        </div>
        <div className="mt-8 sm:mt-12">
          <FormBackdrop title="Find, test and scale in one place." points={["Your competitors’ winning videos and ads", "A summary of your store reviews", "AI-written scripts and a content calendar", "AI UGC tests in early access; scaling with UGC, creators and paid ads coming soon"]}>
            <BrandJoinForm initialAnswers={Object.keys(initialAnswers).length ? initialAnswers : undefined} />
          </FormBackdrop>
        </div>
      </main>
    </>
  );
}
