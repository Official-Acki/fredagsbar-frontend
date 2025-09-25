import axios from "axios";
import { SERVER_URL } from "@/constants/Server";
import { getData } from "./StorageHandler";
import Toast from "react-native-toast-message";

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const authTokenData = await getData("authToken");
        const authToken = authTokenData ? JSON.parse(authTokenData).session_token : null;

        if (authToken) {
            if (!config.data) {
                config.data = new URLSearchParams();
            }
            config.data.append('guid', authToken || '');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific status codes
            if (error.response.status === 401) {
                Toast.show({
                    type: "error",
                    text1: "Unauthorized",
                    text2: "Please log in again.",
                });
            } else if (error.response.status >= 500) {
                Toast.show({
                    type: "error",
                    text1: "Server Error",
                    text2: "Something went wrong on the server.",
                });
            }
        } else {
            Toast.show({
                type: "error",
                text1: "Network Error",
                text2: "Please check your internet connection.",
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;