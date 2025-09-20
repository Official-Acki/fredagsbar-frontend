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
    drank: number;
}