import React from "react";
import { View, ActivityIndicator } from "react-native";

import { SERVER_URL } from "@/constants/Server";
import { fetch } from "expo/fetch";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { getData } from "@/handlers/StorageHandler";
import { Session } from "@/constants/Interfaces";

export function withMiddleware(WrappedComponent: React.ComponentType) {
    return function MiddlewareComponent(props: any) {
        const router = useRouter(); // Get the router object
        const [isLoading, setIsLoading] = React.useState(true);
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);

        React.useEffect(() => {
            const checkLoginStatus = async () => {
                try {
                    const tokenData = await getData('authToken');
                    if (tokenData) {
                        const token: Session = JSON.parse(tokenData);
                        console.log(token);
                        // Optionally, validate the token with the server
                        const formBody = new URLSearchParams();
                        formBody.append("guid", token.session_token);
                        const response = await fetch(`${SERVER_URL}/session/verify`, {
                            method: "POST",
                            headers: {
                                "Content-Type": 'application/x-www-form-urlencoded',
                            },
                            body: formBody.toString(),
                        });

                        // const data = await response.json();
                        if (response.ok) {
                            setIsLoggedIn(true);
                        } else {
                            router.replace("/login"); // Redirect to login if token is invalid
                        }
                    } else {
                        router.replace("/login"); // Redirect to login if no token
                    }
                } catch (error) {
                    console.error("Error checking login status:", error);
                    router.replace("/login"); // Redirect to login on error
                } finally {
                    setIsLoading(false);
                }
            };

            checkLoginStatus();
        }, [router]);

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return <WrappedComponent {...props} />;
    };
}