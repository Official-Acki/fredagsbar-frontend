import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "./Text";
import { getAuthToken, PostRequest } from "@/handlers/AuthorizedRequests";
import LeaderboardEntry from "./LeaderboardEntry";
import { LeaderboardEntry as LeaderboardEntryType } from "@/constants/Interfaces";
import * as signalR from "@microsoft/signalr"; // <-- Add this import
import { getData } from "@/handlers/StorageHandler";

interface LeaderboardProps {
    style?: object;
}

const SERVER_HOST = "http://localhost:5293"; // <-- Replace with your actual host

export default function Leaderboard({ style }: LeaderboardProps) {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntryType[] | null>(null);
    const [displayedData, setDisplayedData] = useState<LeaderboardEntryType[] | null>(null);
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
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        const setupSignalRConnection = async () => {
            const session_token = await getAuthToken();
            // SignalR setup
            connection = new signalR.HubConnectionBuilder()
                .withUrl(`${SERVER_HOST}/leaderboardHub?session_token=${session_token}`, { withCredentials: true })
                .withAutomaticReconnect()
                .build();

            connection.on("ReceiveLeaderboard", (updatedData: LeaderboardEntryType[]) => {
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
                    data={displayedData}
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