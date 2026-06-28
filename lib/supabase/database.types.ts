export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string;
          fifa_code: string;
          name: string;
          flag: string;
          group_letter: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          fifa_code: string;
          name: string;
          flag: string;
          group_letter?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          fifa_code?: string;
          name?: string;
          flag?: string;
          group_letter?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          id: string;
          round: string;
          match_number: number;
          home_team_id: string | null;
          away_team_id: string | null;
          winner_id: string | null;
          home_score: number | null;
          away_score: number | null;
          kickoff: string | null;
          status: string;
          next_match_id: string | null;
          next_match_slot: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          round: string;
          match_number: number;
          home_team_id?: string | null;
          away_team_id?: string | null;
          winner_id?: string | null;
          home_score?: number | null;
          away_score?: number | null;
          kickoff?: string | null;
          status?: string;
          next_match_id?: string | null;
          next_match_slot?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          round?: string;
          match_number?: number;
          home_team_id?: string | null;
          away_team_id?: string | null;
          winner_id?: string | null;
          home_score?: number | null;
          away_score?: number | null;
          kickoff?: string | null;
          status?: string;
          next_match_id?: string | null;
          next_match_slot?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      entrants: {
        Row: {
          id: string;
          full_name: string;
          team_name: string;
          bracket_token: string;
          submitted_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          team_name: string;
          bracket_token: string;
          submitted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          team_name?: string;
          bracket_token?: string;
          submitted_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      picks: {
        Row: {
          id: string;
          entrant_id: string;
          match_id: string;
          picked_team_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          entrant_id: string;
          match_id: string;
          picked_team_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          entrant_id?: string;
          match_id?: string;
          picked_team_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      leaderboard: {
        Row: {
          id: string;
          full_name: string;
          team_name: string;
          bracket_token: string;
          submitted_at: string | null;
          points: number;
          correct_picks: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
