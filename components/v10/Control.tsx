import { Eye, RotateCcw, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Your yes, every time",
    body: "Every script, every video and every post waits for your approval. Nothing goes out in your name on its own.",
  },
  {
    icon: Eye,
    title: "You can see the why",
    body: "Each answer says which winning videos it came from, so you are judging a reason, not a black box.",
  },
  {
    icon: RotateCcw,
    title: "Say it again, differently",
    body: "Don’t like the hook? Ask for another one in the same thread. It keeps the context.",
  },
];

export default function Control() {
  return (
    <section id="control" className="px-2 sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-night px-5 py-20 sm:rounded-[36px] sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(92_207_152/0.14),transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="display max-w-2xl text-[38px] text-white sm:text-[52px]">
              A chat box, not
              <br />
              a loose cannon.
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/60">
              The box does the work. You still make the calls — which is the only way an app team can hand its marketing
              to software and sleep.
            </p>
          </Reveal>

          <Reveal stagger={0.1} className="mt-14 grid gap-3 md:grid-cols-3">
            {POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-accent-bright">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-medium tracking-[-0.015em] text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/55">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
