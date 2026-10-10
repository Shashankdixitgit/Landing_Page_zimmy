import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import BrandJoinForm from "@/components/BrandJoinForm";
import FormBackdrop from "@/components/FormBackdrop";

export const metadata: Metadata = {
  title: "Join Zimmy as a brand",
  description: "Eight quick questions so we can show you what's already working in your niche.",
  robots: { index: false },
};

export default function BrandJoinPage() {
  return (
    <>
      <main className="min-h-screen px-3 pb-16 pt-5 sm:px-5 sm:pt-8">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-2">
          <Link href="/" aria-label="Zimmy home">
            <Logo />
          </Link>
          <Link href="/" className="text-[14px] font-medium text-ink/70 hover:text-ink">
            Exit
          </Link>
        </div>
        <div className="mt-8 sm:mt-12">
          <FormBackdrop demo="brand-demo" title="From brief to results in one place." points={["Find creators whose audience fits", "Approve, reach out and track every deal", "Scripts written from what already works", "See clicks, conversions and revenue"]}>
            <BrandJoinForm />
          </FormBackdrop>
        </div>
      </main>
    </>
  );
}
