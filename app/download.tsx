import { Text } from "@/components/Text";
import { Styling } from "@/constants/Styling";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Download() {
    if (Platform.OS !== 'web') {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text type="subtitle">Download is only available on web.</Text>
            </SafeAreaView>
        );
    }

    const androidFileUrl = 'https://pawzd.net/download/?download=build-1758568263567.apk'; // Path to the file in the public directory

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },
        scrollContainer: {
            height: 500
        },
        platformContainer: {
            // flex: 1,
            height: 600,
            margin: 5,
            borderBottomWidth: 1,
            borderBottomColor: useThemeColor({ colorName: 'text' }),
        },
        imagesContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            gap: 25,
        },
        imageContainer: {
            display: "flex",
            justifyContent: "center",
            padding: "1%",
            backgroundColor: useThemeColor({ colorName: "accent" }),
            aspectRatio: 10/21,
            borderRadius: Styling.borderRadius
        },
        image: {
            display: "flex",
            minWidth: 25,
            aspectRatio: 9/20,
            backgroundColor: '#0553',
        },

        // Text things
        title: {
            textAlign: "center",
            margin: 5
        },

        // Buttons
        downloadContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        download: {
            color: useThemeColor({ colorName: "text", colorBrightness: 100 }),
            textDecorationLine: "none",
            textAlign: "center",
            backgroundColor: useThemeColor({colorName: "accent"}),
            margin: 10,
            padding: 10,
            borderRadius: Styling.borderRadius
        }
    });

    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {/* <Image
                    style={styles.image}
                    source="https://picsum.photos/seed/696/3000/2000"
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                /> */}
                <Image
                    source={require('../assets/download/android-dark.webp')}
                    // style={styles.image}
                    // contentFit="contain"
                    />
                <View style={styles.platformContainer}>
                    <Text type="subtitle" style={styles.title}>Android</Text>
                    <View style={styles.imagesContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../assets/download/android-light.webp')}
                                style={styles.image}
                                contentFit="fill"
                                />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../assets/download/android-dark.webp')}
                                style={styles.image}
                                contentFit="contain"
                                />
                        </View>
                    </View>
                    <View style={styles.downloadContainer}>
                        <a href={androidFileUrl} download style={styles.download}>
                            Download File
                        </a>
                    </View>
                </View>
                <View style={styles.platformContainer}>
                    <Text type="subtitle" style={styles.title}>IOS</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}