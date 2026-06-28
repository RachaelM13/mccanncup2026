import { getTournamentProvider } from '@/lib/providers';
import Header from '@/components/layout/Header';
import MyBracketClient from '@/components/picks/MyBracketClient';

export const dynamic = 'force-dynamic';

export default async function MyBracketPage() {
  const provider = getTournamentProvider();
  const matches = await provider.getMatches();

  const deadline = new Date(
    process.env.NEXT_PUBLIC_SUBMISSION_DEADLINE ?? '2026-07-04T18:00:00Z'
  );

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24 sm:pb-8">
        <MyBracketClient matches={matches} deadline={deadline} />
      </main>
    </>
  );
}
