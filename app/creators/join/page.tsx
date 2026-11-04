import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import CreatorJoinForm from "@/components/CreatorJoinForm";
import FormBackdrop from "@/components/FormBackdrop";

export const metadata: Metadata = {
  title: "Join HitRate as a creator",
  description: "Enter your username to see your numbers, your top posts and who comments, then plan your next 60 days of content.",
  robots: { index: false },
};

export default async function JoinPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { u } = await searchParams;
  const link = typeof u === "string" ? u.slice(0, 200) : "";
  return (
    <>
    <main className="min-h-screen px-3 pb-16 pt-5 sm:px-5 sm:pt-8">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-2">
        <Link href="/creators" aria-label="HitRate for creators">
          <Logo />
        </Link>
        <Link href="/creators" className="text-[14px] font-medium text-ink/70 hover:text-ink">
          Exit
        </Link>
      </div>
      <div className="mt-8 sm:mt-12">
        <FormBackdrop
          title="How HitRate works for you."
          points={[
            "See your followers, views, engagement and an estimated price per post",
            "See who comments and what they ask for",
            "Plan your next 60 days of content, first 7 days free",
            "Be first in line for brand deals that fit your audience (coming soon)",
          ]}
        >
          <CreatorJoinForm initialLink={link} />
        </FormBackdrop>
      </div>
    </main>
    </>
  );
}
