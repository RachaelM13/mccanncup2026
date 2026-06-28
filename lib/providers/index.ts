import { ManualTournamentProvider } from './ManualTournamentProvider';
import type { TournamentDataProvider } from './types';

let _provider: TournamentDataProvider | null = null;

export function getTournamentProvider(): TournamentDataProvider {
  if (!_provider) {
    _provider = new ManualTournamentProvider();
  }
  return _provider;
}

export type { TournamentDataProvider };
