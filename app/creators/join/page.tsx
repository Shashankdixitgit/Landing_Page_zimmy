import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import CreatorJoinForm from "@/components/CreatorJoinForm";

export const metadata: Metadata = {
  title: "Join Zimmy as a creator",
  description: "Eight quick questions so we can match you with brand deals that fit your audience.",
  robots: { index: false },
};

export default function JoinPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-6 sm:pt-8">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <Link href="/creators" aria-label="Zimmy for creators">
          <Logo />
        </Link>
        <Link href="/creators" className="text-[14px] font-medium text-muted hover:text-ink">
          Exit
        </Link>
      </div>
      <div className="mt-12 sm:mt-16">
        <CreatorJoinForm />
      </div>
    </main>
  );
}
