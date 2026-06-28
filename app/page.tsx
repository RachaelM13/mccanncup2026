import { getTournamentProvider } from '@/lib/providers';
import Header from '@/components/layout/Header';
import LiveBracket from '@/components/bracket/LiveBracket';
import LeaderboardPreview from '@/components/leaderboard/LeaderboardPreview';
import UpcomingMatch from '@/components/home/UpcomingMatch';
import RecentResults from '@/components/home/RecentResults';

export const revalidate = 60;

export default async function HomePage() {
  const provider = getTournamentProvider();

  const [matches, leaderboard] = await Promise.all([
    provider.getMatches(),
    provider.getLeaderboard(),
  ]);

  const upcomingMatch = matches
    .filter((m) => m.status !== 'COMPLETED' && m.home_team && m.away_team)
    .sort((a, b) => {
      if (!a.kickoff) return 1;
      if (!b.kickoff) return -1;
      return new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime();
    })[0] ?? null;

  const recentResults = matches
    .filter((m) => m.status === 'COMPLETED')
    .sort((a, b) => {
      if (!a.kickoff) return 1;
      if (!b.kickoff) return -1;
      return new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime();
    })
    .slice(0, 5);

  const topEntries = leaderboard.slice(0, 5);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 pb-24 sm:pb-8 pt-6 space-y-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            FIFA World Cup 2026
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Live tournament bracket · Family challenge
          </p>
        </div>

        <section>
          <SectionHeader title="Live Bracket" />
          <LiveBracket matches={matches} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingMatch && (
            <section>
              <SectionHeader title="Next Match" />
              <UpcomingMatch match={upcomingMatch} />
            </section>
          )}
          <section>
            <SectionHeader title="Recent Results" />
            <RecentResults matches={recentResults} />
          </section>
        </div>

        <section>
          <SectionHeader title="Leaderboard" action={{ label: 'View all', href: '/leaderboard' }} />
          <LeaderboardPreview entries={topEntries} />
        </section>

      </main>
    </>
  );
}

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-bold text-white uppercase tracking-wide">{title}</h2>
      {action && (
        <a href={action.href} className="text-xs text-[#2563EB] font-semibold hover:underline">
          {action.label}
        </a>
      )}
    </div>
  );
}
