import { SERVER_URL } from "@/constants/Server";
import { getData } from "./StorageHandler";

export async function getAuthToken() {
    const authTokenData = await getData('authToken');
    const authToken = authTokenData ? JSON.parse(authTokenData).session_token : null;
    return authToken;
}

export async function PostRequest(path: string, body?: URLSearchParams) {
    const authToken = await getAuthToken();
    if (!body) body = new URLSearchParams();
    body.append('guid', authToken || '');
    return fetch(`${SERVER_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });
}