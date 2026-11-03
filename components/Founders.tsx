import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const FOUNDERS = [
  {
    name: "Abhisha Shrivastava",
    role: "Co-founder",
    photo: "/abhisha.jpg",
    linkedin: "https://www.linkedin.com/in/abhisha-shrivastava-2b210132/",
    creds: [
      "Led global go-to-market at Emergent",
      "Ran about $2M a month in creator marketing",
      "ex-Senior Director of Growth, Trell",
      "ex-Director of Growth, Jupiter",
      "IIT Bombay, B.Tech",
    ],
  },
  {
    name: "Shashank Dixit",
    role: "Co-founder",
    photo: "/founder.jpg",
    linkedin: "https://www.linkedin.com/in/shashankdixitt/",
    creds: ["Automated Emergent's creator pipeline", "IIT Madras, BS degree", "ex-Entrepreneur First"],
  },
];

const STATS = [
  { n: "$90M+", t: "a year in marketing spend, with the creator pipeline and analytics built by Shashank." },
  { n: "$2M", t: "a month in creator spend, across about 1,000 creators." },
];

export default function Founders() {
  return (
    <section id="founder" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Built by operators.
                <br />
                Not just tool-makers.
              </>
            }
          />
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <a
              key={f.name}
              href={f.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid overflow-hidden rounded-[26px] border border-line bg-surface transition-colors hover:border-ink/20 sm:grid-cols-[0.95fr_1fr]"
            >
              <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[340px]">
                <Image
                  src={f.photo}
                  alt={`${f.name}, co-founder of HitRate`}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover object-[center_30%]"
                />
              </div>
              <div className="flex flex-col p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-sky px-3 py-1 text-[12px] font-medium text-[#235a80]">{f.role}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="display mt-auto pt-8 text-[30px] text-ink">{f.name}</h3>
                <p className="mt-1 text-[14px] text-muted">Say hi on LinkedIn</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {f.creds.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[14px] text-ink/85">
                      <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}

          <div className="flex flex-col justify-between rounded-[26px] border border-[#2c4a3c] bg-night p-7 text-white sm:p-8 md:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-white/70">Founder track record, together at Emergent</p>
              <span className="rounded-full bg-accent-bright px-3 py-1 text-[12px] font-medium text-[#05130d]">
                Before HitRate
              </span>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {STATS.map((s) => (
                <div key={s.n}>
                  <p className="text-[64px] font-semibold leading-none tracking-[-0.04em] sm:text-[80px]">{s.n}</p>
                  <p className="mt-4 max-w-xs border-t border-white/10 pt-4 text-[14.5px] text-white/70">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
