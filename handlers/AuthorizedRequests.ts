import { SERVER_URL } from "@/constants/Server";
import { getData } from "./StorageHandler";
import { Person } from "@/constants/Interfaces";
import axiosInstance from "./AxiosConfig";
import Toast from "react-native-toast-message";

export async function getAuthToken() {
    const authTokenData = await getData('authToken');
    const authToken = authTokenData ? JSON.parse(authTokenData).session_token : null;
    return authToken;
}

// export async function PostRequest(path: string, body?: URLSearchParams) {
//     const authToken = await getAuthToken();
//     if (body === undefined) body = new URLSearchParams();
//     body.append('guid', authToken || '');
//     return fetch(`${SERVER_URL}${path}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": 'application/x-www-form-urlencoded',
//         },
//         body: body.toString(),
//     });
// }

// Whoami function
export async function WhoAmI() {
    const response = await axiosInstance.post('/auth/whoami');
    if (response.status != 200) {
        Toast.show({
            type: 'error',
            text1: 'Failed to fetch user data',
        });
        console.error('Failed to fetch user data', response);
        return;
    }
    try {
        const person: Person = JSON.parse(response.data);
        return person;
    } catch (error) {
        console.error('Failed to parse user data', error);
    }
}