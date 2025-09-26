export interface Session {
    id: number;
    user_id: number;
    session_token: string;
    created_at: string;
    expires_at: string;
}

export interface Person {
    id: number;
    username: string;
    discord_id: number;
    created_at: string;
}
export interface LeaderboardEntry {
    person: Person;
    beers_drank: number;
}

export interface Leaderboard {
    entries: LeaderboardEntry[];
}

export interface Event {
    id: number;
    name: string;
    description: string;
    event_times: Array<{
        start_time: string;
        end_time: string;
        repeat_interval: string | null;
    }>;
}