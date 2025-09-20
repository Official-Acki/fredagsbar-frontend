import { useRef, useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Animated } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import Leaderboard from "@/components/Leaderboard";
import { withMiddleware } from "@/components/Middleware";

function Home() {
    const [beers, setBeers] = useState<number>(0);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        // Trigger the animation
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Increment the beer count
        setBeers(beers + 1);
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonContainer: {
            transform: [{ scale: scaleAnim }],
            marginTop: 20,
            // width: '100%',
            // height: 100,
        },
        button: {
            flexDirection: 'row',
            width: 100,
            height: 100,
            backgroundColor: useThemeColor({}, 'primary', 500),
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: useThemeColor({}, 'accent', 900),
            shadowOffset: { width: 3, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Leaderboard />
            <Animated.View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                    <MaterialIcons name="plus-one" size={24} color={useThemeColor({}, 'text')} />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

export default withMiddleware(Home);