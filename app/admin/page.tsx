import { getTournamentProvider } from '@/lib/providers';
import Header from '@/components/layout/Header';
import AdminClient from '@/components/admin/AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const provider = getTournamentProvider();

  const [matches, teams, entrants] = await Promise.all([
    provider.getMatches(),
    provider.getTeams(),
    provider.getEntrants(),
  ]);

  const totalSubmitted = entrants.filter((e) => e.submitted_at).length;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24 sm:pb-8">
        <AdminClient
          initialMatches={matches}
          teams={teams}
          totalEntrants={entrants.length}
          totalSubmitted={totalSubmitted}
        />
      </main>
    </>
  );
}
