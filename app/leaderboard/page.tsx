import { getTournamentProvider } from '@/lib/providers';
import Header from '@/components/layout/Header';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';

export const revalidate = 60;

export default async function LeaderboardPage() {
  const provider = getTournamentProvider();
  const [leaderboard, entrants] = await Promise.all([
    provider.getLeaderboard(),
    provider.getEntrants(),
  ]);

  const totalSubmitted = entrants.filter((e) => e.submitted_at).length;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24 sm:pb-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Leaderboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Updated live as match results come in.
          </p>
        </div>

        <LeaderboardTable entries={leaderboard} totalSubmitted={totalSubmitted} />
      </main>
    </>
  );
}
