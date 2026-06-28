import { notFound } from 'next/navigation';
import { getTournamentProvider } from '@/lib/providers';
import { calculateScore } from '@/lib/scoring';
import { computePickPopularity } from '@/lib/stats';
import Header from '@/components/layout/Header';
import BracketViewer from '@/components/picks/BracketViewer';

export const revalidate = 60;

interface Props {
  params: Promise<{ token: string }>;
}

export default async function BracketViewerPage({ params }: Props) {
  const { token } = await params;
  const provider = getTournamentProvider();

  const [entrant, matches, entrants] = await Promise.all([
    provider.getEntrant(token),
    provider.getMatches(),
    provider.getEntrants(),
  ]);

  if (!entrant || !entrant.submitted_at) notFound();

  // Fetch this entrant's picks + all picks for popularity stats
  const submittedEntrants = entrants.filter((e) => e.submitted_at);
  const allPicksArrays = await Promise.all(
    submittedEntrants.map((e) => provider.getPicksForEntrant(e.id))
  );

  const entrantPicks = allPicksArrays[submittedEntrants.findIndex((e) => e.id === entrant.id)] ?? [];

  const matchIds = matches.map((m) => m.id);
  const popularity = computePickPopularity(allPicksArrays, matchIds);

  const { points, correct_picks } = calculateScore(matches, entrantPicks);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24 sm:pb-8">
        <BracketViewer
          matches={matches}
          picks={entrantPicks}
          teamName={entrant.team_name}
          fullName={entrant.full_name}
          popularity={popularity}
          isOwn={false}
        />
      </main>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { token } = await params;
  const provider = getTournamentProvider();
  const entrant = await provider.getEntrant(token);
  if (!entrant) return {};
  return {
    title: `${entrant.team_name} – Rachael's World Cup 2026`,
  };
}
