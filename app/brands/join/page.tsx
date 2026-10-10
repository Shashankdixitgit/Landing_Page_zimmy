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
    <FormBackdrop video="brand-bg">
      <main className="min-h-screen px-3 pb-16 pt-5 sm:px-5 sm:pt-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-2">
          <Link href="/" aria-label="Zimmy home">
            <Logo />
          </Link>
          <Link href="/" className="text-[14px] font-medium text-ink/70 hover:text-ink">
            Exit
          </Link>
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-[28px] bg-white/85 px-5 py-10 shadow-[0_30px_80px_-40px_rgb(25_41_45/0.4)] backdrop-blur-xl sm:mt-12 sm:px-12 sm:py-14">
          <BrandJoinForm />
        </div>
      </main>
    </FormBackdrop>
  );
}
