import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import Leaderboard from "@/components/Leaderboard";
import { withMiddleware } from "@/components/Middleware";
import axiosInstance from "@/handlers/AxiosConfig";
import Toast from "react-native-toast-message";
import useEvent from "@/hooks/useEvent";
import { EventTitle } from "@/components/event/EventTitle";

function Home() {
    const [beers, setBeers] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const events = useEvent();

    const fetchBeerCount = async () => {
        try {
            const response = await axiosInstance.post('/Beers/drank/total/today/self');
            console.log(response.data);
            setBeers(Number.parseInt(response.data));
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to fetch beer count',
            });
            console.error("Failed to fetch beer count:", error);
        }
    };

    // Run fetchBeerCount once when the component mounts
    useEffect(() => {
        fetchBeerCount();
    }, []);


    const handlePress = () => {
        setDisabled(true);
        setTimeout(() => setDisabled(false), 500); // Re-enable after 500ms

        if (disabled) return; // Prevent multiple presses
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
        axiosInstance.post('/Beers/drank/');
        Toast.show({
            type: 'success',
            text1: 'Cheers! 🍻',
            autoHide: true,
            visibilityTime: 800,
        })
    };

    const styles = StyleSheet.create({
        leaderboard: {
            marginBottom: 20,
        },
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
            backgroundColor: useThemeColor({ colorName: 'primary', colorBrightness: 500 }),
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: useThemeColor({ colorName: 'accent', colorBrightness: 900 }),
            shadowOffset: { width: 3, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
        },
        buttonDisabled: {
            flexDirection: 'row',
            width: 100,
            height: 100,
            backgroundColor: useThemeColor({ colorName: 'primary', colorBrightness: 200 }),
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: useThemeColor({ colorName: 'accent', colorBrightness: 900 }),
            shadowOffset: { width: 3, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <EventTitle event={events.events ? events.events[0] : null} />
            <Leaderboard style={styles.leaderboard} />
            <Text type="title">{beers}</Text>
            <Animated.View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePress} style={!disabled ? styles.button : styles.buttonDisabled} disabled={disabled}>
                    <MaterialIcons name="plus-one" size={24} color={useThemeColor({ colorName: 'text' })} />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

export default withMiddleware(Home);