import { LeaderboardEntry as LeaderboardEntryType } from "@/constants/Interfaces";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";

interface Props {
    placement: number;
    entry: LeaderboardEntryType;
}

export default function LeaderboardEntry( { placement, entry }: Props) {
    return (
        <View style={styles.container}>
            <Text>{placement}. {entry.person.username}</Text>
            <Text>{entry.beers_drank} beers</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});