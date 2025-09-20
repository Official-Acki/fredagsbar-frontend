import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "./Text";
import { PostRequest } from "@/handlers/AuthorizedRequests";
import LeaderboardEntry from "./LeaderboardEntry";
import { LeaderboardEntry as LeaderboardEntryType } from "@/constants/Interfaces";

interface LeaderboardProps {
    style?: object;
}

export default function Leaderboard({ style }: LeaderboardProps) {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntryType[] | null>(null); // State to store fetched data
    const [displayedData, setDisplayedData] = useState<LeaderboardEntryType[] | null>(null); // State to store data displayed in the UI
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const response = await PostRequest('/leaderboard/get', new URLSearchParams());
                const data = await response.json();
                try {
                    const parsedData = JSON.parse(data);
                    setLeaderboardData(parsedData); // Update the fetched data
                    setDisplayedData(parsedData); // Update the displayed data only after fetching is complete
                } catch (error) {
                    
                }

            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        // Fetch leaderboard initially
        fetchLeaderboard();

        // Set up interval to fetch leaderboard every 5 seconds
        const intervalId = setInterval(fetchLeaderboard, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <>
            {/* Optionally show a loading indicator */}
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