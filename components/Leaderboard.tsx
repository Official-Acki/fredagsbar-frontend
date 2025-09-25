import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "./Text";
import { getAuthToken, PostRequest } from "@/handlers/AuthorizedRequests";
import LeaderboardEntry from "./LeaderboardEntry";
import { Leaderboard as LeaderboardType, LeaderboardEntry as LeaderboardEntryType } from "@/constants/Interfaces";
import * as signalR from "@microsoft/signalr"; // <-- Add this import
import { getData } from "@/handlers/StorageHandler";
import { WEBSOCKET_URL } from "@/constants/Server";
import Toast from "react-native-toast-message";

interface LeaderboardProps {
    style?: object;
}

export default function Leaderboard({ style }: LeaderboardProps) {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardType | null>(null);
    const [displayedData, setDisplayedData] = useState<LeaderboardType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let connection: signalR.HubConnection | null = null;

        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const response = await PostRequest('/leaderboard/get/today', new URLSearchParams());
                const data = await response.json();
                try {
                    const parsedData = JSON.parse(data);
                    setLeaderboardData(parsedData);
                    setDisplayedData(parsedData);
                } catch (error) {}
            } catch (err) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch leaderboard',
                });
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        const setupSignalRConnection = async () => {
            const session_token = await getAuthToken();
            // SignalR setup
            connection = new signalR.HubConnectionBuilder()
                .withUrl(`${WEBSOCKET_URL}/leaderboardHub?session_token=${session_token}`, { withCredentials: true })
                .withAutomaticReconnect()
                .build();

            connection.on("ReceiveLeaderboard", (updatedData: LeaderboardType) => {
                setLeaderboardData(updatedData);
                setDisplayedData(updatedData);
            });

            connection.start()
                .then(() => {
                    console.log("SignalR Connected");
                })
                .catch(err => {
                    console.error("SignalR Connection Error:", err);
                });
        };

        setupSignalRConnection();

        // Initial fetch
        fetchLeaderboard();

        // Cleanup
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    return (
        <>
            {loading && !displayedData && <Text>Loading...</Text>}
            {displayedData && (
                <FlatList
                    style={[styles.list, style]}
                    data={displayedData.entries}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <LeaderboardEntry placement={index + 1} entry={item} />}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    list: {
        minWidth: '75%',
        maxHeight: '25%',
    },
});