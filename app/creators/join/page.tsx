import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import CreatorJoinForm from "@/components/CreatorJoinForm";
import FormBackdrop from "@/components/FormBackdrop";

export const metadata: Metadata = {
  title: "Join Zimmy as a creator",
  description: "Eight quick questions so we can match you with brand deals that fit your audience.",
  robots: { index: false },
};

export default function JoinPage() {
  return (
    <>
    <main className="min-h-screen px-3 pb-16 pt-5 sm:px-5 sm:pt-8">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-2">
        <Link href="/creators" aria-label="Zimmy for creators">
          <Logo />
        </Link>
        <Link href="/creators" className="text-[14px] font-medium text-ink/70 hover:text-ink">
          Exit
        </Link>
      </div>
      <div className="mt-8 sm:mt-12">
        <FormBackdrop demo="creator-demo" note="Illustrative example. Brand names and amounts are made up." title="How Zimmy works for you." points={["Join in 3 minutes, autofilled from your profile", "Get matched with brands that fit your audience", "Get a clear brief in your own voice", "Post, grow and get paid on time"]}>
          <CreatorJoinForm />
        </FormBackdrop>
      </div>
    </main>
    </>
  );
}
