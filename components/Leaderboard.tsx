import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "./Text";
import { PostRequest } from "@/handlers/AuthorizedRequests";
import LeaderboardEntry from "./LeaderboardEntry";
import { LeaderboardEntry as LeaderboardEntryType } from "@/constants/Interfaces";

interface LeaderboardProps {
    style?: object;
}

export default function Leaderboard( { style }: LeaderboardProps ) {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntryType[] | null>(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const response = await PostRequest('/leaderboard/get', new URLSearchParams());
                response.json().then(data => {
                    data = JSON.parse(data);
                    setLeaderboardData(data); // Update state with fetched data
                    setLoading(false); // Set loading to false after fetch
                });
                // setLeaderboardData(response); // Update state with fetched data
            } catch (err) {
                
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchLeaderboard();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <>
            {loading && <Text>Loading...</Text>}
            {!loading && leaderboardData && (
                <FlatList
                    style={ [styles.list, style] }
                    data={leaderboardData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <LeaderboardEntry entry={item} />}
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