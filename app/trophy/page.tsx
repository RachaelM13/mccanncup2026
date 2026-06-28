import Header from "@/components/layout/Header";
import TrophyHero from "@/components/trophy/TrophyHero";

export const metadata = {
  title: "The McCann Cup | Rachael's World Cup 2026",
};

export default function TrophyPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-8 pb-28 sm:pb-12 text-center">
        {/* Title */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Est. 2026 · Highly Prestigious · Very Official
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-2">
            Rachael's World Cup 2026 Bracket Challenge
          </h1>
          <p className="text-[#F59E0B] font-semibold text-lg">
            One Trophy to Rule Them All
          </p>
        </div>

        {/* Floating image */}
        <div className="mb-10">
          <TrophyHero />
        </div>

        {/* Body */}
        <div className="space-y-6 text-left">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-lg font-black text-white mb-2">
              Welcome, one and all. 👋
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to the most consequential sporting event you have ever
              witnessed. No, not the FIFA World Cup.
              <span className="text-white font-semibold">
                {" "}
                This is Rachael's World Cup 2026 Bracket Challenge
              </span>{" "}
              I have built this website instead of packing to leave for
              California because I want to know who in this family will
              ultimately claim the title of champion.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Enough about me, though.{" "}
              <span className="text-white font-semibold">
                {" "}
                This is about you.
              </span>{" "}
              YOU the one who thinks they can predict the outcome of every match
              in the 2026 FIFA World Cup. You, the one who thinks they can
              outsmart the odds and emerge victorious.
              <span className="text-white font-semibold">
                {" "}
                Think you know football? Think your gut instinct is better than
                everyone else&apos;s? Think your dark horse can go all the way?
                Prove it.
              </span>{" "}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F59E0B]/40 bg-[#F59E0B]/5 p-6">
            <p className="text-lg font-black text-[#F59E0B] mb-2">
              🏆 The Prize
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="text-white font-semibold">
                The last person standing... the one whose picks defy logic and
                probability will receive a custom, one-of-a-kind World Cup
                trophy
              </span>
              . Personally curated, lovingly sourced, and shipped directly to
              your door by yours truly.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Is it the actual FIFA World Cup? No. Will it live on your shelf
              and spark envy at every family gathering for years to come?
              That&apos;s the plan.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-4 italic">
              * Trophy may arrive with questionable bubble wrap and even more
              questionable postage stamps. The bragging rights, however, are
              eternal.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-lg font-black text-white mb-2">How it works</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#2563EB] font-bold flex-shrink-0">
                  1.
                </span>
                Pick your winners for every match from the Round of 32 all the
                way to the Final.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2563EB] font-bold flex-shrink-0">
                  2.
                </span>
                Submit before the deadline — picks lock the moment the first
                ball is kicked.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2563EB] font-bold flex-shrink-0">
                  3.
                </span>
                Rack up points as matches complete. Later rounds are worth more,
                so anything can happen.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F59E0B] font-bold flex-shrink-0">
                  4.
                </span>
                The highest scorer when the final whistle blows gets the McCann
                Cup shipped to their door.
              </li>
            </ul>
          </div>

          {/* Sign-off */}
          <div className="text-center pt-2 pb-4">
            <p className="text-xl font-black text-white mb-1">
              May the best predictor win. 🤝
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              May your dark horses gallop. May your upsets be legendary.
              <br />
              May your bracket survive the Round of 16.
            </p>
            <p className="text-[#F59E0B] font-bold">— Rachael 🏆</p>
          </div>
        </div>
      </main>
    </>
  );
}
