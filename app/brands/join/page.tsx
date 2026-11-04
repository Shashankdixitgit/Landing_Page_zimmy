import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import BrandJoinForm from "@/components/BrandJoinForm";
import FormBackdrop from "@/components/FormBackdrop";

export const metadata: Metadata = {
  title: "Join HitRate as a brand",
  description: "Eight quick questions so we can show you what's already working in your category.",
  robots: { index: false },
};

export default function BrandJoinPage() {
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
          <FormBackdrop title="Find, test and scale in one place." points={["Your competitors’ winning videos and ads", "A summary of your store reviews", "AI-written scripts and a content calendar", "AI UGC tests and creator scale-up, in early access"]}>
            <BrandJoinForm />
          </FormBackdrop>
        </div>
      </main>
    </>
  );
}
