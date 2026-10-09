import Reveal from "./Reveal";
import { Chip, OutlineButton, SplitHead } from "./ui";

const WEEK = [
  ["Mon", "Hook test"],
  ["Tue", "Reel"],
  ["Wed", "Rest"],
  ["Thu", "Remake"],
  ["Fri", "Series ep. 2"],
];

export default function Creators() {
  return (
    <section id="creators" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Making videos?
                <br />
                Zimmy works for you too.
              </>
            }
            sub="Brands on Zimmy brief creators with ideas that are already working. That makes your job easier and your posts stronger."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-px overflow-hidden rounded-[26px] bg-[#cfe2ef] md:grid-cols-2">
            <div className="flex flex-col bg-sky p-7 sm:p-9">
              <Chip tone="mint">Live</Chip>
              <h3 className="display mt-5 text-[28px] text-ink">Paid brand deals.</h3>
              <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink/70">
                Brands use Zimmy to find creators whose audience fits. You get a clear brief, agreed
                terms and a tracking link, all in one place.
              </p>
              <OutlineButton
                href="mailto:shashank@zimmy.art?subject=Zimmy%20creator%20list"
                className="mt-auto self-start pt-3"
              >
                Join the creator list
              </OutlineButton>
            </div>
            <div className="flex flex-col bg-[#eef6fb] p-7 sm:p-9">
              <Chip>Coming soon</Chip>
              <h3 className="display mt-5 text-[28px] text-ink">A calendar built on what works.</h3>
              <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink/70">
                A weekly plan of video ideas based on outliers in your niche, so you grow your views
                on purpose.
              </p>
              <div className="mt-6 grid grid-cols-5 gap-1.5">
                {WEEK.map(([d, t]) => (
                  <div key={d} className={`rounded-xl px-2 py-3 text-center ${t === "Rest" ? "bg-white/50" : "bg-surface"}`}>
                    <p className="text-[11px] text-muted">{d}</p>
                    <p className="mt-1 text-[11.5px] font-medium leading-tight text-ink">{t}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11.5px] text-muted">Illustrative example</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
