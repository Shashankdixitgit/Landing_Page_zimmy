import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import BrandJoinForm from "@/components/BrandJoinForm";
import FormBackdrop from "@/components/FormBackdrop";

export const metadata: Metadata = {
  title: "Join HitRate as an app team",
  description: "Eight quick questions so we can show you the videos and ads already winning for apps like yours.",
  robots: { index: false },
};

export default async function BrandJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ website?: string | string[] }>;
}) {
  // /v10 sends the link the visitor typed into its "enter your website" box.
  const q = (await searchParams).website;
  const initialWebsite = (Array.isArray(q) ? q[0] : q)?.slice(0, 300);
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
            <BrandJoinForm initialWebsite={initialWebsite} />
          </FormBackdrop>
        </div>
      </main>
    </>
  );
}
