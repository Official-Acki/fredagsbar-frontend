export interface Session {
    id: number;
    user_id: number;
    session_token: string;
    created_at: string;
    expires_at: string;
}